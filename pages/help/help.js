// pages/help/help.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  pay:function(){
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success (res) { 
        wx.showToast({
          title: '成功了',
        })
        console.log("2222222111")
      },
      fail (res) { }
    })
  },

  data: {
    scene:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var scene_img = '/images/pay3.jpg'
    that.setData({
      scene:scene_img
    })
  },

  previewImage:function(e){
    wx.previewImage({
      urls: this.data.scene.split(',')
    })   
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