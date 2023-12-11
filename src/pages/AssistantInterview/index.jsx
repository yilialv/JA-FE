import img_bg from "../../imgs/bg.png"
import img_filter from "../../imgs/filter.svg"
import CustomInput from "../../components/Input/Input";
import { useEffect, useState } from "react";
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import { Button, Modal, Form, Select, Radio, Input, DatePicker  } from "antd";
import store from "../../store";
import "./index.less"
import { ShareCard } from "./Card"
import axios from "axios";
import { BASE_URL } from "../../constant";

const AssistantInterview = () => {
  const [search, setSearch] = useState({
    company: ""
  })
  const [cardList, setCardList] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, {

      "limit": 10,
      "page": 1,

    }).then(res => {
      const { data, code } = res.data
      setCardList(data.mock_interview_cards)
    })
  })
  return (
    <div className="assistant-interview">
      <div className="w-[1200px] mx-auto">
        <img src={img_bg} className="w-full" alt="" />
      </div>
      <div className="w-[1200px] mx-auto py-8 pb-4  flex">
        <div className="flex items-center">
          <span className="font-bold">公司：</span>
          <CustomInput value={search.company} dataList={store.getFormatCompanyList()} callback={(value) => { }} />
        </div>
        <div className="flex items-center ml-5">
          <span className="font-bold">岗位方向：</span>

          <Select
           
            showSearch
            placeholder='请选择您的岗位方向'
            rules={[{ required: true }]}
            // onChange={onChange}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={[
              {
                value: "前端开发",
                label: "前端开发",
              },
              {
                value: "后端开发",
                label: "后端开发",
              },
              {
                value: "产品经理",
                label: "产品经理",
              },
              {
                value: "测试开发",
                label: "测试开发",
              },
              {
                value: "UI",
                label: "UI",
              },
            ]}
          />
        </div>
        <div className="flex items-center ml-5">
          <span className="font-bold w-[80px] ">面试轮数：</span>
          <ul className="flex rounded-[10px] overflow-hidden border bg-white font-bold">
            {
              [1, 2, 3, 4, 5, 'HR'].map((item,index) => <li key={index} onClick={() => setActiveIndex(index)} className={`px-3 cursor-pointer py-[8px] ${index == activeIndex ? 'liActve' : ''}`}>{item}</li>)
            }
          </ul>
        </div>
        <div className="flex items-center ml-4 relative">
          <span>
            <img src={img_filter} className="w-[15px]" alt="" />
          </span>
          <span className="font-bold ml-1">时间筛选</span>
          <DatePicker className="absolute opacity-0" picker="month" locale={locale} />
        </div>
      </div>
      <div className="w-[1200px] mx-auto flex justify-end  pr-5">
          <ul className="filter-ul border">
            <li className="active">热度最高</li>
            <li className="noActive">最新发布</li>
          </ul>
      </div>
      <div className="w-[1200px] mx-auto py-3 flex flex-wrap">
        {
          cardList.map(item => <ShareCard key={item.id} like={() => { }} dataSource={item} />

          )
        }
      </div>
    </div>
  )
}

export default AssistantInterview