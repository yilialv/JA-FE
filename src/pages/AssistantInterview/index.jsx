import img_bg from "../../imgs/bg.png"
import CustomInput from "../../components/Input/Input";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Select, Radio, Input, message } from "antd";
import store from "../../store";
import "./index.less"
import {ShareCard}  from "../Home/Card"
import axios from "axios";
import { BASE_URL } from "../../constant";

const AssistantInterview = () => {
  const [search, setSearch] = useState({
    company: ""
  })
  const [cardList,setCardList] = useState([])

  useEffect(() => {
    axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, {
      "company": "",
      "direction": "",
      "limit": 10,
      "page": 1,
      "round": "1",
      "sort_type": 0
    }).then(res => {
      const {data, code} = res.data
      const farmatCompanyList = store.getFormatCompanyList(data.company_info)   
      setCompanyList(farmatCompanyList)
    })
  })
  return (
    <div className="assistant-interview">
      <div className="w-[1440px] mx-auto">
        <img src={img_bg} className="w-full" alt="" />
      </div>
      <div className="w-[1440px] mx-auto py-8 flex">
        <div className="flex items-center">
          <span className="font-bold">公司：</span>
          <CustomInput value={search.company} dataList={store.getFormatCompanyList()} callback={(value) => { }} />
        </div>
        <div className="flex items-center ml-4">
          <span className="font-bold">岗位方向：</span>
          <Select
            className="min-[200px]"
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
        <div className="flex items-center ml-4">
          <span className="font-bold w-[120px] ">面试轮数：</span>
          <Radio.Group
            options={[1, 2, 3, 4, 5, 'HR']}
            optionType='button'
            size='small'
            style={{ width: "100%" }}
            rules={[{ required: true }]}
          />
        </div>
      </div>
      <div className="w-[1440px] mx-auto py-3 flex flex-wrap">
        {
           cardList.map(item => <ShareCard key={item.id} like={like} dataSource={item} />)
        }
      </div>
    </div>
  )
}

export default AssistantInterview