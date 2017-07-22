/**
 * Created bg Cynthia on 2016-10-26
 */

/**
 * [extend]
 * @param  {obj} rawObj  [被添加的对象]
 * @param  {[type]} copyObj [要添加的对象]
 * @return {[type]}         [description]
 */
let extend = (rawObj, copyObj) => {
    if(!rawObj){
        rawObj={};
    }
    for (let key in copyObj) {
        rawObj[key] = copyObj[key];
    }
    return rawObj;
};
module.exports = extend;