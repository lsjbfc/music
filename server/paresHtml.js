const cheerio = require("cheerio");
const iconv = require("iconv-lite");
module.exports = function(htmlData, htmlDataLength) {
  return new Promise((resolve, reject) => {
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
    
    resolve(decodeHtmlData);
  });
};
