import axios from "axios";
import { BASE_URL } from "./constant";
import { message } from "antd";
import store from "./store";

axios.defaults.withCredentials = true;

export function getHomeData() {
  axios.get(`${BASE_URL}/api/page/index`).then((res) => {
    const { status } = res;
    if (status === 200) {
      const { nick_name } = res.data.data;
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
      const { jwt_token, nick_name } = res.data.data;
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
        const { token } = res.data.data;
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

export function getHotWordID(direction) {
  return axios.get(`${BASE_URL}/api/alibaba/hot_word`,{params:{"direction": direction}})
    .then((res) => {
      const { status } = res;
      if (status === 200) {
        const { id } = res.data.data;
        return id; // 当请求成功时返回 hot word ID
      }
      throw new Error("Failed to get a valid response status"); // 抛出一个错误，如果响应状态不是 200
    })
    .catch((err) => {
      console.log('err:', err);
      message.error('获取hot word id失败');
      throw err; // 确保错误被重新抛出，以便调用函数可以捕获它
    });
}

export function uploadExperience(data) {
  axios.post(`${BASE_URL}/api/experience/upload`, data).then((res) => {
    const { status } = res;
    if (status === 200) {
      message.info('上传成功');
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('上传失败');
  }).finally(() => {
    store.isLogin = false;
  });
}

export function fetchCompanyList() {
  if (!store.companyList.length)
    axios.get(`${BASE_URL}/api/company/info`).then((res) => {
      const { status } = res;
      if (status === 200) {
        const list = res.data.data.company_info;
        list.forEach(e => {
          e.value = e.name;
          e.label = e.name;
        });
        store.companyList = list;
        return list;
      }
    }).catch((err) => {
      console.log('err:', err);
      message.error('获取公司列表失败');
    }).finally(() => {
      //store.isLogin = false;
    });

  return store.companyList;
}

export function getInterviewDetail(params) {
  return axios.post(`${BASE_URL}/api/copilot/get_detail`, params).then((res) => {
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
    message.error('获取面试详情失败');
    throw new Error(err);
  });
}

export function setStarCard(params) {
  return axios.post(`${BASE_URL}/api/experience/set_favorite`, params).then((res) => {
    const { status, data: data0 } = res;
    if (status === 200) {
      return data0;
    }
  }).catch((err) => {
    throw err;
  });
}

export function cancelStarCard(params) {
  return axios.post(`${BASE_URL}/api/experience/cancel_favorite`, params).then((res) => {
    const { status, data: data0 } = res;
    if (status === 200) {
      return data0;
    }
  }).catch((err) => {
    throw err;
  });
}