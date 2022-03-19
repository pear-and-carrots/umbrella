// pages/register0/register0.js
import {
  getJSON,
  postJSON
} from '../../request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: ['请点击选择站点...', '主楼二楼', '钟海楼B区正门', '图书馆二楼', '二教B5栋门口'],
    index: 0
  },

  bindPickerChange: function (e) {
    //  console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    var array = this.data.array
    console.log("该用户所在雨伞站点为：", array[index])
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

  input: function (e) {},

  submitForm: function (e) {
    //获取数据，简化代码
    var stuName = e.detail.value.username;
    var stuClass = e.detail.value.grade;
    var stuPhone = e.detail.value.tel;
    var umId = e.detail.value.number;
    var stuId = e.detail.value.student_number;
    var myreg = /^1[34578]\d{9}$/;
    let reg = /^[\u2E80-\u9FFF]+$/;


    if (stuName == '' || stuClass == '' || stuPhone == '' || umId == '' || stuId == '') {
      wx.showToast({
        title: '请填写完整信息!',
        icon: "none"
      })
    } else if (stuId.length != 12) {
      wx.showToast({
        title: '请输入正确学号！',
        icon: 'none'
      })
    } else if (!myreg.test(stuPhone)) {
      wx.showToast({
        title: '请输入正确手机号码!',
        icon: "none"
      })
    } else if (!reg.test(stuName)) {
      wx.showToast({
        title: '请输入正确姓名！',
        icon: 'none'
      })
    } else if (stuName != '' && stuClass != '' && stuPhone != '' && umId != '' && stuId != '' && stuPhone.length == 11 && stuId.length == 12 && myreg.test(stuPhone) && reg.test(stuName)) {
      console.log(e.detail.value)
      // console.log(e.detail.value.username)
      // console.log(wx.getStorageSync('openId'))
      // wx.request({
      //   url: 'https://www.haichuang8888.com/umbrella/order/insert_order.do',
      //   method: "GET",
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   data: {
      //     idOpen: wx.getStorageSync('openId'),
      //     stationId: wx.getStorageSync('stationId'),
      //     stuClass: stuClass,
      //     stuId: stuId,
      //     stuName: stuName,
      //     stuPhone: stuPhone,
      //     umId: umId
      //   },
      //   success: res => {
      //     console.log(res)
      //   },
      //   fail: re => {
      //     console.log(re)
      //   }
      // })
      postJSON('/order/insert_order.do', {
          idOpen: wx.getStorageSync('openId'),
          stationId: wx.getStorageSync('stationId'),
          stuClass: stuClass,
          stuId: stuId,
          stuName: stuName,
          stuPhone: stuPhone,
          umId: umId
        },
        res => {
          console.info("", res);
          if (res.data.status == 1) {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              confirmColor: '#576B95',
              confirmText: '再检查下',
            })
          } else if (res.data.status == 0) {

            wx.showModal({
              title: '提示',
              content: '您已借伞成功！',
              showCancel: false,
              confirmText: '好的！',
              success(e) {
                wx.requestSubscribeMessage({
                  tmplIds: ['sggeS5cBanQl7bjwxg4O6BqdXsrDI_xG3QvoJQ26nX8'],
                  success(res) {
                    console.log("成功推送借伞成功信息")
                    wx.reLaunch({
                      url: '/pages/home_page/home_page',
                    })
                  }
                })
              }
            })
          } else {
            console.log(res.data)
          }
        })
    }
  },

  getsubload: function (res) {

  },

  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '18127227786',
    })
  },
})