import { Button, Modal, Form, Select, Radio, Input, message } from "antd";
import {
  BankOutlined,
  EnterOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import store from "../../store";
import './App.less';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setLocalStorage } from "../../utils";
import { fetchCompanyList } from "../../router";

const AssistantModal = () => {
  useEffect(()=> {
    fetchCompanyList();
  },[]);

  const handleCancel = () => {
    store.isAssistantModalOpen = false;
  };

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
    store.isAssistantModalOpen = false;
    navigate('/interview');
    setLocalStorage({
      company: company, 
      direction: direction, 
      round: round
    });
  };

  const handleChange = (value, options) => {
    console.log(options)
    if (value === '其他') {
      setIsOtherCompany(true);
    } else {
      setIsOtherCompany(false);
    }
  };

  const [ isOtherCompany, setIsOtherCompany ] = useState(false);

  return (
    <Modal
      centered
      width={300}
      title='面试小助手'
      open={store.isAssistantModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className='basic-info'>
        <Form onFinish={handleSubmit}>
          <MessageOutlined />轮数
          <Form.Item name='round'>
            <Radio.Group
              options={[1, 2, 3, 4, 5]}
              optionType='button'
              size='small'
              style={{ width: "100%" }}
              rules={[{ required: true }]}
              // onChange={onChange1} value={value1}
            />
          </Form.Item>
          <BankOutlined />公司
          <Form.Item name='company'>
            <Select
              showSearch
              placeholder='请选择您要面试的公司'
              onChange={handleChange}
              // onSearch={onSearch}
              // filterOption={filterOption}
              options={ store.companyList.map(item => {
                return {
                  label: item?.Name,
                  value: item?.Name,
                }
              }) }
            />
          </Form.Item>
          {
            isOtherCompany &&
            <Form.Item name='otherCompany'>
              <Input placeholder="请输入公司名称" className="other-company" />
            </Form.Item>
          }
          <EnterOutlined />岗位方向
          <Form.Item name='direction'>
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
          <Form.Item>
            <Button
              block
              type='primary'
              htmlType='submit'
              className='login-input'
            >开始
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default observer(AssistantModal);
