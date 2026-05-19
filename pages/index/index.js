const api = require('../../utils/api');

Page({
  data: {
    bannerList: [
      { id: 1, image: '/static/banner1.jpg', link: '/pages/adoption/adoption' },
    ],
    sheepList: [],
    loading: true,
    error: false,
  },

  onLoad() { this.loadData(); },
  onShow() { this.loadData(); },

  async loadData() {
    this.setData({ loading: true, error: false });
    try {
      const data = await api.getSheepList('available');
      this.setData({ sheepList: data.slice(0, 10), loading: false });
    } catch (e) {
      this.setData({ loading: false, error: true });
    }
  },

  onSheepTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/adoption/adoption?id=' + id });
  },

  onRefresh() { this.loadData(); },

  navigateTo(e) {
    const page = e.currentTarget.dataset.page;
    wx.switchTab({ url: '/pages/' + page + '/' + page });
  },
});
