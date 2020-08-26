//小于10就补0
function pad2(n) { return n < 10 ? '0' + n : n }
//当前时间格式化为yyyyMMddHHmmss
function generateTimeReqestNumber() {
    var date = new Date();
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds());
}

module.exports.generateTimeReqestNumber=generateTimeReqestNumber


