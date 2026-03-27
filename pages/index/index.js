const app = getApp();

Page({
  data: {
    bannerList: [
      {
        id: 1,
        imageUrl: '/static/images/banner1.jpg',
        link: '/pages/adoption/adoption'
      },
      {
        id: 2,
        imageUrl: '/static/images/banner2.jpg',
        link: '/pages/myranch/myranch'
      }
    ],
    ranchInfo: {
      name: '内蒙古锡林郭勒牧场',
      sheepCount: 256,
      area: '5000亩',
      temperature: 25,
      weather: '晴'
    },
    sheepList: [
      {
        id: 'RG-SH-2026-001',
        name: '小白',
        breed: '乌珠穆沁羊',
        age: '8个月',
        image: '/static/images/sheep1.jpg',
        price: 2999,
        status: 'available'
      },
      {
        id: 'RG-SH-2026-002',
        name: '小黑',
        breed: '苏尼特羊',
        age: '10个月',
        image: '/static/images/sheep2.jpg',
        price: 3299,
        status: 'available'
      },
      {
        id: 'RG-SH-2026-003',
        name: '小花',
        breed: '乌珠穆沁羊',
        age: '6个月',
        image: '/static/images/sheep3.jpg',
        price: 2699,
        status: 'adopted'
      }
    ],
    activityList: [
      {
        id: 1,
        title: '春季认养节',
        desc: '限时优惠，认养立减200元',
        image: '/static/images/activity1.jpg'
      },
      {
        id: 2,
        title: '邀请好友',
        desc: '邀请好友认养，双方各得100羊毛币',
        image: '/static/images/activity2.jpg'
      }
    ]
  },

  onLoad: function () {
    console.log('首页加载');
    this.loadData();
  },

  onShow: function () {
    console.log('首页显示');
  },

  // 加载数据
  loadData: function () {
    // 模拟从后端获取数据
    console.log('加载首页数据');
    
    // 实际项目中调用API
    // app.request({
    //   url: '/api/home/data',
    //   method: 'GET'
    // }).then(res => {
    //   this.setData({
    //     sheepList: res.data.sheepList
    //   });
    // });
  },

  // 轮播图点击
  onBannerTap: function (e) {
    const index = e.currentTarget.dataset.index;
    const banner = this.data.bannerList[index];
    wx.navigateTo({
      url: banner.link
    });
  },

  // 羊只卡片点击
  onSheepCardTap: function (e) {
    const sheepId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/adoption/adoption?id=' + sheepId
    });
  },

  // 认养按钮点击
  onAdoptTap: function (e) {
    const sheepId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/adoption/adoption?id=' + sheepId
    });
  },

  // 活动点击
  onActivityTap: function (e) {
    const activityId = e.currentTarget.dataset.id;
    console.log('点击活动:', activityId);
    wx.showToast({
      title: '活动详情开发中',
      icon: 'none'
    });
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新');
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: '绒光公社 - 云端认养，治愈生活',
      path: '/pages/index/index',
      imageUrl: '/static/images/share.jpg'
    };
  }
});