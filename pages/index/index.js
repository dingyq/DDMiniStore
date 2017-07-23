const mallservice = require('../../modules/mall/mallservice.js')
const DDLog = require('../../modules/base/DDLog.js');
const DDUserInfo = require('../../modules/base/DDUserInfo.js');
let extend = require('../../modules/base/extend');
//index.js
//获取应用实例
const app = getApp()
const sta = require("../../utils/statistics.js");

Page({
  data: {
    curCategoryId:1,
    goodsInfoList:[],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
  },

  onLoad: function(options) {
    this.loadingChange()

    let that = this;
    mallservice.getGoodsList().then((res) => {
      if (res.code === 0) {
        let category = res.data[0];

        that.setData({
          goodsInfoList: res.data,
          curCategoryId: category.categoryId,
          goodsList: category.goodsList,
        });
      }
    });
  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {
    let cart = this.data.cart;
    DDUserInfo.updateShoppingCar(cart);
  },

  onUnload: function() {

  },


  loadingChange: function() {
    setTimeout(() => {
      this.setData({
        hidden:true
      })
    },2000)
  },

  selectCategory: function(event) {
    const goodsInfoList = this.data.goodsInfoList;
    let goodsList = [];
    let id = event.target.dataset.id;
    for (let i = 0; i < goodsInfoList.length; i++) {
      let category = goodsInfoList[i];
      if (category.categoryId == id) {
          goodsList = category.goodsList;
          break;
      }
    }
    this.setData({
      curCategoryId:id,
      goodsList: goodsList,
    })
  },

  getGoods:function(goodsId) {
    const goodsInfoList = this.data.goodsInfoList;
    for (let i = 0; i < goodsInfoList.length; i++) {
      let category = goodsInfoList[i];
      for (let j = 0; j < category.goodsList.length; j++) {
        if (category.goodsList[j].goodsId == goodsId) {
          return category.goodsList[j];
        }
      }
    }
    return null;
  },

  countCart: function () {
    var count = 0, total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.getGoods(id);
      count += this.data.cart.list[id];
      total += goods.discountPrice * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },

  bindGoodsAdd: function(event) {
    let goodsId = event.currentTarget.dataset.id;
    var num = this.data.cart.list[goodsId] || 0;
    this.data.cart.list[goodsId] = num + 1;
    this.countCart();
  },

  bindGoodsMinus: function(event) {
    let goodsId = event.currentTarget.dataset.id;
    var num = this.data.cart.list[goodsId] || 0;
    if (num <= 1) {
      delete this.data.cart.list[goodsId];
    } else {
      this.data.cart.list[goodsId] = num - 1;
    }
    this.countCart();
  },


  bindInputChange: function(event) {

  },

  bindInputing: function(event) {

  },

  bindInputFocus: function(event) {

  },

  bindInputBlur: function(event) {

  },

})