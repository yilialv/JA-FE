import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, GlobalOutlined,CaretRightOutlined } from '@ant-design/icons';
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
      key: 'interview',
      label: '面试助手',
      link: '/interview'
    },
    {
      key: 'AssistantInterview',
      label: '模拟面试',
      link: '/assistant-interview'
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
      label: (<div onClick={() => navigate('/user-center')}>个人中心</div>),
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
    <Header className='flex justify-between items-center bg-slate-100  h-[80px]'>
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
                 store.avatar ? <img src={store.avatar} className='w-[50px] rounded-3xl' alt="" /> :  <button onClick={showModal} className='text-[15px] bg-gradient-to-r from-[#ED4D65] to-[#5844CE] rounded text-white h-[40px] leading-[40px]  px-4 tracking-widest'>Login</button>
               }
          
            <span style={{marginLeft:"10px"}} className="font-bold">
               {
                store.nickName
               }
            </span>
            <Dropdown menu={{ items }} placement="bottom">
             
            <CaretRightOutlined className='ml-1 hover:rotate-90'/>
             </Dropdown>
           
            <GlobalOutlined className="text-[25px] ml-2" />
            {/* <Button type='primary' className='bg-gradient-to-r from-[#ED4D65] to-[#5844CE] border-0' >Login</Button> */}
          </div>
        </div>
      </div>
    
    </Header >
  );
};

export default observer(NavigationMenu);

