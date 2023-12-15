import { BASE_URL } from "../../../constant"
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from "dayjs"
import store from "../../../store"
import "./index.less"
import { DatePicker, Input, message } from 'antd'
import { Button, Modal, Space } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons'

import img_edit from "../../../imgs/编辑.png"
import img_base1 from "../../../imgs/bi-1.png"
import img_base2 from "../../../imgs/bi-2.png"
import img_base3 from "../../../imgs/bi-3.png"
import img_base4 from "../../../imgs/bi-4.png"
import img_dele from "../../../imgs/delete.png"

const farmatTime = (staptime) => {
  return dayjs.unix(staptime).format("YYYY-MM-DD")
}
const PersonHomePage = () => {

  let [personHomeData, setPersonHomeData] = useState([])
  let [baseInfo, setBaseInfo] = useState([
    { title: '面试岗位', value: '', img: img_base1, filed:"direction" },
    { title: '学校', value: '', img: img_base2, filed:"college" },
    { title: '学院', value: '', img: img_base3, filed:"department" },
    { title: '专业', value: '', img: img_base4, filed:"major" },
  ])

  let [isBaseEdit, setisBaseEdit] = useState(false)
  let [isProjectEdit, setisProjectEdit] = useState(false)
  const [modal] = Modal.useModal();
  const modelConfig = {
    index:null,
    title:"提示",
    content:'确认删除?',
    closable:true,
    okText:"确认",
    autoFocusButton:false,
    // footer(){
    //   return (
    //     <div>
    //        {/* <Button type="default">取消</Button> */}
    //        <Button type="primary">确认</Button>
    //     </div>
    //   )
    // },
    onOk(){
      setPersonHomeData(personHomeData.splice(modelConfig.index,1))
      confirm()
      getData()
    },
    onCancel(){

    }
  }
  const updateBaseInfo = (target, index, filed, value , isBase = true) => {
    const data = JSON.parse(JSON.stringify(target))
    data[index][filed] = value 
    if(isBase){
      setBaseInfo(data)
    }else{
      setPersonHomeData(data)
    }
  }

  const confirm = () => {
    setisBaseEdit(false)
    setisProjectEdit(false)
    const sendData = {
      nickname: store.nickName,
      avatar: store.avatar
    }
    baseInfo.map(item => sendData[item.filed] = item.value)
    sendData.projects = personHomeData.map(item => {
      return {
        ...item,
        start_time: new Date(item.start_time).getTime() / 1000,
        end_time: new Date(item.end_time).getTime() / 1000
      }
    })
    console.log(sendData,'sendData=s')
    axios.post(`${BASE_URL}/api/user/update`,sendData).then(res => {
      const {code} = res.data
      if(code == 0){
        message.success("操作成功")
      }else{
        message.warning("操作失败")
      } 
    }).catch(err => {
      message.warning("操作失败")
    })
  }
  const getData = () => {
    axios.get(`${BASE_URL}/api/user/info`).then((res) => {
      const { data, code } = res.data
      if (code == 0) {
        // const baseInfo = 
        baseInfo.map(item => {
          item.value = data[item.filed]
        })
        setBaseInfo(baseInfo)

        const projects = (data.projects || []).map(item => {
          return {
            ...item,
            start_time: farmatTime(item.start_time),
            end_time: farmatTime(item.end_time)
          }
        })
        setPersonHomeData(projects)
       
      }
    }).catch((err) => {
      message.error('获取失败');
    });
  } 
  useEffect(() => {
   getData()
  }, [])

  const add = () => {
    setisProjectEdit(true)
    personHomeData.push( {
      "title": "",
      "content": [
         
      ],
      "start_time": null,
      "end_time": null
  })
  setPersonHomeData(personHomeData)
  }
 
  return (
    <div className="person-home-page">
      <div className="person-home-title">
        基本信息
        <img src={img_edit} style={{ display: !isBaseEdit ? 'block' : 'none' }} onClick={() => { setisBaseEdit(!isBaseEdit) }} alt="" />
        <div className="absolute right-0" style={{ display: isBaseEdit ? 'block' : 'none' }}>
          <button className="bg-white text-[#636363]" onClick={() => { setisBaseEdit(!isBaseEdit) }}>取消</button>
          <button className="bg-gradient-to-r from-[#ED4D65] to-[#5844CE] text-white" onClick={confirm}>确认</button>
        </div>
      </div>
      <div className="base-info">
        {
          baseInfo.map((item, index) => {
            return (
              <div style={{ backgroundImage: `url(${item.img})`, backgroundRepeat: 'no-repeat', backgroundSize: '50px', backgroundPosition: `160px ${[35, 40, 50, 40][index]}px` }}>
                <p>{item.title}</p>
                <input onChange={(e) => {updateBaseInfo(baseInfo, index, 'value' , e.target.value)}} disabled={!isBaseEdit} style={{ border: isBaseEdit ? '1px solid #ededfb' : '', background: isBaseEdit ? '#ededfb' : '' }} type="text" value={item.value} />
              </div>
            )
          })
        }
      </div>
      <div className="person-home-title">
        项目经历
        <img src={img_edit} style={{ display: !isProjectEdit ? 'block' : 'none' }} onClick={() => { setisProjectEdit(!isProjectEdit) }} alt="" />
        <div className="absolute right-0" style={{ display: isProjectEdit ? 'block' : 'none' }}>
          <button className="bg-white text-[#636363]" onClick={() => { setisProjectEdit(!isProjectEdit) }}>取消</button>
          <button className="bg-gradient-to-r from-[#ED4D65] to-[#5844CE] text-white" onClick={confirm}>确认</button>
        </div>
      </div>

      <div className="project-box-view" style={{display: isProjectEdit ? 'none' : 'block'}}>
        {
          personHomeData.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between py-2 color-[rgb(51, 51, 51)]">
                  <div>
                    <span className="mr-5">{item.start_time}~{item.end_time}</span>
                    <span className="mr-5">{item.title}</span>
                  </div>
                  <div>
                    <img src={img_dele} onClick={async () => {
                      console.log(11,'1')
                      modelConfig.index = index
                      Modal.warning(modelConfig)
                    }} alt="" />
                  </div>
                </div>
                <ul className="project-box-content">
                  {
                    item.content.map((c,ci) => {
                      return (
                        <li key={ci}>{c}</li>
                      )
                    })
                  }
                 
                </ul>
              </div>
            )
          })
        }

      </div>
      <div className="project-box-edit" style={{display: isProjectEdit ? 'block' : 'none'}}>
        {
          personHomeData.map((item, index) => {
            return (
              <div className="project-info-item" key={index}>
                <div className="project-info">
                  <div>
                    <p className="py-2">项目时间</p>
                    <div className="flex items-center w-[400px]">

                      <DatePicker format="YYYY-MM-DD" onChange={(date,dateString) => {updateBaseInfo(personHomeData, index, 'start_time', dateString, false)}} placeholder="" defaultValue={item.start_time ? dayjs(item.start_time, 'YYYY-MM-DD') : ''} />
                      &nbsp;至&nbsp;
                      <DatePicker format="YYYY-MM-DD" onChange={(date,dateString) => {updateBaseInfo(personHomeData, index, 'end_time', dateString, false)}} placeholder="" defaultValue={item.start_time ? dayjs(item.end_time, 'YYYY-MM-DD') : ''} />
                    </div>
                  </div>
                  <div>
                    <p className="py-2">项目名称</p>
                    <Input defaultValue={item.title} onChange={e => {updateBaseInfo(personHomeData, index, 'title', e.target.value, false)}} />
                  </div>
                </div>
                <div className="mt-2">
                  <textarea name="" id="" cols="30" rows="10" defaultValue={item.content.join("\n")} onChange={e => {updateBaseInfo(personHomeData, index, 'content', e.target.value.split("\n"), false)}}>
                    
                  </textarea>
                </div>
              </div>
            )
          })
        }

      </div>
      <div className="flex justify-center py-10">
        <PlusCircleFilled style={{fontSize:45, color:'#5744ce'}} onClick={add}/>
      </div>
    </div>
  )
}

export default PersonHomePage