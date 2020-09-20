// pages/discuss/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //showdata:{}
     showdata:[{content:"你好"},{content:"你好"},{content:"你好"}]
    // list:{
    //   type:Array,
    //   value:[]
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://lidengyin1999.mynatapp.cc/evaluate/get_list.do',
      data:{
      },
      method:"POST",
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log("hhhhh",res.data)
        if(res.status !=0){
          wx.showToast({
            title: '警告',
            content:"出了点错呢！" + res.data.msg,
          })
        }else if(res.status ==0){
          that.setData({
            showdata : res.data.content
          })
          console.log(that.data.showdata)//确保值已经保存下来
        }
      },
      fail:function(res){
        wx.showToast({
          title: '警告',
          content: '网络开小差了呢！',
        })
      },
      complete:function(res){
        wx.hideLoading()
      }
    })

    setTimeout(function(){
      wx.hideLoading()
    },2000)
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