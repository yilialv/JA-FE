import { useState } from 'react';
import { APPID, APPKEY, DEV_PID, URI, MENU } from './constant';
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
  const [request, setRequest] = useState(null); // 从百度拿回来的数据
  const [response, setResponse] = useState(null); // 从后端拿回来的数据

  const recorder = new RecorderManager('/src/recorder_manager');
  const frameSize = 16000 * 2 / 1000 * 160; // 定义每帧大小
  const uri = URI + '?sn=' + crypto.randomUUID();

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
    console.log('send START frame with params:' + body);
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
    console.log('send FINISH frame');
  };

  recorder.onStart = () => {
    // console.log("recorder.onStart")
  }

  recorder.onStop = function () {
    sendFinish();
    console.log('thread terminating');
  };

  // 接收音频数据帧
  recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    console.log("onFrameRecorded")
    if (ws.readyState === ws.OPEN) {
      ws.send(new Int8Array(frameBuffer));
      if (isLastFrame) {
        console.log("is last frame")
      }
    }
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
  }

  // 建立连接
  const connectWebSocket = () => {
    ws = new WebSocket(uri);
    ws.onopen = () => {
      sendStartParams(ws);
      console.log('WebSocket start.')
    };
  
    ws.onmessage = (message) => {
      setRequest(message);
      console.log(message);
    };
  
    ws.onclose = () => {
      console.log('WebSocket is closed now.');
    };
  
    ws.onerror = (error) => {
      recorder.stop();
      console.log('error:', error);
    };
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  // todo 从后端拿数据

  return (
    <div className='app'>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={MENU} />
      <div className='container'>
        <TextArea 
          bordered={true}
          showCount={true}
          // value={request}
          value='好好学习，天天向上'
          autoSize={{ minRows: 11, maxRows: 11 }} />
        <div className='interview-button'>
          <Button type='primary' onClick={startRecording}>开始面试</Button>
          <Button onClick={stopRecording}>结束面试</Button>
        </div>
        <TextArea 
          bordered={true}
          showCount={true}
          // value={response}
          value='good good study'
          autoSize={{ minRows: 11, maxRows: 11 }} />
      </div>
    </div>
  );
};

export default App;
