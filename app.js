//app.js
App({
  globalData:{
    appid:'wx319356942ae9d9c5',
    secret:'106b0d6402a1144f3d3cf56f183cab39'
  },

  onLaunch: function () {
    // wx.cloud.init({
    //   env:"aixinsan-53y7b"
    // })
    this.globalData = {
     
    }


    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     this.globalData.openid = res.result.openid
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //   }
    // })


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        var appId = 'wx319356942ae9d9c5';
        var secret = '106b0d6402a1144f3d3cf56f183cab39';
        console.log("2222222222",res)
        console.log("这就是我的code："+code)
        wx.setStorageSync('code', res.code)

          wx.request({
            url: 'https://www.haichuang8888.com:8181/wechat/code',
            data:{
              code:code
            },
            success(e){
              console.log('后台请求的openid:',e.data.msg)
              wx.setStorageSync('openId',e.data.msg+"")
            } 
          })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.reLaunch({
                url: '/pages/home_page/home_page',
              })
              console.log(res)
              console.log("encryptedData在这里"+res.encryptedData)
              console.log("iv在这里"+res.iv)
              console.log('zyyy',wx.getStorageSync('code'))
              // this.globalData.openid=wx.getStorageSync('code')
              // console.log(this.globalData.openid)
              
              wx.request({

                //url:'http://172.16.13.73:8254/umbrella/umbrella/user',
              //  url: 'https://www.lidengyin666.top:8254/umbrella/user', //自己的服务接口地址
               url: 'https://www.haichuang8888.com', //自己的服务接口地址
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  code: wx.getStorageSync('code'),
                },
                success:function(res){
                  console.info("哈哈哈哈哈哈哈哈哈哈哈哈哈",res);
                  // wx.showToast({
                  //   title: '打印成功',
                  // })
                }
              })
             

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})