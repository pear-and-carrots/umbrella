 //pages/discuss/discuss.js
 import { getJSON, postJSON } from '../../request.js';
 import{
   getMultiData
 }from '../../pages/service/discuss.js'
Page({
  input:function(re){
  },

  bindFormSubmit: function(e) {
    console.log("评论在这里呢:",e.detail.value)
    var content = e.detail.value.textarea;
    //var content = 'hhhhhhhhhhhhh'
    if(content.length == ''){
      wx.showToast({
        title: '请输入评论内容!',
        icon: "none"
      })
    }else if(content.length != ''){
      wx.showModal({
        title:"提示",
        content:"确认提交匿名评论内容？",
        cancelColor: 'red',
        success (res) {
          if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '提交成功！',
            success:(res)=>{
              setTimeout(function(e){
                wx.reLaunch({
                  url: '/pages/discuss/discuss',
                })
              },1300)
            }
          })
          wx.request({
            url: 'https://lidengyin1999.mynatapp.cc/evaluate/add_one.do', //仅为示例，并非真实的接口地址
            data: {
            content:content
            },
            method:"POST",
            header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success (res) {
            console.log(res.data)
            console.log("打印打印打印：",res.data.content)
            }
            })
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


  /**
   * 页面的初始数据
   */
  handlegood(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    });
  },

  handleClick(){
    wx.navigateTo({
      url: '/pages/saying/saying',
    })
  },

  data: {
    height:20,
    focus:false,
    isCollected:false,
    showdata:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    getMultiData().then(res => {
        //取出轮播图的数据
        const banners = res.data.data.banner.list;
        this.setData({
            banners
        })
    })
    // getJSON('/evaluate/get_list.do', { pageNum: 1, pageSize: 1000 }, res => {
    //     console.log(res);
    //     this.setData({
    //         showdata: res.data.data.list
    //     })
    // })
    wx.request({
      url: 'https://lidengyin666.top:8254/evaluate/get_list.do', //仅为示例，并非真实的接口地址
      data: {
        pageNum: 1, 
        pageSize: 1000
      },
      method:"GET",
      header: {
      'content-type': 'application/json'// 默认值
      },
      success :(res)=> {
        console.log(res);
            this.setData({
                showdata: res.data.data.list
            })
      }
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