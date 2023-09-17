import { useState } from 'react';
import { Avatar, Button, Menu } from "antd";
import { UserOutlined, SettingOutlined, FilterOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import MineRecords from "./components/MineRecords";
import FavoriteRecords from "./components/FavoriteRecords";
import SimulateList from "./components/SimulateList";
import CopilotList from "./components/CopilotList";
import Information from "./components/Information";
import "./App.less";

const User = () => {

  const [currentMenu, setCurrentMenu] = useState('mine');
 
  const menuItems = [
    {key: 'mine', label: '我的面经'},
    {key: 'favorite', label: '面经收藏',},
    {key: 'simulation', label: '模拟记录',},
    {key: 'copilot', label: '辅助记录',},
    {key: 'information', label: '个人信息',}
  ];

  const renderComponent = () => {
    switch (currentMenu) {
    case 'information':
      return <Information />;
    case 'copilot':
      return <CopilotList/>;
    case 'simulation':
      return <SimulateList />;
    case 'favorite':
      return <FavoriteRecords />;
    default:
      return <MineRecords />;
    }
  };

  return (
    <Content className="user-page">
      <div className="user-top">
        <div className="left">
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className="right">
          <div className="username">用户名 123</div>
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