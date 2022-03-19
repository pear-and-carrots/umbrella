import {
  getJSON,
  postJSON
} from '../../request.js';
Page({
  data: {
    message: '',
    answer: [],
    msg: ''
  },

  onLoad: function (options) {
    this.getQuestion()
  },

  getQuestion: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    getJSON('/question/getOne.do', {},
      res => {
        wx.hideLoading()
        if (res.data.status == 0) {
          that.setData({
            list: res.data.data
          })
          console.log(that.data.list)
        } else {
          wx.showToast({
            title: '网络出错啦！',
          })
        }
      })
  },

  radioChange: function (e) {
    // console.log("e", e.currentTarget.dataset.subjectid)
    this.setData({
      subjectid: e.currentTarget.dataset.subjectid
    })
    this.makeAnswer()
  },

  name: function (e) {
    this.setData({
      name: e.currentTarget.dataset.name,
      subsmid: e.currentTarget.dataset.subsmid
    })
    if (this.data.subsmid == 'fcc0cb02-729f-4cb1-9a8c-1aaea1948efd') {
      this.setData({
        istext: true
      })
    } else if (this.data.subsmid == '900337c4-8961-47b0-bb94-18f948108def') {
      this.setData({
        istext: false
      })
    }
  },

  makeAnswer: function (e) {
    let data = {
      name: this.data.name,
      subjectid: this.data.subjectid,
      subsmid: this.data.subsmid
    }

    let flag = false

    let answer = this.data.answer
    if (answer.length == 0) {
      answer.push(data)
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i].subjectid == this.data.subjectid) {
          answer[i] = data
          flag = true
        }
      }
      if (flag == false) {
        answer.push(data)
      }
    }
    this.setData({
      answer: answer
    })
    console.log(answer)
  },

  bindtext: function (e) {
    let answer = this.data.answer
    answer.forEach(element => {
      if (element.subjectid == this.data.subjectid) {
        element.name = e.detail.value
      }
    });
    this.setData({
      answer: answer,
      message: e.detail.value
    })
  },

  text: function (e) {
    let answer = this.data.answer
    answer.forEach(element => {
      if (element.subjectid == this.data.subjectid) {
        element.name = e.detail.value
      }
    });
    this.setData({
      answer: answer,
      msg: e.detail.value
    })
  },

  submit: function () {
    let that = this
    let list = this.data.list
    if (this.data.message.length == 0) {
      wx.showToast({
        title: '内容不能为空！',
        icon: "none"
      })
    } else if (this.data.answer.length != 4) {
      wx.showToast({
        title: '问卷未填写完整！',
        icon: "none"
      })
    } else {
      let answer = this.data.answer
      wx.showLoading({
        title: '提交中'
      })
      answer.forEach(item => {
        console.log(item)
        that.addSuggest(item)
      })
      setTimeout(res => {
        if (that.data.status == 0) {
          wx.hideLoading()
          wx.showModal({
            content: list[list.length - 1].subject.name,
            showCancel: false,
            confirmText: "好的",
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../home_page/home_page',
                })
              }
            }
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '网络出错了！',
          })
        }
      }, 500)
    }
  },

  addSuggest(data) {
    let that = this
    getJSON('/question/answer.do', {
        name: data.name,
        subjectId: data.subjectid,
        subsmId: data.subsmid
      },
      res => {
        if (res.data.status == 0) {
          that.setData({
            status: res.data.status
          })
        }
      })
  },

  onShareAppMessage: function () {

  }
})