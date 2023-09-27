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
import { useEffect, useState } from "react";

const MockInterview = observer(() => {

  useEffect(() => {

    const scrollBlock = document.getElementById("scrollBlock");
    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;

  }, []);

  const handleInput = (e) => {
    const { target: { value } } = e;
    setInputValue(value);
  };

  const [DrawerState, setDrawerState] = useState(true);

  const [inputValue, setInputValue] = useState('');

  const [settingPersonalise, setSettingPersonalise] = useState(false);

  const [settingEvaluation, setSettingEvaluation] = useState(true);

  const [settingFollowing, setSettingFollowing] = useState(true);

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
            <div className="states">
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
                  <p>筛选
                  </p>
                  <Select
                    className="setting-select"
                    defaultValue="全部"
                    options={[
                      { value: 'all', label: '全部' },
                      { value: 'answer', label: '只显示回答' },
                      { value: 'question', label: '只显示问题' }
                    ]}
                    onChange={() => { }}
                  />
                </div>
              </div>
              <div className="drawer-check">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MockInterview;
