// pages/components/camera.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ml_data:String,
    cameraHide:Boolean,
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cameraBack() {
      this.triggerEvent('cameraBack', true);
    },
    photograph(){
      let that = this;
      const ctx = wx.createCameraContext();
      ctx.takePhoto({
        quality: "normal",
        success: (res) => {
          this.triggerEvent('photograph', res.tempImagePath);
        }
      })
    }
  },
})
