import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import { useEffect } from "react";
import { useRef, useState } from "react";
import GradientBackground from "../../background/gradientBackground";
import CheckBox from "../../components/CheckBox";
import CompanyList from '../../components/CompanyList';
import SwitchButton from "../../components/SwitchButton";
import './mockinterview.less';

const MockInterviewConfig = () => {

  const formCompany = useRef('');
  const formDirection = useRef('');
  const formStyle = useRef('');
  const formPersonalise = useRef(true);
  const formFollow = useRef(true);
  const formEvaluation = useRef(true);
  const formLimit = useRef(2);

  const recordsContainerRef = useRef(null);
  const [scrollBox, setScrollBox] = useState(0);

  const formList = [
    {
      title: '岗位选择',
      value: (
        <>
          <div className="form-item">
            公司
            <CompanyList className="select"
              onChange={(value) => {
                formCompany.current = value;
              }} />
          </div>
          <div className="form-item">
            岗位
            <CompanyList className="select"
              onChange={(value) => {
                formDirection.current = value;
              }} />
          </div>
        </>
      )
    },
    {
      title: '面试详情设置',
      value: (
        <>
          <div className="form-item">
            面试风格
            <CheckBox option1='严肃' option2='轻松'
              updateState={(value) => {
                formStyle.current = value ? '严肃' : '轻松';
              }}
            />
          </div>
          <div className="form-item">
            是否追问
            <CheckBox option1='是' option2='否'
              updateState={(value) => {
                formFollow.current = value;
              }}
            />
          </div>
          <div className="form-item">
            是否提问个人项目
            <CheckBox option1='是' option2='否'
              updateState={(value) => {
                formPersonalise.current = value;
              }}
            />
          </div>
        </>
      )
    },
    {
      title: '面试模式选择',
      value: (
        <>
          <div className="form-item tips">
            时间容忍度指问题提出后留给面试者的思考时间
          </div>
          <div className="form-item">
            时间容忍度
            <div className="form-input">
              <div className="input">
                <input type='number' placeholder="2" onChange={(value) => { formLimit.current = value; }} />
              </div>
              min
            </div>
          </div>
          <div className="form-item">
            回答评价
            <SwitchButton option1='开' option2='关'
              updateState={(value) => {
                formEvaluation.current = value;
              }}
            />
          </div>
        </>
      )
    }
  ];

  const optionList = formList.map((item) => {
    const { title, value } = item;
    return (
      <div className='card-form' key={title}>
        <div className="form-title">
          {title}
        </div>
        <div className="form-body">
          {value}
        </div>
      </div>
    );
  });

  const CONFIG_MAX = formList.length;

  const [configIndex, setConfigIndex] = useState(0);

  const handleConfigIndex = (val) => {
    if (configIndex === 0 && val === -1) {
      return;
    }
    else if (configIndex === CONFIG_MAX - 1 && val === 1) {
      return;
    }
    let temp = configIndex + val;
    setConfigIndex(temp);
  };

  useEffect(() => {
    const { current: { offsetWidth } } = recordsContainerRef;
    setScrollBox(-1 * offsetWidth * (configIndex));
  }, [configIndex]);

  return (
    <div className="mock-interview-config">
      <GradientBackground />
      <div className="mock-interview-card">
        <div className="card-title">模拟面试</div>
        <div className="card-body">
          <div className="card-button" onClick={() => { handleConfigIndex(-1); }}>
            <LeftOutlined />
          </div>
          <div className="card-mid" ref={recordsContainerRef}>
            <div className="card-scroll" style={{ left: scrollBox + 'px' }}>
              {optionList}
            </div>
          </div>
          <div className="card-button" onClick={() => { handleConfigIndex(1); }}>
            <RightOutlined />
          </div>
        </div>
        <div className="card-bottom">
          {
            configIndex === 2
              ?
              <div className="start-button">开始模拟面试</div>
              :
              <Steps progressDot current={configIndex} items={[{ title: '' }, { title: '' }, { title: '' }]} />
          }
        </div>
      </div>
    </div>
  );
};

export default MockInterviewConfig;