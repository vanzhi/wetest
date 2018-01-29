// pages/index/index.js
const amapFile  = require('../../vendor/map/amap-wx.js');
const appKey = '94b3cd2660907f6b605dc7e36c4bc115';
var markersData = [];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    location: {}
  },
  makertap (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  showMarkerInfo (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  getLoaction() {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: ({ latitude, longitude, altitude, speed }) => {
        this.setData({
          location: { latitude, longitude, altitude, speed }
        })
      },
      error: () => {
        
      }
    })
  },
  bindTapHandler(e) {
    this.getLoaction()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: appKey });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
    })
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