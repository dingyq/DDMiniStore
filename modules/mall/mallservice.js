const TAG = "MallService";
const network = require('../base/network.js');
const Promise = require('../base/promise.js');
const MyError = require('../base//MyError.js');
const DDLog = require('../base/DDLog.js');

let mallservice = {};

let doRequest = (options) => {
	options.isFail = function(data) {
		if (!data.error) {
			return false;
		}
		// FtLog.e(TAG, "doRequest()", "e: ", data.error);
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
		url: protocolUrl.HotStock,
		method: 'GET',
		data: {
			_: Date.now()
		}
	}).then((res) => {
		let result = [];
		for (var i = 0; i < res.data.length; i++) {
			var oriObj = res.data[i];
			// TODO: 协议有问题，没有区分sz,sh;
			let marketType = MarketType.SZ.value;
			let marketStr = oriObj.market;
			if (marketStr === "HK" || marketStr === "hk") {
				marketType = MarketType.HK.value;
			} else if (marketStr === "US" || marketStr === "us") {
				marketType = MarketType.US.value;
			} else if (marketStr === "SH" || marketStr === "sh") {
				marketType = MarketType.SH.value;
			}
			let stockObj = {
				stockId: oriObj.stock_id,
				stockName: oriObj.stock_name,
				stockCode: oriObj.stock_code,
				market: marketType,
				marketSymbol: getMarketSymbol(marketType),
			};
			result.push(stockObj);
		}
		return result;
	}).catch((e) => {
		FtLog.e(TAG, "getHotStock()", "e: ", e);
	});

}



module.exports = mallservice;