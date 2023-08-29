import { Layout, Input, Button, Modal } from 'antd';
import loginUrl from '../../imgs/login.jpg'

const Login = (props) => {
    const { open, onCancel } = props;

    return (
        <Modal title="登陆" open={open} onCancel={onCancel} footer={null}>
            <div className='login'>
                <div className='login-text gap'>微信扫码关注公众号</div>
                <div className='login-send'>
                    <div className='login-text'>在公众号发送“</div>
                    <div className='login-text emphasize'>验证码</div>
                    <div className='login-text'>”三个字获取验证码</div>
                </div>
                <img src={loginUrl} className='login-img'></img>
                <Input placeholder="请输入验证码登陆(6位)" className='login-input' />
                <Button type='primary' className='login-input'>登陆</Button>
            </div>
        </Modal>
    );
};

export default Login;