//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userLocation:null,
    userData: null,    // assignmentID、carMark、customerName、customerType、customerWeChat、flag、id、msg
    userAssistData: null,
    userMessage:null,
    uploadImage:{
      scene:[],
    },
    caseinform:null,
  }
})