import { Input, Button, Modal, Form, message } from 'antd';
import loginUrl from '../../imgs/login.jpg'
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { observer } from 'mobx-react';
import store from '../../store';

const Login = () => {
    const handleCancel = () => {
        store.isLoginModalOpen = false;
    };

    const handleSubmit = (param) => {
        axios.post(`${BASE_URL}/api/wx/login`, param).then((res) => {
            console.log(res);
            const { status } = res;
            if (status === 200) {
                message.info('登陆成功');
                const { jwt_token, nick_name } = res.data;
                store.setJwtToken(jwt_token, nick_name);
                store.nickName = nick_name;
                store.isLogin = true;
            }
        }).catch((err) => {
            console.log(err);
            message.error('登陆失败，别灰心，再试一次吧～')
        }).finally(() => {
            handleCancel();
        });
    }

    return (
        <Modal title="登陆" open={store.isLoginModalOpen} onCancel={handleCancel} footer={null}>
            <div className='login'>
                <div className='login-text gap'>微信扫码关注公众号</div>
                <div className='login-send'>
                    <div className='login-text'>在公众号发送“</div>
                    <div className='login-text emphasize'>验证码</div>
                    <div className='login-text'>”三个字获取验证码</div>
                </div>
                <img src={loginUrl} className='login-img'></img>
                <Form onFinish={handleSubmit}>
                    <Form.Item name="verify_code">
                        <Input placeholder="请输入验证码登陆(4位)" className='login-input' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className='login-input'>登陆</Button>
                    </Form.Item>
                </Form>
                
            </div>
        </Modal>
    );
};

export default observer(Login);