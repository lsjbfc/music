"use strict";
const config = require("../config");
let serverConfig = {};

let servermode = process.env.servermode;
const publicPath = () => {
  if (process.env.NODE_ENV === "production") {
    if (process.env.servermode) {
      return config.build.assetsPublicPathServer;
    } else {
      console.log("publicPath", config.build.assetsPublicPath);
      return config.build.assetsPublicPath;
    }
  } else {
    return config.dev.assetsPublicPath;
  }
};
// if (servermode === "filepro") {
//   console.log("build in filepro");
//   serverConfig = {
//     suiteId: "ww2e8f675c0308dbb3",
//     wwAppId: "wwff314b9b8085f16c",
//     appId: "FilePro",
//     host: "https://www.filepro.cn/"
//   };
// }
console.log("process.env.servermode", process.env.servermode);
if (process.env.servermode === "pro") {
  serverConfig.servermode = "production";
}
serverConfig.path = publicPath();
console.log(JSON.stringify(serverConfig));
module.exports = {
  NODE_ENV: "\"production\"",
  serverConfig: JSON.stringify(serverConfig)
};
