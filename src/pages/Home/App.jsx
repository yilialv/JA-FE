import { Button, Layout, Statistic, Card, Divider, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import SlideInOnMount from '../../components/SlideInOnMount';
import ElasticEffect from '../../components/ElasticEffect';
import logo1Url from '../../imgs/logo1.png';
import aliyunUrl from '../../imgs/aliyun.jpg'
import souhuUrl from '../../imgs/souhu.jpg'
import zuiyouUrl from '../../imgs/zuiyou.jpg'
import { observer } from 'mobx-react';
import store from '../../store';

const { Content } = Layout;
const { Meta } = Card;

const Home = () => {
    const openLogin = () => {
        store.isLoginModalOpen = true;
    };

    return (
        <Content className='content'>
            <img src={logo1Url} className='logo' />
            <ElasticEffect>
                <SlideInOnMount>
                    <div className='title'>AI面试小助手，助力收割大厂offer</div>
                </SlideInOnMount>
            </ElasticEffect>
            <div className='statistics'>
                <div className='text'>为你彻底解决背八股文的烦恼！</div>
            </div>
            <div className='statistics'>
                <div className='text'>已经成功帮助</div>
                <Statistic value={123456} valueStyle={{ color: '#3f8600', fontWeight: '600' }} />
                <div className='text'>人拿到心仪offer！</div>
            </div>
            <div className='btn-container'>
                {
                    store.isLogin ?
                        <Link to="/interview"><Button type='default' className='btn'>模拟面试</Button></Link>
                        :
                        <Link to="/"><Button type='default' className='btn' onClick={openLogin}>模拟面试</Button></Link>
                }
                {
                    store.isLogin ?
                        <Link to="/interview"><Button type='primary' className='btn'>开启面试小助手</Button></Link>
                        :
                        <Link to="/"><Button type='primary' className='btn' onClick={openLogin}>开启面试小助手</Button></Link>
                }
            </div>
            <Divider>
                模拟面试官大厅
            </Divider>
            <div className='records-container'>
                <div className='records'>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="aliyun" src={aliyunUrl} />}
                    >
                        <Meta title="阿里云2024面试" />
                        <div className='interview-info'>
                            <div className='info'>Golang开发</div>
                            <div className='info'>2h10min</div>
                        </div>
                        <Meta
                            description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="souhu" src={souhuUrl} />}
                    >
                        <Meta title="搜狐2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>2h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="zuiyou" src={zuiyouUrl} />}
                    >
                        <Meta title="最右2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>1h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="aliyun" src={aliyunUrl} />}
                    >
                        <Meta title="阿里云2024面试" />
                        <div className='interview-info'>
                            <div className='info'>Golang开发</div>
                            <div className='info'>2h10min</div>
                        </div>
                        <Meta
                            description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="souhu" src={souhuUrl} />}
                    >
                        <Meta title="搜狐2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>2h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="zuiyou" src={zuiyouUrl} />}
                    >
                        <Meta title="最右2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>1h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="aliyun" src={aliyunUrl} />}
                    >
                        <Meta title="阿里云2024面试" />
                        <div className='interview-info'>
                            <div className='info'>Golang开发</div>
                            <div className='info'>2h10min</div>
                        </div>
                        <Meta
                            description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="souhu" src={souhuUrl} />}
                    >
                        <Meta title="搜狐2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>2h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                    <Card
                        hoverable
                        className='interview'
                        cover={<img alt="zuiyou" src={zuiyouUrl} />}
                    >
                        <Meta title="最右2024面试" />
                        <div className='interview-info'>
                            <div className='info'>前端开发</div>
                            <div className='info'>1h30min</div>
                        </div>
                        <Meta
                            description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                        />
                        <div className='interview-footer'>
                            <div className='interview-footer-user'>
                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                                <div>userName</div>
                            </div>
                            <div className='interview-footer-star'>★25</div>
                        </div>
                    </Card>
                </div>
            </div>
        </Content>
    );
};

export default observer(Home);
