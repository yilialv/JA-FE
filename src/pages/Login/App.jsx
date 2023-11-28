import React, { useEffect, useState } from "react";
import { Input, Button, Modal, Form } from "antd";
import axios from "axios";
import { observer } from "mobx-react";
import store from "../../store";

const API_BASE_URL = "https://job581.cn/api";

// 获取二维码的 ticket
const getQrCodeTicket = async (randomNumber) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/wx/login_qrcode_ticket`,
      {
        scene_id: randomNumber,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching QR code ticket:", error);
    // 根据你的错误处理策略进行处理，可能是返回默认值或抛出异常
    throw error;
  }
};

// 检查登录状态
const checkLoginStatus = async (randomNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/wx/check_scan_result`, {
      scene_id: randomNumber,
    });
    return response.data != null;
  } catch (error) {
    console.error("Error checking login status:", error);
    // 根据你的错误处理策略进行处理
    throw error;
  }
};

const generateRandomInt32 = () => {
  // 生成随机32位整数
  const min = 0;
  const max = 2147483647;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Login = () => {
  const [ticket, setTicket] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);
  useEffect(() => {
    if (store.isLoginModalOpen) {
      const newRandomNumber = generateRandomInt32();
      setRandomNumber(newRandomNumber);
      getQrCodeTicket(newRandomNumber).then((res) => {
        setTicket(res); // 确保这与你的API响应匹配
      });

      const intervalId = setInterval(() => {
        checkLoginStatus(newRandomNumber).then((status) => {
          if (status) {
            clearInterval(intervalId);
            store.isLoginModalOpen = false;
            window.location.href = "/"; // 重定向到首页
          }
        });
      }, 1000);

      setTimeout(() => clearInterval(intervalId), 300000); // 300秒后停止轮询

      return () => clearInterval(intervalId);
    }
  }, [store.isLoginModalOpen]);

  const handleCancel = () => {
    store.isLoginModalOpen = false;
  };

  return (
    <Modal
      title="登录"
      open={store.isLoginModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="login">
        <div className="login-send">
          <div className="login-text ">微信扫码</div>
          <div className="login-text emphasize">关注公众号</div>
          <div className="login-text ">自动登录</div>
        </div>
        {ticket && (
          <img
            src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`}
            className="login-img"
            alt="QR Code"
          />
        )}
      </div>
    </Modal>
  );
};

export default observer(Login);
