import { Button, Layout, Divider, message } from 'antd';
import { Link } from 'react-router-dom';
import logo1Url from '../../imgs/logo1.png';
import aliyunUrl from '../../imgs/aliyun.jpg';
import RecordCard from "../../components/RecordCard";
import { observer } from 'mobx-react';
import store from '../../store';
import { useState, useRef } from 'react';
import AssistantModal from '../AssistantModal/App';
import FooterInfo from '../../components/FooterInfo';
import { CaretRightOutlined, CaretLeftOutlined, SwapRightOutlined } from '@ant-design/icons';
import SlideInOnMount from '../../components/SlideInOnMount'
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constant';
const { Content } = Layout;

const Home = () => {
  const openLogin = () => {
    store.isLoginModalOpen = true;
  };

  const showAssistantModal = () => {
    store.isAssistantModalOpen = true;
  };

  const [scrollBox, setScrollBox] = useState(0);

  const recordsContainerRef = useRef(null);

  const handleScrollBox = (flag) => {
    const { current: { offsetWidth } } = recordsContainerRef;
    const delta = flag ? offsetWidth : -1 * offsetWidth;
    let amount = scrollBox + delta;
    if (amount > 0) {
      amount = 0;
    } else if (amount < -280 * cardList.length) {
      amount = scrollBox;
    }
    setScrollBox(amount);
  };

  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    getCardList();
  }, []);

  function getCardList() {
    const params = {
      limit: 11,
      page: 1,
      sort_type: 0
    };
    axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, params).then((res) => {
      const { status, data: { data: { mock_interview_cards } }
      } = res;
      if (status === 200) {
        setCardList(mock_interview_cards);
      }
    }).catch((err) => {
      console.log('error:', err);
      message.error('获取卡片列表失败');
    });
  }

  return (
    <>
      <Content className='content'>
        <AssistantModal />
        <img src={logo1Url} className='logo' />
        <SlideInOnMount slideUp={true}><div className='title'>AI面试小助手，助力收割大厂offer</div></SlideInOnMount>
        <div className='statistics'>
          <div className='text'>为你彻底解决背八股文的烦恼！</div>
        </div>
        <SlideInOnMount slideUp={false}>
          <div className='statistics'>
            <div className='text'>已经成功帮助</div>
            <div className='amount'>123456</div>
            {/* <Statistic value={123456} valueStyle={{ fontSize:'1.2rem',color: '#3f8600', fontWeight: '600' }} /> */}
            <div className='text'>人拿到心仪offer！</div>
          </div>
        </SlideInOnMount>
        <div className='btn-container'>
          {
            store.isLogin ?
              <Link to="/mockInterview"><Button type='default' className='btn'>模拟面试</Button></Link>
              :
              <Button type='default' className='btn' onClick={openLogin}>模拟面试</Button>
          }
          {
            store.isLogin ?
              <Button type='primary' className='btn' onClick={showAssistantModal}>开启面试小助手</Button>
              :
              <Button type='primary' className='btn' onClick={openLogin}>开启面试小助手</Button>
          }
        </div>
        <Divider>
          <Link to='/' style={{ color: '#555' }}>
            点击卡片开始模拟面试
          </Link>
        </Divider>
        <div className='records-container'>
          <div className='records-button' onClick={() => { handleScrollBox(true); }}>
            <CaretLeftOutlined />
          </div>
          <div className='records-subcontainer' ref={recordsContainerRef}>
            <div className='records' style={{ left: scrollBox + 'px' }}>
              {
                cardList.map((item) => {
                  return (
                      <RecordCard key={item?.id} data={item} />
                  );
                })
              }
              <Link className='find-more' to='/mockInterviewHall' >
                <div>
                  查看更多
                  <SwapRightOutlined />
                </div>
              </Link>
            </div>
          </div>
          <div className='records-button' onClick={() => { handleScrollBox(false); }}>
            <CaretRightOutlined />
          </div>
        </div>
      </Content>
      <FooterInfo />
    </>
  );
};

export default observer(Home);
