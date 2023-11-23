export const APPKEY = "eIpFkVF6robAVNqu";
export const URI = "wss://nls-gateway.aliyuncs.com/ws/v1";

export const MIN_WORDS = 8; // 最短发送文字长度
export const MAX_CONVERSATION_COUNT = 20; // 保留最大对话数量

export const SERVER_URL = "wss://job581.cn/copilot/stream"; // 后端路由

export const MOCK_SERVER_URL = "wss://job581.cn/mock/stream";

export const BASE_URL = "https://job581.cn";

export const DIRECTION_LIST = [
  {value: 'rd', label: '后端'},
  {value: 'fe', label: '前端'},
  {value: 'pm', label: '产品'},
  {value: 'qa', label: '测试'},
  {value: 'op', label: '运营'},
  {value: 'ui', label: '设计'}
];

export const ROUND_LIST = [
  {value: '1', label: '一面'},
  {value: '2', label: '二面'},
  {value: '3', label: '三面'},
  {value: '4', label: '四面'},
  {value: '5', label: '五面'}
];

export const EXPIRES = 15; // jwt-token过期时间
