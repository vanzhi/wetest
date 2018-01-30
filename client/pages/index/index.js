// pages/index/index.js
// const amapFile  = require('../../vendor/map/amap-wx.js');
const appKey_gd = '94b3cd2660907f6b605dc7e36c4bc115'     // 高德 used
const appKey_tx = 'MXQBZ-2FDWD-SCQ47-HQ3XJ-UFPVO-EPBVJ'  // 腾讯

var markersData = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    amap: null,
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
    src: ''
  },
  regionchange: function() {
    
  },
  setLocation() {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (data) => {
        let { longitude, latitude, speed, altitude } = data
        this.setData({
          location: { longitude, latitude, speed, altitude }
        })
      },
      fail: () => {

      }
    })
  },
  setPoint() {
    wx.getSystemInfo({
      success: (data) => {
        var height = data.windowHeight;
        var width = data.windowWidth;
        
      }
    })
  },
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