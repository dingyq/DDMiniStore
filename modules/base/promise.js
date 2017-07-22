/*****
    微信小程序原生Promise有问题，
    当wx.request()执行到fail方法的时候，reject返回参数不起效！
 ******/

// if(typeof Promise === 'function'){
//     module.exports = Promise;
// }else{
    module.exports = require('./es6-promise');
// }
