// pages/quick/quick.js
const app = getApp();
const { QUESTIONS } = require('../../data/questions.js');

Page({
  data: {
    list: QUESTIONS,
    picked: [], // 选中的题号数组
    maxPick: 3
  },

  toggle(e) {
    const qid = Number(e.currentTarget.dataset.id);
    let picked = [...this.data.picked];
    const idx = picked.indexOf(qid);
    if (idx >= 0) {
      picked.splice(idx, 1);
    } else {
      if (picked.length >= this.data.maxPick) {
        wx.showToast({ title: '最多选 3 项', icon: 'none' });
        return;
      }
      picked.push(qid);
    }
    this.setData({ picked });
  },

  finish() {
    if (this.data.picked.length !== 3) {
      wx.showToast({ title: '请选出 3 项', icon: 'none' });
      return;
    }
    // 选中的题 = 5 分，其余 = 1 分
    const scores = {};
    QUESTIONS.forEach((q) => {
      scores[q.id] = this.data.picked.indexOf(q.id) >= 0 ? 5 : 1;
    });
    app.globalData.scores = scores;
    wx.navigateTo({ url: '/pages/result/result' });
  }
});
