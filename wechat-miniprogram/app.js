// app.js
App({
  globalData: {
    // 云开发环境 ID，需在微信开发者工具「云开发」控制台创建后填写
    // 留空则历史记录功能自动降级为「仅本地预览」，其余功能不受影响
    cloudEnvId: '',
    childInfo: null, // { age, gender }
    scores: null,    // { 1: 3, 2: 5, ... } 题号 -> 分值
    mode: 'full'     // full | quick
  },

  onLaunch() {
    if (this.globalData.cloudEnvId) {
      wx.cloud.init({
        env: this.globalData.cloudEnvId,
        traceUser: true
      });
      this.globalData.cloudEnabled = true;
    } else {
      this.globalData.cloudEnabled = false;
    }
  }
});
