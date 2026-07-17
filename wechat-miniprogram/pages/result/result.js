// pages/result/result.js
const app = getApp();
const { buildReport } = require('../../utils/score.js');

Page({
  data: {
    report: null,
    saved: false,
    cloudEnabled: false
  },

  onLoad() {
    const scores = app.globalData.scores || {};
    const childInfo = app.globalData.childInfo || {};
    const report = buildReport(scores, childInfo);
    const cloudEnabled = !!app.globalData.cloudEnabled;
    this.setData({ report, cloudEnabled });

    if (cloudEnabled) {
      this.saveToCloud(report, childInfo, scores);
    }
  },

  saveToCloud(report, childInfo, scores) {
    const db = wx.cloud.database();
    db.collection('assessments').add({
      data: {
        childInfo,
        scores,
        ranked: report.ranked,
        top3: report.top3.map((t) => ({ key: t.name, score: t.score })),
        createTime: db.serverDate()
      }
    }).then(() => {
      this.setData({ saved: true });
    }).catch(() => {
      // 保存失败不影响查看结果
    });
  },

  retest() {
    wx.reLaunch({ url: '/pages/index/index' });
  },

  copyResult() {
    const r = this.data.report;
    let text = `耶鲁儿童潜能测试结果\n`;
    if (r.childInfo && r.childInfo.age) text += `孩子年龄：${r.childInfo.age}\n`;
    text += `\n维度得分排名：\n`;
    r.ranked.forEach((d, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
      text += `${medal} ${d.name}  ${d.score}/${d.max}分\n`;
    });
    wx.setClipboardData({ data: text });
  }
});
