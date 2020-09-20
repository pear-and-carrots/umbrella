// pages/register3/register3.js
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
    //  console.log('picker发送选择改变，携带值为', e.detail.value)
      var index = e.detail.value
      var array = this.data.array
      console.log("该用户所在雨伞站点为：",array[index])
      // postJSON('/order/insert_order.do',{stationId:array[index]}, res => {})
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
     var stuName = e.detail.value.username;
     var stuClass = e.detail.value.grade;
     var stuPhone = e.detail.value.tel;
     var umId = e.detail.value.number;
     var stuId = e.detail.value.student_number;
     var myreg = /^1[34578]\d{9}$/;
     //var myreg = /^[1][3,4,5,7,8,9][0,9]{9}$/;
     let reg = /^[\u2E80-\u9FFF]+$/;
     var index = e.detail.value
    var array = this.data.array
    console.log("11111该用户所在雨伞站点为：",index)
    console.log("22222该用户所在雨伞站点为：",array)
    this.setData({
      index: e.detail.value
    })

    if (stuName == ''||stuClass == ''||stuPhone == ''||umId == ''||stuId == '') {
      wx.showToast({
        title: '请填写完整信息!',
        icon: "none"
      })
    }else if(stuId.length !=12){
      wx.showToast({
        title: '请输入正确学号！',
        icon:'none'
      })
    }else if(!myreg.test(stuPhone)){
      wx.showToast({
        title: '请输入正确手机号码!',
        icon:"none"
      })
    }else if(!reg.test(stuName)){
      wx.showToast({
        title: '请输入正确姓名！',
        icon:'none'
      })
    }else if(stuName != ''&&stuClass != ''&&stuPhone != ''&&umId != ''&&stuId != ''&&stuPhone.length == 11&&stuId.length ==12&&myreg.test(stuPhone)&&reg.test(stuName)){
      console.log(e.detail.value)
     //console.log(e.detail.value.username)
      postJSON('/order/delete_order.do',
     {openId:wx.getStorageSync('openId'),stationId:wx.getStorageSync('stationId'),stuClass:stuClass,stuId:stuId,stuName:stuName,stuPhone:stuPhone,umId:umId},
      res => {console.info("",res);
     if(res.data.status == 1){
       wx.showToast({
         title: res.data.msg,
         icon:"none"
       })
     }else if(res.data.status == 0){
       wx.showModal({
         title:"提示",
         content:'您已还伞成功',
         showCancel:false,
         confirmText:"确定",
         success(e){
           wx.requestSubscribeMessage({
              tmplIds: ['NuXtI9JDBM1rn97Z5gImnSxKBLb1dGl1slOvxTWT_SA'],
             //tmplIds: ['79xrqzK1xd1mKufhVUnWfLCQXvlh9iOZIT3gAm2j4Ww'],
             success(res){
               console.log("成功推送借伞成功信息")
               wx.reLaunch({
                 url: '/pages/home_page/home_page',
             })
            }
           })
         }
       })
     }
     
   })


    }
  },

  getsubload:function(res){
   
  }
})