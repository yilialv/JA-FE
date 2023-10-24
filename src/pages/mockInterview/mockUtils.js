import { makeAutoObservable } from "mobx";


class Utils {

  constructor() {
    makeAutoObservable(this);
  }

  //模拟面试相关数据
  mockConversations = [];
  mockID = '';
  mockLastContent = '';
  mockReplies = [];
  mockLastEvaluation = '';
  mockLastType = 0; //question:1,answer:0,finish:4
  mockInputCache = '';
  mockQuestionIndex = 0;
  settingFollowing = true;
  conclusionCount = 0;

  initializeMockInterview() {
    this.mockConversations = [];
    this.mockID = '';
    this.mockLastContent = '';
    this.mockReplies = [];
    this.mockLastEvaluation = '';
    this.mockLastType = 0;
    this.mockInputCache = '';
    this.mockQuestionIndex = 0;
    this.settingFollowing = true;
    this.conclusionCount = 0;
  }

  setMockNewReply(id, type) {
    this.mockID = id;
    this.mockLastType = type;
  }

  addMockIndex() {
    this.mockQuestionIndex += 1;
  }

  setMockAnswer() {
    this.mockLastContent = this.mockInputCache;
  }

  addMockConversations(val) {
    if (this.mockConversations.length === 6) {
      this.mockConversations.shift();
    }
    this.mockConversations.push(val);
  }

  setMockReplies(type) {
    if (this.mockLastContent) {
      this.addMockConversations({
        type: this.mockLastType,
        content: this.mockLastContent
      });
      this.mockReplies.push({
        name: this.mockLastType === 0 ? '用户' : '小助手',
        content: this.mockLastContent,
        evaluation: this.mockLastEvaluation,
        //type: this.mockLastType
      });
    }
    this.mockLastContent = '';
    this.mockLastEvaluation = '';
    this.mockLastType = type ? type : 0;
  }

  appendMockLastContent(content) {
    this.mockLastContent += content;
  }

  appendMockLastEvaluation(content) {
    this.mockLastEvaluation += content;
  }
}

const utils = new Utils();

export default utils;