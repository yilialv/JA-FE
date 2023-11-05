import { Layout } from 'antd';


const { Footer } = Layout;

const FooterInfo = () => {
  return (
    <Footer className='footer bg-[#EDEDFB]'>
      <div className='flex ='>
        <div className='footer-desc ' style={{width:'40%'}}>
          <h2 className='text-lg font-bold'>关于我们</h2>
          <h3 className='text-base font-bold my-1'>JObGPT</h3>
          <div className=''>JobGPT是一个基于chatGPT的智能面试小助手，在线上面试的过程中通过语音识别实时帮你解答八股文等各种问题，提升面试效果，助力你收割大厂offer！</div>
        </div>
        <div className='footer-desc'>
          <div className='footer-title'>联系我们</div>
          <div className='footer-links'>加入社群</div>
          <div className='footer-links'>招聘合作</div>
        </div>
        <div className='footer-desc'>
          <div className='footer-title'>友情链接</div>
          <div className='footer-links'>chatGPT</div>
          <div className='footer-links'>openAI</div>
        </div>
        <div className='footer-desc'>
          <div className='footer-title'>联系方式</div>
          <div className='footer-links'>ticture@foxmail.com</div>
          <div className='footer-links'>yanyunlong0928@gmail.com</div>
          <div className='footer-links'>yilia_lv@163.com</div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterInfo;
