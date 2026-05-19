const BASE_URL = 'http://localhost:8000';

function request(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: method,
      data: data,
      header: { 'Content-Type': 'application/json' },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          wx.showToast({ title: res.data.detail || '请求失败', icon: 'none' });
          reject(res);
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      }
    });
  });
}

module.exports = {
  getSheepList: (status) => request('/api/sheep/list' + (status ? '?status=' + status : '')),
  getSheepDetail: (id) => request('/api/sheep/' + id),
  applyAdoption: (data) => request('/api/adoption/apply', 'POST', data),
  getAdoptions: () => request('/api/adoption/list'),
  getTrace: (sheepId) => request('/api/trace/' + sheepId),
  recordTrace: (data) => request('/api/trace/record', 'POST', data),
};
