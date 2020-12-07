// pages/home/papers/papers.js
const uploadImage = require('../../../uploadImageOSS/uploadImage.js');
const cfg = require('../../../config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    f_zj: [
      {
        text: "驾驶证正副本",
        img: "./img/img_1.png",
        changed:false,
      }, {
        text: "行驶证（含有效期的副",
        img: "./img/img_2.png",
        changed: false,
      }, {
        text: "行驶证副页 反面",
        img: "./img/img_8.png",
        changed: false,
      }, {
        text: "被保险人身份证正面",
        img: "./img/img_3.png",
        changed: false,
      }, {
        text: "被保险人身份证反面",
        img: "./img/img_4.png",
        changed: false,
      }, {
        text: "被保险人银行卡正面",
        img: "./img/img_5.png",
        changed: false,
      }, {
        text: "交通事故认定书",
        img: "./img/img_6.png",
        changed: false,
      }, {
        text: "年检标反面",
        img: "./img/img_7.png",
        changed: false,
      }
    ],
    f_other: [
      {
        text: "补传照片",
        img: "./img/other_1.png",
        changed: false,
      }
    ],
    canUpload:false,
    cameraHide:true,
    photos:[],
    photos_add: [],
    cameraData:null,//标记拍照相机信息

    lookHide:true,
  },
  lookOpenCamera() {
    this.setData({
      cameraHide: false,
      lookHide: true,
    })
  },
  openCamera(e){
    let dataset = e.currentTarget.dataset;
    if (dataset.changed===false){
      this.setData({
        cameraHide: false
      })
    }else{
      this.setData({
        lookHide:false,
      })
    }
    this.setData({
      cameraData: {
        text: dataset.text,
        index: dataset.index,
        classify: dataset.classify,
        img: dataset.img,
        changed: dataset.changed,
      },
    })
  },
  lookBack(){
    this.setData({
      lookHide: true
    })
  },
  cameraBack(e) {
    this.setData({
      cameraHide: true
    })
  },
  photograph(e){
    let ml_data=this.data;
    let index = ml_data.cameraData.index;
    let classify=ml_data.cameraData.classify;
    let img = e.detail;
    switch(classify){
      case "up":
        switch (index) {
          case 0:
            this.setData({
              "f_zj[0].changed": true,
              "f_zj[0].img": img,
              "photos[0]": img
            })
            break;
          case 1:
            this.setData({
              "f_zj[1].changed": true,
              "f_zj[1].img": img,
              "photos[1]": img
            })
            break;
          case 2:
            this.setData({
              "f_zj[2].changed": true,
              "f_zj[2].img": img,
              "photos[2]": img
            })
            break;
          case 3:
            this.setData({
              "f_zj[3].changed": true,
              "f_zj[3].img": img,
              "photos[3]": img
            })
            break;
          case 4:
            this.setData({
              "f_zj[4].changed": true,
              "f_zj[4].img": img,
              "photos[4]":img
            })
            break;
          case 5:
            this.setData({
              "f_zj[5].changed": true,
              "f_zj[5].img": img,
              "photos[5]": img
            })
            break;
          case 6:
            this.setData({
              "f_zj[6].changed": true,
              "f_zj[6].img": img,
              "photos[6]": img
            })
            break;
          case 7:
            this.setData({
              "f_zj[7].changed": true,
              "f_zj[7].img": img,
              "photos[7]": img
            })
            break;
        }
        this.setData({
          cameraHide: true,
        })
        break;
      case "other":
        this.setData({
          cameraHide: true,
          photos_add: ml_data.photos_add.concat(img)
        })
        break;
    }
    this.setData({
      canUpload:true
    });
  },
  addImgClick(e){
    wx.previewImage({
      urls: this.data.photos_add,
      current: e.currentTarget.dataset.ml_index,
    })
  },
  ok(e) {
    let ml_data=this.data;
    let upImg=[];
    for(let i=0;i<ml_data.photos.length;i++){
      let value = ml_data.photos[i];
      if (value){
        upImg.push(value);
      }
    }
    upImg=upImg.concat(ml_data.photos_add);
    let img=[];
    for (let i = 0; i < upImg.length; i++){
      img.push(upImg[i].replace('wxfile://', ''));
      uploadImage(
        {
          filePath: upImg[i],
          dir: `wechat_app_img/${app.globalData.userData.assignmentId}/papers/`
        }
      );
    }
    wx.request({
      url: `${cfg.URL}/weChat/idPhoto`,
      method: "POST",
      data:{
        latitude: app.globalData.userLocation.latitude,
        longitude: app.globalData.userLocation.longitude,
        assignmentId: app.globalData.userData.assignmentId,
        imgNames: img
      },
      success(e) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: `证件拍照${img.length}张，返回主页面`,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../../home/home'
              })
            }
          },
        });
      }
    })
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