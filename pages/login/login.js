// pages/login/login.js
const app=getApp();
const user=require('../../json/user.js')
const cfg = require('../../config.js');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showPhone:true,
    showLocation: false,
    disabled:true,
    val:"",
  },
  phoneValidation(e){
    let regular=/^1[345678]\d{9}$/;
    // let regular = /^1((3[0-9])|(4[579])|(5([0-3]|[5-9]))|(66)|(7[0135678])|(8[0-9])|(9[89]))\d{8}$/;

    this.val= e.detail.value;
    if (this.val.length === 11 && regular.test(this.val)){
      this.setData({
        disabled:false
      })
    }else{
      this.setData({
        disabled: true,
      })
    }
  },
  goHome(e){
    let ml=this;
    wx.showLoading({
      title: '请稍候……',
      mask: true
    });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude

        const qqmapsdk = new QQMapWX({
          key: 'DQ4BZ-PC6W4-P66UG-DHN2A-NMR63-N3BNG'
        });
        let address = '地址';
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: function (res) {
            const address=res.result.address;
            app.globalData.userLocation = { latitude, longitude, address }
            wx.request({
              url: `${cfg.URL}/customer/login`,
              method: "POST",
              data: {customerPhone: ml.val},
              success(e) {
                wx.hideLoading();
                if (e.data.flag) {
                  app.globalData.userData = e.data;
                  console.log(e.data);
                  wx.redirectTo({
                    url: '../home/home'
                  })
                } else {
                  wx.showToast({
                    title: "您输入的账号不存在，请重新输入",
                    icon: "none",
                    mask: true
                  })
                }
              },
              fail(err){
                console.error(err,"这里是登录的错误提示")
              }
            });
          },
          fail(err){
            console.error(err,'这里是地址逆解析错误');
          }
        });
      }
    })
  },
  getLocation(e){
    let that = this;
    wx.openSetting({
      success(res){
        if (res.authSetting['scope.userLocation'] && res.authSetting['scope.record'] && res.authSetting['scope.camera']) {
          that.setData({
            showPhone: true,
            showLocation: false
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] && res.authSetting['scope.record'] && res.authSetting['scope.camera']) {
          that.setData({
            showPhone: true,
            showLocation: false
          })
          return;
        }
        if (!res.authSetting['scope.userLocation']) {
          console.log("位置");
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log("用户已同意位置")
            },
            fail(){
              that.setData({
                showPhone: false,
                showLocation: true
              })
            }
          })
        }
        if (!res.authSetting['scope.record']) {
          console.log("录音")
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log("用户已同意录音")
            },
            fail() {
              that.setData({
                showPhone: false,
                showLocation: true
              })
            }
          })
        }
        if (!res.authSetting['scope.camera']) {
          console.log("摄影")
          wx.authorize({
            scope: 'scope.camera',
            success() {
              console.log("用户已同意录像")
            },
            fail() {
              that.setData({
                showPhone: false,
                showLocation: true
              })
            }
          })
        }
      }
    });
    // QQmapsdk=
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
    wx.hideLoading()
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