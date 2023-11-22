import { Button, Modal, Form, Select, Radio, Input, message } from "antd";
import {
  BankOutlined,
  EnterOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import store from "../../store";
import "./index.less"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setLocalStorage } from "../../utils";
import { fetchCompanyList } from "../../router";

const Label = (props) => {
  return (
    <div className="label-text">
      {props.children}
      {props.text}
    </div>
  )
}


function InterviewAidModel() {
  useEffect(() => {
    fetchCompanyList();
  }, []);


  const navigate = useNavigate();
  const handleSubmit = (param) => {
    const { company, otherCompany, direction, round } = param;
    if ((!company && !otherCompany) || !direction || !round) {
      message.info('填写面试信息可以方便生成面试记录并复盘哦！请填写相关信息再开始面试吧！');
      return;
    }
    if (company !== '其他') {
      store.formCompany = company;
    } else {
      store.formCompany = otherCompany;
    }
    store.formDirection = direction;
    store.formRound = round;
    store.formImg  = store.companyList.filter(item => item.Name === store.formCompany)[0].ImageUrl;
    store.isAssistantModalOpen = false;
    navigate('/interview');
    setLocalStorage({
      company: company,
      direction: direction,
      round: round,
      img: store.formImg 
    });
  };

  const handleChange = (value, options) => {
    if (value === '其他') {
      setIsOtherCompany(true);
    } else {
      setIsOtherCompany(false);
    }
  };

  const [isOtherCompany, setIsOtherCompany] = useState(false);
  return (
    <div className="form-box">
      <h3>面试辅助</h3>
      <Form onFinish={handleSubmit} layout="horizontal">  
     
        <Form.Item name='company' label={<Label text="面试公司"></Label>}>
          <Select
            showSearch
            placeholder='请选择您要面试的公司'
            onChange={handleChange}
            // onSearch={onSearch}
            // filterOption={filterOption}
            options={store.companyList.map(item => {
              return {
                label: item?.Name,
                value: item?.Name,
              }
            })}
          />
        </Form.Item>
        {
          isOtherCompany &&
          <Form.Item name='otherCompany'>
            <Input placeholder="请输入公司名称" className="other-company" />
          </Form.Item>
        }
        <Form.Item name='direction' label={<Label text="岗位方向"></Label>}>
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
        </Form.Item>
        <Form.Item name='round' label={<Label text="面试轮数"></Label>}>
          <Radio.Group
            options={[1, 2, 3, 4, 5, 'HR']}
            optionType='button'
            size='small'
            style={{ width: "100%" }}
            rules={[{ required: true }]}
          />
        </Form.Item>
        <Form.Item>
          <button
            block
            type='primary'
            htmlType='submit'
            className='login-input text-white rounded text-center  bg-gradient-to-r from-[#ED4D65] to-[#5844CE] '
          >确 认
          </button>
          <p className="text-center text-[12px] text-[#666] mt-3">确认后将开启面试辅助功能</p>
        </Form.Item>
      </Form>
    </div>
  )
}

export default observer(InterviewAidModel)