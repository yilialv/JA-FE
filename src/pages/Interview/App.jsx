import {
  APPKEY,
  URI,
  MIN_WORDS,
  MAX_CONVERSATION_COUNT,
  SERVER_URL,
} from "../../constant";

import { getToken, getHotWordID } from "../../router";
import {
  Button,
  Spin,
  Input,
  Layout,
  Avatar,
  Checkbox,
  Space,
  message,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  TableOutlined
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import store from "../../store";
import "./App.less";
import iconSend from "../../imgs/send.png";
import iconLeft from "../../imgs/left.png";


const { Content } = Layout;
const messageList = [

]
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

  const clear = useEffect(() => {
    store.formCompany = localStorage.getItem("company");
    store.formDirection = localStorage.getItem("direction");
    store.formRound = localStorage.getItem("round");
    store.formImg = localStorage.getItem("img");

    const interval = setInterval(() => {
      setCount((counts) => counts + 1);
    }, 1000);

    return () => {
      setCount(0)
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [store.lastReply]);

  const autoScroll = useRef(null);

  const scrollToBottom = () => {
    autoScroll.current.scrollIntoView({ behavior: 'instant' });
  };

  const task_id = crypto.randomUUID().replace(/-/g, "");

  const ws = useRef(null); // 和百度的连接
  const wsServer = useRef(null); // 和后端的连接
  const recorder = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorder = useRef(null);
  const frameSize = ((16000 * 2) / 1000) * 160; // 定义每帧大小

  const startRecording = () => {
    connectWebSocket();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      recorder.current = new RecorderManager("/recorder_manager");
      mediaStreamRef.current = stream;

      mediaRecorder.current.start();

      recorder.current.start({
        sampleRate: 16000,
        frameSize: frameSize,
      });

      // 接收音频数据帧
      recorder.current.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
        if (ws.current.readyState === ws.current.OPEN) {

          ws.current.send(new Int8Array(frameBuffer));
          if (isLastFrame) {
            console.log("接收最后一个音频帧");
          }
        }
      };

      mediaRecorder.current.onstop = () => {
        stopMediaStream();
      };

      handleButton(false);
      handleAudioState(true);
    })
      .catch((error) => {
        console.error('录音报错:', error);
      });
  };

  const stopRecording = () => {
    recorder.current.stop();
    sendFinish();
    mediaRecorder.current.stop();
    console.log('录音关闭');
    handleButton(true);
    handleAudioState(false);
    ws.current?.close();
    wsServer.current?.close();
    clear()
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = false;
      });
    }
  };

  /**
   * 发送开始帧
   * @param {WebSocket} ws
   */
  const sendStartParams = () => {
    const req = {
      header: {
        appkey: APPKEY,
        message_id: crypto.randomUUID().replace(/-/g, ""),
        task_id: task_id,
        namespace: "SpeechTranscriber",
        name: "StartTranscription",
      },
      payload: {
        enable_intermediate_result: true,
        enable_punctuation_prediction: true,
        disfluency: true,
        //enable_semantic_sentence_detection: true, 语义分句开关，打开后速度会比较慢
        vocabulary_id: "6851f419a17a44969752070669b227c2", // 后端热词表 todo:根据行业方向更换热词id
      },
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log("发送开始帧:" + body);
  };

  /**
   * 发送结束帧
   * @param {WebSocket} ws
   */
  const sendFinish = () => {
    const req = {
      header: {
        appkey: APPKEY,
        message_id: crypto.randomUUID().replace(/-/g, ""),
        task_id: task_id,
        namespace: "SpeechTranscriber",
        name: "StopTranscription",
      },
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log("发送语音结束帧");
  };

  // 建立连接
  const connectWebSocket = async () => {
    await getToken().then((fetchedToken) => {
      const uri = URI + "?token=" + fetchedToken;
      ws.current = new WebSocket(uri);
    });

    wsServer.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      sendStartParams();
      console.log("WebSocket开始连接");
    };

    ws.current.onmessage = (message) => {
      try {
        const res = JSON.parse(message.data);
        
        const { payload, header } = res;
        const { name, status, status_message } = header;
        const { result } = payload || {};
        if (name === "TranscriptionResultChanged" || name === "SentenceEnd") {
          if (status === 20000000) {
            store.setNextRequest(result);
            store.setRequest();
            if (!inputFocus) {
              setInputValue(store.request);
            }
          } else {
            throw Error(status_message);
          }
        }
        // debugger
        handleMessage(name, result);
      } catch (err) {
        console.error(err);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket关闭连接");
    };

    ws.current.onerror = (error) => {
      recorder.current.stop();
      console.log("error:", error);
    };

    wsServer.current.onopen = () => {
      console.log("Server WebSocket打开连接");
      const req = {
        type: 1,
        data: {
          company: store.formCompany,
          direction: store.formDirection,
          round: store.formRound,
        },
      };
      const body = JSON.stringify(req);
      wsServer.current.send(body);
      console.log("发送开始帧:" + body);
    };

    wsServer.current.onmessage = (msg) => {
      try {
        const result = JSON.parse(msg.data);
        const { type, data, id } = result;
        if (type === 0) {
          if (!data.startsWith("No")) {
            setReplyState(false);
            // 第一次拿到数据
            if (!store.id) {
              store.setId(id);
              console.log('第一次', messageList)
              messageList.push({ type: 1, message:store.conversations[store.conversations.length - 1]})
              messageList.push({ type: 2, message: data, id: id })

              store.setLastReply(data);
              setInputValue('');
            } else {
              if (id !== store.id) {
                console.log(1,'11')
                store.setReply();
                store.setId(id);
                setInputValue('');
              }
              store.setLastReply(data);
              const index = messageList.findIndex((item) => item.id === id);
             
              if(index == -1){
                messageList.push({ type: 1, message:store.conversations[store.conversations.length - 1]})
                messageList.push({ type: 2, message: data, id: id })
              }else{
                messageList[index].message += data
              }
            
            }
          } else {
            messageList.pop()
            message.warning("无效提问或问题长度低于8，请重新尝试～");
          }
        } else if (type === 99) {
          message.error(data);
        } else if (type === 9) {
          setReplyState(true);
        }
      } catch (error) {
        console.log(error,'eror')
        console.log("后端返回解析出错!");
      }
    };

    wsServer.current.onclose = () => {
      const req = {
        type: 3,
        data: {},
      };
      wsServer.current.send(JSON.stringify(req));
      console.log("发送结束帧：", JSON.stringify(req));
      console.log("Server WebSocket关闭连接");
    };

    wsServer.current.onerror = (error) => {
      console.log("error:", error);
    };
  };

  const handleMessage = async (type, result) => {
    console.log(111)
    if (type !== "SentenceEnd") {
      return;
    }
    console.log(222, result.length < MIN_WORDS,'22')
    // 文字不能太短
    if (result.length < MIN_WORDS) {
      return;
    }
    console.log(333,'22')
    store.addToConversation(result);

    // 只保留最近20条对话
    while (store.conversations.length > MAX_CONVERSATION_COUNT) {
      store.removeFromConversation();
    }
    console.log(444,'22')

    // 要发送的数据
    const req = {
      type: 2,
      data: {
        last_reply: store.lastReply,
        conversations: store.conversations,
      },
    };
    console.log(111)
    wsServer.current.send(JSON.stringify(req));

  };

  const [DrawerState, setDrawerState] = useState(true);

  const [ButtonState, setButtonState] = useState(true);

  const [AudioState, setAudioState] = useState(false);

  const [ReplyState, setReplyState] = useState(true);

  const [inputValue, setInputValue] = useState("");

  const [inputFocus, setInputFocus] = useState(false);

  const [count, setCount] = useState(0);

  const handleInput = (e) => {
    const {
      target: { value },
    } = e;
    setInputValue(value);
  };

  const handleDrawer = () => {
    setDrawerState(!DrawerState);
  };

  //开始，结束按钮状态切换
  const handleButton = (flag) => {
    setButtonState(flag);
  };

  //麦克风按钮是否激活状态
  const handleAudioState = (flag) => {
    setAudioState(flag);
  };



  const sendManually = () => {
    if (!inputValue) {
      message.warning("请输入问题");
      return;
    }
    const question = inputValue;
    const req = {
      type: 4,
      data: {
        conversations: store.conversations,
        question: question,
      },
    };
    
    wsServer.current.send(JSON.stringify(req));
    store.addToConversation(question);
    while (store.conversations.length > MAX_CONVERSATION_COUNT) {
      store.removeFromConversation();
    }
  };

  const prefix = (
    <div className="audio-display">
      {/* <TableOutlined
        className={`audio ${AudioState ? "audio-activated" : "audio-default"}`}
      /> */}
        <TableOutlined className="text-[22px] text-slate-500"/>
      {/* <img style={{ width: '15px' }} src={iconLeft} alt="" /> */}
    </div>
  );

  return (
    <Content className="interview-detail">
      <div className="interview-container">
        <div className="container">
          <div className="container-header">
            <div className="header-left">

              <div className="time">

                总计用时：{Math.floor(count / 3600).toString().padStart(2, "0")}:{Math.floor(count / 60).toString().padStart(2, "0")}:{(count % 60).toString().padStart(2, "0")}
              </div>

            </div>

            <div className="states">
              {ReplyState ? (
                <div className="state">

                  <span>等待面试官问题...</span>
                </div>
              ) : (
                <div className="state">

                  <span>生成中...</span>
                </div>
              )}
            </div>
            <div>
              {ButtonState ? (
                <button
                  className='login-input  bg-gradient-to-r from-[#ED4D65] to-[#5844CE] text-white font-bold text-[14px] px-[15px] py-[4px] rounded'
                  type="primary"
                  onClick={startRecording}
                >

                  <span >开始</span>
                </button>
              ) : (
                <button
                  className='login-input  bg-gradient-to-r from-[#ED4D65] to-[#5844CE] text-white font-bold text-[14px] px-[15px] py-[4px] rounded'
                  onClick={stopRecording}
                >

                  结束
                </button>
              )}
            </div>

          </div>
          <div className="container-body">
            <div
              className={`body-left ${DrawerState ? "body-compressed" : "body-fill"
                }`}
            >
              <div className="answer-block" id="scrollBlock">
                <div className="answer">
                  <div className="answer-header">
                    <div>
                      <Avatar
                        style={{ backgroundColor: "#87d068", marginRight: "5px" }}
                        icon={<UserOutlined />}
                      />
                    </div>
                    <div className="answer-content">
                      <div className="xzs">小助手</div>
                      <div className="text">
                        小助手会分析语音识别的内容，只回复面试官的提问
                      </div>
                    </div>

                  </div>

                </div>
                {messageList.map((item, key) => {
                  return (
                    <div key={key}>
                      {/* 面试官 */}
                      {
                        item.type == 1 && (
                          <div className="request">
                            <div className="request-header">
                              <div>
                                <img style={{ width: '35px', borderRadius: "50%", marginRight: '10px' }} src={store.formImg} alt="" />
                              </div>
                              <div className="request-content">
                                <div className="xzs">{store.formCompany}面试官</div>
                                <div className="text">
                                  {item.message}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }

                      {
                        item.type == 2 && <div className="answer" >

                          <div className="answer-header">
                            <div>
                              <Avatar
                                style={{
                                  backgroundColor: "#87d068",
                                  marginRight: "5px",
                                }}
                                icon={<UserOutlined />}
                              />
                            </div>
                            <div className="answer-content">
                              <div className="xzs">AI助答</div>
                              <div className="text">{item.message}</div>
                            </div>

                          </div>

                        </div>

                      }

                    </div>
                  );
                })}

                <div ref={autoScroll}></div>
              </div>
              <div
                onFocus={() => {
                  setInputFocus(true);
                }}
                onBlur={() => {
                  setInputFocus(false);
                }}
                className="question"
              >

                <div className="maybe-need-question">
                  {store.conversations.length > 0 && <p>可能需要回答的问题</p>}
                  <div className="question-history">
                    {store.conversations
                      .toSpliced(0, store.conversations.length - 3)
                      .map((item, key) => {
                        return (
                          <div
                            className="history-item line-clamp-1"
                            key={key}
                            onClick={(item) => {
                              setInputValue(item?.target?.innerText || "");
                            }}
                          >
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <Space.Compact className="question-input" size="large">
                  <Input
                    placeholder="输入需要回答的AI问题..."
                    prefix={prefix}
                    className="input"
                    value={inputValue}
                    onChange={handleInput}
                    classNames='text-[14px]'
                    onKeyDown={(e) => {
                      const { key } = e;
                      if (key === "Enter" && !ButtonState) {
                        sendManually();
                      }
                    }}
                  />
                  <Tooltip
                    placement="top"
                    title={ButtonState ? "请点击开始按钮" : "强制回答该问题"}
                  >
                    <Button

                      onClick={sendManually}
                      disabled={ButtonState}
                      type="default"
                      className='login-input'
                    >
                      <img style={{ width: "20px" }} src={iconSend} />
                    </Button>
                  </Tooltip>
                </Space.Compact>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Content>
  );
});

export default Interview;
