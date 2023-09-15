import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, BarsOutlined } from '@ant-design/icons';
import { Divider, Layout, Button, Avatar, Dropdown } from 'antd';
import Login from '../pages/Login/App';
import { observer } from 'mobx-react';
import store from '../store';
import React, { useEffect, useState } from 'react';
import { logout } from '../router';
import AssistantModal from '../pages/AssistantModal/App';
import { useLocation } from 'react-router-dom';
import { setLocalStorage } from '../utils';

const { Header } = Layout;

const NavigationMenu = () => {
  const showModal = () => {
    store.isLoginModalOpen = true;
  };

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    store.currentMenu = pathname;
  }, [location]);

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
      key: 'interview',
      label: '面试助手',
      link: '/interview'
    },
    {
      key: 'mockInterviewHall',
      label: '模拟面试大厅',
      link: '/mockInterviewHall'
    }
  ];

  const items = [
    {
      // TODO 判断是否登录
      label: (<div onClick={() => navigate('/user')}>个人中心</div>),
      key: 'user'
    },
    {
      type: 'divider'
    },
    {
      label: (<div onClick={() => logout()}>退出登录</div>),
      key: 'logout'
    }
  ];

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const NavigateTo = (item) => {
    const { key, link } = item;
    if (store.currentMenu === key) {
      return;
    } else if (!store.isLogin) {
      store.isLoginModalOpen = true;
      return;
    } else if (key === 'interview' && store.currentMenu !== '/interview') {
      store.isAssistantModalOpen = true;
      return;
    }
    navigate(link);
    setLocalStorage({
      company: '',
      direction: '',
      round: ''
    });
  };

  return (
    <Header
      style={{
        padding: 0,
        position: 'absolute',
        width: '100%',
        height: '64px',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
        userSelect: 'none'
      }
      }
    >
      <Login />
      <AssistantModal />
      <Link to="/"><div className='page-title'>JobGPT</div></Link>
      <div className='hide'>
        <div className='page-menu'>
          <div className='page-menu-list'>
            {
              menuItems.map((item, index) => {
                const { key, link, label } = item;
                return <React.Fragment key={index}>
                  {index !== 0 && <span>|</span>}
                  <div
                    className={store.currentMenu === link ? 'menu-item-selected' : 'menu-item-default'}
                    onClick={() => { NavigateTo(item); }}
                    key={key}
                  >
                    {label}
                  </div>
                </React.Fragment>;
              })
            }
          </div>
          {
            store.isLogin ?
              <>
                <Dropdown menu={{ items }}
                  placement='bottomRight'
                  overlayStyle={{ textAlign: 'center' }}
                >
                  <Avatar
                    icon={<UserOutlined />}
                    size='large'
                    className='login-icon'
                  >
                  </Avatar>
                </Dropdown>
              </>
              :
              <>
                <Button type='primary' className='login-btn' onClick={showModal}>登录</Button>
              </>
          }
        </div>
      </div>
      <div className='mobile-menu'>
        {
          store.isLogin
            ?
            < Dropdown
              className='mobile-menu-logined'
              menu={{
                items,
                onClick: () => { setOpen(false); }
              }}
              onOpenChange={handleOpenChange}
              open={open}
              dropdownRender={(menu) => (
                <div className='mobile-menu-list'>
                  {
                    menuItems.map((item) => {
                      const { key, link, label } = item;
                      return <React.Fragment key={key}>
                        <div
                          className={store.currentMenu === link ? 'menu-item-selected' : 'menu-item-default'}
                          onClick={() => { NavigateTo(item), setOpen(false); }}
                          key={key}>
                          {label}
                        </div>
                      </React.Fragment>;
                    })
                  }
                  <Divider
                    style={{
                      margin: 0,
                    }}
                  />
                  {React.cloneElement(menu, {
                    style: {
                      borderRadius: 0,
                      boxShadow: 'none'
                    }
                  })}
                </div>
              )}
              overlayStyle={{ textAlign: 'center' }}
              placement="bottomRight"
            >
              <Button className='mobile-menu' onClick={() => { setOpen(true); }}><BarsOutlined /></Button>
            </Dropdown >
            :
            <Button type='primary' className='login-btn' onClick={showModal}>登录</Button>
        }
      </div>
    </Header >
  );
};

export default observer(NavigationMenu);

