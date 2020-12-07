let fileHost ="https://xdf-bxgg-wechatapp.oss-cn-hangzhou.aliyuncs.com";

let URL = "https://ds.lpcknew.com";
// let URL = "http://10.9.1.57:8080";

let config={
  uploadImageURL:`${fileHost}`,
  AccessKeySecret:"wBntAv9nNzXnXanzzHIIyBANUOwhA5",
  AccessKeyID: "LTAI33nOoGVXBjKq",
  timeOut: 87600,

  URL,
  webrtcServerUrl: 'https://gg.lpcknew.com/webrtc/weapp/webrtc_room',

  //public func
  // get isAva
  getIsAva(customerId,func,test){
    if (customerId){
      wx.showLoading({
        title: '请稍候……',
        mask: true
      });
      wx.request({
        url: `${URL}/weChat/isAva`,
        method: "POST",
        // customerId
        data: { customerId },
        success(e) {
          wx.hideLoading();
          console.log(e);
          if (e.data.flag) {
            func && func()
          } else {
            wx.showToast({
              title: "您已结案，退出小程序",
              icon: "none",
              mask: true
            });
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        },
        fail(err) {
          console.error(err, "这里是是否结案接口请求的错误提示")
        }
      });
    }else{
      console.error(customerId+' assignmentId 参数没有传入，请查看'+test||'没有test')
    }
  }
}
module.exports = config;