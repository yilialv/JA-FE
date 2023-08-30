import { APPID, APPKEY, DEV_PID, URI, MIN_WORDS, MAX_CONVERSATION_COUNT, SERVER_URL } from '../../constant';
import { Button, Input, Row, Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useRef } from 'react';
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
    wsServer.current = new WebSocket(SERVER_URL + `?jwt-token=${store.jwtToken}`);

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
      
      console.log(JSON.parse(message.data));
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
        let result = JSON.parse(message.data);
        // console.log('message:', result)
        if (!result.delta.startsWith('No')) {
          // 第一次拿到数据
          if (!store.id) {
            store.setId(result.id);
            store.setLastReply(result.delta);
          } else {
            if(result.id !== store.id) {
              store.setReply();
              store.setId(result.id);
            }
            store.setLastReply(result.delta);
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
      <Row className='btn'>
        <Button type='primary' onClick={startRecording}>开始面试</Button>
        <Button onClick={stopRecording}>结束面试</Button>
      </Row>
      <div className='container'>
        <div className='title'>字节面试</div>
        <div className='answer-block'>
          <div className='answer'>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div className='text'>{ store.lastReply  }</div>
          </div>
        </div>
        <div className='question'>{ store.request }</div>
      </div>
      <div className='sider'>

      </div>
    </Content>
  );
});

export default Interview;
