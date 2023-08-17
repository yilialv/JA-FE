import { makeAutoObservable } from "mobx";

class Store {
    request = ''; // 从百度拿回来的数据
    nextRequest = ''; // 从百度拿回来的新数据
    reply = ''; // 从后端拿回来的数据
    lastReply = ''; // 从后端拿回来的新数据
    id = '';
    conversations = [];

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
        this.reply = `\n\n=============================快乐分隔符😊============================\n${this.lastReply}${this.reply}`;
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
}

const store = new Store();

export default store;