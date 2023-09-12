import { Button, Input, Select } from "antd";
import { SaveOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./components.less";

const { TextArea } = Input;

const Information = () => {
  return (
    <div className="person-info">
      <div className="title-container">
        <div className="info-title">个人信息</div>
        <Button
          className="title-btn save"
          type="primary"
          size="large"
          shape="round"
          icon={<SaveOutlined />}
        >
        保存
        </Button>
      </div>
      <div className="info-container flex-row">
        <div className="info-unit" style={{width: '18em'}}>
          <div className="info-subtitle">姓名</div>
          <Input
            className="info-input"
            placeholder='姓名'
            size="large" />
        </div>
        <div className="info-unit" style={{width: '18em'}}>
          <div className="info-subtitle">目标岗位</div>
          <Select
            className="info-input"
            placeholder='目标岗位'
            size="large" />
        </div>
      </div>
      <div className="title-container">
        <div className="info-title">项目经历</div>
        <Button
          className="title-btn"
          icon={<PlusCircleOutlined style={{color: '#3f8600'}}/>}
          size="large" shape="round">
        增加
        </Button>
      </div>
      <div className="info-container flex-col">
        <div className="info-unit">
          <div className="text-subtitle">项目描述1</div>
          <Button className="delate-btn"
            icon={<DeleteOutlined style={{color: '#f00'}}/>}
            size="large" shape="round">
            删除
          </Button>
          <TextArea
            className="info-input"
            placeholder='请在此输入一段项目经历'
            size="large" />
        </div>
        <div className="info-unit">
          <div className="text-subtitle">项目描述2</div>
          <Button className="delate-btn"
            icon={<DeleteOutlined style={{color: '#f00'}}/>}
            size="large" shape="round">
            删除
          </Button>
          <TextArea
            className="info-input"
            placeholder='请在此输入下一段项目经历'
            size="large" />
        </div>
      </div>
    </div>
  );
};

export default Information;