// 公用方法
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}
//时间戳转时间类型
function formatTime(datetime) {
  var date = new Date(datetime*1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var year = date.getFullYear(),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      sdate = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minute = ("0" + date.getMinutes()).slice(-2),
      second = ("0" + date.getSeconds()).slice(-2);
  // 拼接
  var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
  // 返回
  return result;
}
const str = 'abc'
const methods = {
  isEmpty,
  formatTime,
  str
}
export default methods