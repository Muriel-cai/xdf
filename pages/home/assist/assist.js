// pages/home/help/help.js
const cfg = require('../../../config.js');
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdd:true,
    submitDis:true,
    name:"",
    phone:"",
    userAssistData:null,
  },

  nameBlur(e){
    let detail = e.detail ;
    let data=this.data;
    if(detail.value){
      this.setData({
        name: detail.value
      });
      if (data.phone) {
        this.setData({
          submitDis: false
        });
      }
    }
  },
  phoneBlur(e){
    let regular = /^1[345678]\d{9}$/;
    let data=this.data;
    let val = e.detail.value;
    if (val.length === 11 && regular.test(val)) {
      this.setData({
        phone:val
      });
      if (data.name) {
        this.setData({
          submitDis: false
        });
      }
    } else {
      this.setData({
        submitDis: true,
      })
    }
  },
  submit(){
    let ml=this;
    wx.showLoading({
      title: '请稍候……',
      mask: true
    });
    // console.log(ml.data.name, ml.data.phone, app.globalData.userData.assignmentId);
    wx.request({
      url: `${cfg.URL}/customer/addAssist`,
      method: "POST",
      data: {
        customerName: ml.data.name,
        customerPhone: ml.data.phone,
        assignmentId: app.globalData.userData.assignmentId
      },
      success(e) {
        wx.hideLoading();
        if (e.data.flag) {
          app.globalData.userAssistData = {
            customerName: ml.data.name,
            customerPhone: ml.data.phone
          };
          wx.redirectTo({
            url: '../home'
          })
        } else {
          wx.showModal({
            title:'提示',
            content: "该协助人已存在于别的案件，请更换协助人！",
            showCancel:false,
          })
        }
      }
    })
  },
  call(){
    console.log( app.globalData.userAssistData.customerPhone,"customerPhone")
     wx.makePhoneCall({
      phoneNumber: app.globalData.userAssistData.customerPhone
    })
  },
  changeAssist(){
    this.setData({
      isAdd: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let ml = this;
    if (!app.globalData.userAssistData){
      ml.setData({
        isAdd: true
      });
      wx.showLoading({
        title: '请稍候……',
        mask: true
      });
      wx.request({
        url: `${cfg.URL}/customer/getAssist`,
        method: "POST",
        data: { assignmentId: app.globalData.userData.assignmentId },
        success(e) {
          console.log(e.data,"______________________")
          if (e.data){
            app.globalData.userAssistData = e.data;
            ml.setData({
              userAssistData: e.data,
              isAdd: false
            });
          }else{
            console.log("mei you xie zhu ren")
            ml.setData({
              isAdd: true
            });
          }
          wx.hideLoading();
        }
      })
    }else{
      ml.setData({
        userAssistData: app.globalData.userAssistData,
        isAdd: false
      })
    }
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