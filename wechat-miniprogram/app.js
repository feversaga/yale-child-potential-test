// app.js
App({
  globalData: {
    // ⚠️⚠️⚠️ 云开发环境 ID（开启「云端历史记录」功能才需要填）
    // ───────────────────────────────────────────────
    // 1. 打开微信开发者工具顶部「云开发」→ 开通 → 复制你的「环境 ID」
    // 2. 把下面这一行单引号里填成你的环境 ID，例如：cloudEnvId: 'my-env-1a2b3c'
    // 3. 并在云开发控制台新建数据库集合 assessments（权限：所有用户可读，仅创建者可读写）
    // 留空（''）则历史记录功能自动关闭，但「测评 + 生成报告」完全正常，无需云开发！
    // ───────────────────────────────────────────────
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
