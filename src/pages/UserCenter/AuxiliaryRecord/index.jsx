import { Table, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constant";
import dayjs from "dayjs";
import "./index.less"
import CustomInput from "../../../components/Input/Input";
import store from "../../../store"
import img_dele from "../../../imgs/delete.png"
import { Select } from 'antd'
import { useNavigate } from "react-router-dom";
import {InfoCircleOutlined, ExclamationCircleFilled} from "@ant-design/icons"

const { confirm } = Modal;


const AuxiliaryRecord = () => {
  const navagete = useNavigate()
  const [dataList, setDataList] = useState([])
  const [paginationOption, setPaginationOption] = useState({
    current:1,
    total:0
  })
  const [companyList, setCompanyList] = useState([])
  const [search, setSearch] = useState({
    company:'',
    round:''
  })

  const paginaChange = (value) => {
    paginationOption.current = value.current
    setPaginationOption(JSON.parse(JSON.stringify(paginationOption)))
    getExperienceList()
  }

  useEffect(() => {
    getExperienceList()

    axios.get(`${BASE_URL}/api/copilot/get_company`, {
    }).then(res => {
      const {data, code} = res.data
      const farmatCompanyList = store.getFormatCompanyList(data.company_info)   
      setCompanyList(farmatCompanyList)
      document.querySelector(".auxiliaryRecord .input-box > div ").setAttribute('style', `height:${farmatCompanyList.length * 40 + 'px'}`)
    })


  }, [])


const onChange = (value) => {
 
  search.round = value 
  setSearch(search)
  getExperienceList()
};

const onSearch = (value) => {
  console.log('search:', value);
};


  const getExperienceList = () => {
    axios.post(`${BASE_URL}/api/copilot/get_list`, {
      "limit": 10,
      "page": paginationOption.current,
      "sort_type": 0,
      company:search.company,
      round: search.round
    }).then(res => {
      const { code, data } = res.data
      setDataList(data.record_list)
      paginationOption.total = data.total
      setPaginationOption(paginationOption)
    })
  }

  const columns = [
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
      align: "center"
    },
    {
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
      align: "center"
    },
    {
      title: '轮数',
      dataIndex: 'round',
      key: 'round',
      align: "center",
      render(value) {
        const colorMap = {
          一面: '#5592ff',
          二面: '#5743ce',
          三面: '#edbc42',
          四面: '#e9f3ff',
          五面: '#e34d6d',
          HR: '#ea496a'
        }
        return <button style={{ background: colorMap[value], padding: '3px 25px', borderRadius: '5px', color: 'white' }} >{value}</button>
      }
    },
    {
      title: '开始时间',
      align: "center",
      dataIndex: 'start_time',
      key: 'start_time',
      render(value) {
        return dayjs.unix(value).format("YYYY-MM-DD")
      }
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render(value, record) {
        console.log(record,'value==')
        const dele = (value) => {
          confirm({
            title: '确定删除?',
            okText:"确认",
            cancelText:"取消",
            icon: <ExclamationCircleFilled />,
            onOk() {
              console.log(value,'value==')
              axios.post(`${BASE_URL}/api/copilot/delete`, {
                record_id:record.id
              }).then(res => {
                getExperienceList()
              })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        
        }
        const toDetail = (record) => {
          navagete(`/interiew-detail/${record.id}`)
        }
        return (
          <div style={{ display: "flex", 'alignItems': "center" }}>
            <button style={{ padding: '3px 10px', borderRadius: '5px', border: "1px solid #5743ce", color: "#5743ce" }} onClick={() => toDetail(record)}>查看详情</button>
            <img style={{ "marginLeft": '30px', "width": "18px" }} src={img_dele} onClick={() => dele(record)} alt="" />
          </div>
        )
      }
    },
  ];


  return (
    <div className="auxiliaryRecord">
      <div className="person-home-title mb-2 ml-2">
        辅助记录
      </div>
      <div   className="form">
        <div className="form-item">
          <span>公司：</span>
          <CustomInput value={search.company} dataList={companyList} callback= {(value) => {
            search.company = value.Name
            setSearch(search)
            getExperienceList()
          }} />

        </div>
        <div className="form-item">
          <span>轮数：</span>
          <Select
            size="large"
            showSearch
            placeholder="请选择面试轮数"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
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

        </div>
      </div>
      <Table style={{"display" : dataList.length ? 'block' : "none" }} dataSource={dataList} columns={columns} onChange={paginaChange} pagination={{ position: ['bottomCenter'], total:paginationOption.total, current:paginationOption.current, showSizeChanger:false}} />

      <div style={{"display" : dataList.length > 0 ? 'none' : "block", fontSize:"24px" }} className="text-center font-bold py-11" >
        <InfoCircleOutlined size={22} style={{"fontWeight":"bolder"}}/>
        <p className="my-2">
          暂无数据
        </p>
        <p>快去模拟面试大厅看看吧</p>
      </div>
    </div>
  )
}

export default AuxiliaryRecord