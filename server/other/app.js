import request from "superagent";
import userAgents from "../userAgent.js";

async function doRequest() {
  let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
  let ip = await getProxyIp();
  let useIp = "http://" + ip;
  request
    .get("http://www.xxx.com")
    .set({ "User-Agent": userAgent })
    .timeout({ response: 5000, deadline: 60000 })
    .proxy(ip)
    .end(async (err, res) => {
      if (err) {
        console.log(`爬取页面失败，${err}，正在重新寻找代理ip... ×`);
        // 如果是代理ip无法访问，另外选择一个代理
        doRequest(
          "http://" + (await getProxyIp()),
          userAgents[parseInt(Math.random() * userAgents.length)]
        );
        return;
      }
      // 解析html
      console.log("爬取页面  √");
      await parseDivision(res.text);
    });
}
