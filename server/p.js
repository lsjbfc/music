var cheerio = require("cheerio");
var http = require("http");
var iconv = require("iconv-lite");

http.globalAgent =
  "Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1";
http.get("http://www.biquge.com.tw/3_3080/", function(res) {
  var htmlData = [];
  var htmlDataLength = 0;
  res.on("data", function(data) {
    htmlData.push(data);
    htmlDataLength += data.length;
  });

  res.on("end", function() {
    callback(htmlData, htmlDataLength);
  });
});

function callback(htmlData, htmlDataLength) {
  let bufferHtmlData = Buffer.concat(htmlData, htmlDataLength);
  let charset = "";
  let decodeHtmlData;
  let htmlHeadTitle = "";
  let htmlHeadCharset = "";
  let htmlHeadContent = "";
  let index = 0;

  let $ = cheerio.load(bufferHtmlData, { decodeEntities: false });

  $("meta", "head").each(function(i, e) {
    htmlHeadCharset = $(e).attr("charset");
    htmlHeadContent = $(e).attr("content");

    if (typeof htmlHeadCharset != "undefined") {
      charset = htmlHeadCharset;
    }

    if (typeof htmlHeadContent != "undefined") {
      if (htmlHeadContent.match(/charset=/gi)) {
        index = htmlHeadContent.indexOf("=");
        charset = htmlHeadContent.substring(index + 1);
      }
    }
  });

  //此处为什么需要对整个网页进行转吗，是因为cheerio这个组件不能够返回buffer,iconv则无法转换之
  if (charset.match(/gb/gi)) {
    decodeHtmlData = iconv.decode(bufferHtmlData, "gbk");
  } else {
    //因为有可能返回的网页中不存在charset字段，因此默认都是按照utf8进行处理

    decodeHtmlData = iconv.decode(bufferHtmlData, "utf8");
  }

  var $$ = cheerio.load(decodeHtmlData, { decodeEntities: false });

  $$("title", "head").each(function(i, e) {
    htmlHeadTitle = $$(e).text();
    console.log(htmlHeadTitle);
  });

  console.log(charset);
}
