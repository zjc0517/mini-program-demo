const api = require('../../utils/api');

Page({
  data: {
    sheep: null,
    loading: true,
    form: { adopter_name: '', adopter_phone: '', adopter_address: '' },
    submitting: false,
  },

  onLoad(options) {
    const id = options.id;
    if (!id) {
      wx.showToast({ title: '参数错误', icon: 'none' });
      return;
    }
    this.loadSheep(id);
  },

  async loadSheep(id) {
    try {
      const sheep = await api.getSheepDetail(id);
      this.setData({ sheep, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ ['form.' + field]: e.detail.value });
  },

  async onSubmit() {
    const { form, sheep } = this.data;
    if (!form.adopter_name) return wx.showToast({ title: '请输入姓名', icon: 'none' });
    if (!/^1[3-9]\d{9}$/.test(form.adopter_phone)) return wx.showToast({ title: '手机号格式错误', icon: 'none' });
    if (!form.adopter_address) return wx.showToast({ title: '请输入地址', icon: 'none' });

    this.setData({ submitting: true });
    try {
      const res = await api.applyAdoption({
        sheep_id: sheep.sheep_id,
        ...form,
      });
      wx.showModal({
        title: '认养成功',
        content: '工作人员将在24小时内与您联系',
        showCancel: false,
        success: () => {
          wx.switchTab({ url: '/pages/myranch/myranch' });
        }
      });
    } catch (e) {
      this.setData({ submitting: false });
    }
  },
});
