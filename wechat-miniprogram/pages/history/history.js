// pages/history/history.js
const app = getApp();

Page({
  data: {
    list: [],
    loading: true
  },

  onShow() {
    if (!app.globalData.cloudEnabled) {
      this.setData({ loading: false });
      return;
    }
    const db = wx.cloud.database();
    db.collection('assessments')
      .orderBy('createTime', 'desc')
      .limit(50)
      .get()
      .then((res) => {
        const list = res.data.map((item) => ({
          _id: item._id,
          age: item.childInfo && item.childInfo.age ? item.childInfo.age : '—',
          top1: item.ranked && item.ranked[0] ? `${item.ranked[0].emoji}${item.ranked[0].name} ${item.ranked[0].score}分` : '',
          createTime: item.createTime
        }));
        this.setData({ list, loading: false });
      })
      .catch(() => {
        this.setData({ loading: false });
      });
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({ title: '点击：' + id, icon: 'none' });
  }
});
