import { Avatar, Button, Menu } from "antd"
import { UserOutlined, SettingOutlined, FilterOutlined } from "@ant-design/icons"
import { Content } from "antd/es/layout/layout"
import MineRecords from "./MineRecords"
import "./App.less"


const User = () => {

  const currentMenu = 'mine'
 
  const menuItems = [
    {
      key: 'mine',
      label: '我的面经',
    },
    {
      key: 'resume',
      label: '辅助记录',
    },
    {
      key: 'simulation',
      label: '模拟记录',
    },
    {
      key: 'collection',
      label: '面经收藏',
    },
    {
      key: 'person-info',
      label: '个人信息',
    }
  ];

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
        >
          {currentMenu}
        </Menu>
        <Button 
          size="large"
          className="filter-btn" 
          icon={<FilterOutlined />}>筛选</Button>
      </div>
      <MineRecords />
    </Content>
  )
}

export default User