import {
  APPKEY,
  MOCK_SERVER_URL,
} from "../../constant";

import {
  Button,
  Spin,
  Input,
  Avatar,
  Checkbox,
  Space,
  Select,
  message,
  Alert,
  Divider,
  Popover
} from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  RightOutlined,
  LeftOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  StarOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { getToken, getHotWordID } from "../../router";
import GradientBackground from "../../background/gradientBackground";
import iconSend from "../../imgs/icon-send.svg";
import iconEvaluation from "../../imgs/icon-evaluation.svg";
import iconRight from "../../imgs/icon-right.svg";
import iconWaiting from "../../imgs/icon-waiting.svg";
import iconProgressBar from "../../imgs/icon-progressBar.svg";
import iconClock from "../../imgs/icon-clock.svg";
import iconMic from "../../imgs/icon-mic.svg";
import './mockInterview.less';
import { useEffect, useRef, useState } from "react";

const MockInterview = observer(() => {

  const wsServer = useRef(null); // 和后端的连接

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((counts) => counts + 1);
    }, 60000);

    return () => {
      wsServer.current?.close();
      clearInterval(interval);
      //utils.initializeMockInterview();
    };
  }, []);

  const [mockConversations, setMockConversations] = useState([]);
  const mockID = useRef('');
  const [mockLastContent, setMockLastContent] = useState('');
  const [mockReplies, setMockReplies] = useState([]);
  const [mockLastEvaluation, setMockLastEvaluation] = useState('');
  const mockLastType = useRef(0); //question:1,answer:0,finish:4
  const [mockInputCache, setMockInputCache] = useState('');
  const mockQuestionIndex = useRef(0);
  const [settingFollowing, setSettingFollowing] = useState(true);
  const conclusionCount = useRef(0);

  const task_id = crypto.randomUUID().replace(/-/g, "");

  const ws = useRef(null); // 和百度的连接

  const recorder = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorder = useRef(null);
  const frameSize = ((16000 * 2) / 1000) * 160; // 定义每帧大小

  const startRecording = () => {

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      recorder.current = new RecorderManager("/recorder_manager");
      mediaStreamRef.current = stream;

      mediaRecorder.current.start();

      recorder.current.start({
        sampleRate: 16000,
        frameSize: frameSize,
      });

      // 接收音频数据帧
      recorder.current.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
        if (ws.current.readyState === ws.current.OPEN) {
          ws.current.send(new Int8Array(frameBuffer));
          if (isLastFrame) {
            console.log("接收最后一个音频帧");
          }
        }
      };

      mediaRecorder.current.onstop = () => {
        stopMediaStream();
      };

    })
      .catch((error) => {
        console.error('录音报错:', error);
      });
  };

  const stopRecording = () => {
    recorder.current.stop();
    sendFinish();
    mediaRecorder.current.stop();
    console.log('录音关闭');
    ws.current?.close();
    wsServer.current?.close();
  };

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      const tracks = mediaStreamRef.current.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      const audioTracks = mediaStreamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = false;
      });
    }
  };

  /**
   * 发送开始帧
   * @param {WebSocket} ws
   */
  const sendStartParams = () => {
    const req = {
      header: {
        appkey: APPKEY,
        message_id: crypto.randomUUID().replace(/-/g, ""),
        task_id: task_id,
        namespace: "SpeechTranscriber",
        name: "StartTranscription",
      },
      payload: {
        enable_intermediate_result: true,
        enable_punctuation_prediction: true,
        disfluency: true,
        //enable_semantic_sentence_detection: true, 语义分句开关，打开后速度会比较慢
        vocabulary_id: "6851f419a17a44969752070669b227c2", // 后端热词表 todo:根据行业方向更换热词id
      },
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log("发送开始帧:" + body);
  };

  /**
   * 发送结束帧
   * @param {WebSocket} ws
   */
  const sendFinish = () => {
    const req = {
      header: {
        appkey: APPKEY,
        message_id: crypto.randomUUID().replace(/-/g, ""),
        task_id: task_id,
        namespace: "SpeechTranscriber",
        name: "StopTranscription",
      },
    };
    const body = JSON.stringify(req);
    ws.current.send(body);
    console.log("发送语音结束帧");
  };

  const setMockNewReply = (id, type) => {
    mockID.current = id;
    mockLastType.current = type;
  };

  const addMockIndex = () => {
    mockQuestionIndex.current++;
  };

  const setMockAnswer = () => {
    setMockLastContent(() => mockInputCache);
  };

  const addMockConversations = (val) => {
    if (mockConversations.length === 6) {
      setMockConversations(pre => pre.shift());
    }
    setMockConversations(pre => pre.concat(val));
  };

  const addMockReplies = (type) => {
    if (mockLastContent) {
      addMockConversations({
        type: mockLastType.current,
        content: mockLastContent
      });
      setMockReplies(pre => pre.concat({
        name: mockLastType.current === 0 ? '用户' : '小助手',
        content: mockLastContent,
        evaluation: mockLastEvaluation,
        //type: this.mockLastType
      }));
    }
    console.log(mockReplies);
    setMockLastContent(() => '');
    setMockLastEvaluation(() => '');
    mockLastType.current = type ? type : 0;
  };

  const appendMockLastContent = (content) => {
    setMockLastContent(pre => pre + content);
  };

  const appendMockLastEvaluation = (content) => {
    setMockLastEvaluation(pre => pre + content);
  };

  useEffect(() => {
    //connectWebsocket();
  }, []);

  const followingQuestionFlag = useRef(0);

  const requestQuestion = (isFollowing) => {
    const following = {
      type: 4,
      data: {
        interactions: mockConversations
      }
    };
    const req = {
      type: 2,
      data: {
        question_index: mockQuestionIndex.current,
        interactions: mockConversations,
        style: settingStyle, //风格-严肃/活泼（用户可以在中途更换风格或时间容忍度）
        personalise: settingPersonalise //是否开启个性化提问
      }
    };
    console.log('interaction', Array.from(mockConversations));
    console.log('index', mockQuestionIndex.current);
    wsServer.current.send(JSON.stringify((isFollowing && followingQuestionFlag.current) ? following : req));
    followingQuestionFlag.current = 0;
  };

  const sendAnswer = () => {
    if (!inputValue) {
      message.warning("请输入回答");
      return;
    }
    const answer = inputValue;
    const req = {
      type: 3,
      data: {
        interactions: mockConversations,
        answer: answer,
        question_id: mockID.current,
        evaluation: settingEvaluation,
        toleration: settingTempo, // 时间容忍度-高-中-低 
      },
    };
    setMockInputCache(() => answer);
    wsServer.current.send(JSON.stringify(req));
  };

  const [settingPersonalise, setSettingPersonalise] = useState(false);

  const [settingEvaluation, setSettingEvaluation] = useState(true);

  const [settingStyle, setInterviewStyle] = useState('');

  const [settingTempo, setInterviewTempo] = useState('');

  const [showEvaluation, setShowEvaluation] = useState(true);

  const [count, setCount] = useState(0);

  const [evaluationWindow, setEvaluationWindow] = useState(false);

  const [openFeedbackWindow, setFeedbackWindow] = useState(false);

  const [micActive, setMicActive] = useState(false);

  const feedbackWindow = (
    <div className="feedback-window">
      <div className="feedback-title">题目反馈</div>
      <div>

      </div>
      <div className="feedback-title">请选择您反馈的问题类型</div>
      <div>

      </div>
      <div className="feedback-title">其他原因</div>
      <div></div>
      <button>提交反馈</button>
    </div>
  );

  return (
    <div className="mock-interview-detail">
      <GradientBackground />
      <div className="container">
        <div className="container-body">
          <div className="body-left">
            <div className="container-body-header">
              <div className="header-title"><CloseOutlined className="menu-item" /></div>
              <div className="header-info">
                <Avatar size={'large'} style={{ marginRight: '10px' }} />
                腾讯（北京）
                <div className="info-tab" style={{ backgroundColor: 'rgba(88, 68, 206, 1)' }}>产品研发岗</div>
                <div className="info-tab" style={{ backgroundColor: '#EE6F84' }}>三面</div>
              </div>
              <div className="header-menu">
                <StarOutlined className="menu-item" />
                <ShareAltOutlined className="menu-item" />
                <Popover content={feedbackWindow} trigger="click" placement="bottomRight" arrow={false}>
                  <EllipsisOutlined className="menu-item" onClick={() => { setFeedbackWindow(!openFeedbackWindow); }} />
                </Popover>
              </div>
            </div>
            <div className="container-body-contents">
              <div className="interview-timer">
                <img src={iconClock} />
                {count}min
              </div>
              <div className={`contents-interview ${!evaluationWindow && "contents-interview-hide"}`}>
                <div className="interview-question">
                  我是问题我是问题
                </div>
                {
                  evaluationWindow
                    ?
                    <div className="interview-evaluation">
                      <div className="evaluation-title">
                        <img src={iconEvaluation} />
                        <span>智能评价</span>
                      </div>
                      <div className="evaluation-text">
                        我是评价我是评价我是评价
                      </div>
                      <div className="evaluation-bottom">
                        <button onClick={() => { setEvaluationWindow(!evaluationWindow); }}>
                          下一题
                          <img src={iconRight} />
                        </button>
                      </div>
                    </div>
                    :
                    <div className="interview-answer">
                      <div className="answer-background">
                        <div className="answer-button">
                          <img src={iconMic} onClick={() => { setMicActive(!micActive); }} />
                          <span>{micActive ? '结束' : '开始'}</span>
                        </div>
                      </div>
                      <div className="answer-switch">
                        <div className="switch-background">
                          <div className="switch" onClick={() => { setShowEvaluation(!showEvaluation) }}>
                            <div className={`${showEvaluation ? "switch-active" : "switch-inactive"}`}>
                              查看评价
                            </div>
                            <div className={`${!showEvaluation ? "switch-active" : "switch-inactive"}`}>
                              直接跳转
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                }
              </div>
              <div className="contents-progress">
                <div className="progress-title">面试进度</div>
                <div className="progress-back">
                </div>
                <div className="progress-front">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MockInterview;
