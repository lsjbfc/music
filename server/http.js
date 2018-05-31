var http = require("http");

var qs = require("querystring");

var post_data = {
  a: 123,
  time: new Date().getTime()
}; //这是需要提交的数据

var content = qs.stringify(post_data);

var options = {
  hostname: "www.biquge.com.tw",
  port: 80,
  path: "/",
  method: "get",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
};
var htmlData = [];
var req = http.request(options, function(res) {
  //   console.log("STATUS: " + res.statusCode);
  //   console.log("HEADERS: " + JSON.stringify(res.headers));
  res.setEncoding("utf8");
  res.on("data", function(chunk) {
    htmlData.push(chunk);
    // console.log('BODY: ' + chunk);
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
