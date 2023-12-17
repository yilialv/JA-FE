import { CaretDownOutlined, CaretUpOutlined, HomeOutlined } from "@ant-design/icons";
import GradientBackground from "../../background/gradientBackground";
import iconEvaluation from "../../imgs/icon-evaluation.svg";
import ClickButton from '../../components/ClickButton';
import iconEmoji1 from "../../imgs/icon-emoji1.svg";
import iconEmoji2 from "../../imgs/icon-emoji2.svg";
import TestIcon from '../../imgs/cm-12.jpeg';
import { useState } from "react";
const MockInterviewDetail = () => {

  const [showEvaluation, setShowEvaluation] = useState(false);

  return (
    <div className="mock-interview-detail">
      <GradientBackground />
      <div className="container">
        <div className="container-body">
          <div className="body-left">
            <div className="container-body-header">
              <div className="header-title">
                <HomeOutlined className="menu-item" />
                我的面试总结
              </div>
            </div>
            <div className="container-body-contents-detail">
              <div className="conclusion">
                <div className="conclusion-header">
                  <div className="header-up">
                    <div>
                      <img src={iconEmoji1} />
                      <div className="header-msg">
                        <h1>太棒啦！</h1>
                        <p>你的面试表现超过80%的面友！</p>
                      </div>
                    </div>
                    <div>
                      <div className="header-userinfo">
                        <div className="footer-info">
                          <div className="info-text">
                            <div>一起冲鸭</div>
                          </div>
                          <div className="icon-frame" style={{ width: '64px', height: '64px' }}>
                            <img src={TestIcon} className="info-icon" />
                          </div>
                        </div>
                        <div className="time">
                          总用时：00:15:00
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-down">
                    <div className="info-item" style={{ borderLeft: 0 }}>
                      <p>公司</p>
                      <p>腾讯</p>
                    </div>
                    <div className="info-item">
                      <p>岗位</p>
                      <p>产品研发岗</p>
                    </div>
                    <div className="info-item">
                      <p>风格</p>
                      <p>严肃</p>
                    </div>
                    <div className="info-item">
                      <p>总问题</p>
                      <p>8</p>
                    </div>
                    <div className="info-item">
                      <p>个人项目</p>
                      <p>2</p>
                    </div>
                    <div className="info-item">
                      <p>追问</p>
                      <p>1</p>
                    </div>
                  </div>
                </div>
                {
                  showEvaluation
                    ?
                    <div className="conclusion-body">
                      <div className="evaluation-title">
                        <img src={iconEvaluation} />
                        <span>智能评价</span>
                      </div>
                      <div className="evaluation-text">
                      </div>
                    </div>
                    :
                    <></>
                }
                <div className="conclusion-footer">
                  <ClickButton reverse onClick={() => { setShowEvaluation(!showEvaluation); }}>
                    {showEvaluation
                      ?
                      <>收起 < CaretUpOutlined /></>
                      :
                      <>总评 < CaretDownOutlined /></>
                    }
                  </ClickButton>
                </div>
              </div>
              <div className="question-list">
                <div className="question-item-background">
                  <div className="question-item">
                    <div className="question-title">
                      <span>真题</span>
                      <span>产品经理在调研时需要注意哪些问题？</span>
                    </div>
                    <div className="question-body">
                      <div>
                        我是回答
                      </div>
                      <ClickButton reverse className='question-button'>
                        详情<CaretDownOutlined />
                      </ClickButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default MockInterviewDetail;