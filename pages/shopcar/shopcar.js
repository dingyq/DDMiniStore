//logs.js
var util = require('../../utils/util.js')
var sta = require("../../utils/statistics.js");
const extend = require('../../modules/base/extend.js');
const DDUserInfo = require('../../modules/base/DDUserInfo.js');
const mallservice = require('../../modules/mall/mallservice.js');

Page({

  data: {
    allGoods:{},
    sumPrice:0
  },

  onLoad: function () {
  
  },

  onShow:function (){
    sta();
    this.showAllGoods();
  },

  settlement:function (){
    wx.navigateTo({url: '/pages/settlement/index'})
  },

  jia:function (e){
    this.jiaj(e,true);
  },

  jian:function (e){
    this.jiaj(e,false);
  },

  showAllGoods:function (){

    let goodsInCart = DDUserInfo.getShoppingCar().list;
    let allGoods = [];
    let sumPrice = 0;
    for(let i=0; i< goodsInCart.length ;i++) {
        let goods = mallservice.getGoods(goodsInCart[i].goodsId);
        goods = extend(goods, goodsInCart[i]);
       
        var price = goods.discountPrice;
        var count =  goods.count;
        console.log(price, count);
        price = util.accMul(price, count);
        sumPrice = util.accAdd(sumPrice, price);

        allGoods.push(goods);
    }

    this.setData({
      allGoods:allGoods,
      sumPrice:sumPrice
    });
  },

  toDetail:function(e){
      var id = e.currentTarget.dataset.id;
        wx.redirectTo({
          url: '../detail/index?id='+id}
        )
  },

  jiaj:function (e,boo){
    var id = e.currentTarget.dataset.id;
    var s = 0;
    var allGoods = this.data.allGoods;
    for(var i=0;i<allGoods.length;i++){
        if(allGoods[i].id==id){
            if(boo){
                s = allGoods[i].buycount+1;
            }else{
                s = allGoods[i].buycount-1;
            }
            //最低值不得低于1
            if(1>s){
                allGoods.splice(i, 1);
            }else{
                allGoods[i].buycount = s;
            }
            break;
          }
    }
    wx.setStorageSync('shoppingcar', allGoods);
    this.setData({
      allGoods:allGoods
    });
    this.showAllGoods();
  }
})
