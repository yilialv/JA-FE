import { ShareCard } from "../../Home/Card"
import axios from 'axios'
import { BASE_URL } from "../../../constant"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./index.less"

import img_dele from "../../../imgs/delete.png"
import img_edit from "../../../imgs/edit.png"
import img_share from "../../../imgs/share.png"

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


  return (
    <div>
      <div className="person-home-title mb-3">
        我的面经
      </div>
      <div className="my-face-box">
        {
          experienceList.map(item => <ShareCard onClick={() => { navigateToMockInterview(item); }} key={item.id} like={like} dataSource={item} >
            <div className="flex relative top-[-10px]">
              <img src={img_share} className="ml-1 w-[16px]"  alt="" />
              <img src={img_edit}  className="ml-1 w-[16px]" alt="" />
              <img src={img_dele}  className="ml-1 w-[16px]" alt="" />
            </div>
          </ShareCard>)
        }
      </div>
    </div>

  )
}

export default MyFace