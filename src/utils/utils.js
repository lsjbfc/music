/**
 * 倒计时
 * @param {Date} times 倒计时时间毫秒
 * @param {function} cb 倒计时中执行的方法
 * @then 计时结束
 */
async function countDown(times, cb) {
  let p = await new Promise((resolve, reject) => {
    let endTime = +new Date() + times;
    // console.log(endTime);
    let t = setInterval(() => {
      let Times = endTime - +new Date();
      if (Times <= 0) {
        clearInterval(t);
        resolve("end");
      }
      cb(Math.floor(Times / 1000), t);
    }, 16);
  });
  return p;
}
/**
 * 格式化时间
 * @param {Date} date 时间
 * @param {string} pattern 格式化的样式
 * @return {string}
 */
const FormatDate = function(date, pattern) {
  if (date === undefined) {
    date = new Date();
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  if (pattern === undefined) {
    pattern = "yyyy-MM-dd hh:mm:ss";
  }
  // 暂时使用
  if (date.length < 10) {
    return date;
  }
  if (date.length == 10) {
    return date.replace("/", "-");
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  if (/(y+)/.test(pattern)) {
    pattern = pattern.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return pattern;
};
// 秒变时分秒
function PadZero(str) {
  // 补零
  return new RegExp(/^\d$/g).test(str) ? `0${str}` : str;
}

/**
 * 格式化倒计时时间
 * @param {number} _seconds 倒计时时间
 * @return {string} 格式化后的时间
 */
function formatTime(_seconds) {
  _seconds = parseInt(_seconds);
  let hours, mins, seconds;
  let result = "";
  seconds = parseInt(_seconds % 60);
  mins = parseInt((_seconds % 3600) / 60);
  hours = parseInt(_seconds / 3600);

  if (hours) result = `${PadZero(hours)}:${PadZero(mins)}:${PadZero(seconds)}`;
  else result = `${PadZero(mins)}:${PadZero(seconds)}`;
  // console.log(result);
  return result;
}
/**
 * 计算离现在多少时间之前
 * @param {number} val 要计算时间
 * @return {string} time 距离现在的时间
 */
function timeAgo(val) {
  let nowDate = new Date();
  let replyDate = new Date(val);
  let diffSeconds = (nowDate.getTime() - Number(replyDate.getTime())) / 1000;
  let years = 365 * 24 * 60 * 60;
  let months = 30 * 24 * 60 * 60;
  let days = 24 * 60 * 60;
  let hours = 60 * 60;
  let minutes = 60;
  let seconds = 1;
  if (diffSeconds < seconds) {
    return "1秒以前";
  } else if (seconds <= diffSeconds && diffSeconds < minutes) {
    return Math.floor(diffSeconds / seconds) + "秒"; // + "秒前";
  } else if (minutes <= diffSeconds && diffSeconds < hours) {
    return Math.floor(diffSeconds / minutes) + "分钟"; // "分钟前";
  } else if (hours < diffSeconds && diffSeconds < days) {
    return Math.floor(diffSeconds / hours) + "小时"; // + "小时前";
  } else if (days < diffSeconds && diffSeconds < months) {
    return Math.floor(diffSeconds / days) + "天"; // + "天前";
  } else if (months < diffSeconds && diffSeconds < years) {
    return Math.floor(diffSeconds / months) + "个月"; // + "个月前";
  } else {
    return Math.floor(diffSeconds / years) + "年"; // + "年前";
  }
}
/**
 * 检查类型
 * @param {any} params 判断的参数
 * @return {string}
 */
function Typeof(params) {
  return window.Object.prototype.toString.call(params);
}
/**
 * 是否是对象
 */
const isObject = params => Typeof(params) === "[object Object]";
/**
 * 是否是undefined
 */
const isUndefined = params => Typeof(params) === "[object Undefined]";
/**
 * 是否是数组
 */
const isArray = params => Typeof(params) === "[object Array]";
/**
 * 是否是数字
 */
const isNumber = params => Typeof(params) === "[object Number]";
/**
 * 是否是NAN
 */
const isNAN = params => isNaN(params);
/**
 * 是否是字符串
 */
const isString = params => Typeof(params) === "[object String]";
/**
 * 是否是Null
 */
const isNull = params => Typeof(params) === "[object Null]";
/**
 * 是否是为真
 */
const isTrue = params => {
  if (isNull(params)) return false;
  else if (isUndefined(params)) return false;
  else if (isNAN(params)) return false;
  else if (isObject(params)) return true;
  else if (isNumber(params)) {
    return params === 0;
  } else if (isArray(params)) {
    return params.length > 0;
  } else {
    return false;
  }
};
/**
 * 判断是否在对象中并且是否是为真
 * @param {object} obj 对象
 * @param {string} val 要判断的键
 * @return boolean
 */
const isHasAndTrue = (obj, val) => {
  if (isObject(obj)) {
    return obj.hasOwnProperty(val) && isTrue(obj[val]);
  } else {
    return false;
  }
};
/**
 * 给数字格式化为千分分隔
 */
const formattingNumber = params => {
  let num = params.split(".");
  let re = /(?=(?!(\b))(\d{3})+$)/g;
  num[0] = num[0].replace(re, ",");
  return num.join(".");
};
const run = (params, runtime) => {
  if (isNumber(params)) {
    let times = +new Date();
    let endTime = times + runtime;
    let step = params / runtime;
    let start = 0;
    let timer = null;
    timer = setInterval(() => {
      if (+new Date() <= endTime) {
        clearInterval(timer);
      }
      start = parseInt(start + step);
      return start;
    }, 16);
  } else {
    return params;
  }
};
/**
 * 判断浏览器类型
 * @param { Function } cb
 * @return { string } 浏览器版本
 */
function BrowserType(cb) {
  let userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  let isOpera = userAgent.indexOf("Opera") > -1; // 判断是否Opera浏览器
  let isIE =
    userAgent.indexOf("compatible") > -1 &&
    userAgent.indexOf("MSIE") > -1 &&
    !isOpera; // 判断是否IE浏览器
  let isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0; ") > -1 && !isIE; // 判断是否IE的Edge浏览器
  let isFF = userAgent.indexOf("Firefox") > -1; // 判断是否Firefox浏览器
  let isSafari =
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; // 判断是否Safari浏览器
  let isChrome =
    userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; // 判断Chrome浏览器
  if (isIE) {
    // let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    // reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    // console.log(fIEVersion)
    if (fIEVersion === 7) {
      return "IE7";
    } else if (fIEVersion === 8) {
      return "IE8";
    } else if (fIEVersion === 9) {
      return "IE9";
    } else if (fIEVersion === 10) {
      return "IE10";
    } else if (fIEVersion === 11) {
      return "IE11";
    } else {
      return "0 ";
    } // IE版本过低
  } // isIE end

  if (isFF) {
    return "FF ";
  }
  if (isOpera) {
    return "Opera ";
  }
  if (isSafari) {
    return "Safari ";
  }
  if (isChrome) {
    return "Chrome ";
  }
  if (isEdge) {
    return "Edge ";
  }
}
/**
 *验证时候是小数
 * @param {any} value
 */
export function clearNoNum(value) {
  // 先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, "");
  // 必须保证第一个为数字而不是.
  value = value.replace(/^\./g, "");
  // 保证只有出现一个.而没有多个.
  value = value.replace(/\.{2,}/g, ".");
  // 保证.只出现一次，而不能出现两次以上
  value = value
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  return value;
}
/**
 * 防抖
 * @param {Function} func 执行函数
 * @param {Number} delay 执行间隔
 * @param {Boolean} immediate 时候立即执行
 */
export function debouce(func, delay, immediate) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      let doNow = !timer;
      // 每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(function() {
        timer = null;
      }, delay);
      // 立即执行
      if (doNow) {
        func.apply(context, args);
      }
    } else {
      timer = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    }
  };
}
/**
 * 函数节流
 * @param {Function} func 执行函数
 * @param {Number} delay  执行间隔
 */
export function throttle(func, delay) {
  let timer = null;
  let startTime = Date.now();

  return function() {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let context = this;
    let args = arguments;

    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
}
/**
 * 检查是否是手机号
 * @param {  Number } phoneNumber
 */
export function iphoneCheck(phoneNumber) {
  let reg = /^1\d{10}$/;
  if (reg.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}
export function parseTree(ary) {
  function toTreeData(data, attributes) {
    let resData = data;
    let tree = [];
    for (let i = 0; i < resData.length; i++) {
      let item = resData[i];
      if (item[attributes.parentId] == attributes.rootId) {
        let obj = {};
        // obj = item;
        obj = {
          id: resData[i][attributes.id],
          title: resData[i][attributes.name],
          children: [],
          label: item[attributes.name],
          ID: resData[i][attributes.id],
          pId: resData[i].Pid,
          value: item[attributes.name],
          type: resData[i].type,
          subEmployees: resData[i].subEmployees,
          subDepts: resData[i].subDepts,
          name: item[attributes.name]
        };
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }
    run(tree);

    function run(chiArr) {
      if (resData.length !== 0) {
        for (let i = 0; i < chiArr.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (chiArr[i].id == resData[j][attributes.parentId]) {
              let obj = {};
              // obj = resData[j];
              obj = {
                id: resData[j][attributes.id],
                title: resData[j][attributes.name],
                children: [],
                label: resData[j][attributes.name],
                ID: resData[j][attributes.id],
                pId: resData[j].Pid,
                checked: false,
                type: resData[j].type,
                subEmployees: resData[j].subEmployees,
                subDepts: resData[j].subDepts,
                name: resData[j][attributes.name]
              };
              chiArr[i].children.push(obj);
              resData.splice(j, 1);
              j--;
            }
          }
          run(chiArr[i].children);
        }
      }
    }

    return tree;
  }
  let attributes = {
    id: "id",
    parentId: "pId",
    name: "name",
    rootId: "0"
  };
  return toTreeData(ary, attributes);
}
export {
  BrowserType,
  countDown,
  FormatDate,
  timeAgo,
  Typeof,
  isObject,
  isArray,
  isNumber,
  isUndefined,
  isNAN,
  isString,
  isTrue,
  isHasAndTrue,
  formattingNumber,
  run,
  formatTime
};
