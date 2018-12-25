/** 新增&&修改本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
// Session.prototype.length = function (param) {
//   console.log(this);
//   return this.sessionStorage.length;
// };
import qs from "qs";
export function savaToLocal(id, key, value) {
  let seller = window.localStorage.__qcnos__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__qcnos__ = JSON.stringify(seller);
}

/** 查询本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
export function loadFromlLocal(id, key, def) {
  let seller = window.localStorage.__qcnos__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}

/** 新增&&修改本地Session
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
export function savaToSession(id, key, value) {
  let seller = window.sessionStorage.__qcnos__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.sessionStorage.__qcnos__ = JSON.stringify(seller);
}

/** 查询本地Session
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
export function loadFromlSession(id, key, def) {
  let seller = window.sessionStorage.__qcnos__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}

// function loadCookie () {}
/**
 * 兼容垃圾ie9本地缓存
 */
export function CookieStorage(path = "/", maxage) {
  let cookie = (function() {
    let cookie = {};
    let all = document.cookie;

    if (all === "") {
      return cookie;
    }

    let list = all.split("; ");
    for (let i = 0; i < list.length; i++) {
      let tmp = list[i];
      let p = tmp.indexOf("=");
      let name = tmp.substring(0, p);
      let value = tmp.substring(p + 1);
      value = decodeURIComponent(value);
      cookie[name] = value;
    }

    return cookie;
  })();
  this.maxage = maxage;
  this.path = path;
  this.cookie = cookie;
  let keys = [];
  for (let key in cookie) {
    keys.push(key);
  }
  this.keys = keys;
  this.length = keys.length;
  this.key = function(n) {
    if (n < 0 || n >= keys.length) {
      return null;
    }
    return keys[n];
  };
}
CookieStorage.prototype.getItem = function(key) {
  return this.cookie[key] || null;
};
CookieStorage.prototype.setItem = function(key, value) {
  let cookie = this.cookie;
  let keys = this.keys;
  // console.log("keys", keys);
  let maxage = this.maxage;
  let path = this.path;
  if (!(key in cookie)) {
    keys.push(key);
    this.keys = keys;
    this.length++;
  }
  cookie[key] = value;
  let tmp = key + "=" + encodeURIComponent(value);
  if (maxage) {
    tmp += "; max-age=" + maxage;
  }
  if (path) {
    tmp += ";  path=" + path;
  }

  document.cookie = tmp;
};
CookieStorage.prototype.removeItem = function(key) {
  let cookie = this.cookie;
  let keys = this.keys;
  if (!(key in cookie)) {
    return;
  }

  delete cookie[key];

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === key) {
      keys.splice(i, 1);
      break;
    }
  }

  this.length--;
  document.cookie = key + "=; max-age=0";
};
CookieStorage.prototype.clear = function() {
  let keys = this.keys;
  for (let i = 0; i < keys.length; i++) {
    document.cookie = keys[i] + "=; max-age=0";
  }
  this.cookie = {};
  window.document.cookie = "";
  keys = [];
  this.length = 0;
};
let docCookies = {
  getItem: function(sKey) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  },
  setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "") +
      (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function(sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function(sKey) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function() {
    let aKeys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
      .split(/\s*(?:\=[^;]*)?;\s*/);
    for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};
// Infinity 永久有效
/**
 * window.sessionStorage
 */
function Session() {
  let sessionStorage = window.sessionStorage;
  this.sessionStorage = sessionStorage;
  this.length = sessionStorage.length;
}
Session.prototype.getItem = function(param) {
  return qs.parse(this.sessionStorage.getItem(param));
};
Session.prototype.setItem = function(key, value) {
  this.sessionStorage.setItem(key, qs.stringify(value));
};
Session.prototype.removeItem = function(param) {
  this.sessionStorage.removeItem(param);
};
Session.prototype.clear = function() {
  this.sessionStorage.clear();
};
Session.prototype.hasItem = function(param) {
  return !!this.sessionStorage.getItem(param);
};

function Local() {
  let localStorage = window.localStorage;
  this.localStorage = localStorage;
  this.length = localStorage.length;
}
Local.prototype.getItem = function(param) {
  return qs.parse(this.localStorage.getItem(param));
};
Local.prototype.setItem = function(key, value) {
  this.localStorage.setItem(key, qs.stringify(value));
};
Local.prototype.removeItem = function(param) {
  this.localStorage.removeItem(param);
};
Local.prototype.clear = function() {
  this.localStorage.clear();
};
Local.prototype.hasItem = function(param) {
  return !!this.localStorage.getItem(param);
};
// const session = new Session();
// const local = new Local();
// const cookieStoreage = new CookieStorage();
// const sessionCookie = new CookieStorage("/", Infinity);
/**
 * 兼容本地存储 sessionStorage
 */
export const sessionStorage = () => {
  if (window.sessionStorage) {
    const session = new Session();
    return session;
  } else {
    const cookieStoreage = new CookieStorage();
    return cookieStoreage;
  }
};
/**
 * 兼容本地存储 localStorage
 */
export const localStorage = () => {
  if (window.localStorage) {
    const local = new Local();
    return local;
  } else {
    const sessionCookie = new CookieStorage("/", Infinity);
    return sessionCookie;
  }
};
