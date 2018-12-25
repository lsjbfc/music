const express = require("express");
const app = express();
const history = require("connect-history-api-fallback");
app.use(history());

app.use(express.static("./dist"));
const prot = 3000;
app.listen(prot);
function getIPAdress () {
  var interfaces = require("os").networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}

console.log();
console.log("server is running at http://localhost:" + prot);
console.log("server is running at http://" + getIPAdress() + ":" + prot);
