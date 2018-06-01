// const http = require("http");
// const parseHtml = require("./paresHtml.js");

// const proxy = "58.211.200.154:808";
// // http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// // http://api.xicidaili.com/free2016.txt
// let options = {
//   hostname: "www.baidu.com",
//   port: 80,
//   path: "/",
//   method: "get",
//   headers: {
//     "User-Agent":
//       "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36"
//   }
// };
// const getData = function(options) {
//   return new Promise((resolve, reject) => {
//     var htmlData = [];
//     var len = 0;
//     console.log(options);
//     var req = http.request(options, function(res) {
//       // res.setEncoding("utf8");
//       res.on("data", function(chunk) {
//         console.log(1);
//         htmlData.push(chunk);
//         len = chunk.length;
//         // console.log('BODY: ' + chunk);
//       });
//       res.on("end", function() {
//         console.log("over");
//         resolve(htmlData, len);
//         // console.log("htmlData", htmlData);
//       });
//     });

//     req.on("error", function(e) {
//       console.log("problem with request: " + e.message);
//     });

//     req.write("");
//     req.end();
//   });
// };
// async function getDataAsync(options) {
//   let data = await getData(options);
//   console.log("data", data);
//   return data;
// }
// async function parse(data) {
//   let html = getDataAsync(options);
//   let htmlData = await parseHtml(html[0], html[1]);
//   return htmlData;
// }
// parse()
//   .catch(err => {
//     console.log(err);
//   })
//   .then(() => {
//     console.log("a");
//   });
// // let a = getDataAsync(options);
// // console.log(a);
const http = require("http");
let userAgents = require("./userAgent.js");
let timeout = 20;
const getHtml = function(pageUrl) {
  let reqPptions = {
    hostname: "www.biquge.com.tw",
    port: 80,
    path: pageUrl,
    method: "get"
    // headers: {
    //   "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)]
    // }
  };
  console.log("获取", reqPptions.hostname + reqPptions.path, "中");
  let htmlDataLength = 0;
  let htmlData = [];
  //   setTimeout(function(){})
  return new Promise((resolve, reject) => {
    try {
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
      let req = http.request(reqPptions, res => {
        res.setEncoding("utf8");
        res.on("data", function(chunk) {
          htmlData.push(chunk);
          htmlDataLength += chunk.length;
        });
        res.on("end", function() {
          console.log(
            "获取",
            reqPptions.hostname + reqPptions.path,
            "结束",
            htmlData
          );
          resolve({ htmlData: htmlData, htmlDataLength: htmlDataLength });
        });
      });
      req.setTimeout(timeout * 1000, () => {
        req.abort();
        console.log("发现你啦！");
        // getGroupchapter(getChapter(chapterUrls));
      });
      req.on("error", function(e) {
        console.log("problem with request: " + e.message);
      });
      req.write("");
      req.end();
    } catch (error) {
      // writeFile(bookname + "log", chapterUrls);
      // console.log(error);
      reject({ htmlData: "", htmlDataLength: 0 });
    }
  });
};

const getHtmlAsync = async function() {
  return await getHtml("/");
};
getHtmlAsync().catch(err => {
  console.log(err);
});
