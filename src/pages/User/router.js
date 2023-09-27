import axios from "axios";
import { BASE_URL } from "../../constant";
import { message } from "antd";


const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 1000,
});

export function updateUserInfo(data) {
  // return api.post('/user/update', data);
  api.post('/user/update', data).then((res) => {
    if (res.status === 200) {
      message.success('保存成功');
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('保存失败');
  });
}

export function getCopilotList(params) {
  api.post('/copilot/get_list', params).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取辅助面试列表失败');
  });
}

export function getMockList(params) {
  api.post('/mock/get_list', params).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取模拟面试列表失败');
  });
}

