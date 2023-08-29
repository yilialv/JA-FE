import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Button } from 'antd';
import { useState } from 'react';
import Login from '../pages/Login/App';

const { Header } = Layout;

const NavigationMenu = () => {
  const [current, setCurrent] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
};

  const menuItems = [
    {
      key: 'resume',
      label: '简历评估'
    },
    {
      key: 'jobAssistant',
      label: '面试助手'
    },
    {
      key: 'interview',
      label: '模拟面试'
    }
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Link to="/"><div className='page-title'>JobGPT</div></Link>
      <div className='page-menu'>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[current]}
          // items={menuItems}
        >
          <Menu.Item key="home">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="interview">
            <Link to="/interview">面试助手</Link>
          </Menu.Item>
        </Menu>
        <Button className='login-btn' onClick={showModal}>登陆</Button>
        <Login open={isModalOpen} onCancel={handleCancel} />
      </div>
    </Header>
  );
};

export default NavigationMenu;
