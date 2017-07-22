/**
 * 日志模块
 * @author TooBug
 * @version 2016-11-09
 * @example
 * let logger = new Logger({
 *     uid:123456
 * });
 *
 * // 只传日志内容
 * logger.debug('Hello World');
 *
 * // 日志内容和对应的模块user、动作login
 * logger.info('Username:' + username, 'user', 'login');
 */

let network = require('./network.js');

/**
 * 如果是debug版本，则只打控制台，不上传日志。
 * 如果是release版本，则不打控制台，只上传notice、warning、error基本的日志。debug和info不上传
 * @type {boolean}
 */
let isDebug = false;

/**
 * 日志初始化
 * @constructor
 * @param {Object} options 参数对象
 * @param {String|Number} options.uid 牛牛号
 * @param {Number} options.cmd 命令号
 * @param {Number} options.subCmd 子命令号
 */
let Logger = function (options) {
    if (!options) options = {};
    this.uid = options.uid || 0;
    // http://gitlab.futunn.com/web/webwiki/wikis/ulslog_cmd_segment#client-2601-2700
    this.cmd = options.cmd || 2601;// 微信小程序的cmd为 2601
    this.subCmd = options.subCmd || 0;
    // this._appId = 512;
};

/**
 * 记录日志
 * @param  {String} level      日志级别
 * @param  {String} message    日志内容
 * @param  {String} moduleName 模块名称
 * @param  {String} action     行为名称
 * @return {Undefined}
 */
Logger.prototype.log = function (level, message, moduleName, action) {
    // if (isDebug) {
    //     console.log(`uid: ${this.uid} [${level}] , ${moduleName}, ${action} `, message);
    // }
    // else {
    //     let uploadMessage = `module: ${moduleName}, action: ${action}, message: ${JSON.stringify(message)}`;
    //     switch (level) {
    //         case 'notice':
    //         case 'warning':
    //         case 'error':
    //             network.doRequest({
    //                 url: 'https://wechatapp.futu5.com/dedog/log',
    //                 data: {
    //                     level: level,
    //                     uid: this.uid,
    //                     cmd: this.cmd,
    //                     subCmd: this.subCmd,
    //                     message: uploadMessage
    //                 }
    //             })
    //             break;
    //     }
    // }
};

// 日志级别
let levels = ['debug', 'info', 'notice', 'warning', 'error'];


levels.forEach((level) => {
    // 定义Logger.LEVEL_DEBUG之类的常量
    Logger[`LEVEL_${level.toUpperCase()}`] = level;
    // 定义每个级别的日志方法
    Logger.prototype[level] = function (level) {
        return function (message, moduleName, action) {
            this.log(level, message, moduleName, action);
        }
    }(level);
});

module.exports = Logger;
