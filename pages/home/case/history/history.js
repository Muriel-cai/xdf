// pages/home/case/history/history.js
let title = ["承保公司", "报案时间", "被保险人", "车牌号码", "定损金额","理赔情况"]
let getServerData = [];
// let getServerData = [
//   {
//     state: true,
//     content: ["太平洋保险", "2018-07-08 16:00", "张六六", "浙A12345", "1888.00"]
//   }, {
//     state: false,
//     content: ["太平洋保险", "2018-07-08 16:00", "张六六", "浙A12345", "1888.00"]
//   }
// ]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jeijt:"fjeij",
    proList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(title, getServerData)
    let ls=[];
    for (let i = 0; i < getServerData.length;i++){
      let ele = getServerData[i];
      let state;
      let img="";
      let list=[];
      for(let j=0;j<title.length;j++){
        state=ele.state ? "已赔付" : "未赔付";
        img = ele.state ? "ypf" : "wpf";
        if(j===title.length-1){
          list.push({
            title: title[j],
            text: state
          })
        }else{
          list.push({
            title: title[j],
            text: ele.content[j]
          })
        }
      }
      ls.push({ state: state, content: list,img});
    }
    this.setData({
      proList:ls
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