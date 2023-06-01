import got from "got";
import {LoggerService} from "../logger/logger.service";
import { SearchGuideResponse } from "@tencent/web-search-puppeteer-page/lib/proto";
import {setup} from "./setup";

/**
 * page 相关辅助方法
 */


export async function scrollDown() {
  await new Promise<void>((resolve, reject) => {
    let totalHeight = 0;
    const distance = 100;
    const timer = setInterval(() => {
      const scrollHeight = document.body.scrollHeight;
      window.scrollBy(0, distance);
      totalHeight += distance;
      if (totalHeight >= scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, 100);
  });
}

export async function teach(data) {
  const resp: SearchGuideResponse = { Json: "" }
  return resp
}

export async function getSearchData(data){
  console.log("EIHEIEHEIEHHHHHHHHHHHHH来了")
  let  header_dict = {
    "Accept": "*!/!*",
    "Content-Type": "application/json; charset=utf-8"
  };
  let url = "http://9.134.52.227:8080/cgi/GetS1SResult"
  let resp = await got( {method: 'post', url: url, body: JSON.stringify(data), decompress: false, headers: header_dict, timeout: 15000});
  if (resp.statusCode == 200){
    let rawData = resp.body;
    return JSON.parse(JSON.parse(rawData).Data).rsp
  }
}
