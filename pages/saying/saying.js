// pages/saying/saying.js
import { getJSON, postJSON } from '../../request.js';
Page({

  /**
   * 页面的初始数据
   */
  input(){

  },
  bindFormSubmit: function(e) {
    console.log("评论在这里呢:",e.detail.value)
    var content = e.detail.value.textarea;
    //var content = 'hhhhhhhhhhhhh'
    if(content.length <10){
      wx.showModal({
        content: '您可以写多几个字评论么!',
        showCancel:false,
        confirmText:"可以"
      })
    }else if(content.length != ''){
      wx.showModal({
        title:"提示",
        content:"确认提交匿名评论内容？",
        cancelColor: 'red',
        success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          wx.showModal({
            title: '提交成功！',
            content:'本评论需要经过后台审查, 审查通过后即可展示, 请勿涉及色情暴力煽动犯罪内容, 如有发现会做相应屏蔽处理',
            showCancel:false,
            confirmText:'我知道了',
            confirmColor:'#3CB371',
            success:(res)=>{
                wx.reLaunch({
                  url: '/pages/discuss/discuss',
                })
            }
          })
           postJSON('/evaluate/add_one.do',{content:content}, res => {console.info("???????????",res);})
          
          
          } else if (res.cancel) {
          console.log('用户点击取消')
          }
          }
      })

    }
    // fail:(res)=>{
    //   wx.showToast({
    //     title: '正在加载中...',
    //     icon:"none"
    //   })
    // }
  },

  data: {
    height: 20,
    focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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