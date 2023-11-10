import { Input, Layout, message } from 'antd';
import { ShareCard, CommentCard } from './Card';
import { observer } from 'mobx-react';
import React, { useState, useRef } from 'react';
import AssistantModal from '../AssistantModal/App';
import FooterInfo from '../../components/FooterInfo';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import Slider from "react-slick";
import Marquee from "react-fast-marquee";



const imgs = new Array().fill(11).map(item => require(`../../imgs/cm-${item + 1}.jpeg`))
console.log(imgs, 'imgs')



import cm_img_1 from "../../imgs/cm-1.jpeg"
import cm_img_2 from "../../imgs/cm-2.jpeg"
import cm_img_3 from "../../imgs/cm-3.jpeg"
import cm_img_4 from "../../imgs/cm-4.jpeg"
import cm_img_5 from "../../imgs/cm-5.jpeg"
import cm_img_6 from "../../imgs/cm-6.jpeg"
import cm_img_7 from "../../imgs/cm-7.jpeg"
import cm_img_8 from "../../imgs/cm-8.jpeg"
import cm_img_9 from "../../imgs/cm-9.jpeg"
import cm_img_10 from "../../imgs/cm-10.jpeg"
import cm_img_11 from "../../imgs/cm-11.jpeg"
import cm_img_12 from "../../imgs/cm-12.jpeg"






const { Content } = Layout;

const bulletList1 = [
  { avatar: cm_img_1, nickName: '豆豆', time: '2023.8.3', desc: '这款产品简直是我的面试救星⭐！使用它后，我发现自己在面试中的表现有了极大的提升，已经成功斩获了几个大厂Offer，超级开心😁！' },
  { avatar: cm_img_2, nickName: '追风少年', time: '2023.8.15', desc: '这款产品太棒了，面试小助手的功能超级实用👍！' },
  { avatar: cm_img_3, nickName: 'NavyNight', time: '2023.7.8', desc: '它就像我的面试教练🏋️‍♀️，模拟面试环节帮我查漏补缺，让我知识点更加扎实。现在收到了几个offer，真的太感动了😭' },
  { avatar: cm_img_4, nickName: '童话里的鱼', time: '2023.7.19', desc: '求职路上我找到了最好的伙伴👭！这个小助手帮我解答了无数问题，让我在面试中得心应手🙏！' },
  { avatar: cm_img_5, nickName: '柠檬不萌', time: '2023.8.5', desc: '真心推荐这款产品！模拟面试的功能让我提前做好了充分准备，不仅使我在面试中表现出色，同时还帮我拿到了好几份大公司的Offer' },
  { avatar: cm_img_6, nickName: '巧克力猫猫', time: '2023.8.25', desc: '这款小助手真的是我面试路上的灯塔啊🌟！那些难搞的八股文问题，全靠它帮我搞定！现在收到好几个大厂的offer，太感谢了！' },
  { avatar: cm_img_7, nickName: 'Starlight', time: '2023.8.17', desc: '这款小助手真的是神器级别的！每次面试前用它模拟一遍，简直是查漏补缺的利器🔧！现在我已经收割了好几个offer，快来试试吧！' },
  { avatar: cm_img_8, nickName: '小橙子', time: '2023.7.13', desc: '小助手是我面试路上的得力助手🙆‍♀️，各种问题秒回不说，界面设计也超级简洁明了。现在已经收到好几个offer，你们还不快来试' },
  { avatar: cm_img_9, nickName: '咖啡牛奶', time: '2023.7.15', desc: '这款小助手真的是神器！面试的时候，有它在，我感觉好像有个专业的面试教练在旁边指点😏。' },
  { avatar: cm_img_10, nickName: 'MusicKnight', time: '2023.7.18', desc: '用过这个小助手的我，已经对麻烦的八股文说bye bye了👋。它帮我解决了好多疑难杂症，简直爱死它了！' },
  { avatar: cm_img_11, nickName: '未来冲冲冲', time: '2023.9.14', desc: '这款小助手真的太贴心了！它知道我要问什么，还能提前告诉我答案。我现在对面试一点也不紧张了😎。' },
  { avatar: cm_img_12, nickName: 'Rainbow', time: '2023.9.24', desc: '家人们，我刚拿到一个offer！全靠这个小助手，它帮我搞定了所有的问题。我要给它点个赞👍！' },
  { avatar: cm_img_1, nickName: '粉色糖果', time: '2023.9.3', desc: '用这款小助手，我已经从一个面试小白变成了面试达人！它的模拟面试功能帮我查漏补缺，简直是我的私人教练👏。' },
  { avatar: cm_img_2, nickName: '蓝莓酱', time: '2023.10.17', desc: '不知道你们有没有遇到过面试的时候脑子一片空白？我现在有这款小助手，再也不怕面试了😊！' },
  { avatar: cm_img_3, nickName: '炸鸡小王子', time: '2023.10.26', desc: '这个小助手真的好强大！一开始我只是抱着试试看的态度，结果用了之后我收到了好几个offer，简直是眼泪哗哗的😭。' },
  { avatar: cm_img_4, nickName: '火焰鸟', time: '2023.10.13', desc: '我很喜欢这款小助手的界面设计，简洁明了，一目了然。每次面试前都会用它来准备，效果真的超好👍！' },
  { avatar: cm_img_5, nickName: '夏日柠檬', time: '2023.11.5', desc: '我用这款小助手准备面试，真的是事半功倍！它的模拟面试功能让我提前熟悉了面试环节，让我心里有底了。' },
  { avatar: cm_img_6, nickName: '红茶猫', time: '2023.8.18', desc: '我用过很多面试工具，但是这款小助手无疑是我最爱的一个❤️。它的功能强大，操作简单，真的很赞！' },
];
const color = ['shadow-red-800', 'shadow-blue-800', 'shadow-yellow-800', 'shadow-purple-1600'];


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
      limit: 30,
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

  const like = (item) => {
    axios.post(`${BASE_URL}/api/experience/set_favorite`, { experience_id: item.id }).then((res) => {
      if (res.code !== 200) {
        getCardList()
      }
    }).catch((err) => {

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
          <div className='w-full px-16 flex justify-center flex-wrap'>
            <div className='w-[1200px]'>
              <Slider className='my-8' {...settings}>
                {
                  cardList.map(item => <ShareCard key={item.id} like={like} dataSource={item} />)
                }
              </Slider>
            </div>

            <div className='w-full'>
              <button type='primary' className='block mx-auto  bg-gradient-to-r from-[#ED4D65] to-[#5844CE] rounded text-white py-2 px-6 tracking-widest text-[15px]'>点击进入面经大厅</button>
            </div>
          </div>
        </div>
        <div className='bg-slate-100 w-full py-8'>
          <h3 className='text-[40px] font-bold text-center  pb-1'>真实的用户反馈</h3>
          <p className='text-[24px] text-center'>成功帮助123456名用户取得大厂offer</p>

          <div className='w-full  mt-10'>
            {
              [1, 2, 3].map((time, timeIndex) => {
                return (
                  <Marquee className="flex mb-3" pauseOnHover={true} speed={[30, 35, 40][time - 1]}>
                    <div
                      className='flex py-1'
                      onMouseOut={e => {
                        const currentMarquee = document.querySelector("#marquee" + time);
                        console.log(currentMarquee, 'currnet');
                        currentMarquee?.start();
                      }}
                      onMouseOver={(e) => {
                        const currentMarquee = document.querySelector("#marquee" + time);
                        console.log(e, 'currnet');
                        currentMarquee?.stop();
                      }}>
                      {
                        bulletList1.slice(timeIndex * 3).map((item, index) => {

                          return (
                            <CommentCard key={index} dataSource={item} shadowColor={color[index % 4]} />
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

