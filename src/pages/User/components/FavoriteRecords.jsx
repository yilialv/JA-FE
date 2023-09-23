import { Content } from "antd/es/layout/layout";
import RecordCard from "../../../components/RecordCard";
import "./components.less";


const MineRecords = () => {
  const list = ['1','2','3','4','5'];
  const data = {
    company: '阿里巴巴',
    direction: '后端',
    category: 2,
    stared: true,
    starNumber: 25,
  };
  const navigate = useNavigate();

  return (
    <Content className="records-container">
      {
        list.length ?
          <div className="records">
            {list.map((item, key) => { 
              item.type = 'favorite';
              return (
                <RecordCard key={key} data={item}/>
              );
            })}
          </div>
          :
          <div className="empty">
            <InfoCircleOutlined />
            <div>暂无数据</div>
            <div>快去模拟面试大厅看看吧</div>
            <Button type="primary"
              onClick={()=>navigate('/mockInterviewHall')}
            >模拟面试大厅 &#10132;</Button>
          </div>
      }
    </Content>
  );
};
export default MineRecords;