import "./index.less"
import CustomInput from "../../components/Input/Input";
import { Button, Modal, Form, Select, Radio, Input, message, DatePicker } from "antd";
import { PlusSquareFilled, ExclamationCircleFilled } from "@ant-design/icons"
import cm_img_7 from "../../imgs/cm-7.jpeg"
import { useParams, useNavigate } from 'react-router-dom';
import store from '../../store';
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constant";
const { TextArea } = Input;
import dayjs from "dayjs"
const { confirm } = Modal;


const farmatTime = (staptime) => {
  return dayjs.unix(staptime).format("YYYY-MM-DD")
}

function InterviewDetail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({
    experiences: [],
    interview_date:null,
    company:"阿里巴巴"
  })
  let [companyList, setCompanyList] = useState([])
  const navigate = useNavigate();
  const handleChange = () => {

  }

  const cancelEdit = () => {
    navigate(-1)
    
  }
  const confirm = (status) => {
    const sendData = JSON.parse(JSON.stringify(detailData))
   
    sendData.interview_date = new Date(sendData.interview_date).getTime() / 1000
    if(id == 'null' || !id){
      sendData.status = status
      axios.post(`${BASE_URL}/api/experience/create`, sendData).then((res) => {
        message.success("操作成功")
       
      }).catch((err) => {
        message.error("操作失败")
      });

      return
    }
    sendData.experience_id = sendData.id
  
    axios.post(`${BASE_URL}/api/experience/update`, sendData).then((res) => {
      message.success("操作成功")
    }).catch((err) => {
      message.error("操作失败")
    });
  }
  const addExperiences = () => {
    detailData.experiences.push({
      question: '',
      answer: "",
      company:""
    })
    setDetailData(JSON.parse(JSON.stringify(detailData)))
  }
  const getDetail = () => {
    axios.post(`${BASE_URL}/api/experience/get_detail`, { experience_id: Number(id) }).then((res) => {
      res.data.data.interview_date = farmatTime(res.data.data.interview_date)

      setDetailData(res.data.data)
      console.log(res,'ddata')
    }).catch((err) => {
      
    });
  }
  useEffect(() => {
    axios.get(`${BASE_URL}/api/company/info`).then(res => {
      companyList = store.getFormatCompanyList(res.data.data.company_info)
      setCompanyList(companyList)
    })
    if(id){
      getDetail()
    }
    
  }, [])

  return (
    <div className="interview-detail-edit">

      <div className="interview-content">
        <header className="relative bg-[#D9D9F2;]">

          <div className="flex text-[18px] items-center">
            <svg onClick={cancelEdit} width="22" height="22" fill="none">
              <path d="M15.8526 2.5561L6.76165 11.3306C6.48478 11.6063 6.46849 12.0432 6.71279 12.3378L6.76165 12.3913L15.8522 21.4417C15.8897 21.479 15.9404 21.5 15.9933 21.5H17.5567C17.6671 21.5 17.7567 21.4105 17.7567 21.3C17.7567 21.2468 17.7355 21.1958 17.6978 21.1583L8.38992 11.8908L17.6882 2.84334C17.7673 2.76631 17.7691 2.63969 17.692 2.56052C17.6544 2.52183 17.6027 2.5 17.5487 2.5H15.9915C15.9397 2.5 15.8899 2.52011 15.8526 2.5561Z" fill="black" />
            </svg>
            {
              (id != 'null') && (
                <div className="flex text-[18px] items-center">
                  <span className="relative top-[1px] ml-1 mr-2">返回</span>
                  <img className="w-8 h-8 rounded-full mr-4" src={cm_img_7} alt="" />
                  <p className='font-bold text-[18px] mr-4'>{detailData.company} <span className="inline-block w-[6px] h-[6px] ml-1 mr-2 rounded-3xl bg-black relative top-[-2px]"></span>二轮</p>
                  <p>
                    <span className="font-bold">岗位方向：</span>
                    <span>{detailData.direction}</span>
                  </p>
                </div>
                
              )
             
            }
            {
               (id == 'null') && (
                <h3 className="font-bold ml-2">新建面经</h3>
              )
            }
          
          </div>

        </header>
        <div className="flex justify-between p-[15px]">
          <div className="w-[38%] border-r border-red pl-[30px]">
            <p className="font-bold text-[16px] my-3">公司</p>
            <CustomInput className="w-[90%]" value={detailData.company} dataList={companyList} callback={(value) => {
              console.log(value,'value')
              detailData.company = value.Name
            }} />
            <p className="font-bold text-[16px] my-3">岗位方向</p>
            <Select
              showSearch
              placeholder='请选择您的岗位方向'
              rules={[{ required: true }]}
              size="large"
              value={detailData.direction}
              onChange={(value) => {
                detailData.direction = value
                
                setDetailData(JSON.parse(JSON.stringify(detailData)))
              }} 
              className="w-[90%]"
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
            <p className="font-bold text-[16px] my-3">轮数</p>
            <Select
              size="large"
              showSearch
              value={detailData.round}
              onChange={(value) => {
                detailData.round = value
                console.log(value,'tartet--')
                setDetailData(JSON.parse(JSON.stringify(detailData)))
              }} 
              placeholder="请选择面试轮数"
              optionFilterProp="children"
              className="w-[90%]"
              options={[
                {
                  value: '一面',
                  label: '一面',
                },
                {
                  value: '二面',
                  label: '二面',
                },
                {
                  value: '三面',
                  label: '三面',
                },
                {
                  value: '四面',
                  label: '四面',
                },
                {
                  value: '五面',
                  label: '五面',
                },
                {
                  value: 'HR',
                  label: 'HR',
                },
              ]}
            />
            <p className="font-bold text-[16px] my-3">面试日期</p>
         
            <DatePicker className="w-[90%]" format='YYYY-MM-DD' onChange={(m2,value) => {

              detailData.interview_date = value
              setDetailData(JSON.parse(JSON.stringify(detailData)))
            }} value={detailData.interview_date ? dayjs(detailData.interview_date , 'YYYY-MM-DD') : ''}  /> 
            <p className="font-bold text-[16px] my-3">分享内容</p>
            <TextArea className="w-[90%]" rows={3} value={detailData.share_content} onChange={({ target }) => {
              detailData.share_content = target.value
              setDetailData(JSON.parse(JSON.stringify(detailData)))
            }} />
            <p className="font-bold text-[16px] my-3">预设面试风格</p>
            <Radio.Group value={detailData.style} size='large' onChange={({ target }) => {
              detailData.style = target.value
              setDetailData(JSON.parse(JSON.stringify(detailData)))
            }}>
              <Radio.Button value="标准">标准</Radio.Button>
              <Radio.Button value="轻松">轻松</Radio.Button>
              {/* <Radio.Button value="中等">中等</Radio.Button> */}
              <Radio.Button value="严格">严格</Radio.Button>
            </Radio.Group>
          </div>
          <div className="w-[62%]">
            {
              detailData.experiences.map((item, index) => {
                return (
                  <div className="border-b w-[90%] mx-auto py-2" key={index}>
                    <div className="flex items-start">
                      <span className="font-bold mr-4 relative top-[2px] inline-block w-10" style={{ fontSize: 16,whiteSpace:'nowrap' }}>问题{index + 1}</span>
                      <TextArea className="w-[90%] border-none mb-2" rows={1} value={item.question} onChange={({ target }) => {
                        item.question = target.value
                        setDetailData(JSON.parse(JSON.stringify(detailData)))
                      }}/>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-4 relative top-[2px] inline-block w-10" style={{ fontSize: 16, whiteSpace:'nowrap'}}>回答{index + 1}</span>
                      <TextArea className="w-[90%] border-none mb-2" rows={1} value={item.answer} onChange={({ target }) => {
                        item.answer = target.value
                        setDetailData(JSON.parse(JSON.stringify(detailData)))
                      }}/>
                    </div>
                    
                   
                  </div>
                )
              })
            }
            <div className="flex items-center font-bold px-4 py-4 cursor-pointer">
              <PlusSquareFilled className="text-[24px] rounded-[9999px] overflow-hidden mr-2" onClick={addExperiences} />
              添加新的问答对
            </div>
          </div>
        </div>
        <div className="btn-group flex justify-center py-3">
          <button className=" text-white mr-4 py-1 px-6 rounded-sm bg-[#BEBEBE]" onClick={() => confirm(1)}>保存</button>
          <button className="bg-gradient-to-r from-[#ED4D65] to-[#5844CE] py-1 px-6 rounded-sm text-white" onClick={() => confirm(2)}>发布</button>
        </div>
      </div>

    </div>
  )
}

export default InterviewDetail