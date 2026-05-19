const api = require('../../utils/api');

Page({
  data: {
    sheepId: '',
    stages: [],
    loading: false,
    empty: true,
  },

  onLoad(options) {
    if (options.sheepId) {
      this.setData({ sheepId: options.sheepId });
      this.loadTrace();
    }
  },

  onScan() {
    wx.scanCode({
      success: (res) => {
        let sheepId = res.result;
        try {
          const data = JSON.parse(res.result);
          sheepId = data.sheep_id || res.result;
        } catch (e) {}
        this.setData({ sheepId });
        this.loadTrace();
      },
      fail: () => {
        wx.showToast({ title: '扫码失败', icon: 'none' });
      }
    });
  },

  async loadTrace() {
    this.setData({ loading: true });
    try {
      const data = await api.getTrace(this.data.sheepId);
      this.setData({
        stages: data.stages || [],
        loading: false,
        empty: (data.stages || []).length === 0,
      });
    } catch (e) {
      this.setData({ loading: false });
    }
  },
});
