import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout, Button, Avatar } from 'antd';
import { useState } from 'react';
import Login from '../pages/Login/App';
import { observer } from 'mobx-react';
import store from '../store';

const { Header } = Layout;

const NavigationMenu = () => {
  const showModal = () => {
    if (!store.isLogin) {
      store.isLoginModalOpen = true;
    };
  };

  // const menuItems = [
  //   {
  //     key: 'resume',
  //     label: '简历评估'
  //   },
  //   {
  //     key: 'jobAssistant',
  //     label: '面试助手'
  //   },
  //   {
  //     key: 'interview',
  //     label: '模拟面试'
  //   }
  // ];

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
          defaultSelectedKeys={[store.currentMenu]}
          // selectedKeys={[store.currentMenu]}
          // items={menuItems}
        >
          <Menu.Item key="home">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="interview" onClick={showModal}>
            {
              !store.isLogin ? 
              <Link to="/">面试助手</Link> :
              <Link to="/interview">面试助手</Link>
            }
          </Menu.Item>
        </Menu>
        {
          store.isLogin ? 
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{ store.nickName }</Avatar> :
          <>
            <Button className='login-btn' onClick={showModal}>登陆</Button>
            <Login />
          </>
        }
      </div>
    </Header>
  );
};

export default observer(NavigationMenu);
