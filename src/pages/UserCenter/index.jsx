import './index.less'
import {BASE_URL} from "../../constant"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {message} from 'antd'
function UserCenter() {
  const {userData, setUserData} = useState({})
  const userModelList = [
    {name:"个人主页"},
    {name:"我的面经"},
    {name:"面经收藏"},
    {name:"辅助记录"},
    {name:"模拟记录"},
    {name:"题目收藏"},
  ]
  useEffect(() => {
    axios.get(`${BASE_URL}/api/user/data`).then((res) => {
      console.log(res,'res')
    }).catch((err) => {
      message.error('获取失败');
    });
  }, [])
  return (
    <div className="user-center">
      <div className='header'>
        <div className='header-box'>
          <div>
            <p>24</p>
            <p>发布面经</p>
          </div>
          <div>
            <p>24</p>
            <p>发布面经</p>
          </div>
          <div>
            <p>24</p>
            <p>发布面经</p>
          </div>
          <div>
            <p>24</p>
            <p>发布面经</p>
          </div>
        </div>
      </div>
      <div className='user-info w-[1200px] mx-auto'>
        <div>
          <img src="https://www.job581.cn/img/user_icon.jpg" alt="" />
          一起冲鸭
        </div>
        <div>
          <p>获得一百次点赞</p>
          <p>获得一百次收藏</p>
        </div>
      </div>
      <div className='btn-group'>
        {
          userModelList.map(item => {
            return <button></button>
          })
        }
      </div>
    </div>
  )
}


export default UserCenter