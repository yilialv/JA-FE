import { ContainerOutlined, DesktopOutlined, FileSearchOutlined, RobotOutlined } from '@ant-design/icons';
import Interview from './pages/Interview/App';
import InterviewRecord from './pages/InterviewRecord/App';

export const APPID = 123;
export const APPKEY = '123';
export const DEV_PID = 80004;
export const URI = 'ws://vop.baidu.com/realtime_asr';

export const MIN_WORDS = 8; // 最短发送文字长度
export const MAX_CONVERSATION_COUNT = 20; // 保留最大对话数量

export const SERVER_URL = '123'; // 后端路由

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
        label: '面试记录',
        key: 'interviewRecord',
        icon: <FileSearchOutlined />,
    },
    {
        label: '知识问答',
        key: 'answer',
        icon: <RobotOutlined />,
    }
];

export const page = {
    'interview': <Interview />,
    'interviewRecord': <InterviewRecord />
};