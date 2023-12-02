import './index.less'
import {BASE_URL} from "../../constant"
import { useEffect, useState } from 'react'
import axios from 'axios'
import {message} from 'antd'
function UserCenter() {
  const {userData, setUserData} = useState({})

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
          <img src="../../imgs/cm-2.jpeg" alt="" />
          一起冲鸭
        </div>
        <div>
          <p>获得一百次点赞</p>
          <p>获得一百次收藏</p>
        </div>
      </div>
    </div>
  )
}


export default UserCenter