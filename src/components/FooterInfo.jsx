import { Layout } from 'antd';
import logo0Url from '../imgs/logo0.png';

const { Footer } = Layout;

const FooterInfo = () => {
  return (
    <Footer className='footer'>
        <div className='info'>
        <div className='detail'>
            <img src={logo0Url} style={{ width: '50px', height: '60px' }}/>
            <div>JobGPT是一个基于chatGPT的智能面试小助手，在线上面试的过程中通过语音识别实时帮你解答八股文等各种问题，提升面试效果，助力你收割大厂offer！</div>
        </div>
        <div className='connect'>
            <div className='desc'>
            <div className='title'>联系我们</div>
            <div className='links'>加入社群</div>
            <div className='links'>招聘合作</div>
            </div>
            <div className='desc'>
            <div className='title'>友情链接</div>
            <div className='links'>chatGPT</div>
            <div className='links'>openAI</div>
            </div>
            <div className='desc'>
            <div className='title'>联系方式</div>
            <div className='links'>ticture@foxmail.com</div>
            <div className='links'>yanyunlong0928@gmail.com</div>
            <div className='links'>yilia_lv@163.com</div>
            </div>
        </div>
        </div>
        <div className='created'>©2023 JobGPT</div>
    </Footer>
  );
};

export default FooterInfo;
