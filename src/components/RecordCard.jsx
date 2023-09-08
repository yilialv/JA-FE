import { Card, Avatar } from "antd"
import aliyunUrl from '../imgs/aliyun.jpg'
import "./components.less"

const { Meta } = Card;



const RecordCard = () => {
  // TODO 统一接口格式，替换静态数据
  // const {category, company, department, direction, interview_time } = item;

  return (
    <Card
      className="record-card"
      hoverable
      cover={<img alt="aliyun" src={aliyunUrl} />}
    >
      <Meta title="阿里云2024面试" />
      <div className='interview-info'>
        <div className='info'>Golang开发</div>
        <div className='info'>2h10min</div>
      </div>
      <Meta
        description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
      />
      <div className='interview-footer'>
        <div className='interview-footer-user'>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          <div>userName</div>
        </div>
        <div className='interview-footer-star'>★25</div>
      </div>
    </Card>
  )
};

export default RecordCard;