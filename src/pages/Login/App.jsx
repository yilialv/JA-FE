import { Layout, Input, Button } from 'antd';
import logoUrl from '../../imgs/logo.jpg'

const { Content } = Layout;

const Login = () => {
    return (
        <Content className='content'>
            <div className='login-text gap'>微信扫码关注公众号</div>
            <div className='login-send'>
                <div className='login-text'>在公众号发送“</div>
                <div className='login-text emphasize'>验证码</div>
                <div className='login-text'>”三个字获取验证码</div>
            </div>
            <img src={logoUrl} className='login-img'></img>
            <Input placeholder="请输入验证码登陆(6位)" className='login-input' />
            <Button type='primary' className='login-input'>登陆</Button>
        </Content>
    );
}

export default Login;