import { Input, Button, Modal, Form } from 'antd';
import loginUrl from '../../imgs/login.jpg'
import { observer } from 'mobx-react';
import store from '../../store';
import { login } from '../../router';

const Login = () => {
    const handleCancel = () => {
        store.isLoginModalOpen = false;
    };

    const handleSubmit = (params) => {
        login(params);
    }

    return (
        <Modal title="登录" open={store.isLoginModalOpen} onCancel={handleCancel} footer={null}>
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
                        <Input placeholder="请输入验证码登录(4位)" className='login-input' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType="submit" className='login-input'>登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default observer(Login);