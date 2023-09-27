import { useState } from 'react';
import { Input, Button, Select } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined, SaveOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { uploadExperience } from '../../router';

const RecordUpload = () => {
  const [conversations, setConversations] = useState([{
    "question": "", "answer": ""
  }]);
  const [data, setData] = useState({
    company: null,
    direction: null,
    category: null,
    style: null,
    time: null,
  });

  const handleChangeLeft = (e, index) => {
    const newconversations = [...conversations];  // 创建输入值数组的副本
    newconversations[index]['question'] = e.target.value;  // 更新特定索引的输入值
    setConversations(newconversations);  // 更新状态
  };

  const handleChangeRight = (value, key) => {
    // 使用函数式更新以获取最新的 state
    setData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const addInput = () => {
    setConversations([...conversations, {
      "question": "", "answer": ""
    }]);  // 添加一个新的输入框
  };

  const removeInput = (index) => {
    const newconversations = [...conversations];  // 创建输入值数组的副本
    newconversations.splice(index, 1);  // 移除特定索引的输入框
    setConversations(newconversations);  // 更新状态
  };

  const uploadData  = () => {
    data.conversations = conversations;
    uploadExperience(data);
  };

  return (
    <Content className="record-upload">
      <div className="flex-col upload-left">
        {conversations.map((inputValue, index) => (
          <div className='flex-row left-unit' key={index}>
            <div className="text-bold">问题{index + 1}</div>
            <Input.TextArea
              value={inputValue['question']}
              placeholder='面试官怎么说？'
              onChange={(e) => handleChangeLeft(e, index)}
            />
            <Button
              className='small-btn'
              type='text'
              size='small'
              shape='circle'
              icon={<MinusCircleOutlined />}
              onClick={() => removeInput(index)}
            />
          </div>
        ))}
        <Button
          className='add-btn'
          type='text'
          size='large'
          shape='round'
          icon={<PlusCircleOutlined />}
          onClick={addInput}>
            添加新问题
        </Button>
      </div>

      <div className="flex-col upload-right">
        <div className='flex-col right-unit'>
          <div className='text-bold'>公司</div>
          <Select size='large'
            onChange={(e) => handleChangeRight(e,'company')}
            options={[
              {value: "字节跳动",label: "字节跳动"},
            ]}
          />
        </div>
        <div className='flex-col right-unit'>
          <div className='text-bold'>岗位方向</div>
          <Select size='large'
            onChange={(e) => handleChangeRight(e,'direction')}
            options={[
              {value: "前端",label: "前端"},
              {value: "后端",label: "后端"},
            ]}
          />
        </div>
        <div className='flex-col right-unit'>
          <div className='text-bold'>轮数</div>
          <Select size='large'
            onChange={(e) => handleChangeRight(e,'category')}
            options={[
              {value: "1",label: "1"},
              {value: "2",label: "2"},
              {value: "3",label: "3"},
              {value: "4",label: "4"},
              {value: "5",label: "5"},
            ]}
          />
        </div>
        <div className='flex-col right-unit'>
          <div className='text-bold'>面试风格</div>
          <Select size='large'
            onChange={(e) => handleChangeRight(e,'style')}
            options={[
              {value: "严肃",label: "严肃"},
              {value: "活泼",label: "活泼"},
            ]}
          />
        </div>
        <div className='flex-col right-unit'>
          <div className='text-bold'>时间容忍度</div>
          <Select size='large'
            onChange={(e) => handleChangeRight(e,'time')}
            options={[
              {value: "高",label: "高"},
              {value: "中",label: "中"},
              {value: "低",label: "低"},
            ]}
          />
        </div>
        <div
          className='flex-row right-unit'
          style={{justifyContent: 'space-around',marginTop: '40px'}}
        >
          <Button
            size='large'
            icon={<SaveOutlined />}
          >保存</Button>
          <Button
            size='large'
            type='primary'
            icon={<CheckCircleFilled />}
            onClick={uploadData}
          >发布</Button>
        </div>
      </div>
    </Content>
  );
};

export default RecordUpload;