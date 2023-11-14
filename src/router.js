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
  return axios.get(`${BASE_URL}/api/alibaba/hot_word`, { params: { "direction": direction } })
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
  return axios.post(`${BASE_URL}/api/experience/upload`, data).then((res) => {
    const { status } = res;
    if (status === 200) {
      message.success('上传成功');
    }
  }).catch((err) => {
    console.log('err:', err);
    message.error('上传失败');
  });
}

export function updateExperience(params) {
  return axios.post(`${BASE_URL}/api/experience/update`, params).then(res => {
    const { status } = res;
    if (status === 200) {
      message.success('面经已更新');
    }
  }).catch(err => {
    console.log('err:', err);
    message.error('面经更新失败');
  });
}

export function fetchCompanyList() {
  axios.get(`${BASE_URL}/api/company/info`).then((res) => {
    const { status, data: data0 } = res;
    if (status === 200) {
      const { data: { company_info } } = data0;
      store.setCompanyList(company_info);
    }
  }).catch((err) => {
    console.log('err:', err);
  });
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

//模拟面试大厅&首页获取卡片接口，返回卡片列表
export function getCardList(params) {
  return axios.post(`${BASE_URL}/api/experience/mock_interview_hall`, params).then((res) => {
    const { status, data: { data: { mock_interview_cards } }
    } = res;
    if (status === 200) {
      return mock_interview_cards;
    }
  }).catch((err) => {
    console.log('error:', err);
    message.error('获取卡片列表失败');
  });
}

