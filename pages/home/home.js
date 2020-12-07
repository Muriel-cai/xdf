// pages/home/home.js
import cfg from "../../config.js"
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:null,
    assignmentId:"",
    page_block:[
      {
        title:"第一步：事故现场拍照",
        img:"one",
        url:"./scene/scene"
      },{
        title:"第二步：相关证件拍照",
        img:"two",
        url: "./papers/papers"
      }, {
        title: "定损、拍照查询",
        img: "three",
        url: "./case/case"
      }
    ],
    page_other: [
      {
        txt: "添加协助人",
        img: "assist",
        url:"./assist/assist"
      },
    ]
  },
  video() {
    let self=this;
    cfg.getIsAva(app.globalData.userData.customerId, function () {
      wx.request({
        url: `${cfg.URL}/weChat/online`,
        method: "POST",
        data: {
          assignmentId: app.globalData.userData.assignmentId
        },
        success(e) {
          let data = e.data;
          console.log("判断是否在线", e)
          if (data.code === 404) {
            wx.showModal({
              title: '提示',
              content: `${data.msg}`,
              showCancel: false,
            });
          } else if (data.code === 200) {
            wx.navigateTo({ url: './video/video' });
          } else if (e.statusCode === 500) {
            wx.showModal({
              title: '提示',
              content: `操作不当，请稍后重试`,
              showCancel: false,
            });
          }
        }
      })
    });
  },
  call(){
    wx.makePhoneCall({
      phoneNumber:app.globalData.userData.phoneNumber
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData:app.globalData.userData,
      assignmentId: app.globalData.userData.assignmentId
    });
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