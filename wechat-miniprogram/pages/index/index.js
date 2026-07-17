// pages/index/index.js
const app = getApp();

Page({
  data: {
    age: '',
    gender: 'boy', // boy | girl
    cloudEnabled: false
  },

  onLoad() {
    this.setData({ cloudEnabled: !!app.globalData.cloudEnabled });
  },

  onAgeInput(e) {
    this.setData({ age: e.detail.value });
  },

  onGenderChange(e) {
    this.setData({ gender: e.currentTarget.dataset.g });
  },

  // 进入完整模式
  startFull() {
    app.globalData.mode = 'full';
    app.globalData.childInfo = { age: this.data.age, gender: this.data.gender };
    app.globalData.scores = {};
    wx.navigateTo({ url: '/pages/quiz/quiz' });
  },

  // 进入快速模式
  startQuick() {
    app.globalData.mode = 'quick';
    app.globalData.childInfo = { age: this.data.age, gender: this.data.gender };
    app.globalData.scores = {};
    wx.navigateTo({ url: '/pages/quick/quick' });
  },

  goHistory() {
    wx.navigateTo({ url: '/pages/history/history' });
  }
});
