// pages/quiz/quiz.js
const app = getApp();
const { QUESTIONS, SCORE_OPTIONS } = require('../../data/questions.js');

Page({
  data: {
    list: QUESTIONS,
    options: SCORE_OPTIONS,
    current: 0,
    total: QUESTIONS.length,
    scores: {},       // 题号 -> 分值
    selected: 0       // 当前题已选分值
  },

  onLoad() {
    const scores = app.globalData.scores || {};
    this.setData({ scores });
    this.refreshSelected();
  },

  refreshSelected() {
    const qid = this.data.list[this.data.current].id;
    this.setData({ selected: this.data.scores[qid] || 0 });
  },

  choose(e) {
    const value = Number(e.currentTarget.dataset.v);
    const qid = this.data.list[this.data.current].id;
    const scores = { ...this.data.scores, [qid]: value };
    app.globalData.scores = scores;
    this.setData({ scores, selected: value });
  },

  prev() {
    if (this.data.current > 0) {
      this.setData({ current: this.data.current - 1 }, () => this.refreshSelected());
    }
  },

  next() {
    if (this.data.selected === 0) {
      wx.showToast({ title: '请先选一个分值', icon: 'none' });
      return;
    }
    if (this.data.current < this.data.total - 1) {
      this.setData({ current: this.data.current + 1 }, () => this.refreshSelected());
    } else {
      this.finish();
    }
  },

  finish() {
    wx.navigateTo({ url: '/pages/result/result' });
  }
});
