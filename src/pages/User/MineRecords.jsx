import { Content } from "antd/es/layout/layout";
import { Card } from "antd";
import RecordCard from "../../components/RecordCard";
import "./App.less"


const MineRecords = () => {
  const list = ['1','2','3','4','5']
  return (
    <Content className="records-container">
      <div className="records">
        <Card className="record-card dashed"></Card>
        {list.map((item, key) => { 
          return (
            <RecordCard key={key}/>
          )
        })}
      </div>
    </Content>
  )
}
export default MineRecords;