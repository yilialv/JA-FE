import {
  Button,
  Spin,
  Input,
  Avatar,
  Checkbox,
  Space,
  Select,
  Divider,
} from "antd";
import {
  UserOutlined,
  PauseOutlined,
  CaretRightOutlined,
  ClockCircleOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import store from "../../store";
import iconSend from "../../imgs/icon-send.svg";
import iconBag from "../../imgs/icon-bag.svg";
import iconCalendar from "../../imgs/icon-calendar.svg";
import iconWaiting from "../../imgs/icon-waiting.svg";
import '../Interview/App.less';
import { useState } from "react";

const MockInterview = () => {

  const [DrawerState, setDrawerState] = useState(true);

  const [AudioState, setAudioState] = useState(false);

  const [ReplyState, setReplyState] = useState(true);

  const [inputValue, setInputValue] = useState('');

  const [inputFocus, setInputFocus] = useState(false);

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
              <div className="answer">
                <div className="answer-header">
                  <Avatar
                    style={{ backgroundColor: "#87d068", marginRight: "5px" }}
                    icon={<UserOutlined />}
                  />
                  <div>李老师</div>
                </div>
                <div className="text">
                  模拟面试提问1
                </div>
              </div>
              <div className="answer">
                <div className="answer-header">
                  <Avatar
                    style={{ backgroundColor: "#87d068", marginRight: "5px" }}
                    icon={<UserOutlined />}
                  />
                  <div>李老师</div>
                </div>
                <div className="text">
                  模拟面试回答<br />模拟面试回答
                </div>
                <div className="answer-divider"></div>
                <div className="answer-comment">
                  <div>
                    回答评价
                  </div>
                  <div className="comment-content">
                    评价内容
                  </div>
                </div>
              </div>
              {/* {store.reply.map((item, key) => {
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
              })} */}
              {/* {!!store.lastReply && (
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
              )} */}
            </div>
            <div className="question">
              <Space.Compact
                className="question-input" size="large">
                <Input
                  placeholder="input"
                  //prefix={prefix}
                  className="input"
                  value={inputValue}
                />
                <Button className="send-button" type="default">
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
                  <Select className="setting-select" />
                </div>
                <div className="setting-item">
                  <p>时间容忍度
                    <QuestionCircleOutlined className="help" />
                  </p>
                  <Select className="setting-select" />
                </div>
              </div>
              <div className="drawer-check">
                <div className="check-item">
                  <Checkbox>提问个人项目</Checkbox>
                  <QuestionCircleOutlined className="help" />
                </div>
                <div className="check-item">
                  <Checkbox>开启回答评价</Checkbox>
                  <QuestionCircleOutlined className="help" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
