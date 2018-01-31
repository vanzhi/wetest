// pages/staticMap/staticMap.js

const amapFile  = require('../../vendor/map/amap-wx.js');
const appKey_gd = '94b3cd2660907f6b605dc7e36c4bc115'     // 高德 used
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers : [],
    src: ''
  },

  // markers封装
  setMarkers(data) {
    let points = data instanceof Array ? data : [data]
    let markers = points.map((item, index) => {
      return {
        ...item,
        id: index,
        iconPath: '/resources/cao.png'
      }
    })
    this.setData({ markers })
  },
  // 画画开始了
  setCanvans() {
    let ctx = wx.createCanvasContext('myCanvas')
    wx.downloadFile({
      url: this.data.src,
      success: ({ tempFilePath }) => {
        ctx.drawImage(tempFilePath, 0, 0, 200, 200)
        ctx.setFontSize(20)
        ctx.setGlobalAlpha(0.5)
        ctx.drawImage('/resources/site.png', 0, 0, 200, 200)
        ctx.setGlobalAlpha(1)
        ctx.fillText('helooooo, 天气不错', 20, 20)
        ctx.draw()
      }
    })
  },
  // 设置静态图
  setStaticMap() {
    var myAmapFun = new amapFile.AMapWX({ key: appKey_gd });
    wx.getSystemInfo({
      success: (data) => {
        var height = data.windowHeight;
        var width = data.windowWidth;
        var size = width + "*" + height;
        let location = this.data.markers.map((item, index) => {
          return `${item.longitude},${item.latitude}`
        })[0]
        myAmapFun.getStaticmap({
          zoom: 14,
          size: size,
          scale: 2,
          location,
          success: (data) => {
            this.setData({
              src: data.url
            })
            this.setCanvans()
          },
          fail: function (info) {
            wx.showModal({ title: info.errMsg })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let points = options.markers || '121.47852831787111,31.220827204513334'
    let markers = points.split(';').map((item, index) => {
      let point = item.split(',');
      return {
        longitude : point[0],
        latitude : point[1]
      }
    })
    this.setMarkers(markers)
    this.setStaticMap()

    wx.onUserCaptureScreen(function (res) {
      console.log(res)
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