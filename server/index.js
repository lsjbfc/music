const http = require("http");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const he = require("he");
const fs = require("fs");
const path = require("path");
const parseHtml = require("./paresHtml.js");
let userAgents = require("./userAgent.js");
let chapterUrls = [];
let bookname = "";
let BaseURL = "http://www.biquge.com.tw/";
let count = 3;
let sum = 1;
let timeout = 20;
const getHtml = async function(pageUrl) {
  console.log("获取", pageUrl, "中");
  let htmlDataLength = 0;
  let htmlData = [];
  //   setTimeout(function(){})
  return new Promise((resolve, reject) => {
    try {
      let reqPptions = {
        hostname: "www.biquge.com.tw",
        port: 80,
        path: pageUrl,
        method: "get"
        // headers: {
        //   "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)]
        // }
      };
      let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
      let req = http.request(reqPptions, res => {
        res.on("data", function(chunk) {
          // console.log("BODY: " + chunk + "\n\n\n");
          htmlData.push(chunk);
          htmlDataLength += chunk.length;
        });
        res.on("end", function() {
          console.log("获取", pageUrl, "结束");
          resolve({ htmlData: htmlData, htmlDataLength: htmlDataLength });
        });
      });
      req.setTimeout(timeout * 1000, () => {
        req.abort();
        console.log("发现你啦！");
      });
      req.on("error", function(e) {
        console.log("problem with request: " + e.message);
      });
      req.write("");
      req.end();
    } catch (error) {
      writeFile(bookname + "log", chapterUrls);
      reject({ htmlData: "", htmlDataLength: 0 });
    }
  });
};

function getTime() {
  return Math.floor(15 + Math.random() * 9);
}
let bookUrl = "/3_3080/";
getHtml(bookUrl)
  .then(res => {
    // console.log(res.htmlData.length, res.htmlDataLength);
    // console.log("res", res);
    return parseHtml(res.htmlData, res.htmlDataLength);
  })
  .then(html => {
    // console.log("html", html);
    let $ = cheerio.load(html, { decodeEntities: false });
    // let ChapterContent = [];

    let isChapter = false;
    let chapters = [];
    let count = 1;
    bookname = $("title", "head").text();

    if (
      typeof $("body #wrapper")
        .find("#list")
        .text() === "string" &&
      $("body #wrapper")
        .find("#list")
        .text() !== ""
    ) {
      writeFile(bookname, "");
      isChapter = true;
      $("body")
        .find("#wrapper .box_con dl")
        .find("dd")
        .each((index, item) => {
          let chapterUrl = $(item)
            .find("a")
            .attr("href");
          chapterUrls.push(BaseURL + chapterUrl);
        });
      //   chapterUrls = chapterUrls.reverse();
    } else {
      let $ = cheerio.load(html, { decodeEntities: false });
      let title = $(".bookname h1").text();
      let content = $("#content").text();

      writeFile(bookname, title + "\n" + content);
    }
    getGroupchapter(getChapter(chapterUrls));
  })
  .catch(err => {
    console.log(err);
  });
function getGroupchapter(chapters) {
  Promise.all(chapters)
    .then(res => {
      let book = "";
      let appendFileSyncAry = [];
      res.forEach(item => {
        let Html = parseHtml(item.htmlData, item.htmlDataLength);
        Html.then(html => {
          let $ = cheerio.load(html, { decodeEntities: false });
          let title = $(".bookname h1").text();
          let content = $("#content").text();
          console.log("写入" + title);
          appendFileSyncAry.push(
            appendFile(bookname, "\n" + title + "\n" + content + "\n")
          );
        });
      });
      Promise.all(appendFileSyncAry).then(res => {
        let time = getTime();
        console.log(
          "本部分写入完成",
          "   ",
          "tiem",
          count * 10 * time * 400 + "ms"
        );
        if (chapterUrls.length > 0) {
          setTimeout(() => {
            getGroupchapter(getChapter(chapterUrls));
          }, time * 400);
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
}
function getChapter(chapterUrls) {
  try {
    // let log = fs.readdirSync(
    //   path.resolve(__dirname, "./" + bookname + ".json"),
    //   "utf-8"
    // );
  } catch (error) {}

  let preAry = chapterUrls.slice(0, sum);
  let chapters = [];
  preAry.forEach(item => {
    chapters.push(getHtml(item));
  });
  count++;
  writeLog(
    bookname,
    JSON.stringify({
      count: count
    })
  );
  chapterUrls = chapterUrls.splice(0, sum);

  return chapters;
}
function writeFile(fileNmae, content) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(
        path.resolve(__dirname, "./" + fileNmae + ".txt"),
        content,
        "utf-8",
        function(err) {
          if (err) {
            reject(err);
            // console.log(err);
          }
        }
      );
      resolve("ok");
    } catch (err) {
      reject(err);
      /* Handle the error */
    }
  });
}

function writeLog(fileNmae, content) {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(
        path.resolve(__dirname, "./" + fileNmae + ".json"),
        content,
        "utf-8",
        function(err) {
          if (err) {
            reject(err);
            // console.log(err);
          }
        }
      );
      resolve("ok");
    } catch (err) {
      reject(err);
      /* Handle the error */
    }
  });
}

function appendFile(fileNmae, content) {
  return new Promise((resolve, reject) => {
    try {
      fs.appendFileSync(
        path.resolve(__dirname, "./" + fileNmae + ".txt"),
        content,
        "utf-8",
        function(err) {
          if (err) {
            reject(err);
            // console.log(err);
          }
        }
      );
      resolve("ok");
    } catch (err) {
      reject(err);
      /* Handle the error */
    }
  });
}
process.on("uncaughtException", function(err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
