var config = require('config.js')
var http = require('./modules/base/network.js')
var util = require('./utils/util.js')
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that = this;
    this.getUserInfo(null);
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
        typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
        //调用登录接口
        wx.login({
            success: function(res) {
                if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({
                        success: function (res) {
                            //发起网络请求
                            var userInfo = res.userInfo;
                            that.globalData.userInfo = userInfo;
                            var data  ={ username:userInfo.nickName,avatar:userInfo.avatarUrl,code: code,appid:config.APPID}
                            http.httpGet("?c=user&a=wxlogin" ,data,function(res){
                                if(res.code == '200' && res.msg == 'success'){
                                    userInfo.id = res.data.id;
                                    that.globalData.userInfo = userInfo;
                                    typeof cb == "function" && cb(userInfo)
                                }
                            });  
                        }
                     });
                } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
    }
  },
  getAppInfo:function(cb){
    //获取商品信息
    var that = this;
    if(this.globalData.appInfo){
        typeof cb == "function" && cb(this.globalData.appInfo)
    }else{
        var data = {appid:config.APPID}
        http.httpGet("?c=myapp&a=getmyapp" ,data,function(res){
            if(res.code == '200' && res.msg == 'success'){
                that.globalData.appInfo = res.data;
                typeof cb == "function" && cb(that.globalData.appInfo)
            }
        });
    }
  },

    /**
     * 是否是开发版本
     * @return {boolean} true：开发版本。false：发布版本
     */
    isDebugVersion: function() {
        let ver = this.globalData.version;
        return +(ver.split('.')[2]) % 2 === 1;
    },

    /**
     * 获取版本号
     * @return {string}
     */
    getVersion: function() {
        return this.globalData.version;
    },

    /**
     * 获取build号
     * @return {number}
     */
    getBuildVersion: function() {
        let ver = this.globalData.version;
        return +(ver.split('.')[2]);
    },

    getDeviceId: function () {
        return this.globalData.deviceId;
    },

    globalData: {
        userInfo:null,
        appInfo:null,
        deviceId: '',
        version: '1.0.1' // 大版本号.小版本号.build号。build为奇数表示开发版本，为偶数为发布版本。后台判断版本号用build好，这样控制能力更好
    }
})