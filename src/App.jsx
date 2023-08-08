import { useEffect, useState } from 'react';
import { APPID, APPKEY, DEV_PID, URI, MENU, MIN_WORDS, MAX_CONVERSATION_COUNT, SERVER_URL } from './constant';
import { Button, Input, Menu } from 'antd';
import './App.css';

const { TextArea } = Input;

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

const App = () => {
  const [current, setCurrent] = useState('interview');
  const [request, setRequest] = useState(''); // 从百度拿回来的数据
  const [nextRequest, setNextRequest] = useState(''); // 从百度拿回来的新数据
  const [reply, setReply] = useState(''); // 从后端拿回来的数据
  const [lastReply, setLastReply] = useState(''); // 从后端拿回来的新数据

  // 可优化
  useEffect(() => {
    setRequest(request + nextRequest);
    setReply(reply + lastReply);
  }, [nextRequest, lastReply])

  // 后端接口测试代码
  // useEffect(() => {
  //   let req = {
  //     last_reply: '',
  //     conversations: [
  //       '做一下自我介绍',
  //       '介绍一下数据库引擎',
  //       '了解数据库索引吗？'
  //     ]
  //   }

  //   fetch(SERVER_URL, {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(req),
  //   })
  //   .then(resp => resp.json())
  //   .then(resp => {
  //     console.log('Answer:', resp.reply);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // }, [])

  const recorder = new RecorderManager('/src/recorder_manager');
  const frameSize = 16000 * 2 / 1000 * 160; // 定义每帧大小
  const uri = URI + '?sn=' + crypto.randomUUID();
  const conversations = [];

  let ws = null;

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
    ws.send(body);
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
    ws.send(body);
    console.log('发送结束帧');
  };

  // 开始录音
  const startRecording = () => {
    connectWebSocket();

    recorder.start({
      sampleRate: 16000,
      frameSize: frameSize,
    });

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
      if (ws.readyState === ws.OPEN) {
        ws.send(new Int8Array(frameBuffer));
        if (isLastFrame) {
          console.log("接收最后一个音频帧")
        }
      }
    };
  }

  // 停止录音
  const stopRecording = () => {
    recorder.stop();
  }

  // 建立连接
  const connectWebSocket = () => {
    ws = new WebSocket(uri);

    ws.onopen = () => {
      sendStartParams(ws);
      console.log('WebSocket开始连接')
    };
  
    ws.onmessage = (message) => {
      try {
        let res = JSON.parse(message.data);
        if (res.type === 'MID_TEXT' || res.type === 'FIN_TEXT') {
          setNextRequest(res.result);
        }
        handleMessage(res);
      } catch (err) {
        console.log('解析语音转文字结果报错，错误为：', err);
      }
      
      console.log(JSON.parse(message.data));
    };
  
    ws.onclose = () => {
      console.log('WebSocket关闭连接');
    };
  
    ws.onerror = (error) => {
      recorder.stop();
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
    conversations.push(res.result);

    // 只保留最近20条对话
    while (conversations.length > MAX_CONVERSATION_COUNT) {
      conversations.shift();
    }

    // 要发送的数据
    let req = {
      last_reply: lastReply,
      conversations: conversations
    };

    fetch(SERVER_URL, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log('Answer:', resp.reply);
      if (!resp.reply.startsWith('No')) {
        setLastReply(resp.reply);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='app'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={MENU} />
      <div className='container'>
        <TextArea 
          bordered={true}
          showCount={true}
          value={request}
          autoSize={{ minRows: 11, maxRows: 11 }} />
        <div className='interview-button'>
          <Button type='primary' onClick={startRecording}>开始面试</Button>
          <Button onClick={stopRecording}>结束面试</Button>
        </div>
        <TextArea 
          bordered={true}
          showCount={true}
          value={reply}
          autoSize={{ minRows: 11, maxRows: 11 }} />
      </div>
    </div>
  );
};

export default App;
