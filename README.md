# 绒光公社 - 微信小程序Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![WeChat Mini Program](https://img.shields.io/badge/WeChat-Mini%20Program-brightgreen.svg)]()

## 项目简介

绒光公社小程序Demo，展示云养经济的核心玩法：
- 🐑 云端认养：选择心仪的羊只进行认养
- 📸 实时查看：查看羊只照片、视频
- 🎮 互动游戏：喂养、装扮、打卡等互动玩法
- 🎁 权益兑换：认养到期后兑换实物产品

## 功能模块

### 1. 首页 (pages/index)
- 牧场全景展示
- 推荐羊只列表
- 活动入口

### 2. 认养中心 (pages/adoption)
- 羊只详情页
- 认养流程
- 支付确认

### 3. 我的牧场 (pages/myranch)
- 已认养羊只列表
- 羊只成长记录
- 互动功能入口

### 4. 互动游戏 (pages/game)
- 喂养功能
- 装扮系统
- 每日打卡

### 5. 个人中心 (pages/profile)
- 用户信息
- 认养记录
- 权益兑换

## 技术栈

- **框架**：微信小程序原生框架
- **UI组件**：WeUI + 自定义组件
- **状态管理**：MobX-Mini
- **网络请求**：wx.request
- **数据缓存**：wx.Storage

## 项目结构

```
mini-program-demo/
├── app.js                 # 小程序入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── pages/                 # 页面目录
│   ├── index/            # 首页
│   ├── adoption/         # 认养中心
│   ├── myranch/          # 我的牧场
│   ├── game/             # 互动游戏
│   └── profile/          # 个人中心
├── components/           # 组件目录
│   ├── sheep-card/       # 羊只卡片
│   ├── adoption-modal/   # 认养弹窗
│   └── interaction-bar/  # 互动栏
├── utils/                # 工具函数
│   ├── api.js            # API封装
│   ├── storage.js        # 本地存储
│   └── format.js         # 格式化工具
└── static/               # 静态资源
    ├── images/           # 图片资源
    └── icons/            # 图标资源
```

## 快速开始

### 1. 导入项目

1. 下载微信开发者工具
2. 选择"导入项目"
3. 选择本项目目录
4. 填写AppID（测试号也可以）

### 2. 配置接口

修改 `utils/api.js` 中的API地址：

```javascript
const API_BASE = 'https://api.rongguang.community';
```

### 3. 运行调试

点击"编译"按钮，即可在模拟器中预览效果。

## 核心功能演示

### 羊只认养流程

```
首页 → 选择羊只 → 查看详情 → 确认认养 → 支付 → 认养成功
```

### 互动玩法

- **喂养**：每日可喂养3次，增加亲密度
- **装扮**：使用羊毛币购买装扮道具
- **打卡**：每日打卡获得奖励
- **分享**：分享获得额外羊毛币

## 截图预览

（此处可添加小程序截图）

## 开发计划

- [x] 基础框架搭建
- [x] 首页UI实现
- [x] 认养流程
- [x] 我的牧场
- [x] 互动游戏
- [ ] 支付集成
- [ ] 消息推送
- [ ] 数据分析

## 贡献指南

欢迎提交Issue和PR。

## 许可证

MIT License

## 联系我们

- 项目官网：https://rongguang.community
- 开发者文档：https://docs.rongguang.community