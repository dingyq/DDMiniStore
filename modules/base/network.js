let network = {};
// region 成员变量
let Promise = require('./promise.js');
let MyError = require('./MyError');
let extend = require('./extend');

const TAG = 'network';
// endregion

// region 对外接口
/**
 * 发起请求
 * @param {Object} options 参数对象
 * @param {String} options.url URL
 * @param {Object|String} options.data 提交的数据
 * @param {Object} options.header 请求的头部
 * @param {String} options.method 方法，默认为GET
 * @return {Promise} 成功时返回的参数是server返回的全部数据
 */
network.doRequest = function(options) {
    return new Promise((resolve, reject) => {

        /**
         * 请求成功时的回调函数
         * @param  {Object} res 返回的数据
         * @example
         * {
         *     statusCode: 200,
         *     errMsg: '',
         *     data: {} //server返回的data
         * }
         * @return {Undefined}
         */
        options.success = (res) => {
            if(+res.statusCode !== 200){
                reject(new MyError('HTTP ERROR, Status ' + res.statusCode));
                return;
            }
            if(!res.data){ // res.data 数据才是我们服务器返回的是数据。故这里判断一下
                reject(new MyError('No Response Data.'));
                return;
            }
            // if(+res.data.code !== 0){
            //     reject(new Error('ERROR: ' + res.data.message));
            //     return;
            // }
            if( typeof options.isFail === 'function' && options.isFail(res.data)){// 因为各方定的协议不统一，故需要业务方自己判断是否成功。所有有isFail回调方法。该方法目前为可选
                // console.log('isFail:', res.data);
                reject(options.getError(res.data));
            }
            resolve(res.data);
        };

        /**
         * 请求失败时的回调函数
         * @param  {Object} err 错误对象
         * @return {Undefined}
         */
        options.fail = (err) => {
            // console.log(TAG, 'options.fail --> err.errMsg:' + err.errMsg);
            reject(new MyError('网络错误，请稍后再试')); // new Error返回的是Object{line:508, column: 29}, 所以用new MyError()
        };
        //http头
        // let accountInfo = require('./AccountInfo');
        if(!options.notWebSig){
            options.header=extend(options.header,{
                'X-Futu-Client-Type': '38',
                'X-Futu-Client-Version': getApp().getBuildVersion().toString(),
                'X-Futu-Client-Lang': 'sc'
            });
            // if ( !options.header.hasOwnProperty('X-Futu-WebSig') ){
            //     options.header['X-Futu-WebSig'] = accountInfo.getWebSig();
            // }
            // if ( !options.header.hasOwnProperty('X-Futu-Uid') ){
            //     options.header['X-Futu-Uid'] = accountInfo.getUid().toString();
            // }
        }
        // 发起请求
        // wx.request(options);
        resolve({test: 'test'})
    });
};

network.doFormRequest=function(options){
    options.header=extend(options.header,{
        'content-type': 'application/x-www-form-urlencoded'
    });

    return this.doRequest(options);
}





// endregion

network.httpGet = function () {

}

network.httpPost = function () {

}

network.httpUpload = function () {

}

module.exports = network;

// var config = require('../config.js')
// var config = require('../../config.js')
// function Get (url, data, cb ){
// 	// wx.showNavigationBarLoading();
// 	// wx.request({
//  //        method:'GET',
// 	// 	url: config.HTTP_BASE_URL + url,
// 	// 	data: data,
// 	// 	success: (res) => {
// 	// 		typeof cb == "function" && cb(res.data,"");
// 	// 		wx.hideNavigationBarLoading();
// 	// 	},
// 	// 	fail:(err) => {
// 	// 		typeof cb == "function" && cb(null,err.errMsg);
// 	// 		wx.hideNavigationBarLoading();
// 	// 	}
// 	// });
// };

// function Post (url,data, cb ){
// 	// wx.request({
//  //        method:'POST',
// 	// 	url:  config.HTTP_BASE_URL + url,
// 	// 	data: data,
// 	// 	success: (res) => {
// 	// 		typeof cb == "function" && cb(res.data,"");
// 	// 	},
// 	// 	fail:(err) => {
// 	// 		typeof cb == "function" && cb(null,err.errMsg);
// 	// 		console.log("http请求:"+config.HTTP_url);
// 	// 		console.log(err)
// 	// 	}
// 	// });
// };

// function Upload (url ,file ,data, cb ){
// 	// wx.uploadFile({
// 	// 	url:  config.HTTP_BASE_URL + url,
// 	// 	filePath: file,
// 	// 	name:"file",
// 	// 	formData:data,
// 	// 	success: (res) => {
// 	// 		if( typeof(res.data)=="string"  ){
// 	// 			typeof cb == "function" && cb( JSON.parse(res.data),"");
// 	// 		}else{
// 	// 			typeof cb == "function" && cb(res.data,"");	
// 	// 		}
			
// 	// 	},
// 	// 	fail:(err) => {
// 	// 		typeof cb == "function" && cb(null,err.errMsg);
// 	// 	}
// 	// });
// };


// module.exports ={
//     httpGet:Get,
//     httpPost:Post,
// 	httpUpload:Upload
// };