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
    userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; // 判断是否Safari浏览器
  let isChrome =
    userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; // 判断Chrome浏览器
  if (isIE) {
    let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    // console.log(fIEVersion)
    if (fIEVersion == 7) {
      return "IE7 ";
    } else if (fIEVersion == 8) {
      cb && cb();
      return "IE8 ";
    } else if (fIEVersion == 9) {
      cb && cb();
      return "IE9 ";
    } else if (fIEVersion == 10) {
      return "IE10 ";
    } else if (fIEVersion == 11) {
      return "IE11 ";
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
} // myBrowser() end

BrowserType(function() {
  document.getElementById("error").style.display = "block";
  document.cookie = "IE=" + "ture"; // cookie存储本地IE是否低版本
});
document.getElementById("close").addEventListener(
  "click",
  function(e) {
    document.getElementById("error").style.display = "none";
  },
  false
);
