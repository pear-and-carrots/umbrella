// pages/home_page/home_page.js
import { getJSON, postJSON } from '../../request.js';
Page({

  /**
   * 页面的初始数据
   */
  handleShowModal(){
    wx.showModal({
      title:'借伞需知',
      content:'借伞人将需要正确填写个人信息，在特殊情况（如爱心伞的丢失、损坏等）用作联系借伞人。我方将严格遵守隐私政策，严谨随意泄露、贩卖借伞人个人信息。并在借伞人归伞后安全、及时地清除借伞人在我方所记录的个人信息，以保障借伞人的个人隐私安全。',
      cancelText:'再想想',
      cancelColor:'red',
      confirmText:'我同意',
      confirmColor:'green',
      success(res){
        if(res.confirm){
          console.log('用户点击同意按钮') 
          wx.navigateTo({
            url: '/pages/register0/register0',
          })
        }else if(res.cancel){
          console.log('用户点击再想想按钮')        
        }
      }
    })
  },




  handleClick1(){

    wx.showModal({
      title:'借伞需知',
      content:'借伞人将需要正确填写个人信息，在特殊情况（如爱心伞的丢失、损坏等）用作联系借伞人。我方将严格遵守隐私政策，严谨随意泄露、贩卖借伞人个人信息。并在借伞人归伞后安全、及时地清除借伞人在我方所记录的个人信息，以保障借伞人的个人隐私安全。',
      cancelText:'再想想',
      cancelColor:'red',
      confirmText:'我同意',
      confirmColor:'green',
      success(res){
        if(res.confirm){
          console.log('用户点击同意按钮') 
          wx.navigateTo({
            url: '/pages/register1/register1',
          })
        }else if(res.cancel){
          console.log('用户点击再想想按钮')        
        }
      }
    })

     getJSON('/wechat/code?code=n',{code:wx.getStorageSync('openId')}, res => {console.info("哈哈哈哈哈哈哈哈哈哈哈哈哈",res);})
  },

  handleClick2(){

    wx.showModal({
      title:'借伞需知',
      content:'借伞人将需要正确填写个人信息，在特殊情况（如爱心伞的丢失、损坏等）用作联系借伞人。我方将严格遵守隐私政策，严谨随意泄露、贩卖借伞人个人信息。并在借伞人归伞后安全、及时地清除借伞人在我方所记录的个人信息，以保障借伞人的个人隐私安全。',
      cancelText:'再想想',
      cancelColor:'red',
      confirmText:'我同意',
      confirmColor:'green',
      success(res){
        if(res.confirm){
          console.log('用户点击同意按钮') 
          wx.navigateTo({
            url: '/pages/register2/register2',
          })
        }else if(res.cancel){
          console.log('用户点击再想想按钮')        
        }
      }
    })
    
  },

  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userAgree = wx.getStorageSync('userAgree') || false
    that.setData({
        userAgree
    })
  },

  goToUserLicence: function(){
    wx.navigateTo({
      url: '/pages/home_page/licence/licence',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  tipAgree:function(){
    this.setData({
      userAgree:true
    })
    var userAgree = wx.getStorageSync('userAgree')
    userAgree = true;
    wx.setStorageSync('userAgree', userAgree);
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