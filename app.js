App({
  globalData: {
    userInfo: null,
    token: null,
    apiBase: 'https://api.rongguang.community'
  },

  onLaunch: function () {
    console.log('绒光公社小程序启动');
    
    // 检查登录状态
    this.checkLoginStatus();
    
    // 获取系统信息
    this.getSystemInfo();
  },

  // 检查登录状态
  checkLoginStatus: function () {
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.token = token;
      this.getUserInfo();
    } else {
      // 未登录，跳转到登录页
      console.log('用户未登录');
    }
  },

  // 获取用户信息
  getUserInfo: function () {
    const that = this;
    wx.getUserInfo({
      success: function (res) {
        that.globalData.userInfo = res.userInfo;
        console.log('获取用户信息成功:', res.userInfo);
      },
      fail: function () {
        console.log('获取用户信息失败');
      }
    });
  },

  // 获取系统信息
  getSystemInfo: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log('系统信息:', res);
      }
    });
  },

  // 全局登录方法
  login: function (callback) {
    const that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          // 调用后端登录接口
          wx.request({
            url: that.globalData.apiBase + '/api/auth/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              if (res.data.code === 200) {
                const token = res.data.data.token;
                wx.setStorageSync('token', token);
                that.globalData.token = token;
                callback && callback(true);
              } else {
                callback && callback(false);
              }
            },
            fail: function () {
              callback && callback(false);
            }
          });
        } else {
          callback && callback(false);
        }
      }
    });
  },

  // 全局请求方法
  request: function (options) {
    const that = this;
    const token = this.globalData.token;
    
    return new Promise((resolve, reject) => {
      wx.request({
        url: that.globalData.apiBase + options.url,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
          'Content-Type': 'application/json',
          'Authorization': token ? 'Bearer ' + token : ''
        },
        success: function (res) {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.statusCode === 401) {
            // Token过期，重新登录
            that.login(function (success) {
              if (success) {
                // 重试请求
                that.request(options).then(resolve).catch(reject);
              } else {
                reject(new Error('登录失败'));
              }
            });
          } else {
            reject(new Error('请求失败'));
          }
        },
        fail: function (err) {
          reject(err);
        }
      });
    });
  }
});