import GradientBackground from "../../background/gradientBackground";
import IconCongratulation from '../../imgs/icon-congratulation.svg';
import './mockInterview.less';
import ClickButton from "../../components/ClickButton";
import TestIcon from "../../imgs/cm-12.jpeg";
import { Link, useLocation } from 'react-router-dom';
import { getTimestampToDate } from '../../utils';

const MockInterviewResult = () => {
  const params = useLocation();
  const { state: { company, time, style, exp, direction, logo, round } } = params;

  const date = getTimestampToDate(new Date() / 1000);

  return (
    <div className="mock-interview-result">
      <GradientBackground />
      <div className="result-window">
        <img className="icon" src={IconCongratulation} />
        <div className="result-title">
          恭喜！你完成了模拟面试
          <div className="result-tips">
            本次面试记录已保存在个人主页，请前往个人页面-面试记录中查看模拟面试题目和您的回答
          </div>
        </div>
        <div className="result-info">
          <div className="icon-frame">
            <img src={logo} className="info-icon" />
          </div>
          <div className="info-interview">
            <div className="company">
              {company}
            </div>
            <div className="tabs">
              <div className="info-tab" style={{ backgroundColor: 'rgba(88, 68, 206, 1)' }}>
                {direction}
              </div>
              <div className="info-tab" style={{ backgroundColor: '#EE6F84' }}>
                {round}
              </div>
            </div>
          </div>
          <div className="info-config">
            <div className="info-time">
              面试时长：
              {Math.floor(time / 3600)
                .toString()
                .padStart(2, "0")}
              :
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
            </div>
            <div className="">
              面试风格：{style}
            </div>
            <div>
              真题数目：{exp}道
            </div>
          </div>
        </div>
        <div className="result-footer">
          <div className="footer-button">
            <Link to='/mockInterviewHall'>
              <ClickButton reverse>
                返回面试大厅
              </ClickButton>
            </Link>
            <ClickButton>
              查看面试总结
            </ClickButton>
          </div>
          <div>
            <div className="footer-info">
              <div className="info-text">
                <div>一起冲鸭</div>
                <div>&emsp;</div>
                <div>完成于{date}</div>
              </div>
              <div className="icon-frame">
                <img src={TestIcon} className="info-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default MockInterviewResult;