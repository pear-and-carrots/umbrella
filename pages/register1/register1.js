import { getJSON, postJSON } from '../../request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array:['请点击选择站点...','主楼二楼','钟海楼B区正门','图书馆二楼','二教B5栋门口'],
    index:0
  },

  bindPickerChange: function(e) {
      var index = e.detail.value
      var array = this.data.array
      console.log("该用户所在雨伞站点为：",array[index])
      wx.setStorageSync('stationId', array[index])
      this.setData({
        index: e.detail.value
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  input: function(e){
  },

  submitForm: function (e) {
    //获取数据，简化代码
     var umId = e.detail.value.number;
     var stuId = e.detail.value.student_number;

    if (umId == ''||stuId == '') {
      wx.showToast({
        title: '请填写完整信息!',
        icon: "none"
      })
    }else if(stuId.length !=12){
      wx.showToast({
        title: '请输入正确学号！',
        icon:'none'
      })
    }else if(umId != ''&&stuId != ''&&stuId.length ==12){
      console.log(e.detail.value)

     console.log("666666666666666666666",wx.getStorageSync('openId'))
     postJSON('/order/update_order.do',
      {openId:wx.getStorageSync('openId'),stationId:wx.getStorageSync('stationId'),stuId:stuId,umId:umId},
       res => {console.info("",res);
      if(res.data.status == 1){
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }else if(res.data.status == 0){
        wx.showModal({
          title:"提示",
          content:'您已续伞成功！',
          showCancel:false,
          confirmText:"好的！",
          success(e){
            wx.requestSubscribeMessage({
              tmplIds: ['sggeS5cBanQl7bjwxg4O6BqdXsrDI_xG3QvoJQ26nX8'],
              //tmplIds: ['79xrqzK1xd1mKufhVUnWfLCQXvlh9iOZIT3gAm2j4Ww'],
              success(res){
                console.log("成功推送借伞成功信息")
                wx.navigateBack({
                  delta: 2,
                })
             }
            })
          }
        })
      }
      
    })
    }
  },

  phone:function(){
    wx.makePhoneCall({
        phoneNumber:'18127227786',
    })
  },
})