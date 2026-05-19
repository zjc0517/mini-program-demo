const api = require('../../utils/api');

Page({
  data: {
    adoptions: [],
    loading: true,
    empty: false,
  },

  onShow() { this.loadData(); },

  async loadData() {
    this.setData({ loading: true });
    try {
      const data = await api.getAdoptions();
      this.setData({
        adoptions: data,
        loading: false,
        empty: data.length === 0,
      });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  onViewTrace(e) {
    const sheepId = e.currentTarget.dataset.sheepId;
    wx.navigateTo({ url: '/pages/trace/trace?sheepId=' + sheepId });
  },
});
