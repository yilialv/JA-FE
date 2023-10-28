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
  PauseOutlined,
  CaretRightOutlined,
  AudioOutlined,
  ClockCircleOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { useEffect, useRef, useState } from "react";
import store from "../../store";
import "./App.less";
import iconSend from "../../imgs/icon-send.svg";
import iconBag from "../../imgs/icon-bag.svg";
import iconCalendar from "../../imgs/icon-calendar.svg";
import iconWaiting from "../../imgs/icon-waiting.svg";

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
  const recorder = new RecorderManager("/recorder_manager");
  const frameSize = ((16000 * 2) / 1000) * 160; // 定义每帧大小
  const task_id = crypto.randomUUID().replace(/-/g, "");

  const ws = useRef(null); // 和百度的连接
  const wsServer = useRef(null); // 和后端的连接

  useEffect(() => {
    store.formCompany = localStorage.getItem("company");
    store.formDirection = localStorage.getItem("direction");
    store.formRound = localStorage.getItem("round");

    const scrollBlock = document.getElementById("scrollBlock");
    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;

    const interval = setInterval(() => {
      setCount((counts) => counts + 1);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * 发送开始帧
   * @param {WebSocket} ws
   */
  const sendStartParams = (direction) => {
    getHotWordID(direction)
      .then((hotwordID) => {
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
            enable_punctuation_prediction: true, // 是否在后处理中添加标点
            // disfluency: true, // 过滤语气词，即声音顺滑
            //enable_semantic_sentence_detection: true, // 语义分句开关，打开后速度会比较慢
            vocabulary_id: hotwordID, // 后端热词表 todo:根据行业方向更换热词id
          },
        };
        const body = JSON.stringify(req);
        ws.current.send(body);
        console.log("发送开始帧:" + body);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log("发送结束帧");
  };

  // 开始录音
  const startRecording = () => {
    connectWebSocket();
    recorder.start({
      sampleRate: 16000,
      frameSize: frameSize,
    });
    handleButton(false);
    handleAudioState(true);
  };

  // 停止录音
  const stopRecording = () => {
    recorder.stop();
    ws.current?.close();
    wsServer.current?.close();
    handleButton(true);
    handleAudioState(false);
    window.history.back();
  };

  recorder.onStart = () => {
    // console.log("recorder.onStart")
  };

  recorder.onStop = function () {
    sendFinish();
    console.log("录音结束");
  };

  // 接收音频数据帧
  recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    if (ws.current.readyState === ws.current.OPEN) {
      ws.current.send(new Int8Array(frameBuffer));
      if (isLastFrame) {
        console.log("接收最后一个音频帧");
      }
    }
  };

  // 建立连接
  const connectWebSocket = async () => {
    await getToken().then((fetchedToken) => {
      const uri = URI + "?token=" + fetchedToken;
      ws.current = new WebSocket(uri);
    });

    wsServer.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      sendStartParams(convertDirection(localStorage.getItem("direction")));
      console.log("WebSocket开始连接");
    };

    ws.current.onmessage = (message) => {
      try {
        const res = JSON.parse(message.data);
        const { payload, header } = res;
        const { name, status, status_message } = header;
        const { result } = payload;
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
        handleMessage(name, result);
      } catch (err) {
        console.error(err);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket关闭连接");
    };

    ws.current.onerror = (error) => {
      recorder.stop();
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
        console.log(type, data);
        if (type === 0) {
          if (!data.startsWith("No")) {
            setReplyState(false);
            // 第一次拿到数据
            if (!store.id) {
              store.setId(id);
              store.setLastReply(data);
              setInputValue("");
            } else {
              if (id !== store.id) {
                store.setReply();
                store.setId(id);
                setInputValue("");
              }
              store.setLastReply(data);
            }
          } else {
            message.warning("无效提问或问题长度低于8，请重新尝试～");
          }
        } else if (type === 99) {
          message.error(data);
        } else if (type === 9) {
          setReplyState(true);
        }
      } catch (error) {
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
    if (type !== "SentenceEnd") {
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
      type: 2,
      data: {
        last_reply: store.lastReply,
        conversations: store.conversations,
      },
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

  const convertDirection = (directionName) => {
    switch (directionName) {
      case "前端开发":
        return "fe";
      case "后端开发":
        return "rd";
      case "产品经理":
        return "pm";
      case "测试开发":
        return "qa";
      case "UI":
        return "UI";
      default:
        return "rd";
    }
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
      <AudioOutlined
        className={`audio ${AudioState ? "audio-activated" : "audio-default"}`}
      />
    </div>
  );

  return (
    <Content className="interview-detail">
      <div className="container">
        <div className="container-header">
          <div className="header-left">
            <div className="return">
              <LeftOutlined
                onClick={() => {
                  window.history.back();
                }}
              />
            </div>
            <div className="time">
              <ClockCircleOutlined
                style={{ color: "#3F9D13", fontSize: "20px" }}
              />
              &nbsp;{count}min
            </div>
            <div className="states">
              {ReplyState ? (
                <div className="state">
                  <img src={iconWaiting} />
                  <span>等待面试官问题</span>
                </div>
              ) : (
                <div className="state">
                  <Spin />
                  <span>生成中</span>
                </div>
              )}
            </div>
          </div>
          {ButtonState ? (
            <Button
              className="header-button"
              type="primary"
              onClick={startRecording}
            >
              <CaretRightOutlined />
              <span>开始</span>
            </Button>
          ) : (
            <Button
              danger
              className="header-button"
              type="primary"
              onClick={stopRecording}
            >
              <PauseOutlined />
              结束
            </Button>
          )}
        </div>
        <div className="container-body">
          <div
            className={`body-left ${
              DrawerState ? "body-compressed" : "body-fill"
            }`}
          >
            <div className="answer-block" id="scrollBlock">
              <div className="answer">
                <div className="answer-header">
                  <Avatar
                    style={{ backgroundColor: "#87d068", marginRight: "5px" }}
                    icon={<UserOutlined />}
                  />
                  <div>小助手</div>
                </div>
                <div className="text">
                  小助手会分析语音识别的内容，只回复面试官的提问
                </div>
              </div>
              {store.reply.map((item, key) => {
                return (
                  <div className="answer" key={key}>
                    <div className="answer-header">
                      <Avatar
                        style={{
                          backgroundColor: "#87d068",
                          marginRight: "5px",
                        }}
                        icon={<UserOutlined />}
                      />
                      <div>小助手</div>
                    </div>
                    <div className="text">{item}</div>
                  </div>
                );
              })}
              {!!store.lastReply && (
                <div className="answer animation">
                  <div className="answer-header">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                        marginRight: "5px",
                      }}
                      icon={<UserOutlined />}
                    />
                    <div>小助手</div>
                  </div>
                  <div className="text">{store.lastReply}</div>
                </div>
              )}
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
              <div className="question-history">
                {store.conversations
                  .toSpliced(0, store.conversations.length - 3)
                  .map((item, key) => {
                    return (
                      <div
                        className="history-item"
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
              <Space.Compact className="question-input" size="large">
                <Input
                  placeholder="input"
                  prefix={prefix}
                  className="input"
                  value={inputValue}
                  onChange={handleInput}
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
                    className="send-button"
                    onClick={sendManually}
                    disabled={ButtonState}
                    type="default"
                  >
                    <img src={iconSend} />
                  </Button>
                </Tooltip>
              </Space.Compact>
            </div>
          </div>
          <div
            className={`drawer-button ${
              DrawerState ? "drawer-button-opening" : "drawer-button-closed"
            }`}
            onClick={handleDrawer}
          >
            {DrawerState ? <RightOutlined /> : <LeftOutlined />}
          </div>
          <div
            className={`drawer ${
              DrawerState ? "drawer-opening" : "drawer-closed"
            }`}
          >
            <div className="drawer-info">
              <Avatar
                icon={<UserOutlined />}
                size={96}
                className="drawer-avatar"
              ></Avatar>
              <div className="drawer-name">
                <div>{store.formCompany}</div>
                <div>@{store.formDirection}</div>
              </div>
              <div className="drawer-state">
                <div className="state-item">
                  <img src={iconBag} />
                  辅助面试
                </div>
                <div className="state-item">
                  <img src={iconCalendar} />
                  {store.formRound}面
                </div>
              </div>
              <div className="drawer-check">
                <Checkbox>基于个人信息辅助</Checkbox>
                <QuestionCircleOutlined className="help" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
});

export default Interview;
