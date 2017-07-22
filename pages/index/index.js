
const config = require('../../config')
const network = require('../../modules/base/network')
const mallservice = require('../../modules/mall/mallservice.js')

//index.js
//获取应用实例
const app = getApp()
const sta = require("../../utils/statistics.js");

Page({
  data: {
    hidden:false,
    curNav:1,
    curIndex:0,
    cart:[],
    cartTotal:0,
    navList:[
      {
        id:1,
        name:'热销菜品'
      },
      {
        id:2,
        name:'热菜'
      },
      {
        id:3,
        name:'凉菜'
      },
      {
        id:4,
        name:'套餐'
      }
    ],
    dishesList:[
      [
        {
          name:"红烧肉",
          price:38,
          num:1,
          id:1
        },
        {
          name:"宫保鸡丁",
          price:58,
          num:1,
          id:29
        },
        {
          name:"水煮鱼",
          price:88,
          num:1,
          id:2
        }
      ],
      [
        {
          name:"小炒日本豆腐",
          price:18,
          num:1,
          id:3
        },
        {
          name:"烤鱼",
          price:58,
          num:1,
          id:4
        }
      ],
      [
        {
          name:"大拌菜",
          price:18,
          num:1,
          id:5
        },
        {
          name:"川北凉粉",
          price:8,
          num:1,
          id:6
        }
      ],
      []
    ],
    dishes:[]
  },

  onLoad: function(options) {
    this.loadingChange()

    // let that = this;
    // mallservice.getGoodsList().then((res) => {
    //   if (res.code === 0) {
    //     // that.setData({
    //     //   searchHistoryList: res.data,
    //     // });
    //   }
    // });
  },

  onReady: function() {
    let that = this;
    // searchService.getHotStock().then((res) => {
    //   that.setData({
    //     searchHotList: res,
    //   });
    // });
  },

  onShow: function() {
    // let that = this;
    // searchService.getSearchHistory().then((res) => {
    //   if (res.code === 0) {
    //     that.setData({
    //       searchHistoryList: res.data,
    //     });
    //   }
    // });

    // if (that.data.displayRV) {
    //   let tmpResult = that.data.searchResultList;
    //   that.setData({
    //     searchResultList: searchService.updateSearchResult(tmpResult)
    //   });
    // }
  },

  onHide: function() {

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
  selectNav: function(event) {
    let id = event.target.dataset.id,
      index = parseInt(event.target.dataset.index);
      self = this;
    this.setData({
      curNav:id,
      curIndex:index
    })
  },

  // 选择菜品
  selectDish: function(event) {
    let dish = event.currentTarget.dataset.dish;
    let flag = true;
    let cart = this.data.cart;
    
    if(cart.length > 0){
      cart.forEach(function(item,index){
        if(item == dish){
          cart.splice(index,1);
          flag = false;
        }
      })
    }
    if(flag) cart.push(dish);
    this.setData({
      cartTotal:cart.length
    })
    this.setStatus(dish)
  },

  setStatus: function(dishId) {
    let dishes = this.data.dishesList;
    for (let dish of dishes){
      dish.forEach((item) => {
        if(item.id == dishId){
          item.status = !item.status || false
        }
      })
    }
    
    this.setData({
      dishesList:this.data.dishesList
    })
  }
})