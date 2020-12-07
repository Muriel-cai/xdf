// pages/home/case/case.js
const cfg = require('../../../config.js');
let app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerName:'',
    carMark:'',
    caseinform:{
      case_time: '',
      case_price:'',
    },
    havePrice:false,
    totalAmount:'',
    repairInfo:"",
    customerConfirmed:true,//金额是否确认
    assignmentStatus:false,//是否显示撤案
    cancelDescription:"",//撤案显示信息
    stateList:[
      {
        id:"state_1",
        state:"ed",
        text:"报案"
      },{
        id: "state_2",
        state: "ed",
        text: "拍照"
      },{
        id: "state_3",
        state: "ing",
        text: "定损"
      },{
        id: "state_4",
        state: "will",
        text: "金额确认"
      }, {
        id: "state_5",
        state: "will",
        text: "定损完成"
      }
    ],
    subTextAreaBlurText: "",//文本域中文字
    photosNum:0,
  },
  undoAss(){ //撤案
    let ml = this;
    wx.showModal({
      title: `提示`,
      content: `确认撤案？撤案后此案件将不存在，您将退出小程序`,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: `${cfg.URL}/weChat/undoAss`,
            method: "POST",
            data: { assignmentId: app.globalData.userData.assignmentId },
            success(e) {
              console.log('撤案成功', e);
              ml.setData({
                assignmentStatus:false,
              })
              wx.redirectTo({
                url:'../../login/login'
              });
            },
            fail() { },
          })
        }
      },
    })
  },
  upAmount(){
    let ml=this;
    wx.showModal({
      title:`提示`,
      content:`确认同意此定损金额？`,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: `${cfg.URL}/weChat/upAmount`,
            method: "POST",
            data: { assignmentId: app.globalData.userData.assignmentId },
            success(e) {
              console.log('金额确认成功',e);
              ml.setData({
                customerConfirmed:1,
              })
            },
            fail(){},
          })
        }
      },
    })
  },
  subTextAreaBlur(e){
    this.setData({
      subTextAreaBlurText: e.detail.value,
    })
  },
  _callnum() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.userData.phoneNumber
    })
  },
  sub() {//提交意见
    let ml = this;
    if (ml.data.subTextAreaBlurText){
      wx.showModal({
        title: `提示`,
        content: `确认提交意见？`,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.request({
              url: `${cfg.URL}/weChat/sub`,
              method: "POST",
              data: {
                assignmentId: app.globalData.userData.assignmentId,
                customerProposal: ml.data.subTextAreaBlurText
              },
              success(e) {
                wx.showToast({
                  title:"提交意见成功",
                });
                ml.setData({
                  subTextAreaBlurText:"",
                });
              },
              fail() { },
            })
          }
        },
      })
    }else{
      wx.showToast({
        title: "请输入内容！",
        icon:none
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ml=this;
    wx.stopPullDownRefresh();
    this.setData({
      customerName: app.globalData.userData.customerName,
      carMark: app.globalData.userData.carMark,
    });

    if (!app.globalData.caseinform) {
      wx.showLoading({
        title: '请稍候……',
        mask: true
      });
      console.log(app.globalData.userData.assignmentId);
      wx.request({
        url: `${cfg.URL}/weChat/reportInfo`,
        method: "POST",
        data: { assignmentId: app.globalData.userData.assignmentId },
        success(e) {
          console.log(e,e.data);
          if (e.data) {
            ml.setData({
              repairInfo: e.data.repairInfo
            });
            if (e.data.flag) {
              ml.setData({
                havePrice: true,
                totalAmount: e.data.totalAmount,
                customerConfirmed: e.data.customerConfirmed,
                // havePrice: true,
                // totalAmount:null,
              })
            }
          } else {
            console.error(e.data)
            console.log("系统没有返回 reportInfo 数据！")
          }
          wx.request({
            url: `${cfg.URL}/weChat/reportDate`,
            method: "POST",
            data: { assignmentId: app.globalData.userData.assignmentId },
            success(e) {
              console.log(e.data);
              if (e.data) {
                let time = new Date(e.data.reportDate);
                let caseTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
                ml.setData({
                  'caseinform.case_time': caseTime,
                  
                });
                if (e.data.assignmentStatus == 4) {  //能撤案
                  let cancelDescription = JSON.parse(e.data.cancelDescription).description;
                  ml.setData({
                    assignmentStatus: true,
                    cancelDescription: cancelDescription,
                  });
                }
                // let time = new Date(e.data.reportDate);
                // let caseTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
                // ml.setData({
                //   'caseinform.case_time': caseTime,
                //   repairInfo: e.data.repairInfo,
                // });
                // if (e.data.assignmentStatus == 4) {  //能撤案
                //   let cancelDescription = JSON.parse(e.data.cancelDescription).description;
                //   ml.setData({
                //     assignmentStatus: true,
                //     cancelDescription: cancelDescription,
                //   });
                // }
                // if (e.data.flag) {
                //   ml.setData({
                //     havePrice: true,
                //     totalAmount: e.data.totalAmount,
                //     customerConfirmed: e.data.customerConfirmed,
                //   })
                // }
              } else {
                console.error(e.data)
                console.log("系统没有返回 reportDate 数据！")
              }
              wx.hideLoading();
            }
          })
        },
        fail(err){
          console.log(err,"cuo wu ")
        }
      })
    } else {
      ml.setData({
        caseinform: app.globalData.caseinform
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
    let ml=this;
    cfg.getIsAva(app.globalData.userData.customerId,function(){
      wx.request({
        url: `${cfg.URL}/weChat/number`,
        method: "POST",
        data: { assignmentId: app.globalData.userData.assignmentId },
        success(e) {
          console.log(e);
          ml.setData({
            photosNum:e.data.count
          })
          wx.hideLoading();
        }
      })
    });
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
    this.onLoad();
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