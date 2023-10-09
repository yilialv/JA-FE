import {
  Layout,
  Avatar,
  Checkbox,
  message,
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
import iconBag from "../../imgs/icon-bag.svg";
import iconCalendar from "../../imgs/icon-calendar.svg";
import { getInterviewDetail } from "../../router";
import { useParams } from 'react-router-dom';
import { timestampToTime } from '../../utils'

const { Content } = Layout;

const InterviewDetail = observer(() => {
  const { id } = useParams();

  const [company, setCompany] = useState('');
  const [direction, setDirection] = useState('');
  const [duration, setDuration] = useState(0);
  const [evaluation, setEvaluation] = useState('');
  const [round, setRound] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const scrollBlock = document.getElementById("scrollBlock");
    // 将内容自动滚动到底部
    scrollBlock.scrollTop = scrollBlock.scrollHeight;

    getInterviewDetail({'record_id': Number(id)}).then((data) => {
      const { company, direction, duration, evaluation, round, start_time, records } = data;
      setCompany(company);
      setDirection(direction);
      setDuration(duration);
      setEvaluation(evaluation);
      setRound(round);
      setStartTime(start_time);
      setRecords(records)
    }).catch((err) => {
      message.error(err);
      console.error(err);
    });
  }, [id]);

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
              <span className='duration'>{ duration }分钟</span>
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
                    style={{
                      backgroundColor: "#87d068",
                      marginRight: "5px",
                    }}
                    icon={<UserOutlined />}
                  />
                  <div>面试表现评价</div>
                </div>
                <div className="text">{evaluation}</div>
              </div>
              {records.map((item, key) => {
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
                      {type === 0 && <div>语音识别内容  {timestampToTime(create_time)}</div>}
                      {type === 1 && <div>小助手回答  {timestampToTime(create_time)}</div>}
                      {type === 2 && <div>面试官提问  {timestampToTime(create_time)}</div>}
                      {type === 3 && <div>强制提问  {timestampToTime(create_time)}</div>}
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
                <div>{company}</div>
                <div>@{direction}</div>
              </div>
              <div className="drawer-state">
                <div className="state-item">
                  <img src={iconBag} />
                  辅助面试详情
                </div>
                <div className="state-item">
                  <img src={iconCalendar} />
                  { round }面
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
