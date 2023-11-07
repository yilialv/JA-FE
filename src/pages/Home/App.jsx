import { Input, Layout, message} from 'antd';
import {ShareCard, CommentCard} from './Card';
import { observer } from 'mobx-react';
import React, { useState, useRef } from 'react';
import AssistantModal from '../AssistantModal/App';
import FooterInfo from '../../components/FooterInfo';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import Slider from "react-slick";
import Marquee from "react-fast-marquee";

const { Content } = Layout;

const bulletList1 = [
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
  { avatar: 'https://www.job581.cn/img/user_icon.jpg', nickName: '未来冲冲冲', time: '2023.7.3', desc: 'The real-time transcription feature is brilliant! It allows me to focus more on the conversation during the interview without worrying about taking n' },
];
const color = ['shadow-red-800', 'shadow-blue-800', 'shadow-yellow-800'];


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  centerPadding: "40px",
};

const Home = () => {
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
      <Content className='content bg-slate-100 pt-24'>
        <AssistantModal />
        <p className='font-bold text-[50px] tracking-widest'>AI面试小助手，助力收割大厂offer</p>
        <p className='text-sm mt-8'>为你彻底解决背八股文的烦恼！</p>
        <p className='text-sm mb-8'>已经成功帮助 <span className='text-lg text-amber-500'>123456</span> 人拿到心仪offer！</p>

        <div className='btn-container'>
          <button type='primary' className='bg-gradient-to-r from-[#ED4D65] to-[#5844CE] rounded-lg text-white py-2 px-12 tracking-widest text-base'>点击体验面试辅助</button>
        </div>
        <div className="bg-white w-2/3 h-[25rem] mt-8 mb-8 rounded">
        </div>

        <div className='bg-[#EDEDFB] w-full py-8'>
          <h3 className='text-[40px] font-bold text-center pb-1'>来自网页体验的面经分享</h3>
          <p className='text-[24px] text-center'>各个大厂面试经验等你来发现</p>
          <div className='flex justify-center w-full h-[45px] mt-8'>
            <input type="text" placeholder='输入部门岗位或者方向进行搜索' className='w-[300px] indent-3 rounded-l' />
            <button className='bg-blue-500 text-white px-5 rounded-r'>
              搜索
            </button>
          </div>
          <div className='w-full px-16 '>
            <Slider className='my-8' {...settings}>
              {
                cardList.map(item => <ShareCard key={item.id} dataSource={item}/>)
              }
            </Slider>
            <button type='primary' className='block mx-auto  bg-gradient-to-r from-[#ED4D65] to-[#5844CE] rounded text-white py-2 px-6 tracking-widest text-[15px]'>点击进入面经大厅</button>
          </div>
        </div>
        <div className='bg-slate-100 w-full py-8'>
          <h3 className='text-[40px] font-bold text-center  pb-1'>真实的用户反馈</h3>
          <p className='text-[24px] text-center'>成功帮助123456名用户取得大厂offer</p>

          <div className='w-full  mt-10'>
            {
              [1, 2, 3].map(time => {
                return (
                  <Marquee className="flex mb-3" pauseOnHover={true} speed={[30,40,50][time]}>
                    <div 
                      className='flex py-1'  
                      onMouseOut={e => {
                        const currentMarquee = document.querySelector("#marquee" + time);
                        console.log(currentMarquee,'currnet');
                        currentMarquee?.start();
                      }} 
                      onMouseOver={(e) => {
                        const currentMarquee = document.querySelector("#marquee" + time);
                        console.log(e,'currnet');
                        currentMarquee?.stop();
                      }}>
                      {
                        bulletList1.map((item, index) => {
                            
                          return (
                            <CommentCard key={index} dataSource={item} shadowColor={color[index % 3]}/>
                          );
                        })
                      }
                    </div>
                  </Marquee>
                );
              })
            }
           
          </div>
        </div>
        {/* <CommentCard dataSource={bulletList1[0]} shadowColor={''}/> */}
      </Content>
      <FooterInfo />
    </>
  );
};

export default observer(Home);

