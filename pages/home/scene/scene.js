// pages/home/scene/scene.js
const uploadImage=require('../../../uploadImageOSS/uploadImage.js');
const cfg = require('../../../config.js');
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabActive:1,
    example:[
      {
        title:"全车现场",
        img:"1",
        // hint:"请距车3-5米，在车头约45度角拍事故现场全景照",
      }, {
        title: "车架号",
        img: "2",
        // hint: "车架号位于前挡风玻璃左下角，或右下角"
      }, {
        title: "远景",
        img: "3",
        // hint:"请以车损部位为中心，拍摄整体照片"
      }, {
        title: "近景",
        img: "4",
        // hint:"请拍车辆受损部位照片，可多角度拍摄"
      }, {
        title: "拍重点",
        img: "5",
        // hint:"车损拍照-细节"
      }
    ],

    cameraHide:true,
    swiperHide:true,
    swiperCurrent:0,
    photos:[],
    okBtnOne:true
  },
  tabClickHandle(e){
    this.setData({
      tabActive: e.target.dataset.ml,
    })
  },
  openCamera(){
    this.setData({
      cameraHide: false
    })
  },
  cameraBack(e){
    this.setData({
      cameraHide: true
    })
  },
  photograph(e){
    console.log(e);
    this.setData({
      photos: this.data.photos.concat(e.detail),
      cameraHide: true
    });
    let tabActive = this.data.tabActive - 1 + 1;
    let exampleLng = this.data.example.length;
    this.setData({
      tabActive: tabActive == exampleLng ? exampleLng : tabActive + 1
    })
  },
  photoClick(e){
    wx.previewImage({
      urls: this.data.photos,
      current: e.target.dataset.ml_index,
    })
  },
  ok(){
    let ml=this;
    let ml_data = ml.data;
    let img = [];
    // cfg.getIsAva(app.globalData.userData.assignmentId, function () {

    // });
    cfg.getIsAva(app.globalData.userData.customerId, function () {
      wx.showLoading({
        title: '图片上传中，请稍候……',
        mask: true
      });
      let lg = ml_data.photos.length;
      for (let i = 0; i < lg; i++) {
        let imgName = ml_data.photos[i].replace('wxfile://', '');
        img.push(imgName);
        uploadImage(
          {
            filePath: ml_data.photos[i],
            dir: `wechat_app_img/${app.globalData.userData.assignmentId}/`,
            fail: function (res) {
              ml.setData({
                photos: ml_data.photos.splice(i, 1)
              })
            }
          }
        );
      }
      wx.request({
        url: `${cfg.URL}/weChat/saveImg`,
        method: "POST",
        data: {
          latitude: app.globalData.userLocation.latitude,
          longitude: app.globalData.userLocation.longitude,
          address: app.globalData.userLocation.address,
          assignmentId: app.globalData.userData.assignmentId,
          imgNames: img
        },
        success(e) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../../home/papers/papers'
          })
        }
      })
      app.globalData.uploadImage.scene = app.globalData.uploadImage.scene.concat(img);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ml=this;
    wx.showLoading();
    wx.request({
      url: `${cfg.URL}/weChat/count`,
      method: "POST",
      data: {
        assignmentId: app.globalData.userData.assignmentId
      },
      success(e) {
        wx.hideLoading();
        if(e.data.code===200){
          ml.setData({
            okBtnOne:false
          })
        }
      },
      fail(err){
        console.error(err,"这里是获取是否已经上传过图片程序后台的报错")
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