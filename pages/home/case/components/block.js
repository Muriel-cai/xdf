// pages/home/scene/components/block.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    rightText:{
      type:String
    },
    hasR:{
      type:Boolean,
      defaul:false
    }
  },
  methods: {
    _callnum() {
      this.triggerEvent("callnum");
      
    }
  },
 
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */

})
