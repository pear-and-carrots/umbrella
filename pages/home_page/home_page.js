// pages/home_page/home_page.js
Page({

  /**
   * 页面的初始数据
   */
  handleShowModal(){
    wx.showModal({
      title:'借伞需知',
      content:'借伞人通过关注爱心社公众号，进入菜单中的爱心伞小程序，阅读清楚注意事项后，正确地填写借用信息，结束登记就可以使用爱心伞，并在借伞后的两天内自觉在任一站点归还，并填写归还信息，如出现不能及时归还的情况，可以在公众号爱心伞栏目上进行续借申请。',
      cancelText:'再想想',
      cancelColor:'red',
      confirmText:'同意',
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
    wx.navigateTo({
      url: '/pages/register1/register1'
    })
  },

  handleClick2(){
    wx.navigateTo({
      url: '/pages/register2/register2'
    })
  },

  data: {

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