// pages/components/help.js
import cfg from "../../../config.js"
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        txt: "视频求援",
        img: "video",
        url: "video/video"
      }
    ]
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    video() {
      let self = this;
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
            wx.navigateTo({ url: '../video/video' });
          } else if (e.statusCode === 500) {
            wx.showModal({
              title: '提示',
              content: `操作不当，请稍后重试`,
              showCancel: false,
            });
          }
        }
      })
    },
    call() {
      wx.makePhoneCall({
        phoneNumber: app.globalData.userData.phoneNumber
      })
    },
  }
})
