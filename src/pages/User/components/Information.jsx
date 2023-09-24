import axios from "axios";
import { BASE_URL } from "../../../constant";
import { useState } from 'react';
import { Button, Input, Select, message } from "antd";
import { SaveOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./components.less";

const { TextArea } = Input;

const Information = ({userInfo, setUserInfo}) => {

  const {nickname, direction, projects } = userInfo;
  const [tempNickname, setNickname] = useState(nickname);
  const [tempDirection, setDirection] = useState(direction);
  const [tempProjects, setProjects] = useState(!projects ? [] : projects);

  function updateUserInfo() {
    if (!tempDirection)
      message.warning('请选择您的目标岗位');
    else {
      const filteredProjects = tempProjects.filter(item => item !== null && item !== "" && item !== undefined);
      setProjects(filteredProjects);
      const newInfo = Object.assign({},userInfo);
      newInfo.nickname = tempNickname;
      newInfo.direction = tempDirection;
      newInfo.projects = tempProjects;
      axios.post(`${BASE_URL}/api/user/update`, newInfo).then((res) => {
        if (res.status === 200) {
          setUserInfo(newInfo);
          message.success('保存成功');
        }
      }).catch((err) => {
        console.log('err:', err);
        message.error('保存失败');
      });
    }
  }

  const addProject = () => {
    const newProjects = [...tempProjects];
    newProjects.push('');
    setProjects(newProjects);
  };

  const changeProject = (e,index) => {
    const newProjects = [...tempProjects];
    newProjects[index] = e.target.value;
    setProjects(newProjects);
  };

  const deleteProject = (e,index) => {
    const newProjects = [...tempProjects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

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
          onClick={updateUserInfo}
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
            value={tempNickname}
            onChange={(e) => setNickname(e.target.value)}
            size="large" />
        </div>
        <div className="info-unit" style={{width: '18em'}}>
          <div className="info-subtitle">目标岗位</div>
          <Select
            className="info-input"
            placeholder='目标岗位'
            options={store.directionList}
            value={tempDirection}
            onChange={(value) => setDirection(value)}
            size="large" />
        </div>
      </div>
      <div className="title-container">
        <div className="info-title">项目经历</div>
        <Button
          className="title-btn"
          icon={<PlusCircleOutlined style={{color: '#3f8600'}}/>}
          onClick={addProject}
          size="large" shape="round">
        增加
        </Button>
      </div>
      <div className="info-container flex-col">
        { tempProjects.map((item,index)=>(
          <div className="info-unit" key={index}>
            <div className="text-subtitle">项目描述{index + 1}</div>
            <Button className="delate-btn"
              icon={<DeleteOutlined style={{color: '#f00'}}/>}
              onClick={deleteProject}
              size="large" shape="round">
              删除
            </Button>
            <TextArea
              className="info-input"
              placeholder='请在此输入一段项目经历'
              value={tempProjects[index]}
              onChange={(e) => changeProject(e, index)}
              size="large" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Information;