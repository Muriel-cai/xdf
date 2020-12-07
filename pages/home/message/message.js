// pages/home/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[
      {
        title:"系统提示",
        time:"2018-08-31 14:23:59",
        cnt:"data 参数说明：最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。"
      },{
        title: "新消息",
        time: "2018-09-18 14:23:59",
        cnt: "app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})