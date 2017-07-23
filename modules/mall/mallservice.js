const TAG = "MallService";
const network = require('../base/network.js');
const ProtocolUrl = require('../base/ProtocolUrl.js');
const Promise = require('../base/promise.js');
const MyError = require('../base//MyError.js');
const DDLog = require('../base/DDLog.js');

let mallservice = {};

let doRequest = (options) => {
	options.isFail = function(data) {
		DDLog.e(TAG, "doRequest()", "e: ", data.error);
		if (!data.error) {
			return false;
		}
		return true;
	};
	options.getError = (data) => {
		let error = data.error;
		return new MyError(error.error_msg, error.error_code);
	}
	return network.doRequest(options);
}

mallservice.getGoodsList = function() {
	return doRequest({
		url: ProtocolUrl.GoodsList,
		method: 'GET',
		data: {
			_: Date.now()
		}
	}).then((res) => {
		res = {
			"category":[
			{
				"categoryId":1, 	// 类别id
				"categoryName":"休闲零食"	,// 类品名称
			},
			{
				"categoryId":2,
				"categoryName":"日用品",
			}],
			"goods":[
			{
				"goodsId":1,	// 商品id
				"goodsName":"益达",	// 名字
				"categoryId":1,
				"categoryName":"食物",
				"picUrl":"https://www.baidu.com",	// 原图
				"thumbPicUrl":"https://www.baidu.com", // 缩略图
				"hasDiscount":1, // 是否有折扣
				"originPrice":12,	// 原价
				"discount":0.5,	// 折扣
				"discountPrice":6,	// 折后价
				"sales":100, 	// 销量
				"universalRank":123, // 综合排名
			},
			{
				"goodsId":2,	// 商品id
				"goodsName":"巧克力",	// 名字
				"categoryId":2,
				"categoryName":"食物",
				"picUrl":"https://www.baidu.com",	// 原图
				"thumbPicUrl":"https://www.baidu.com", // 缩略图
				"hasDiscount":1, // 是否有折扣
				"originPrice":12,	// 原价
				"discount":0.5,	// 折扣
				"discountPrice":6,	// 折后价
				"sales":100, 	// 销量
				"universalRank":123, // 综合排名
			},
			{
				"goodsId":3,	// 商品id
				"goodsName":"巧克力",	// 名字
				"categoryId":2,
				"categoryName":"食物",
				"picUrl":"https://www.baidu.com",	// 原图
				"thumbPicUrl":"https://www.baidu.com", // 缩略图
				"hasDiscount":1, // 是否有折扣
				"originPrice":12,	// 原价
				"discount":0.5,	// 折扣
				"discountPrice":6,	// 折后价
				"sales":100, 	// 销量
				"universalRank":123, // 综合排名
			}
			]
		}
		console.log('res is '+ res)
		let result = [];
		let categoryList = res.category;
		let goodsList = res.goods;
		for (let i = 0; i < categoryList.length; i++) {
			let category = categoryList[i];
			let tmpGoodsList = [];
			for (let j = 0; j < goodsList.length; j++) {
				let good = goodsList[j]
				if (good.categoryId == category.categoryId) {
					tmpGoodsList.push(goodsList[j])
				}
			}
			category.goodsList = tmpGoodsList;
			result.push(category);
		}
		return {
			code: 0,
			data: result,
		};
	}).catch((e) => {
		DDLog.e(TAG, "getGoodsList()", "e: ", e);
	});

}



module.exports = mallservice;