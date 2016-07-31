/**
 * Created by richard on 16/7/31.
 */

numberFormat = function (num, length) {
    if (num.toString().length >= length) return num;
    var str = "";
    for (var i = num.toString().length; i < length; i++)
        str += "0";
    return str + num.toString();
};
//时间戳(秒)+三位随机数
exports.randomCode = function () {
    var date = Math.floor(new Date().getTime() / 1000).toString();
    var random = numberFormat(Math.floor((Math.random() * 1000)%1000), 3);
    return date + random;
}

