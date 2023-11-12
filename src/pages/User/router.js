import axios from "axios";
import { BASE_URL } from "../../constant";
import { message } from "antd";
import store from "../../store";

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
  return api.post('/copilot/get_list', params);
}

export function getMockList(params) {
  return api.post('/mock/get_list', params).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取模拟面试列表失败');
  });
}

export function getInterviewDetail(params) {
  api.post('/copilot/get_detail', params).then((res) => {
    const { status, data: data0 } = res;
    if (status === 200) {
      const { code, data, message } = data0;
      if (code === 0) {
        const { id, records } = data;
        store.setInterviewDetails(records);
      } else if (code === 1) {
        message.error(message);
      } else if (code === 2) {
        throw new Error(message);
      }
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取面试详情失败');
  });
}

export function getFavoriteList(params) {
  return axios.post(`${BASE_URL}/api/experience/list_favorite`, params).then((res) => {
    const { status, data: data0 } = res;
    if (status === 200) {
      const { code, data, message } = data0;
      if (code === 0) {
        return data;
      } else if (code === 1) {
        message.error(message);
      } else if (code === 2) {
        throw new Error(message);
      }
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取收藏列表失败');
  });
}