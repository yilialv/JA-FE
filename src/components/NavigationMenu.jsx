import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';
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
  const [menuAcitveIndex,setMenuAcitveIndex] = useState(0)
  let userinfo = {}
  if(localStorage.getItem("userinfo")){
    userinfo = JSON.parse(localStorage.getItem("userinfo"))
  }
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

  const NavigateTo = (item,index) => {
    const { key, link } = item;
    setMenuAcitveIndex(index)
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
  const loginSuccess = () => {

  }
  return (
    <Header className='flex justify-between items-center bg-slate-100  h-[80px] sticky top-0'>
      <Login callback={loginSuccess}/>
      <AssistantModal />
      <Link to="/"><div className='text-black font-bold text-[38px] sm:w-2/5 lg:w-1/3'>JobGPT</div></Link>
      <div className='hide w-3/5 lg:w-2/3'>
        <div className='flex items-center justify-between w-full'>
          <ul className='flex items-center justify-between '>
            {
              menuItems.map((item, index) => {
                const { key, link, label } = item;
                return (
                  <li key={index} className='pt-2 px-4 '>
                    <span
                      className={`text-black text-base xl:text-[18px] p-1 ${menuAcitveIndex == index ? 'border-b-[3px] border-solid border-[#5844CE]' : ''}  hover:border-b-[3px] hover:border-solid hover:border-[#5844CE]`}
                      onClick={() => { NavigateTo(item,index); }}
                      key={key}
                    >
                      {label}
                    </span>
                  </li>
                )
              })
            }
          </ul>
          <div className='flex items-center'>
            {
              userinfo.avatar || store.avatar ? <img src={userinfo.avatar || store.avatar} className='w-[50px] rounded-3xl' alt="" /> :  <button onClick={showModal} className='text-[15px] bg-gradient-to-r from-[#ED4D65] to-[#5844CE] rounded text-white h-[40px] leading-[40px]  px-4 tracking-widest'>Login</button>
            }
           
            <GlobalOutlined className="text-[25px] ml-2" />
            {/* <Button type='primary' className='bg-gradient-to-r from-[#ED4D65] to-[#5844CE] border-0' >Login</Button> */}
          </div>
        </div>
      </div>
      {/* <div className='mobile-menu'>
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
      </div> */}
    </Header >
  );
};

export default observer(NavigationMenu);

