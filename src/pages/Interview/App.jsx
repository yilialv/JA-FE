import { APPID, APPKEY, DEV_PID, URI, MIN_WORDS, MAX_CONVERSATION_COUNT, SERVER_URL } from '../../constant';
import { Button, Drawer, Input, Row, Layout, Avatar, Col, Checkbox } from 'antd';
import { UserOutlined, RightOutlined, LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useEffect, useRef, useState } from 'react';
import store from '../../store'
import './App.less'

const { TextArea } = Input;
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
    const scrollBlock = document.getElementById('scrollBlock');

    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;
  });

  /**
   * 发送开始帧
   * @param {WebSocket} ws 
   */
  const sendStartParams = () => {
    let req = {
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
    let body = JSON.stringify(req);
    ws.current.send(body);
    console.log('发送开始帧:' + body);
  };

  /**
   * 发送结束帧
   * @param {WebSocket} ws 
   */
  const sendFinish = () => {
    let req = {
      'type': 'FINISH'
    };
    let body = JSON.stringify(req);
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
  }

  // 停止录音
  const stopRecording = () => {
    recorder.stop();
    ws.current?.close();
    wsServer.current?.close();
  }

  recorder.onStart = () => {
    // console.log("recorder.onStart")
  }

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
        console.log("接收最后一个音频帧")
      }
    }
  };

  // 建立连接
  const connectWebSocket = () => {
    ws.current = new WebSocket(uri);
    wsServer.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      sendStartParams();
      console.log('WebSocket开始连接')
    };

    ws.current.onmessage = (message) => {
      try {
        let res = JSON.parse(message.data);
        if (res.type === 'MID_TEXT' || res.type === 'FIN_TEXT') {
          if (res.err_no === 0) {
            store.setNextRequest(res.result);
            store.setRequest();
          }
        }
        handleMessage(res);
      } catch (err) {
        console.log('解析语音转文字结果报错，错误为：', err);
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
    };

    wsServer.current.onmessage = (message) => {
      try {
        const result = JSON.parse(message.data);
        const { data, id } = result;
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
        }
      } catch (error) {
        console.log('后端返回解析出错!')
      }
    };

    wsServer.current.onclose = () => {
      console.log('Server WebSocket关闭连接');
    };

    wsServer.current.onerror = (error) => {
      console.log('error:', error);
    };
  };

  const handleMessage = async (res) => {
    if (res.type !== "FIN_TEXT") {
      return;
    }
    // 文字不能太短
    if (res.result.length < MIN_WORDS) {
      return;
    }
    store.addToConversation(res.result);

    // 只保留最近20条对话
    while (store.conversations.length > MAX_CONVERSATION_COUNT) {
      store.removeFromConversation();
    }

    // 要发送的数据
    let req = {
      last_reply: store.lastReply,
      conversations: store.conversations
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

  const [DrawerState, setDrawerState] = useState(true)

  const handleDrawer = () => {
    setDrawerState(!DrawerState);
  }

  return (
    <Content className='interview-detail'>
      {/* <Row className='container'>
        <TextArea 
          bordered={true}
          showCount={true}
          placeholder='答案显示在这里'
          value={store.lastReply + store.reply}
          autoSize={{ minRows: 25, maxRows: 25 }} />
      </Row>
      <Row className='container'>
        <TextArea 
          bordered={true}
          showCount={true}
          placeholder='问题显示在这里'
          value={store.request}
          autoSize={{ minRows: 3, maxRows: 3 }} />
      </Row> */}
      {/* <Row className='btn'>
        <Button type='primary' onClick={startRecording}>开始面试</Button>
        <Button onClick={stopRecording}>结束面试</Button>
      </Row> */}


      {/* <Row className='header'>
        <Col>
          <Row className='title'>后端开发 - 字节跳动 - 番茄小说</Row>
          <Row className='subtitle'>辅助面试 二面 面试官发言 生成中</Row>
        </Col>
        <Col>
          <Button type='primary' onClick={startRecording} className='interview-btn'>开始</Button>
          <Button className={['interview-btn', 'pause']}>暂停</Button>
          <Button danger type='primary' onClick={stopRecording} className='interview-btn'>结束</Button>
        </Col>
      </Row> */}
      <div className='container'>
        <div className='container-header'>
          <div className='header-group'>
            <div className='title'>后端开发@字节跳动 - 番茄小说</div>
            <div className='states'>
              <div className='state'>辅助面试</div>
              <div className='state'>二面</div>
              <div className='state'>面试官发言</div>
              <div className='state'>发言中</div>
            </div>
          </div>
          <div className='time'>当前时长：20分钟</div>
        </div>
        <div className='container-body'>
          <div className={`body-left ${DrawerState ? 'body-compressed' : 'body-fill'}`}>
            <div className='answer-block' id='scrollBlock'>
              {
                store.reply.map((item, key) => {
                  return (
                    <div className='answer' key={key}>
                      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
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
            <div className='question'>{store.request}</div>
            <div className='drawer-button' onClick={handleDrawer}>
              {
                DrawerState ? <RightOutlined /> : <LeftOutlined />
              }
            </div>
          </div>
          <div className={`drawer ${DrawerState ? 'drawer-opening' : 'drawer-closed'}`}>
            <div className='drawer-info'>
              <Avatar
                icon={<UserOutlined />}
                size={96}
                className='drawer-avatar'
              >
              </Avatar>
              <div className='drawer-name'>万能小助手</div>
              <div className='drawer-check'>
                <Checkbox>
                  基于个人信息辅助
                </Checkbox>
                <QuestionCircleOutlined />
              </div>
            </div>
            <div></div>
            <div className='drawer-buttons'>
              <Button type='primary' onClick={startRecording}>
                开始
              </Button>
              <Button className='pause'>
                暂停
              </Button>
              <Button danger type='primary' onClick={stopRecording}>
                结束
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Content >
  );
});

export default Interview;
