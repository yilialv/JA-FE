import {
  APPKEY,
  MIN_WORDS,
  MOCK_SERVER_URL,
  URI,
} from "../../constant";

import {
  Avatar,
  message,
  Popover
} from "antd";
import {
  CloseOutlined,
  StarOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react";
import { getToken, getHotWordID } from "../../router";
import GradientBackground from "../../background/gradientBackground";
import LoadingAnimation from "../../components/loadingAnimation";
import iconEvaluation from "../../imgs/icon-evaluation.svg";
import iconRight from "../../imgs/icon-right.svg";
import iconClock from "../../imgs/icon-clock.svg";
import iconMic from "../../imgs/icon-mic.svg";
import iconMicReverse from "../../imgs/icon-mic-reverse.svg";
import './mockInterview.less';
import { useEffect, useRef, useState } from "react";

const MockInterview = observer(() => {

  const wsServer = useRef(null); // 和后端的连接

  const ws = useRef(null); // 和百度的连接

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((counts) => counts + 1);
    }, 60000);

    return () => {
      wsServer.current?.close();
      ws.current?.close();
      clearInterval(interval);
      setMockLastContent('');
      setMockLastEvaluation('');
      //utils.initializeMockInterview();
    };
  }, []);

  const mockConversations = useRef([]);
  const mockID = useRef('');
  const [mockLastContent, setMockLastContent] = useState('');
  const mockLastContentData = useRef('');
  const mockReplies = useRef([]);
  const [mockLastEvaluation, setMockLastEvaluation] = useState('');
  const mockLastEvaluationData = useRef('');
  const mockLastType = useRef(0); //question:1,answer:0,evaluation:2,finish:4
  const mockQuestionIndex = useRef(0);
  const conclusionCount = useRef(0);
  const connectFlag = useRef(true); //防止重复连接
  const request = useRef(''); //语音识别缓存
  const nextRequest = useRef(''); //语音识别
  const setNextRequest = (val) => {
    nextRequest.current = val;
  };
  const setRequest = () => {
    request.current += nextRequest.current;
  };

  const task_id = crypto.randomUUID().replace(/-/g, "");

  const recorder = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorder = useRef(null);
  const frameSize = ((16000 * 2) / 1000) * 160; // 定义每帧大小

  const initRecording = () => {

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      recorder.current = new RecorderManager("/recorder_manager");
      mediaStreamRef.current = stream;

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

  const startRecording = () => {
    console.log("开始录音");
    mediaRecorder.current.start();
    recorder.current.start({
      sampleRate: 16000,
      frameSize: frameSize,
    });
  };

  const stopRecording = () => {
    //recorder.current.stop();
    //sendFinish();
    mediaRecorder.current.stop();
    console.log('录音关闭');
    sendAnswer(request.current);
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
    console.log("语音识别发送开始帧");
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

  const addMockConversations = (val) => {
    if (mockConversations.current.length === 6) {
      mockConversations.current.shift();
    }
    mockConversations.current.push(val);
  };

  const addMockReplies = (type) => {
    if (mockLastContentData.current && mockLastType.current !== 2) {
      addMockConversations({
        type: mockLastType.current,
        content: mockLastContentData.current
      });
      mockReplies.current.push({
        name: mockLastType.current === 0 ? '用户' : '小助手',
        content: mockLastContentData.current,
        evaluation: mockLastEvaluationData.current,
        //type: this.mockLastType
      });
    }
    console.log('mockReplies', mockReplies);
    mockLastContentData.current = '';
    mockLastEvaluationData.current = '';
    mockLastType.current = type ? type : 0;
  };

  const appendMockLastContent = (content) => {
    setMockLastContent(pre => pre + content);
    mockLastContentData.current += content;
  };

  const appendMockLastEvaluation = (content) => {
    setMockLastEvaluation(pre => pre + content);
    mockLastEvaluationData.current += content;
  };

  const connectWebsocket = async () => {
    if (!connectFlag.current) {
      return;
    }
    connectFlag.current = false;

    //语音识别
    await getToken().then((fetchedToken) => {
      const uri = URI + "?token=" + fetchedToken;
      ws.current = new WebSocket(uri);
    });

    wsServer.current = new WebSocket(MOCK_SERVER_URL);

    ws.current.onopen = () => {
      sendStartParams();
      console.log("语音识别WebSocket开始连接");
    };

    ws.current.onmessage = (message) => {
      try {
        const res = JSON.parse(message.data);
        const { payload, header } = res;
        const { name, status, status_message } = header;
        const { result } = payload;
        if (name === "TranscriptionResultChanged" || name === "SentenceEnd") {
          if (status === 20000000) {
            setNextRequest(result);
            setRequest();
            console.log(request.current);
          } else {
            throw Error(status_message);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    ws.current.onerror = (error) => {
      recorder.current.stop();
      console.log("error:", error);
    };

    ws.current.onclose = (res) => {
      console.log("语音识别WebSocket关闭连接：", res);
    };

    //jobGPT后端
    wsServer.current.onopen = () => {
      console.log("Server WebSocket打开连接");
      const req = {
        type: 1,
        data: {
          experience_id: 112
        },
      };
      const body = JSON.stringify(req);
      wsServer.current.send(body);
      console.log("jobGPT发送开始帧:" + body);
      requestQuestion();
    };

    wsServer.current.onmessage = (msg) => {
      try {
        const result = JSON.parse(msg.data);
        const { type, data, id } = result;
        console.log(type, data, id);
        if (type === 1 || type === 3) {
          // 第一次拿到数据
          if (!mockID.current) {
            setMockNewReply(id, type);
            addMockIndex();
            followingQuestionFlag.current = 1;
          } else if (id !== mockID.current) {
            if (type === 1) { addMockIndex(); followingQuestionFlag.current = 1; }
            setMockNewReply(id, 1);
          }
          appendMockLastContent(data);
        }
        else if (type === 2) {
          if (id !== mockID.current) {
            addMockReplies();
            setMockNewReply(id ? id : 'skipEvaluation', type);
          }
          appendMockLastEvaluation(data);
        }
        else if (type === 4) {
          conclusionCount.current++;
          setMockNewReply('conclusion', type);
          addMockReplies(type);
          appendMockLastContent(data);
        } else if (type === 99) {
          message.error(data);
        } else if (type === 9) {
          if (mockLastType.current === 2) {
            console.log('check');
            setNextQuestionFlag(true);
          }
        }
      } catch (error) {
        console.log("后端返回解析出错!");
      }
    };

    wsServer.current.onclose = () => {
      const req = {
        type: 9,
        data: {},
      };
      wsServer.current.send(JSON.stringify(req));
      console.log("发送结束帧：", JSON.stringify(req));
      console.log("Server WebSocket关闭连接");
    };

    wsServer.current.onerror = (error) => {
      console.log("error:", error);
    };

    initRecording();
  };

  useEffect(() => {
    connectWebsocket();
  }, []);

  const followingQuestionFlag = useRef(0);

  const requestQuestion = (isFollowing) => {
    const following = {
      type: 4,
      data: {
        interactions: mockConversations.current
      }
    };
    const req = {
      type: 2,
      data: {
        question_index: mockQuestionIndex.current,
        interactions: mockConversations.current,
        style: settingStyle, //风格-严肃/活泼（用户可以在中途更换风格或时间容忍度）
        personalise: settingPersonalise //是否开启个性化提问
      }
    };
    wsServer.current.send(JSON.stringify((isFollowing && followingQuestionFlag.current) ? following : req));
    followingQuestionFlag.current = 0;
  };

  const sendAnswer = (answer) => {
    if (answer.length < MIN_WORDS) {
      // message.error('文字过短');
      // setMicActive(false);
      // return;
      answer = '我不知道';
    }
    console.log('answer', answer);
    const req = {
      type: 3,
      data: {
        interactions: mockConversations.current,
        answer: answer,
        question_id: mockID.current,
        evaluation: settingEvaluation,
        toleration: settingTempo, // 时间容忍度-高-中-低 
      },
    };
    wsServer.current.send(JSON.stringify(req));
    setEvaluationWindow(true);
    setMicActive(false);
  };

  const nextQuestion = () => {
    if (!nextQuestionFlag) {
      return;
    }
    setEvaluationWindow(!evaluationWindow);
    addMockReplies();
    setMockLastContent(() => '');
    setMockLastEvaluation(() => '');
    mockLastContentData.current = '';
    mockLastEvaluationData.current = '';
    requestQuestion();
    setNextQuestionFlag(() => false);
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

  const [nextQuestionFlag, setNextQuestionFlag] = useState(false);

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
              <div className={`contents-interview ${!evaluationWindow ? "contents-interview-hide" : ''}`}>
                <div className="interview-question">
                  {mockLastContent ? mockLastContent : <LoadingAnimation />}
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
                        {mockLastEvaluation ? mockLastEvaluation : <LoadingAnimation />}
                      </div>
                      <div className={`evaluation-bottom `}>
                        <button className={`${!nextQuestionFlag ? "button-disabled" : ''}`} onClick={() => { nextQuestion(); }}>
                          下一题
                          <img src={iconRight} />
                        </button>
                      </div>
                    </div>
                    :
                    <div className="interview-answer">
                      <div className="answer-background">
                        {
                          micActive
                            ?
                            <div className="answer-button mic-active" onClick={() => { stopRecording(); }}>
                              <div className="mic-active-animation"></div>
                              <img src={iconMicReverse} />
                              <span>结束</span>
                            </div>
                            :
                            <div className="answer-button" onClick={() => { setMicActive(true); startRecording(); }}>
                              <img src={iconMic} />
                              <span>开始</span>
                            </div>
                        }
                      </div>
                      <div className="answer-switch">
                        <div className="switch-background">
                          <div className="switch" onClick={() => { setShowEvaluation(!showEvaluation); }}>
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
