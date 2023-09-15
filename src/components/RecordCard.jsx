import { Card, Avatar, Tag, Button } from "antd";
import { DeleteOutlined} from "@ant-design/icons";
import aliyunUrl from '../imgs/aliyun.jpg';
import "./components.less";
import bookmarkUser from '../imgs/bookmark-user.png';
import bookmarkCopilot from '../imgs/bookmark.png';


const { Meta } = Card;

const CategoryTag = (round) => {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const tagColor = ['#3F9D13', '#3F9D13', '#60C9F4', '#F3661D'];
  return (
    <Tag 
      color={(round < tagColor.length) ? tagColor[round] : '#F00'}
    >
      {chineseNumbers[round]}面
    </Tag>
  );
};

const RecordCard = (e) => {
  // TODO 统一接口格式，替换静态数据
  // const {category, company, department, direction, interview_time } = item;
  // type用于区分卡片展示内容: home/mine/favorite
  const data = e.data;
  const type = data.type;
  const {company,date,category,direction,starNumber} = data;

  return (
    <Card
      className="record-card"
      hoverable
      cover={<img alt="aliyun" src={aliyunUrl} />}
    >
      <img className="bookmark" src={bookmarkCopilot}/>
      <div className="interview-title">
        <span className="title-text">{company}</span>
        {category ? CategoryTag(category) : <></>}
        {type === "mine" ?
          <DeleteOutlined style={{color: 'red'}}/>
          : <></>}
      </div>
      <div className='interview-info'>
        <div className='info'>{direction}</div>
        <div className='info'>{date}</div>
      </div>
      <Meta
        description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
      />
      {type === "mine" ? 
        <div className="interview-footer">
          <Button className="edit-btn">编辑</Button>
          <Button className="mock-btn" type="primary">模拟面试 &#10132;</Button>
        </div>
        :
        <div className='interview-footer'>
          <div className='interview-footer-star'>
            { type === "favorite" ?
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
                <path d="M13.1433 0L16.246 9.54915H26.2866L18.1636 15.4508L21.2663 25L13.1433 19.0983L5.02029 25L8.12299 15.4508L0 9.54915H10.0406L13.1433 0Z" fill="#FFDD28" fillOpacity="0.73"/>
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                <path d="M9.99994 0.729492L12.2451 7.63932H19.5105L13.6327 11.9098L15.8778 18.8197L9.99994 14.5492L4.12209 18.8197L6.36723 11.9098L0.48938 7.63932H7.7548L9.99994 0.729492Z" fill="#BEBEBE"/>
              </svg>
            }
            {type === "home" ? starNumber : ''}
          </div>
          <div className='interview-footer-user'>
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            <div>userName</div>
          </div>
        </div> 
      }
    </Card>
  );
};

export default RecordCard;