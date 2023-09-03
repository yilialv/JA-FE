import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Button, Avatar, Dropdown, ConfigProvider } from 'antd';
import { useState } from 'react';
import Login from '../pages/Login/App';
import { observer } from 'mobx-react';
import store from '../store';
import { BgColorsOutlined, } from '@ant-design/icons';

const { Header } = Layout;

const NavigationMenu = () => {
  const showModal = () => {
    if (!store.isLogin) {
      store.isLoginModalOpen = true;
    };
  };

  const menuItems = [
    {
      key: 'home',
      label: '首页',
      link: '/'
    },
    {
      key: 'resume',
      label: '简历评估',
      link: '/resume'
    },
    {
      key: 'jobAssistant',
      label: '面试助手',
      link: '/jobAssistant'
    },
    {
      key: 'interview',
      label: '模拟面试',
      link: '/interview'
    }
  ];

  const menuItems_component = menuItems.map(item =>
    <Menu.Item key={item.key}>
      <Link to={item.link}>
        {item.label}
      </Link>
    </Menu.Item>
  )

  const items = [
    {
      label: '个人中心',
      key: 'personal'
    },
    {
      type: 'divider'
    },
    {
      label: (<div onClick={() => store.deleteJwtToken()}>退出</div>),
      key: 'logout'
    }
  ]

  return (

    <Header
      style={{
        position: 'sticky',
        width: '100%',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >

      <Link to="/"><div className='page-title'>JobGPT</div></Link>
      <div className='page-menu'>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[store.currentMenu]}
          inlineCollapsed={false}
        // selectedKeys={[store.currentMenu]}
        // items={menuItems}
        >
          {menuItems_component}
        </Menu>
        {
          store.isLogin ?
            <Dropdown menu={{ items }} placement='bottom'>
              <Avatar
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                className='login-btn'
              >
                {store.nickName}
              </Avatar>
            </Dropdown> :
            <>
              <Button type='default' className='login-btn' onClick={showModal}>登录</Button>
              <Login />
            </>
        }
      </div>
    </Header>
  );
};

export default observer(NavigationMenu);
