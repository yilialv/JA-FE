import {
  MOCK_SERVER_URL,
} from "../../constant";

import {
  Button,
  Spin,
  Input,
  Avatar,
  Checkbox,
  Space,
  Select,
  message,
} from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import store from "../../store";
import { observer } from "mobx-react";
import iconSend from "../../imgs/icon-send.svg";
import iconWaiting from "../../imgs/icon-waiting.svg";
import '../Interview/App.less';
import { useEffect, useRef, useState } from "react";

const MockInterview = observer(() => {
  const wsServer = useRef(null); // 和后端的连接

  useEffect(() => {

    connectWebSocket();

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



  const connectWebSocket = async () => {
    wsServer.current = new WebSocket(MOCK_SERVER_URL);

    wsServer.current.onopen = () => {
      console.log("Server WebSocket打开连接");
      const req = {
        type: 1,
        data: {
          experience_id: 112
        },
      };
      const body = JSON.stringify(req);
      wsServer.current.send(body);
      console.log("发送开始帧:" + body);
      requestQuestion();
    };

    wsServer.current.onmessage = (msg) => {
      try {
        const result = JSON.parse(msg.data);
        const { type, data, id } = result;
        console.log(type, data);
        if (type === 1) {
          setReplyState(false);
          // 第一次拿到数据
          if (!store.mockID) {
            store.setMockNewReply(id, type);
            setInputValue('');
          } else if (id !== store.mockID) {
            store.setMockReplies();
            store.setMockNewReply(id, type);
            setInputValue('');
          }
          store.appendMockLastContent(data);
        }
        else if (type === 2) {
          if (id !== store.mockID) {
            store.setMockReplies();
            store.setMockNewReply(id, 2);
            store.setMockAnswer();
            setInputValue('');
          }
          store.appendMockLastEvaluation(data);
        }
        else if (type === 99) {
          message.error(data);
        } else if (type === 9) {
          setReplyState(true);
          if (store.mockLastType === 2) {
            requestQuestion();
          }
        }
      } catch (error) {
        console.log("后端返回解析出错!");
      }
    };

    wsServer.current.onclose = () => {
      const req = {
        type: 9,
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

  const requestQuestion = () => {
    const req = {
      type: 2,
      data: {
        interactions: store.mockConversations,
        style: settingStyle, //风格-严肃/活泼（用户可以在中途更换风格或时间容忍度）
        toleration: settingTempo, // 时间容忍度-高-中-低 
        personalise: settingPersonalise //是否开启个性化提问
      }
    };
    wsServer.current.send(JSON.stringify(req));
  };

  const sendAnswer = () => {
    if (!inputValue) {
      message.warning("请输入回答");
      return;
    }
    const answer = inputValue;
    const req = {
      type: 3,
      data: {
        interactions: store.mockConversations,
        answer: answer,
        question_id: store.mockID,
        evaluation: settingEvaluation
      },
    };
    store.mockInputCache = answer;
    wsServer.current.send(JSON.stringify(req));
  };

  const handleInput = (e) => {
    const { target: { value } } = e;
    setInputValue(value);
  };

  const [DrawerState, setDrawerState] = useState(true);

  const [ReplyState, setReplyState] = useState(true);

  const [inputValue, setInputValue] = useState('');

  const [settingPersonalise, setSettingPersonalise] = useState(false);

  const [settingEvaluation, setSettingEvaluation] = useState(true);

  const [settingStyle, setInterviewStyle] = useState('');

  const [settingTempo, setInterviewTempo] = useState('');

  const [count, setCount] = useState(0);

  const handleDrawer = () => {
    setDrawerState(!DrawerState);
  };

  return (
    <div className="interview-detail">
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
                  <span>等待面试者回答</span>
                </div>
              ) : (
                <div className="state">
                  <Spin />
                  <span>生成中</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container-body">
          <div
            className={`body-left ${DrawerState ? "body-compressed" : "body-fill"}`}
          >
            <div className="answer-block" id="scrollBlock">
              {store.mockReplies.map((item, key) => {
                const { content, evaluation } = item;
                return (
                  <div className="answer" key={key}>
                    <div className="answer-header">
                      <Avatar
                        style={{ backgroundColor: "#87d068", marginRight: "5px" }}
                        icon={<UserOutlined />}
                      />
                      <div>{'replies'}</div>
                    </div>
                    <div className="text">
                      {content}
                    </div>
                    {!!evaluation && (
                      <>
                        <div className="answer-divider"></div>
                        <div className="answer-comment">
                          {evaluation}
                        </div>
                      </>
                    )
                    }
                  </div>
                );
              })}
              {!!store.mockLastContent && (
                <div className="answer animation">
                  <div className="answer-header">
                    <Avatar
                      style={{
                        backgroundColor: "#87d068",
                        marginRight: "5px"
                      }}
                      icon={<UserOutlined />}
                    />
                    <div>{'用户名'}</div>
                  </div>
                  <div className="text">
                    {store.mockLastContent}
                  </div>
                  {!!store.mockLastEvaluation && (
                    <>
                      <div className="answer-divider"></div>
                      <div className="answer-comment">
                        {store.mockLastEvaluation}
                      </div>
                    </>
                  )
                  }
                </div>
              )}
            </div>
            <div className="question">
              <Space.Compact
                className="question-input" size="large">
                <Input
                  placeholder="input"
                  className="input"
                  value={inputValue}
                  onChange={handleInput}
                />
                <Button className="send-button" type="default" onClick={sendAnswer}>
                  <img src={iconSend} />
                </Button>
              </Space.Compact>
            </div>
          </div>
          <div
            className={`drawer-button ${DrawerState ? "drawer-button-opening" : "drawer-button-closed"}`}
            onClick={handleDrawer}
          >
            {DrawerState ? <RightOutlined /> : <LeftOutlined />}
          </div>
          <div
            className={`drawer ${DrawerState ? "drawer-opening" : "drawer-closed"}`}
          >
            <div className="drawer-info">
              <Avatar
                icon={<UserOutlined />}
                size={96}
                className='drawer-avatar'
              >
              </Avatar>
              <div className='drawer-name'>
                <div>百度</div>
                <div>@前端开发</div>
              </div>
              <div className="drawer-setting">
                <div className="setting-item">
                  <p>面试风格
                    <QuestionCircleOutlined className="help" />
                  </p>
                  <Select
                    className="setting-select"
                    defaultValue="活泼"
                    options={[
                      { value: '活泼', label: '活泼' },
                      { value: '严肃', label: '严肃' }
                    ]}
                    onChange={(value) => { setInterviewStyle(value); }}
                  />
                </div>
                <div className="setting-item">
                  <p>时间容忍度
                    <QuestionCircleOutlined className="help" />
                  </p>
                  <Select
                    className="setting-select"
                    defaultValue="高"
                    options={[
                      { value: '高', label: '高' },
                      { value: '中', label: '中' },
                      { value: '低', label: '低' }
                    ]}
                    onChange={(value) => { setInterviewTempo(value); }}
                  />
                </div>
              </div>
              <div className="drawer-check">
                <div className="check-item">
                  <Checkbox
                    checked={settingPersonalise}
                    onChange={() => { setSettingPersonalise(!settingPersonalise); }}
                  >
                    提问个人项目
                  </Checkbox>
                  <QuestionCircleOutlined className="help" />
                </div>
                <div className="check-item">
                  <Checkbox
                    checked={settingEvaluation}
                    onChange={() => { setSettingEvaluation(!settingEvaluation); }}
                  >
                    开启回答评价
                  </Checkbox>
                  <QuestionCircleOutlined className="help" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MockInterview;
