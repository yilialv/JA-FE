import img_bg from "../../imgs/bg.png"
import img_filter from "../../imgs/filter.svg"
import CustomInput from "../../components/Input/Input";
import { useEffect, useState } from "react";
import locale from 'antd/es/date-picker/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import { Button, Modal, Form, Select, Radio, Input, DatePicker } from "antd";
import store from "../../store";
import "./index.less"
import { ShareCard } from "./Card"
import axios from "axios";
import { BASE_URL } from "../../constant";
const { RangePicker } = DatePicker;
const AssistantInterview = () => {
  const [search, setSearch] = useState({
    company: ""
  })
  const [filterActiveIndex, setFilterActiveIndex] = useState(0)
  const [cardList, setCardList] = useState([])
  const [activeIndex, setActiveIndex] = useState('')
  const [direction, setDirection] = useState('')
  const [company, setCompany] = useState()
  const [time, setTime] = useState([])
  const getList = () => {
    axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, {
      "limit": 10,
      "page": 1,
      sort_type:filterActiveIndex,
      round: activeIndex == '' ? '' : ['一面','二面','三面','四面','五面','HR'][activeIndex],
      direction,
      company,
      start_time: new Date(time[0]).getTime() / 1000,
      end_time: new Date(time[1]).getTime() / 1000
    }).then(res => {
      const { data, code } = res.data
      setCardList(data.mock_interview_cards)
    })
  }
  useEffect(() => {
    getList()
  },[filterActiveIndex, activeIndex,direction, company, time])
  return (
    <div className="assistant-interview">
      <div className="w-[1200px] mx-auto">
        <img src={img_bg} className="w-full" alt="" />
      </div>
      <div className="w-[1200px] mx-auto pt-5 pr-4 pb-4   flex justify-end">
        <div className="flex items-center ml-4 relative">
          {
            time.length ?  <span className="mr-2 font-bold">
              {time[0]}～{time[1]}
            </span> :''
          }
          <span>
            <img src={img_filter} className="w-[15px]" alt="" />
          </span>
          {/* <span className="font-bold ml-1">时间筛选</span> */}
          <RangePicker className="absolute opacity-0" format='YYYY-MM-DD' onChange={val => {
            // console.log(val.map(v => v.format('YYYY-MM-DD')),'value=')
            setTime(val.map(v => v.format('YYYY-MM-DD')))
          }} locale={locale} />
        </div>
      </div>
      <div className="w-[1200px] mx-auto  pb-4  flex">
        <div className="flex items-center">
          <span className="font-bold">公司：</span>
          <CustomInput value={search.company} dataList={store.getFormatCompanyList()} callback= {(value) => {
            setCompany(value.Name) 
          }}  />
        </div>
        <div className="flex items-center ml-7 relative top-[-3px]">
          <span className="font-bold">岗位方向：</span>

          <Select
            value={direction}
            onChange={value => setDirection(value)}
            showSearch
            placeholder='请选择您的岗位方向'
            rules={[{ required: true }]}
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
        <div className="flex items-center ml-7">
          <span className="font-bold w-[80px] ">面试轮数：</span>
          <ul className="flex rounded-[10px] overflow-hidden border bg-white font-bold">
            {
              [1, 2, 3, 4, 5, 'HR'].map((item, index) => <li key={index} onClick={() =>{
                if(activeIndex == index){
                  setActiveIndex('')
                  return
                }
                setActiveIndex(index)
              }} className={`px-3 cursor-pointer py-[8px] ${index === activeIndex ? 'liActve' : ''}`}>{item}</li>)
            }
          </ul>
        </div>

      </div>
      <div className="w-[1200px] mx-auto flex justify-end  pr-3 pb-3">
        <ul className="filter-ul border cursor-pointer">
          <li onClick={() => { setFilterActiveIndex(0) }} className={`${filterActiveIndex == 0 ? 'active' : 'noActive'}`}>热度最高</li>
          <li onClick={() => { setFilterActiveIndex(3) }} className={`${filterActiveIndex !== 0 ? 'active' : 'noActive'}`}>最新发布</li>
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