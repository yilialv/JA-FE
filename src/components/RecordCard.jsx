import { Card, Avatar, Tag, message } from "antd";
import "./components.less";
import bookmarkCopilot from '../imgs/bookmark.png';
import { setStarCard, cancelStarCard } from "../router";
import { useState } from "react";
import { getTimestampToDate } from "../utils";
import avatarUrl from "../imgs/avatar.jpg";

const { Meta } = Card;

const renderRoundTag = (round) => {

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


const RecordCard = (props) => {
  // TODO 统一接口格式，替换静态数据
  // const {category, company, department, direction, interview_time } = item;
  // type用于区分卡片展示内容: home/mine/favorite
  const { data } = props;
  const { avatar, brief, category, company, direction, favorites, id, interview_date, logo, nick_name, popularity_rating, round, is_favorite } = data;
  const customSvg = (name) => {
    switch (name) {
    case 'settings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.9 12.6599C19.7397 12.4774 19.6513 12.2428 19.6513 11.9999C19.6513 11.757 19.7397 11.5224 19.9 11.3399L21.18 9.89989C21.3211 9.74256 21.4087 9.5446 21.4302 9.3344C21.4518 9.12421 21.4062 8.91258 21.3 8.72989L19.3 5.2699C19.1949 5.08742 19.0349 4.94277 18.8428 4.85658C18.6506 4.77039 18.4362 4.74705 18.23 4.7899L16.35 5.1699C16.1108 5.21932 15.8618 5.17948 15.6499 5.0579C15.438 4.93631 15.278 4.74138 15.2 4.5099L14.59 2.6799C14.5229 2.48127 14.3951 2.30876 14.2246 2.18674C14.0542 2.06471 13.8497 1.99935 13.64 1.9999H9.64002C9.42195 1.98851 9.20615 2.04882 9.02558 2.17161C8.84501 2.2944 8.7096 2.47291 8.64002 2.6799L8.08002 4.5099C8.00202 4.74138 7.84199 4.93631 7.63013 5.0579C7.41827 5.17948 7.16924 5.21932 6.93002 5.1699L5.00002 4.7899C4.80457 4.76228 4.60532 4.79312 4.42737 4.87853C4.24941 4.96395 4.10072 5.10012 4.00002 5.2699L2.00002 8.72989C1.89118 8.91054 1.84224 9.12098 1.8602 9.33112C1.87816 9.54126 1.9621 9.74034 2.10002 9.89989L3.37002 11.3399C3.53034 11.5224 3.61875 11.757 3.61875 11.9999C3.61875 12.2428 3.53034 12.4774 3.37002 12.6599L2.10002 14.0999C1.9621 14.2595 1.87816 14.4585 1.8602 14.6687C1.84224 14.8788 1.89118 15.0892 2.00002 15.2699L4.00002 18.7299C4.10512 18.9124 4.26514 19.057 4.45727 19.1432C4.6494 19.2294 4.86384 19.2527 5.07002 19.2099L6.95002 18.8299C7.18924 18.7805 7.43827 18.8203 7.65013 18.9419C7.86199 19.0635 8.02202 19.2584 8.10002 19.4899L8.71002 21.3199C8.7796 21.5269 8.91501 21.7054 9.09558 21.8282C9.27615 21.951 9.49195 22.0113 9.71002 21.9999H13.71C13.9197 22.0004 14.1242 21.9351 14.2946 21.8131C14.4651 21.691 14.5929 21.5185 14.66 21.3199L15.27 19.4899C15.348 19.2584 15.508 19.0635 15.7199 18.9419C15.9318 18.8203 16.1808 18.7805 16.42 18.8299L18.3 19.2099C18.5062 19.2527 18.7206 19.2294 18.9128 19.1432C19.1049 19.057 19.2649 18.9124 19.37 18.7299L21.37 15.2699C21.4762 15.0872 21.5218 14.8756 21.5002 14.6654C21.4787 14.4552 21.3911 14.2572 21.25 14.0999L19.9 12.6599ZM18.41 13.9999L19.21 14.8999L17.93 17.1199L16.75 16.8799C16.0298 16.7327 15.2806 16.855 14.6446 17.2237C14.0086 17.5924 13.5302 18.1817 13.3 18.8799L12.92 19.9999H10.36L10 18.8599C9.76987 18.1617 9.2914 17.5724 8.65542 17.2037C8.01945 16.835 7.27024 16.7127 6.55002 16.8599L5.37002 17.0999L4.07002 14.8899L4.87002 13.9899C5.36197 13.4399 5.63395 12.7278 5.63395 11.9899C5.63395 11.252 5.36197 10.5399 4.87002 9.98989L4.07002 9.0899L5.35002 6.88989L6.53002 7.1299C7.25024 7.27712 7.99945 7.15478 8.63542 6.78609C9.2714 6.41741 9.74987 5.82805 9.98002 5.1299L10.36 3.9999H12.92L13.3 5.13989C13.5302 5.83805 14.0086 6.42741 14.6446 6.79609C15.2806 7.16478 16.0298 7.28712 16.75 7.13989L17.93 6.8999L19.21 9.11989L18.41 10.0199C17.9236 10.5687 17.655 11.2766 17.655 12.0099C17.655 12.7432 17.9236 13.4511 18.41 13.9999ZM11.64 7.9999C10.8489 7.9999 10.0755 8.23449 9.41774 8.67402C8.75994 9.11354 8.24725 9.73826 7.9445 10.4692C7.64175 11.2001 7.56254 12.0043 7.71688 12.7803C7.87122 13.5562 8.25218 14.2689 8.81159 14.8283C9.371 15.3877 10.0837 15.7687 10.8597 15.923C11.6356 16.0774 12.4398 15.9982 13.1708 15.6954C13.9017 15.3927 14.5264 14.88 14.9659 14.2222C15.4054 13.5644 15.64 12.791 15.64 11.9999C15.64 10.939 15.2186 9.92161 14.4684 9.17147C13.7183 8.42132 12.7009 7.9999 11.64 7.9999ZM11.64 13.9999C11.2445 13.9999 10.8578 13.8826 10.5289 13.6628C10.2 13.4431 9.94363 13.1307 9.79226 12.7653C9.64088 12.3998 9.60128 11.9977 9.67845 11.6097C9.75562 11.2218 9.9461 10.8654 10.2258 10.5857C10.5055 10.306 10.8619 10.1155 11.2498 10.0383C11.6378 9.96115 12.0399 10.0008 12.4054 10.1521C12.7708 10.3035 13.0832 10.5599 13.303 10.8888C13.5227 11.2177 13.64 11.6043 13.64 11.9999C13.64 12.5303 13.4293 13.039 13.0542 13.4141C12.6792 13.7892 12.1705 13.9999 11.64 13.9999Z" fill="black" />
        </svg>
      );
    case 'delete':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
          <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'StarOutlined':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
          <path d="M9.99994 0.729492L12.2451 7.63932H19.5105L13.6327 11.9098L15.8778 18.8197L9.99994 14.5492L4.12209 18.8197L6.36723 11.9098L0.48938 7.63932H7.7548L9.99994 0.729492Z" fill="#BEBEBE" />
        </svg>
      );
    case 'StarFilled':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
          <path d="M10 0.729492L12.2451 7.63932H19.5106L13.6327 11.9098L15.8779 18.8197L10 14.5492L4.12215 18.8197L6.36729 11.9098L0.489441 7.63932H7.75487L10 0.729492Z" fill="#FFDD28" fillOpacity="0.73" />
        </svg>
      );
    case 'fire':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none" style={{ 'marginTop': '2px' }}>
          <path d="M11.2414 10.9797C11.0793 11.8849 10.6438 12.7188 9.99347 13.369C9.34313 14.0192 8.50918 14.4545 7.60391 14.6164C7.56954 14.6219 7.5348 14.6248 7.5 14.625C7.34322 14.625 7.19219 14.566 7.07685 14.4598C6.96151 14.3536 6.89029 14.208 6.87731 14.0517C6.86433 13.8955 6.91054 13.7401 7.00678 13.6163C7.10302 13.4926 7.24225 13.4095 7.39687 13.3836C8.69141 13.1656 9.78984 12.0672 10.0094 10.7703C10.0371 10.6068 10.1287 10.4611 10.2639 10.3651C10.3992 10.2691 10.567 10.2308 10.7305 10.2586C10.894 10.2864 11.0397 10.3779 11.1357 10.5132C11.2316 10.6484 11.27 10.8162 11.2422 10.9797H11.2414ZM13.75 10.25C13.75 12.0734 13.0257 13.822 11.7364 15.1114C10.447 16.4007 8.69836 17.125 6.875 17.125C5.05164 17.125 3.30295 16.4007 2.01364 15.1114C0.724328 13.822 0 12.0734 0 10.25C0 8.06875 0.859375 5.83828 2.55156 3.62109C2.60513 3.55088 2.67296 3.49283 2.75059 3.45074C2.82823 3.40866 2.9139 3.3835 3.00196 3.37693C3.09002 3.37036 3.17847 3.38253 3.26149 3.41263C3.34451 3.44273 3.42021 3.49008 3.48359 3.55156L5.36797 5.38046L7.08672 0.660933C7.12106 0.566803 7.17752 0.482309 7.25136 0.414573C7.32519 0.346837 7.41423 0.297845 7.51096 0.271728C7.60769 0.24561 7.70929 0.243133 7.80718 0.264505C7.90507 0.285876 7.99639 0.33047 8.07344 0.394527C9.78203 1.8125 13.75 5.60546 13.75 10.25ZM12.5 10.25C12.5 6.64921 9.70391 3.5375 7.95234 1.94296L6.2125 6.71406C6.17679 6.81205 6.11713 6.89955 6.03895 6.96858C5.96077 7.03761 5.86655 7.08598 5.76489 7.10928C5.66323 7.13258 5.55736 7.13007 5.45692 7.10197C5.35648 7.07388 5.26466 7.02109 5.18984 6.94843L3.12969 4.95C1.88203 6.75078 1.25 8.53125 1.25 10.25C1.25 11.7418 1.84263 13.1726 2.89752 14.2275C3.95242 15.2824 5.38316 15.875 6.875 15.875C8.36684 15.875 9.79758 15.2824 10.8525 14.2275C11.9074 13.1726 12.5 11.7418 12.5 10.25Z" fill="#BEBEBE" />
        </svg>
      );
    }
  };

  const [isStared, setIsStared] = useState(is_favorite);
  const [favoriteNum, setFavoriteNum] = useState(favorites);

  const handleCard = () => {
    if (isStared) {
      cancelStarCard({
        "experience_id": id
      }).then(res => {
        const { code, message } = res;
        if (code === 0) {
          setIsStared(false);
          setFavoriteNum(favoriteNum - 1);
        } else if (code === 1) {
          message.error(message);
        } else if (code === 2) {
          throw new Error(message);
        }
      }).catch(err => {
        console.log('err:', err);
        message.error('取消收藏面经失败');
      });
    } else {
      setStarCard({
        "experience_id": id
      }).then(res => {
        const { code, message } = res;
        if (code === 0) {
          setIsStared(true);
          setFavoriteNum(favoriteNum + 1);
        } else if (code === 1) {
          message.error(message);
        } else if (code === 2) {
          throw new Error(message);
        }
      }).catch(err => {
        console.log('err:', err);
        message.error('收藏面经失败');
      });
    }
  };

  return (
    <Card
      className="record-card"
      hoverable
      cover={logo && <img src={logo} />}
      onClick={props.onClick}
    >
      {!category && <img className="bookmark" src={bookmarkCopilot} />}
      <div className="interview-title">
        <span className="title-text">{company}</span>
        {round && renderRoundTag(round)}
        {/* {type === "mine" ? 
          <div className="setting-icon-container">
            <div className="setting-icon" onClick={handleSetting}>{customSvg('settings')} </div>
            <div className="setting-icon" onClick={handleDelete}>{customSvg('delete')} </div>
          </div>
          : <></>} */}
      </div>
      <div className='interview-info'>
        <div className='info'>{direction}</div>
        <div className='info'>{getTimestampToDate(interview_date)}</div>
      </div>
      <Meta
        description={brief || ''}
      />
      <div className='interview-footer'>
        <div className='footer-left'>
          {/* {customSvg(type === "favorite" ? 'StarFilled' : 'StarOutlined')} */}
          <div onClick={handleCard}>{customSvg(isStared ? 'StarFilled' : 'StarOutlined')}</div>
          <div className="text-number">{favoriteNum}</div>
          {customSvg('fire')}
          <div className="text-number">{popularity_rating}</div>
        </div>
        <div className='interview-footer-user'>
          <Avatar src={avatar || avatarUrl} />
          {nick_name && <div>{nick_name}</div>}
        </div>
      </div>
    </Card>
  );
};

export default RecordCard;