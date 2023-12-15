import './index.less'
import {BASE_URL} from "../../constant"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {message} from 'antd'
import { HeartOutlined, LoginOutlined, WarningOutlined, LikeOutlined } from "@ant-design/icons"
import PersonHomePage from './PersonHomePage'
import MyFace from "./MyFace"
import CollectWrap from "./CollectionWrap"
import AuxiliaryRecord from "./AuxiliaryRecord"
import MockRecord from "./MockRecord"
import store from "../../store"
import  person_img from "../../imgs/person.svg"

function UserCenter() {
  let [userData, setUserData] = useState({})
  let [activeIndex, setActiveIndex] = useState(0)
  const userModelList = [
    {name:"个人主页", component: <PersonHomePage />},
    {name:"我的面经", component: <MyFace />},
    {name:"面经收藏", component: <CollectWrap />},
    {name:"辅助记录", component: <AuxiliaryRecord />},
    {name:"模拟记录", component: <MockRecord />},
    // {name:"题目收藏", component: <PersonHomePage />},
  ]
  useEffect(() => {
    axios.get(`${BASE_URL}/api/user/data`).then((res) => {
      const {data, code} = res.data
      if(code == 0){
        setUserData(data)
      }
    }).catch((err) => {
      message.error('获取失败');
    });
  }, [])
  {  console.log()}
  return (
    <div className="user-center">
      <div className='header'>
        <div className='header-box'>
          <div>
            <p>{userData.published_experience}</p>
            <p>发布面经</p>
          </div>
          <div>
            <p>{userData.favorite_experience}</p>
            <p>面经收藏</p>
          </div>
          <div>
            <p>{userData.mock_times}</p>
            <p>模拟面试</p>
          </div>
          <div>
            <p>{userData.copilot_times}</p>
            <p>面试辅助</p>
          </div>
        </div>
      </div>
      <div className='user-info w-[1200px] mx-auto'>
        <div>
          <img src={userData.avatar} alt="" />
          {
                store.nickName
               }
        </div>
        <div>
          <p className='flex'><img className='w-[17px] mr-1' src={person_img} alt="" /> 获得{userData.usages}次查看</p>
          <p><HeartOutlined style={{"fontSize":"16px","marginRight":"8px", 'marginTop':'2px'}} />获得{userData.favorites}次收藏</p>
        </div>
      </div>
      <div className='btn-group w-[1200px] mx-auto'>
        {
          userModelList.map((item,index) => {
            return <button onClick={() => {setActiveIndex(index)}} className={`${activeIndex == index ? 'bg-gradient-to-r from-[#ED4D65] to-[#5844CE] text-white' : 'bg-white text-[#636363]'}  font-bold text-[14px] px-[15px] py-[4px] rounded hover:bg-gradient-to-r hover:from-[#ED4D65] hover:to-[#5844CE] hover:text-white`}>{item.name}</button>
          })
        }
      </div>
      <div className='user-content w-[1200px] mx-auto'>
        <div className='bg-[#f8f7f7] bg-opacity-[0.8] p-[15px] rounded-lg border-white border-2 '>
          {userModelList.filter((item,index) => index == activeIndex)[0].component}
        </div>
      </div>
    </div>
  )
}


export default UserCenter