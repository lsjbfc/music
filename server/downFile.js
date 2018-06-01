var request = require("request");
var fs = require("fs");
const path = require("path");
const http = require("http");
// /*
// * url 网络文件地址
// * filename 文件名
// * callback 回调函数
// */
// function downloadFile(uri, filename, callback) {
//   var stream = fs.createWriteStream(filename);
//   request(uri)
//     .pipe(stream)
//     .on("close", callback(stream));
//   fs;
// }

// var fileUrl =
//   "http://image.tianjimedia.com/uploadImages/2015/129/56/J63MI042Z4P8.jpg";
// var filename = "beauty.jpg";
// downloadFile(fileUrl, filename, function(stream) {
//   console.log(filename + "下载完毕");
//   console.log(stream);
//   fs.writeFile(path.resolve(__dirname, "./a.jpg"), stream, "binary", function(
//     err
//   ) {
//     if (err) {
//       console.log("保存失败");
//       return;
//     }
//     console.log("保存成功");
//   });
// });

//   data-res-id="445546453"
//   data-res-type="18"
//   data-res-action="play"
//   data-res-from="13"
//   data-res-data="2239642434"
//   class="ply "
// http://m10.music.126.net/20180531151027/cf07fd02a9b2d25ecf302260005ad23e/ymusic/7823/77d0/089b/9c94f2b832d39902f9f1ce298b441316.mp3
var f =
  "http://m10.music.126.net/20180531151935/370c702ba1539c3a65f40a581264ebbc/ymusic/7470/1513/a139/da50d37273726636b8adf5f1413a65dd.mp3"; //文件地址
var req = http.get(f, function(res) {
  var imgData = "";
  res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
  console.log("正在下载中...");
  res.on("data", function(chunk) {
    imgData += chunk;
  });
  res.on("end", function() {
    fs.writeFile(
      path.resolve(__dirname, "./a.mp3"),
      imgData,
      "binary",
      function(err) {
        if (err) {
          console.log("保存失败");
          return;
        }
        console.log("保存成功");
      }
    );
  });
  res.on("error", function(err) {
    console.log("请求失败");
  });
});
