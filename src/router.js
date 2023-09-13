import axios from "axios";
import { BASE_URL } from "./constant";
import { message } from "antd";
import store from "./store";

axios.defaults.withCredentials = true;

export function getHomeData() {
  axios.get(`${BASE_URL}/api/page/index`).then((res) => {
    const { status } = res;
    if (status === 200) {
      const { nick_name } = res.data;
      const params = {
        nickName: nick_name,
      };
      store.setHomeInfo(params);
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('获取首页信息失败');
  });
}

export function login(params) {
  axios.post(`${BASE_URL}/api/wx/login`, params).then((res) => {
    const { status } = res;
    if (status === 200) {
      message.info('登录成功');
      const { jwt_token, nick_name } = res.data;
      store.setUserInfo(jwt_token, nick_name);
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('登录失败，别灰心，再试一次吧～');
  }).finally(() => {
    store.isLoginModalOpen = false;
  });
}

export function logout() {
  axios.post(`${BASE_URL}/api/wx/logout`).then((res) => {
    const { status } = res;
    if (status === 200) {
      message.info('退出登录成功');
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('登出失败');
  }).finally(() => {
    store.isLogin = false;
  });
}

export function getToken() {
  return axios.get(`${BASE_URL}/api/alibaba/token`)
    .then((res) => {
      const { status } = res;
      if (status === 200) {
        const { token } = res.data;
        const { id } = token;
        return id; // 当请求成功时返回 token ID
      }
      throw new Error("Failed to get a valid response status"); // 抛出一个错误，如果响应状态不是 200
    })
    .catch((err) => {
      console.log('err:', err);
      message.error('获取token失败');
      throw err; // 确保错误被重新抛出，以便调用函数可以捕获它
    });
}