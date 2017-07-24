const extend = require('./extend');
const network = require('./network.js');
const protocolUrl = require('./ProtocolUrl.js');

let DDUserInfo = {};

const GUEST_FLAG = -1;

const TAG = "DDUserInfo";
// const FtLog = require('./FtLog'); // 这里不能引用FtLog，因为FtLog需要引用AccountInfo，互相引用会死循环，导致栈溢出

/**
 * 牛牛用户信息
 * @type {{}}
 */
let _nnInfo = {
    uid: GUEST_FLAG,
    nick: "",
    avatarUrl: "",
    web_sig_new: "",
    tgtgt_new: "",
    salt: "",
    rand_key_new: "",
    state: 0,
};

/**
 * 微信用信息
 * @type {{}}
 */
let _wxInfo = {
    nickName: "",
    avatarUrl: "",
};

let _shoppingCart = {
    total: 0,
    list: {}
};

// endregion

let doFormRequest = (options) => {
    options.isFail = function(data) {
        if (!data.error) {
            return false;
        }
        return true;
    };
    options.getError = (data) => {
        let error = data.error;
        return new MyError(error.error_msg, error.error_code);
    }
    return network.doFormRequest(options);
}

// region 对外暴露的接口
DDUserInfo.getGuestFlag = function() {
    return GUEST_FLAG;
};


/**
 * 可以设置1个或者多个属性
 * @param info
 */
DDUserInfo.setWxInfo = function(info) {
    _wxInfo = info;
};

DDUserInfo.isGuest = function() {
    return _nnInfo.uid === GUEST_FLAG;
};

/**
 * 获取牛牛号
 * @return {number} 牛牛号。如果是游客，则为 GUEST_FLAG
 */
DDUserInfo.getUid = function() {
    if (this.isGuest()) {
        return GUEST_FLAG;
    }
    return _nnInfo.uid;
};

/**
 * 获取头像的URL
 * @return {string} 如果是游客模式，则返回的是微信的头像。否则为牛牛头像
 */
DDUserInfo.getAvatarUrl = function() {
    let headUrl = _wxInfo.avatarUrl;;
    if (!this.isGuest()) {
        headUrl = _nnInfo.avatar;
    }
    if (headUrl === "" || !headUrl) {
        headUrl = commonConst.UserDefaultHeadIcon;
    }
    return headUrl;
};

/**
 * 获取昵称
 * @return {string} 如果是游客模式，则返回微信的昵称，否则为牛牛的昵称
 */
DDUserInfo.getNickName = function() {
    let nick = _nnInfo.nick;
    if (this.isGuest()) {
        nick = _wxInfo.nickName;
        if (nick === '' || nick === undefined) {
            var that = this;
            wx.getUserInfo({
                success: function(res) {
                    that.setWxInfo(res.userInfo);
                    nick = _wxInfo.nickName;
                },
                fail: function(err) {
                    // FtLog.e(TAG, 'getWxInfo()', 'fail:err' + err.errMsg);
                    // console.log('WXgetUserInfo', err);
                }
            });
        }
    }

    return nick ? nick : '--';
};

DDUserInfo.updateShoppingCar = function(shoppingcar) {
    console.log('updateShoppingCar');
    if (typeof shoppingcar == 'object') {
        let result = [];
        for (let id in shoppingcar.list) {
            let obj = {
                "goodsId": id,
                "count": shoppingcar.list[id]
            }
            result.push(obj);
        }
        _shoppingCart.list = result;
        _shoppingCart.total = shoppingcar.total;
    }
}

DDUserInfo.getShoppingCar = function() {
    return _shoppingCart;
}

module.exports = DDUserInfo;
