//logs.js
var util = require('../../utils/util.js')
var sta = require("../../utils/statistics.js");
const extend = require('../../modules/base/extend.js');
const DDUserInfo = require('../../modules/base/DDUserInfo.js');
const mallservice = require('../../modules/mall/mallservice.js');

Page({

  data: {
    allGoods:[],
    sumPrice:0
  },

  onLoad: function () {
  
  },

  onShow:function (){
    sta();

    let goodsInCart = DDUserInfo.getShoppingCar().list;
    let allGoods = [];
    let sumPrice = 0;
    for(let i=0; i< goodsInCart.length ;i++) {
        let goods = mallservice.getGoods(goodsInCart[i].goodsId);
        goods = extend(goods, goodsInCart[i]);
        var price = goods.discountPrice;
        var count =  goods.count;
        price = util.accMul(price, count);
        sumPrice = util.accAdd(sumPrice, price);
        allGoods.push(goods);
    }

    this.setData({
      allGoods:allGoods,
      sumPrice:sumPrice
    });
  },

  onHide:function () {
    let cart = {list: {}};
    for (let i = 0; i < this.data.allGoods.length; i++) {
        let goods = this.data.allGoods[i];
        cart.list[goods.goodsId] = goods.count;
    }
    DDUserInfo.updateShoppingCar(cart);
  },

  bindGoodsAdd: function(event) {
    this.updateCart(event, true);
  },

  bindGoodsMinus: function(event) {
    this.updateCart(event, false);
  },

  bindInputChange: function(event) {

  },

  bindInputing: function(event) {

  },

  bindInputFocus: function(event) {

  },

  bindInputBlur: function(event) {

  },


  settlement:function (){
    wx.navigateTo({url: '/pages/settlement/settlement'})
  },

  toDetail:function(e){
      var id = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../detail/detail?id='+id}
        )
  },

  updateCart:function (e, flag){
    let id = e.currentTarget.dataset.id;
    let s = 0;
    for(let i=0;i<this.data.allGoods.length;i++){
        let goods = this.data.allGoods[i];
        if(goods.goodsId == id) {
            if(flag){
                s = goods.count + 1;
            }else{
                s = goods.count - 1;
            }
            //最低值不得低于1
            if (1 > s) {
                this.data.allGoods.splice(i, 1);
            } else {
                goods.count = s;
            }
            break;
        }
    }
    
    let sumPrice = 0;
    for(let i = 0;i < this.data.allGoods.length; i ++) {
        let goods = this.data.allGoods[i];
        var price = goods.discountPrice;
        var count =  goods.count;
        price = util.accMul(price, count);
        sumPrice = util.accAdd(sumPrice, price);
    }

    this.setData({
        allGoods:this.data.allGoods,
        sumPrice: sumPrice,
    });
  }

})
