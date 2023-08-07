import { ContainerOutlined, DesktopOutlined, RobotOutlined } from '@ant-design/icons';

export const APPID = 123;
export const APPKEY = "123";
export const DEV_PID = 80004;
export const URI = "ws://vop.baidu.com/realtime_asr";

export const MENU = [
    {
        label: '简历评估',
        key: 'resume',
        icon: <ContainerOutlined />,
    },
    {
        label: '模拟面试',
        key: 'interview',
        icon: <DesktopOutlined />,
    },
    {
        label: '知识问答',
        key: 'answer',
        icon: <RobotOutlined />,
    }
];