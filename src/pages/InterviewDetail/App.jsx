import { Row, Card } from "antd";
import './App.css';

const InterViewDetail = () => {
    return (
        <Row>
            <Card title="面试记录 2023-08-02" className="container">
                <p>时间：2023-08-01</p>
                <p>公司：字节跳动</p>
                <p>岗位：Java开发</p>
                <p>面试时长：2小时10分钟</p>
                <p>面试内容：请简单介绍自己的...</p>
            </Card>
            <Card title="面试记录 2023-08-03" className="container">
                <p>时间：2023-08-02</p>
                <p>公司：百度</p>
                <p>岗位：Golang开发</p>
                <p>面试时长：1小时20分钟</p>
                <p>面试内容：你好我是百度工程师...</p>
            </Card>
            <Card title="面试记录 2023-08-04" className="container">
                <p>时间：2023-08-03</p>
                <p>公司：阿里巴巴</p>
                <p>岗位：前端开发</p>
                <p>面试时长：1小时30分钟</p>
                <p>面试内容：欢迎面试阿里...</p>
            </Card>
        </Row>
    );
};

export default InterViewDetail;