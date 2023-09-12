import { useNavigate } from 'react-router-dom';
import { Content } from "antd/es/layout/layout";
import { Button, Card } from "antd";
import RecordCard from "../../../components/RecordCard";
import "./components.less";


const MineRecords = () => {
  const navigate = useNavigate();
  const list = ['1','2','3','4','5'];
  const data = {
    company: '阿里巴巴',
    direction: '后端',
    category: 2,
    stared: true,
    starNumber: 25,
  };
  return (
    <Content className="records-container">
      <div className="records">
        <Card className="record-card dash-card">
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="22" viewBox="0 0 44 22" fill="none">
              <path d="M22 0L44 22H22H0L22 0Z" fill="#3F9D13" fillOpacity="0.6"/>
            </svg>
          </div>
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="23" viewBox="0 0 45 23" fill="none">
              <path d="M22.3494 0.5L44.3494 22.5H0.349365L22.3494 0.5Z" fill="#3F9D13"/>
            </svg>
          </div>
          <div className="dash-card-title">上传面经</div>
          <div className="dash-card-text">可用于模拟面试，发布到面试官大厅，收获点赞和面试时长</div>
          <Button 
            className="dash-card-btn"
            type="primary"
            size="large"
            onClick={()=>navigate('/experience/upload')}
          >
            上传
          </Button>
        </Card>
        {list.map((item, key) => { 
          data.type = 'mine';
          return (
            <RecordCard key={key} data={data}/>
          );
        })}
      </div>
    </Content>
  );
};
export default MineRecords;