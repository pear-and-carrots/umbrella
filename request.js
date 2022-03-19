const HTTP_BASE_URL = "https://www.haichuang8888.com/umbrella";
// const HTTP_BASE_URL = "http://124.71.87.176:8181";
function api(_methods, url, data, callback) {
  wx.request({
    url: HTTP_BASE_URL + url,
    method: _methods,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded' // 默认值
    },
    data: data,
    success: (res) => {
      typeof callback == "function" && callback(res, "");
    },
    fail: (err) => {
      console.log('请求数据失败', HTTP_BASE_URL + url)
      console.log(err)
      typeof callback == "function" && callback(err, "");
    }
  });
}

function apg(_methods, url, data, callback) {
  wx.request({
    url: HTTP_BASE_URL + url,
    method: _methods,
    data: data,
    header: {
      'Content-Type': 'application/json'
    },
    success: (res) => {
      typeof callback == "function" && callback(res, "");
    },
    fail: (err) => {
      console.log('请求数据失败', HTTP_BASE_URL + url)
      console.log(err)
      typeof callback == "function" && callback(err, "");
    }
  });
}
export function getJSON(url, data, callback) {
  apg('GET', url, data, callback)
}
export function postJSON(url, data, callback) {
  api('POST', url, data, callback)
}