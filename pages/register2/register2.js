// pages/register3/register3.js
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
    var umId = e.detail.value.number;
    var stuId = e.detail.value.student_number;

    var index = e.detail.value
    var array = this.data.array
    console.log("11111该用户所在雨伞站点为：", index)
    console.log("22222该用户所在雨伞站点为：", array)
    this.setData({
      index: e.detail.value
    })

    if (umId == '' || stuId == '') {
      wx.showToast({
        title: '请填写完整信息!',
        icon: "none"
      })
    } else if (stuId.length != 12) {
      wx.showToast({
        title: '请输入正确学号！',
        icon: 'none'
      })
    } else if (umId != '' && stuId != '' && stuId.length == 12) {
      console.log(e.detail.value)
      postJSON('/order/delete_order.do', {
          openId: wx.getStorageSync('openId'),
          stationId: wx.getStorageSync('stationId'),
          stuId: stuId,
          umId: umId
        },
        res => {
          console.info("", res);
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
          } else if (res.data.status == 0) {
            wx.showModal({
              title: "提示",
              content: '您已还伞成功',
              showCancel: false,
              confirmText: "确定",
              success(e) {
                wx.requestSubscribeMessage({
                  tmplIds: ['sggeS5cBanQl7bjwxg4O6BqdXsrDI_xG3QvoJQ26nX8'],
                  success(res) {
                    wx.showModal({
                      title: '',
                      content: '我们希望得到您的意见反馈，更好地提升用户体验',
                      confirmText:'前往',
                      cancelText:'暂不',
                      success (res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: '/pages/message/message',
                        })
                      } else if (res.cancel) {
                        wx.reLaunch({
                          url: '/pages/home_page/home_page',
                        })
                      }
                      }
                    })
                  }
                })
              }
            })
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