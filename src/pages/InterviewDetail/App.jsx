import {
  Layout,
  Avatar,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import store from "../../store";
import iconBag from "../../imgs/icon-bag.svg";
import iconCalendar from "../../imgs/icon-calendar.svg";
import { getInterviewDetail } from "../../router";

const { Content } = Layout;

const InterviewDetail = observer(() => {
  useEffect(() => {
    const scrollBlock = document.getElementById("scrollBlock");
    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;

    getInterviewDetail({'record_id': 134})
  }, []);

  const [DrawerState, setDrawerState] = useState(true);

  const handleDrawer = () => {
    setDrawerState(!DrawerState);
  };

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
          </div>
        </div>
        <div className="container-body">
          <div
            className={`body-left ${DrawerState ? "body-compressed" : "body-fill"}`}
          >
            <div className="answer-block" id="scrollBlock">
              {store.interviewDetails.map((item, key) => {
                const { content, create_time, type } = item;
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
                    <div className="text">{content}</div>
                  </div>
                );
              })}
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
                  三面
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

export default InterviewDetail;
