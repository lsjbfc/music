// http://api.xicidaili.com/free2016.txt
const fs = require("fs");
const proxyUrl = "http://api.xicidaili.com/free2016.txt";
const http = require("http");
// 创建一个可写流
const freeproxy = fs.createWriteStream("freeproxy.txt");
let options = {
  hostname: "api.xicidaili.com",
  path: "/api"
};
let htmlData = [];
const req = http.request(options, function(res) {
  //   console.log("STATUS: " + res.statusCode);
  //   console.log("HEADERS: " + JSON.stringify(res.headers));
    res.setEncoding("utf8");
  res.on("data", function(chunk) {
    console.log(chunk);
    htmlData.push(chunk);
    // console.log('BODY: ' + chunk);
    // freeproxy.pipe(chunk);
  });
  res.on("end", function() {
    console.log("over");
    console.log("htmlData", htmlData);
  });
});

req.on("error", function(e) {
  console.log("problem with request: " + e.message);
});

req.write("");
req.end();
