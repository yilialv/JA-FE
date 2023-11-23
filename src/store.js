import { makeAutoObservable } from "mobx";
import { getCookie, setCookie, deleteCookie } from "./utils";
import { EXPIRES } from "./constant";
import {pinyin} from "pinyin-pro"

class Store {
  request = ''; // 从百度拿回来的数据
  nextRequest = ''; // 从百度拿回来的新数据
  reply = []; // 从后端拿回来的数据
  lastReply = ''; // 从后端拿回来的新数据
  id = '';
  conversations = [];

  currentMenu = '/';

  jwtToken = '';
  nickName = '';
  avatar = ''
  isLogin = false;

  isLoginModalOpen = false;
  isAssistantModalOpen = false;

  companyList = [];

  //表单数据
  formCompany = '';
  formDirection = '';
  formRound = '';
  formImg = ''

  constructor() {
    makeAutoObservable(this);
  }

  setNextRequest(val) {
    this.nextRequest = val;
  }

  setRequest() {
    this.request = this.nextRequest;
  }

  setLastReply(val) {
    this.lastReply = this.lastReply + val;
  }

  setReply() {
    this.reply.push(this.lastReply);
    this.lastReply = '';
  }

  setId(val) {
    this.id = val;
  }

  addToConversation(val) {
    this.conversations.push(val);
  }

  removeFromConversation() {
    this.conversations.shift();
  }

  setHomeInfo(params) {
    const { nickName } = params;
    if (nickName) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.nickName = nickName;
    this.avatar = params.avatar;
  }

  setUserInfo(token, nickName, avatar) {
    // this.jwtToken = token;
    this.nickName = nickName;
    this.avatar = avatar
    this.isLogin = true;
    // setCookie("jwtToken", this.jwtToken, EXPIRES);
    // setCookie("nickName", this.nickName, EXPIRES);
    // console.log("cookie set!");
  }

  getJwtToken() {
    // this.jwtToken = getCookie("jwtToken");
    this.nickName = getCookie("nickName");
    if (this.jwtToken) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  deleteJwtToken() {
    deleteCookie("jwtToken");
    deleteCookie("nickName");
    this.isLogin = false;
  }

  setCompanyList(list) {
    this.companyList = list;
  }
  getFormatCompanyList() {
    
    if(this.companyList.length == 0){
      return []
    }

    const formatComanyMap= {

    }
    const formatComanyList = []
   
    // 遍历公司列表，将公司名称的首字母作为索引，将公司名称作为值
    this.companyList.map(item => {
      const firstLetter = pinyin(item.Name.slice(0,1),{pattern: 'first', toneType: 'none'}).toLocaleUpperCase() 
      
      if(Reflect.has(formatComanyMap, firstLetter)){
        Reflect.set(formatComanyMap, firstLetter, [...(Reflect.get(formatComanyMap, firstLetter) || []), item]) 
      }else{
        Reflect.set(formatComanyMap, firstLetter, [item])
      }
    })
    Object.keys(formatComanyMap).map(key => {
      if(Reflect.get(formatComanyMap, key).length > 0){
        formatComanyList.push({
          key,
          children: formatComanyMap[key]
        })
      }
    
    })
   
    return formatComanyList.sort((a,b) => a.key.localeCompare(b.key))
  }
}

const store = new Store();

export default store;