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
            }
            store.setHomeInfo(params);
        }
    }).catch((err) => {
        console.log('err:', err);
        message.error('获取首页信息失败')
    })
}

export function login(params) {
    axios.post(`${BASE_URL}/api/wx/login`, params).then((res) => {
        const { status } = res;
        if (status === 200) {
            message.info('登陆成功');
            const { jwt_token, nick_name } = res.data;
            store.setUserInfo(jwt_token, nick_name);
        }
    }).catch((err) => {
        console.log('err:', err);
        message.error('登陆失败，别灰心，再试一次吧～')
    }).finally(() => {
        store.isLoginModalOpen = false;
    });
}

export function logout() {
    axios.post(`${BASE_URL}/api/wx/logout`).then((res) => {
        const { status } = res;
        if (status === 200) {
            message.info('退出登陆成功');
        }
    }).catch((err) => {
        console.log('err:', err);
        message.error('登出失败')
    }).finally(() => {
        store.isLogin = false;
    });
}