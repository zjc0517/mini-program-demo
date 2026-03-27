const app = getApp();

Page({
  data: {
    sheepId: '',
    sheepInfo: {
      id: 'RG-SH-2026-001',
      name: '小白',
      breed: '乌珠穆沁羊',
      age: '8个月',
      weight: '35kg',
      birthDate: '2025-09-15',
      image: '/static/images/sheep1.jpg',
      ranch: '内蒙古锡林郭勒牧场',
      price: 2999,
      adoptionPeriod: 12, // 认养周期（月）
      benefits: [
        '每周照片更新',
        '季度视频通话',
        '年度羊肉5kg',
        '羊毛制品8折',
        '牧场参观资格'
      ]
    },
    gallery: [
      '/static/images/sheep1.jpg',
      '/static/images/sheep1-2.jpg',
      '/static/images/sheep1-3.jpg'
    ],
    currentImageIndex: 0,
    showAdoptionModal: false,
    adoptionForm: {
      name: '',
      phone: '',
      address: '',
      message: ''
    }
  },

  onLoad: function (options) {
    console.log('认养页面加载', options);
    if (options.id) {
      this.setData({
        sheepId: options.id
      });
      this.loadSheepDetail(options.id);
    }
  },

  // 加载羊只详情
  loadSheepDetail: function (sheepId) {
    console.log('加载羊只详情:', sheepId);
    // 实际项目中调用API获取详情
    // app.request({
    //   url: '/api/sheep/detail?id=' + sheepId,
    //   method: 'GET'
    // }).then(res => {
    //   this.setData({
    //     sheepInfo: res.data
    //   });
    // });
  },

  // 图片切换
  onImageChange: function (e) {
    this.setData({
      currentImageIndex: e.detail.current
    });
  },

  // 预览图片
  onPreviewImage: function (e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.gallery
    });
  },

  // 显示认养弹窗
  onShowAdoptionModal: function () {
    this.setData({
      showAdoptionModal: true
    });
  },

  // 关闭认养弹窗
  onCloseAdoptionModal: function () {
    this.setData({
      showAdoptionModal: false
    });
  },

  // 表单输入
  onInputChange: function (e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    this.setData({
      [`adoptionForm.${field}`]: value
    });
  },

  // 提交认养申请
  onSubmitAdoption: function () {
    const form = this.data.adoptionForm;
    
    // 表单验证
    if (!form.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!form.phone || !/^1[3-9]\d{9}$/.test(form.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!form.address) {
      wx.showToast({
        title: '请输入收货地址',
        icon: 'none'
      });
      return;
    }
    
    console.log('提交认养申请:', form);
    
    // 模拟提交
    wx.showLoading({
      title: '提交中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        showAdoptionModal: false
      });
      
      wx.showModal({
        title: '认养申请已提交',
        content: '工作人员将在24小时内与您联系，确认认养详情。',
        showCancel: false,
        success: () => {
          wx.navigateTo({
            url: '/pages/myranch/myranch'
          });
        }
      });
    }, 1500);
    
    // 实际项目中调用API
    // app.request({
    //   url: '/api/adoption/apply',
    //   method: 'POST',
    //   data: {
    //     sheepId: this.data.sheepId,
    //     ...form
    //   }
    // }).then(res => {
    //   wx.hideLoading();
    //   if (res.code === 200) {
    //     // 跳转到支付页面
    //     wx.navigateTo({
    //       url: '/pages/payment/payment?orderId=' + res.data.orderId
    //     });
    //   }
    // });
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: `快来认养${this.data.sheepInfo.name}！`,
      path: '/pages/adoption/adoption?id=' + this.data.sheepId,
      imageUrl: this.data.sheepInfo.image
    };
  }
});