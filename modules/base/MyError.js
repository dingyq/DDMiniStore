/**
 * [MyError 错误模块]
 * @param {string} message [错误信息]
 * @param {string} code    [错误码]
 */
let MyError=function(message,code){
    this.message=message;
    this.code=code;
};
MyError.prototype=new Error();
module.exports = MyError;