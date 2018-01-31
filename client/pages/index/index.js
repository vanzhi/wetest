// pages/index/index.js
// const amapFile  = require('../../vendor/map/amap-wx.js');
const appKey_gd = '94b3cd2660907f6b605dc7e36c4bc115'     // 高德 used
const appKey_tx = 'MXQBZ-2FDWD-SCQ47-HQ3XJ-UFPVO-EPBVJ'  // 腾讯
const end = 'end'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mapCtx: null,
    userInfo: null,
    markers: [],
    controls: [],
    scale: 14,
    location: {
      longitude: 0,   // 经度
      latitude: 0,    // 纬度
      speed: 0,       // 速度
      altitude: 0     // 高度
    },
    src: '',
    regiontest: ''
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
  // 下一步
  nextStep() {
    let markers = this.data.markers.map((item, index) => {
      return `${item.longitude},${item.latitude}`
    })
    wx.navigateTo({
      url: '../staticMap/staticMap?markers=' + [markers].join(';')
    })
  },
  // 监听地图拖动事件
  regionchange: function(e) {
    if (e.type === end) {
      this.mapCtx.getCenterLocation({
        success: (data) => {
          let { longitude, latitude } = data
          this.setMarkers({ longitude, latitude })
        }
      })
    }
  },
  // 设置地理信息
  setLocation() {
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: (data) => {
        let { longitude, latitude, speed, altitude } = data
        this.setData({
          location: { longitude, latitude, speed, altitude },
        })
        this.setMarkers({ latitude, longitude })
      }
    })
  },
  // 设置画面中心的标记
  setPoint() {
    wx.getSystemInfo({
      success: (data) => {
        var height = data.windowHeight;
        var width = data.windowWidth;
        
      }
    })
  },
  // 获取用户信息保存
  setUserInfo() {
    wx.getUserInfo({
      withCredentials: true,
      success: (data) => {
        this.userInfo = data.userInfo
        console.log(data.userInfo)
      },
      fail: () => {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 创建map上下文
    this.mapCtx = wx.createMapContext('map')
    this.setLocation();
    this.setPoint();
    this.setUserInfo();
    // this.amap = new amapFile.AMapWX({ key: appKey_gd });
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