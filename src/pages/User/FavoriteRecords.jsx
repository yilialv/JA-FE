import { Content } from "antd/es/layout/layout";
import RecordCard from "../../components/RecordCard";
import "./App.less";


const MineRecords = () => {
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
        {list.map((item, key) => { 
          data.type = 'favorite';
          return (
            <RecordCard key={key} data={data}/>
          );
        })}
      </div>
    </Content>
  );
};
export default MineRecords;