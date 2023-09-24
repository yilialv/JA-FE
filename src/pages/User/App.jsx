import { useEffect, useState } from 'react';
import { Avatar, Button, Menu, message } from "antd";
import { UserOutlined, SettingOutlined, FilterOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import MineRecords from "./components/MineRecords";
import FavoriteRecords from "./components/FavoriteRecords";
import MockList from "./components/MockList";
import CopilotList from "./components/CopilotList";
import Information from "./components/Information";
import "./App.less";
import axios from "axios";
import { BASE_URL } from "../../constant";

const User = () => {

  const [currentMenu, setCurrentMenu] = useState('information');
  const [mineRecordList, setMineRecordList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    "avatar": "",
    "create_time": 0,
    "direction": "",
    "id": 0,
    "nickname": "",
    "projects": [],
    "update_time": 0
  });

  useEffect(()=> {
    if (!userInfo.id) {getUserInfo();}
  },[userInfo]);

  function getUserInfo() {
    axios.get(`${BASE_URL}/api/user/info`).then((res)=> {
      const { status } = res;
      if (status === 200) {
        setUserInfo(res.data.data);
      }
    }).catch((err) => {
      console.log('err:', err);
      message.error('获取个人信息失败');
    });
  }
 
  const menuItems = [
    {key: 'info', label: '个人信息',},
    {key: 'mine', label: '我的面经'},
    {key: 'star', label: '面经收藏',},
    {key: 'mock', label: '模拟记录',},
    {key: 'copilot', label: '辅助记录',},
  ];

  const renderComponent = () => {
    switch (currentMenu) {
    case 'info':
      return <Information userInfo={userInfo} setUserInfo={setUserInfo} />;
    case 'copilot':
      return <CopilotList/>;
    case 'mock':
      return <MockList />;
    case 'star':
      return <FavoriteRecords list={favoriteList} setList={setFavoriteList}/>;
    default:
      return <MineRecords list={mineRecordList} setList={setMineRecordList} />;
    }
  };

  return (
    <Content className="user-page">
      <div className="user-top">
        <div className="left">
          {!userInfo.avatar ?
            <Avatar icon={<UserOutlined />} /> :
            <Avatar src={userInfo.avatar} /> 
          }
        </div>
        <div className="right">
          <div className="username">{userInfo.nickname}</div>
          <Button shape="round" icon={<SettingOutlined />} />
        </div>
      </div>
      <div className="tab-container">
        <Menu
          mode="horizontal"
          className='user-menu-list'
          items={menuItems}
          style={{ minWidth: '60px', flex: 1 }}
          defaultSelectedKeys={[currentMenu]}
          onClick={(e)=>setCurrentMenu(e.key)}
        />
        <Button 
          size="large"
          className="filter-btn" 
          icon={<FilterOutlined />}>筛选</Button>
      </div>
      <div className="components-container">
        {renderComponent()}
      </div>
    </Content>
  );
};

export default User;