/**
 * 如果是debug版本，则只打控制台，不上传日志。
 * 如果是release版本，则不打控制台，只上传notice、warning、error基本的日志。debug和info不上传
 */


// Log上报系统，游客uin:18446744073709551615

let DDLog = {};

// region 私有变量
// const accountInfo = require('./AccountInfo');

const Logger = require('./logger.js');
let Log = new Logger();
let deviceID = '';
// endregion

DDLog.setDeviceID = function (deviceId){
    deviceID = deviceId;
};

// region 公开方法
/**
 * debug类型日志
 * @param {string} moduleName 模块，建议用TAG
 * @param {string} action 操作，建议用方法名
 * @param {string} message 描述，随便写
 * @param {Number} subCmd 协议号，可不传
 */
DDLog.d = function (moduleName, action, message, subCmd) {
    setCommonPara(subCmd);
    Log.debug(message, moduleName, action);
};

/**
 * info类型日志
 * @param {string} moduleName 模块，建议用TAG
 * @param {string} action 操作，建议用方法名
 * @param {string} message 描述，随便写
 * @param {Number} subCmd 协议号，可不传
 */
DDLog.i = function (moduleName, action, message, subCmd) {
    setCommonPara(subCmd);
    Log.info(message, moduleName, action);
};

/**
 * notice类型日志
 * @param {string} moduleName 模块，建议用TAG
 * @param {string} action 操作，建议用方法名
 * @param {string} message 描述，随便写
 * @param {Number} subCmd 协议号，可不传
 */
DDLog.n = function (moduleName, action, message, subCmd) {
    setCommonPara(subCmd);
    Log.notice(message, moduleName, action);
};

/**
 * warning类型日志
 * @param {string} moduleName 模块，建议用TAG
 * @param {string} action 操作，建议用方法名
 * @param {string} message 描述，随便写
 * @param {Number} subCmd 协议号，可不传
 */
DDLog.w = function (moduleName, action, message, subCmd) {
    setCommonPara(subCmd);
    Log.warning(message, moduleName, action);
};

/**
 * error类型日志
 * @param {string} moduleName 模块，建议用TAG
 * @param {string} action 操作，建议用方法名
 * @param {string} message 描述，随便写
 * @param {Number} subCmd 协议号，可不传
 */
DDLog.e = function (moduleName, action, message, subCmd) {
    setCommonPara(subCmd);
    Log.error(message, moduleName, action);
};
// endregion

// region 私有方法
function setCommonPara(subCmd) {
    // 每次都赋值，第一次调用的时候可能是游客，第二次调用的时候可能是用户
    // if (accountInfo && !accountInfo.isGuest()) {
    //     Log.uid = accountInfo.getUid();
    // }
    // else {
    //     Log.uid = deviceID;
    // }

    // Log.subCmd = subCmd || 0;
}
// endregion

module.exports = DDLog;
