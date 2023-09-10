import { APPID, APPKEY, DEV_PID, URI, MIN_WORDS, MAX_CONVERSATION_COUNT, SERVER_URL } from '../../constant';
import { Button, Spin, Tag, Input, Layout, Avatar, Checkbox, Space, message } from 'antd';
import { UserOutlined, PauseOutlined, CaretRightOutlined, SendOutlined, LoadingOutlined, AudioOutlined, ClockCircleOutlined, RightOutlined, LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import store from '../../store';
import './App.less';

const { Content } = Layout;

/*
1. 连接 ws_app.run_forever()
2. 连接成功后发送数据 on_open()
2.1 发送开始参数帧 send_start_params()
2.2 发送音频数据帧 send_audio()
2.3 库接收识别结果 on_message()
2.4 发送结束帧 send_finish()
3. 关闭连接 on_close()

库的报错 on_error()
*/

const Interview = observer(() => {
  const recorder = new RecorderManager('/recorder_manager');
  const frameSize = 16000 * 2 / 1000 * 160; // 定义每帧大小
  const uri = URI + '?sn=' + crypto.randomUUID();

  const ws = useRef(null); // 和百度的连接
  const wsServer = useRef(null); // 和后端的连接

  useEffect(() => {
    store.formCompany = localStorage.getItem('company');
    store.formDirection = localStorage.getItem('direction');
    store.formRound = localStorage.getItem('round');

    const scrollBlock = document.getElementById('scrollBlock');
    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;
  });

  /**
   * 发送开始帧
   * @param {WebSocket} ws 
   */
  const sendStartParams = () => {
    const req = {
      'type': 'START',
      'data': {
        'appid': APPID,  // 网页上的appid
        'appkey': APPKEY,  // 网页上的appid对应的appkey
        'dev_pid': DEV_PID,  // 识别模型
        'cuid': 'ja_',  // 随便填不影响使用。机器的mac或者其它唯一id，百度计算UV用。
        'sample': 16000,  // 固定参数
        'format': 'pcm'  // 固定参数
      }
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log('发送开始帧:' + body);
  };

  /**
   * 发送结束帧
   * @param {WebSocket} ws 
   */
  const sendFinish = () => {
    const req = {
      'type': 'FINISH'
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log('发送结束帧');
  };

  // 开始录音
  const startRecording = () => {
    connectWebSocket();

    recorder.start({
      sampleRate: 16000,
      frameSize: frameSize,
    });
  };

  // 停止录音
  const stopRecording = () => {
    recorder.stop();
    ws.current?.close();
    wsServer.current?.close();
  };

  recorder.onStart = () => {
    // console.log("recorder.onStart")
  };

  recorder.onStop = function () {
    sendFinish();
    console.log('录音结束');
  };

  // 接收音频数据帧
  recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    // console.log("onFrameRecorded");
    if (ws.current.readyState === ws.current.OPEN) {
      ws.current.send(new Int8Array(frameBuffer));
      if (isLastFrame) {
        console.log("接收最后一个音频帧");
      }
    }
  };

  // 建立连接
  const connectWebSocket = () => {
    ws.current = new WebSocket(uri);
    wsServer.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      sendStartParams();
      console.log('WebSocket开始连接');
    };

    ws.current.onmessage = (message) => {
      try {
        const res = JSON.parse(message.data);
        const { type, err_no, err_msg, result } = res;
        if (type === 'MID_TEXT' || type === 'FIN_TEXT') {
          if (err_no === 0) {
            store.setNextRequest(result);
            store.setRequest();
          } else {
            throw Error(err_msg);
          }
        }
        handleMessage(res);
      } catch (err) {
        console.error(err);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket关闭连接');
    };

    ws.current.onerror = (error) => {
      recorder.stop();
      console.log('error:', error);
    };

    wsServer.current.onopen = () => {
      console.log('Server WebSocket打开连接');
      const req = {
        'type': 1,
        'data': {
          "company": store.formCompany,
          "direction": store.formDirection,
          "round": store.formRound
        }
      };
      const body = JSON.stringify(req);
      wsServer.current.send(body);
      console.log('发送开始帧:' + body);
    };

    wsServer.current.onmessage = (msg) => {
      try {
        const result = JSON.parse(msg.data);
        console.log(result);
        const { type, data, id } = result;
        if (type === 0) {
          if (!data.startsWith('No')) {
          // 第一次拿到数据
            if (!store.id) {
              store.setId(id);
              store.setLastReply(data);
            } else {
              if (id !== store.id) {
                store.setReply();
                store.setId(id);
              }
              store.setLastReply(data);
            }
          } else {
            message.warning('无效提问或问题长度低于8，请重新尝试～');
          }
        } else if (type === 99) {
          message.error(data);
        }
      } catch (error) {
        console.log('后端返回解析出错!');
      }
    };

    wsServer.current.onclose = () => {
      const req = {
        "type": 3,
        "data": {}
      };
      wsServer.current.send(JSON.stringify(req));
      console.log('发送结束帧：', JSON.stringify(req));
      console.log('Server WebSocket关闭连接');
    };

    wsServer.current.onerror = (error) => {
      console.log('error:', error);
    };
  };

  const handleMessage = async (res) => {
    const { type, result } = res;
    if (type !== "FIN_TEXT") {
      return;
    }
    // 文字不能太短
    if (result.length < MIN_WORDS) {
      return;
    }
    store.addToConversation(result);

    // 只保留最近20条对话
    while (store.conversations.length > MAX_CONVERSATION_COUNT) {
      store.removeFromConversation();
    }

    // 要发送的数据
    const req = {
      "type": 2,
      "data": {
        last_reply: store.lastReply,
        conversations: store.conversations
      }
    };

    wsServer.current.send(JSON.stringify(req));

    // fetch(SERVER_URL, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(req),
    // })
    // .then(resp => resp.json())
    // .then(resp => {
    //   console.log('Answer:', resp.reply);
    //   if (!resp.reply.startsWith('No')) {
    //     store.setLastReply(resp.reply);
    //     store.setReply();
    //   }
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  const [DrawerState, setDrawerState] = useState(true);

  const [ButtonState, setButtonstate] = useState(true);

  const [AudioState, setAudioState] = useState(true);

  const [ReplyState, setReplyState] = useState(false);

  const handleReplyState = () => {
    setReplyState(!ReplyState)
  }

  const handleDrawer = () => {
    setDrawerState(!DrawerState);
  }

  // const closeDrawer = () => {
  //   setDrawerState(false);
  // }

  const handleButton = () => {
    setButtonstate(!ButtonState);
  }

  const activateAudioState = () => {
    setAudioState(true);
  }

  const stopAudioState = () => {
    setAudioState(false);
  }

  const prefix = (
    <div className='audio-display'>
      <LoadingOutlined
        className={`audio-loading ${AudioState ? 'loading-activated' : 'loading-default'}`}
      />
      <AudioOutlined
        className={`audio ${AudioState ? 'audio-activated' : 'audio-default'}`}
      />
    </div>
  );

  return (
    <Content className='interview-detail'>
      <div className='container'>
        <div className='container-header'>
          <div className='time'>
            <ClockCircleOutlined style={{ color: '#3F9D13', fontSize: '20px' }} />
            &nbsp;20min
          </div>
          <div className='states'>
            {ReplyState
              ?
              <div className='state'>
                等待面试官问题
              </div>
              :
              <div className='state'>
                <span>生成中</span>
                <Spin />
              </div>
            }
          </div>
          {
            ButtonState
              ?
              <Button className='header-button' type='primary' onClick={startRecording}>
                <CaretRightOutlined />
                <span>开始</span>
              </Button>
              :
              <Button danger className='header-button' type='primary' onClick={stopRecording}>
                <PauseOutlined />
                结束
              </Button>
          }
        </div>
        <div className='container-body'>
          <div className={`body-left ${DrawerState ? 'body-compressed' : 'body-fill'}`}>
            <div className='answer-block' id='scrollBlock'>
              <div className='answer'>
                <div className='answer-header'>
                  <Avatar style={{ backgroundColor: '#87d068', marginRight: '5px' }} icon={<UserOutlined />} />
                  <div>小助手</div>
                </div>
                <div className='text'>测试文本<br />测试文本</div>
              </div>
              {
                store.reply.map((item, key) => {
                  return (
                    <div className='answer' key={key}>
                      <div className='answer-header'>
                        <Avatar style={{ backgroundColor: '#87d068', marginRight: '5px' }} icon={<UserOutlined />} />
                        <div>小助手</div>
                      </div>
                      <div className='text'>{item}</div>
                    </div>
                  );
                })
              }
              {
                !!store.lastReply &&
                <div className='answer'>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  <div className='text'>{store.lastReply}</div>
                </div>
              }
            </div>
            <div className='question'>
              <Space.Compact className='question-input' size="large">
                <Input
                  placeholder="input"
                  prefix={prefix}
                  className="input"
                //value={store.request}
                />
                <Button style={{ color: '#3F9D13' }} type="default">
                  <SendOutlined />
                </Button>
              </Space.Compact>
            </div>
          </div>
          <div className={`drawer-button ${DrawerState ? 'drawer-button-opening' : 'drawer-button-closed'}`} onClick={handleDrawer}>
            {
              DrawerState ? <RightOutlined /> : <LeftOutlined />
            }
          </div>
          <div className={`drawer ${DrawerState ? 'drawer-opening' : 'drawer-closed'}`}>
            <div className='drawer-info'>
              <Avatar
                icon={<UserOutlined />}
                size={96}
                className='drawer-avatar'
              >
              </Avatar>
              <div className='drawer-name'>
                <div>字节跳动</div>
                <div>@后端开发</div>
              </div>
              <div className='drawer-state'>
                <Tag>辅助面试</Tag>
                <Tag>三面</Tag>
              </div>
              <div className='drawer-check'>
                <Checkbox>
                  基于个人信息辅助
                </Checkbox>
                <QuestionCircleOutlined className='help' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content >
  );
});

export default Interview;
