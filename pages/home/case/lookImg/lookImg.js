// pages/home/case/lookImg/lookImg.js
const cfg = require('../../../../config.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    example: [
      {
        title: "车损图片",
        img: "1",
      }, {
        title: "单证照片",
        img: "2",
      }
    ],
    tabActive:1,
    sceneImg:[],
    paperImg:[],
  },
  tabClickHandle(e){
    this.setData({
      tabActive: e.target.dataset.ml,
    })
  },
  sceneImgClick(e){
    const index = e.currentTarget.dataset.ml_index;
    wx.previewImage({
      urls: this.data.sceneImg,
      current: this.data.sceneImg[index],
    })
  },
  paperImgClick(e) {
    const index = e.currentTarget.dataset.ml_index;
    wx.previewImage({
      urls: this.data.paperImg,
      current: this.data.paperImg[index],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ml = this;
    wx.showLoading({
      title: '请稍候……',
      mask: true
    });
    wx.request({
      url: `${cfg.URL}/weChat/getAllPics`,
      method: "POST",
      data: { assignmentId: app.globalData.userData.assignmentId },
      success(e) {
        let data=e.data;
        console.log(data,data.idPhotos,data.pics);
        ml.setData({
          paperImg: data.idPhotos,
          sceneImg: data.pics
        })
        wx.hideLoading();
      }
    })
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
    cfg.getIsAva(app.globalData.userData.customerId)
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