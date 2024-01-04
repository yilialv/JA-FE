import { ShareCard } from "../../Home/Card"
import axios from 'axios'
import { BASE_URL } from "../../../constant"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./index.less"
import {Modal} from "antd"
import img_dele from "../../../imgs/delete.png"
import img_edit from "../../../imgs/edit.png"
import img_share from "../../../imgs/share.png"
import { ExclamationCircleFilled, PlusCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;


const MyFace = () => {
  const [experienceList, setExperience] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    getExperienceList()
  }, [])

  const getExperienceList = () => {
    axios.post(`${BASE_URL}/api/experience/get_list`, {
      "limit": 999,
      "page": 1,
      "sort_type": 0
    }).then(res => {
      const { code, data } = res.data
      setExperience(data.experience_list)
      console.log(data, 'data==')
    })
  }
  const toDetail = (record) => {
    navagete(`/interiew-detail/${record.id}`)
  }

  const like = (item) => {
    axios.post(`${BASE_URL}/api/experience/set_favorite`, { experience_id: item.id }).then((res) => {
      if (res.code !== 200) {
        getExperienceList();
      }
    }).catch((err) => {

    });
  };
  const navigateToMockInterview = (item) => {
    console.log(item)
    const { id, company, direction, round } = item;
    const req = {
      id: id,
      company: company,
      direction: direction,
      round: round
    };
    navigate('/mockInterviewConfig', { state: req });
  };
  const toEdit = (item) => {
    navigate(`/interiew-edit/${item.id}`)
  }
  const add = () => {
    navigate(`/interiew-edit/null`)
  }
  const toDelete = (item) => {
    confirm({
      title: '确定删除?',
      okText:"确认",
      cancelText:"取消",
      icon: <ExclamationCircleFilled />,
      onOk() {
        axios.post(`${BASE_URL}/api/experience/delete`, {
          experience_id:item.id
        }).then(res => {
         getExperienceList()
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  
  }

  return (
    <div>
      <div className="person-home-title mb-3">
        我的面经
      </div>
      <div className="my-face-box">
        {
          experienceList.map(item => <ShareCard  key={item.id} like={like} dataSource={item} >
            <div className="flex relative top-[-10px]">
              <img src={img_share} className="ml-1 w-[16px]"  alt="" />
              <img src={img_edit} onClick={() => {toEdit(item)}} className="ml-1 w-[16px]" alt="" />
              <img src={img_dele} onClick={() => {toDelete(item)}} className="ml-1 w-[16px]" alt="" />
            </div>
          </ShareCard>)
        }
      </div>
      <div className="flex justify-center py-10">
        <PlusCircleFilled style={{fontSize:45, color:'#5744ce'}} onClick={add}/>
      </div>
    </div>

  )
}

export default MyFace