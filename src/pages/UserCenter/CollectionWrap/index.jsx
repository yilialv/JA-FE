import { ShareCard } from "../../Home/Card"
import axios from 'axios'
import { BASE_URL } from "../../../constant"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./index.less"

const MyFace = () => {
  const [experienceList, setExperience] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    getExperienceList()
  }, [])
  const getExperienceList = () => {
    axios.post(`${BASE_URL}/api/experience/list_favorite`, {
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
         面经收藏
      </div>
      <div className="my-face-box">
        {
          experienceList.map(item => <ShareCard onClick={() => { navigateToMockInterview(item); }} key={item.id} like={like} dataSource={item} />)
        }
      </div>
    </div>

  )
}

export default MyFace