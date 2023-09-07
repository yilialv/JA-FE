import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Layout, Button, Avatar, Dropdown } from 'antd';
import Login from '../pages/Login/App';
import { observer } from 'mobx-react';
import store from '../store';
import { logout } from '../router';

const { Header } = Layout;

const NavigationMenu = () => {
  const showModal = () => {
      store.isLoginModalOpen = true;
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
      key: 'interview',
      label: '面试助手',
      link: '/interview'
    },
    {
      key: 'mockInterview',
      label: '模拟面试',
      link: '/mockInterview'
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
      label: (<div onClick={() => logout()}>退出</div>),
      key: 'logout'
    }
  ]

  const navigate = useNavigate();
  const NavigateTo = (item) => {
    var link='/'+item.key;
    if(item.key=='home'){
      link='/';
    }
    navigate(link)
  }

  return (
    <Header
      style={{
        padding: 0,
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
        {
          store.isLogin &&
          <Menu
            mode="horizontal"
            className='page-menu-list'
            items={menuItems}
            style={{ minWidth: '60px', flex: 1 }}
            defaultSelectedKeys={[store.currentMenu]}
            onClick={NavigateTo}
          // selectedKeys={[store.currentMenu]}
          >
          </Menu>
        }

        {
          store.isLogin ?
            <>
              |
              <Dropdown menu={{ items }}
                placement='bottomRight'
                overlayStyle={{ textAlign: 'center' }}
                arrow
              >
                <Avatar
                  icon={<UserOutlined />}
                  size='large'
                  className='login-btn'
                >
                </Avatar>
              </Dropdown>
            </>
            :
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

