import { Button, Layout, Statistic, Card } from 'antd';
import { Link } from 'react-router-dom';
import logo1Url from '../../imgs/logo1.png';
import aliyunUrl from '../../imgs/aliyun.jpg'
import souhuUrl from '../../imgs/souhu.jpg'
import zuiyouUrl from '../../imgs/zuiyou.jpg'

const { Content } = Layout;
const { Meta } = Card;

const Home = () => {
    return (
        <Content className='content'>
            <img src={logo1Url} className='logo' />
            <div className='title'>AI面试小助手，助力收割大厂offer</div>
            <div className='statistics'>
                <div className='text'>为你彻底解决背八股文的烦恼！</div>
            </div>
            <div className='statistics'>
                <div className='text'>已经成功帮助</div>
                <Statistic value={123456} valueStyle={{color: '#3f8600'}} />
                <div className='text'>人拿到心仪offer！</div>
            </div>
            <Link to="/interview"><Button type='primary' className='btn'>开启面试小助手</Button></Link>
            <div className='records'>
                <Card
                hoverable
                className='interview'
                cover={<img alt="aliyun" src={aliyunUrl}/>}
                >
                <Meta title="阿里云2024面试" />
                <div className='interview-info'>
                    <div className='info'>Golang开发</div>
                    <div className='info'>2h10min</div>
                </div>
                <Meta 
                    description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="souhu" src={souhuUrl}/>}
                >
                <Meta title="搜狐2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>2h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="zuiyou" src={zuiyouUrl}/>}
                >
                <Meta title="最右2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>1h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="aliyun" src={aliyunUrl}/>}
                >
                <Meta title="阿里云2024面试" />
                <div className='interview-info'>
                    <div className='info'>Golang开发</div>
                    <div className='info'>2h10min</div>
                </div>
                <Meta 
                    description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="souhu" src={souhuUrl}/>}
                >
                <Meta title="搜狐2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>2h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="zuiyou" src={zuiyouUrl}/>}
                >
                <Meta title="最右2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>1h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="aliyun" src={aliyunUrl}/>}
                >
                <Meta title="阿里云2024面试" />
                <div className='interview-info'>
                    <div className='info'>Golang开发</div>
                    <div className='info'>2h10min</div>
                </div>
                <Meta 
                    description="简单介绍一下MySQL的基本原理？是否了解MySQL索引呢？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="souhu" src={souhuUrl}/>}
                >
                <Meta title="搜狐2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>2h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
                <Card
                hoverable
                className='interview'
                cover={<img alt="zuiyou" src={zuiyouUrl}/>}
                >
                <Meta title="最右2024面试" />
                <div className='interview-info'>
                    <div className='info'>前端开发</div>
                    <div className='info'>1h30min</div>
                </div>
                <Meta 
                    description="简单介绍一下闭包的基本原理？是否了解react框架？请你简单介绍一下什么场景..."
                />
                </Card>
            </div>
        </Content>
    );
};

export default Home;
