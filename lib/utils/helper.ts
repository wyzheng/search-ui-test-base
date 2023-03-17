import fs from "fs";
import got from "got";
import {LoggerService} from "../logger/logger.service";
import sha1 from "sha1"
import { SearchGuideResponse } from "@tencent/web-search-puppeteer-page/lib/proto";


const logger = new LoggerService().getLogger();

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

export function readTestJson(jsonFile: string){
  if (fs.existsSync(jsonFile)) {
    return JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  }else {
    return null;
  }
}

export async function getHighlightContent(page, selector) {
  let content = await page.evaluate((selector) => {
    let items =  document.querySelectorAll(selector + ' ' + 'em[class="highlight"]');
    let content = [];
    for (let i = 0; i < items.length; i++) {
      content.push(items[i].innerHTML);
    }
    return content;
  },selector)
  return content;
}

export async function getContentStyle(page, selector) {
  let style : string;
  style = await page.evaluate((selector) => {
    let desc =  document.querySelector(selector);
    return getComputedStyle(desc).textOverflow;
  },selector)
  return style;
}

export function includes(str, query) {
  return str.every(val => query.includes(val));
}

// 获得元素在页面上的高度
export async function getHeightOfEle(page, selector) {
  return await page.evaluate((selector) => {

    let icon = document.querySelector(selector);
    let Box = icon.getBoundingClientRect(),
      doc = icon.ownerDocument,
      body = doc.body,
      html = doc.documentElement,
      clientTop = html.clientTop || body.clientTop || 0

    return Box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop + (Box.height / 2.0);
  }, selector);
}


// 获得元素在页面上的宽度
export async function getLeftOfEle(page, selector) {
  return await page.evaluate((selector) => {
    let icon = document.querySelector(selector);
    let Box = icon.getBoundingClientRect(),
      doc = icon.ownerDocument,
      body = doc.body,
      html = doc.documentElement,
      clientTop = html.clientTop || body.clientTop || 0

    return Box.left;
  }, selector);
}



export async function getOCRRes(imagePath){
 /* let r = await got("https://stream.weixin.qq.com/weapp/getOcrAccessToken", {
    agent:{
      https: tunnel.httpsOverHttp({
        proxy: {
          host: 'shanghai-mmhttpproxy.woa.com',
          port: '11113'
        }
      })
    }
  });*/

  let r = await got("https://stream.weixin.qq.com/weapp/getOcrAccessToken");

  logger.log("here joyce log something*********");
  logger.log(r.body);

  let buffer = fs.readFileSync(imagePath);
  let string = Buffer.from(buffer).toString('base64');
  //let url = "http://9.22.0.225:12361/wxa/servicemarket?access_token=" + r.body;
  let url = "http://api.weixin.qq.com/wxa/servicemarket?access_token=" + r.body;
  let data = {
    "service": "wx79ac3de8be320b71",
    "api": "OcrAllInOne",
    "client_msg_id": "xxx",
    "data": {
      "img_data": string,
      "data_type": 2,
      "ocr_type": 8
    }
  };
  let resp = await got( {method: 'post', url: url, body: JSON.stringify(data), decompress: false});
  logger.log("here joyce log something*********");
  logger.log(resp.body);

  let respData = resp.body.replace('\"', '"');
  let jsonRes = JSON.parse(respData);
  let ocrRes = JSON.parse(jsonRes.data);

  return ocrRes;
}

export async function getLineNum(path){
  let num = 0;
  num = (await getOCRRes(path)).ocr_comm_res.items.length;
  return num;
}

/**
 *
 * @param max：最多不超过max行
 * @param path
 */
export async function getLastItem( max, path){
  let  ocrRes = await getOCRRes(path);
  let num =  ocrRes.ocr_comm_res.items.length;
  if(num >= max){
    let text = ocrRes.ocr_comm_res.items["0"].text
    return text.substr(text.length - 3, 3);
  }
  return '...'
}

/**
 *
 * @param functionName AddBizContact 关注公众号  DelBizContact 取消关注
 * @param bizUin  公众号uin
 */
export async function bizOperation(functionName, bizUin, uin){
  console.log("*************************")
  let url = `http://wxunitest.oa.com/mmbizcasehelper/mmbasedatabroker`
  let data = {
    "biz_uin": bizUin,
    "usr_uin": uin,
  }
  let req_data = {
    "func_name": functionName,
    "func_args": data
  };
  let resp = await got( {method: 'post', url: url, body: JSON.stringify(req_data), decompress: false});
  console.log(resp.body);
  /* logger.log("here addBizContact log something*********");
   logger.log(resp.body);*/
}

/**
 *
 * @param finderName 被关注的人微信名
 * @param optype  1 关注 / 2 取消关注
 */
export async function finderOperation(finderName, optype, userName){
  let url = "http://mmtest.oa.com/mmcasehelperidc/mmfinder"
  let req_data = {
    'func_name': 'SetFinderFollow',
    'func_args': {
      "username": userName,
      "finder_username": finderName,
      "optype": optype
    }
  }
  let resp = await got( {method: 'post', url: url, body: JSON.stringify(req_data), decompress: false});
  /*logger.log("here addBizContact log something*********");
  logger.log(resp.body);*/
  console.log(resp.body)
}

export function errorCounting(e, err, fail){
  if (e.constructor.name == "JestAssertionError"){
    fail++;
    throw e;
  }else {
    err++;
  }
  return [err, fail];
}

export function genToken(){
  let secret = "dfZ2bnrTHfperANtWZGdnx0HRwE1W92n";
  let client = "wx_ad_efficiency";
  let timestamp = Math.floor(Date.now() / 1000);
  let sign = sha1(client + secret + timestamp);
  let buffer = new Buffer(client + "," + timestamp + "," + sign);
  let token = buffer.toString('base64');
  console.log(token);
  return token;
}

export async function superView(aid, wxid){
  let url = "https://jiqimao.woa.com/eib/power_preview/bind_audience";
  let req_data = {
    "aid": aid,
    "uid": 17194315,
    "period_seconds": 1800,
    "bind_source_type": "BIND_SOURCE_TYPE_JIQIMAO",
    "operator_id": "joycesong",
    "wxid": wxid,
    "wx_bind_type": "2",
  }
  let header_dict = {
    "Content-Type": "application/json",
    "token": genToken()
  }

  let resp = await got( {method: 'post', url: url, body: JSON.stringify(req_data), decompress: false, headers: header_dict, timeout: 20000});
  if (resp.statusCode == 200){
    if (JSON.parse(resp.body).code === 0){
      let rawData = resp.body;
      //this.logger.log(rawData);
      return true;
    }
  }else {
    //this.logger.error(`$$$$ there is something wrong`);
  }
  return false;
}

export function getListByCondition(conditions, list){
  let res = [];
  for (let i = 0; i < list.length; i++) {
    let flag = true;
    for (let j = 0; j < Object.keys(conditions).length; j++) {
      list[i].toString();
      if (list[i][Object.keys(conditions)[j]] != Object.values(conditions)[j]){
        flag = false;
        break;
      }
    }
    if (flag){
      res.push(list[i]);
    }
  }
  return res;
}

async function mmSearch(url, data) {
  let uin = "3192443972";
  let  header_dict = {
    "Accept": "*!/!*",
    "Content-Type": "application/json; charset=utf-8",
    "Cookie": "tapdsession=ac0f9e3e8b5fead25fa0db7ee6960230; t_u=882c902be955cc61%7C53fb9085e7b0ba04; t_uid=joycesong; paas_perm_sessionid=sevzntn7x5spf1qxpknmjnyf6e1nic0o; x_host_key_access_https=611efdf034330249b37b37ff4da260b60c031205_s; x-client-ssid=186b6c82bdf-e32d8b5b3a8a7d828d32472f7fda2b729a027f6b; x-tofapi-host-key=186b6c82c34-3f26cbf735a51db1c258bc43d0a15f2336fb2164; wx_oss_login_name=joycesong; x_host_key_access=611efdf034330249b37b37ff4da260b60c031205_s; ERP_USERNAME=joycesong; roles=undefined; sidebarStatus=1; x-imp-host-key=186cbe54d80-add031b187bd0d375807dcffec1ca3a1b61a9f9c; _t_uid=1001483085; km_uid=joycesong; bk_uid=joycesong; bk_ticket=ev0VaBbY3cdAqGQlotwngpWmftLjnMyT-jt5BuZdeyw; paas_perm_csrftoken=zHVPoJoqC0vhAUE8C5eujS7UN9gWJTLrhEPclpiG9tSfOCoQx7SIYhzhbhdsBtqp; mm_web_login_user=joycesong; km_u=28041baea0dad8fe0321958b7c629807295663ca5d6904828769bac48580213731c83ad10c7a5570; pkgsvr_csrftoken=BQSDZUAeuhgDMs9wF6e5AwzFubqz0mkt; pkgsvr_sessionid=e3yyl7dokeh27dl44p7njbfzxvz9tts5; RIO_TCOA_TICKET=tof:TOF4TeyJ2IjoiNCIsInRpZCI6ImdZTTZ4Um0xWXB2Uk9UOW1TQ2NPVDVxMm5KY3hTbmpWIiwiaXNzIjoiMTAuOTkuMjA4LjU3IiwiaWF0IjoiMjAyMy0wMy0xNVQxNDozODozMi40ODg3ODA2MDErMDg6MDAiLCJhdWQiOiIxMC45LjE2Ni42NSIsImhhc2giOiI1RDlGQkVERDI2Rjc0RTcyMDhGRkUyRTRBM0MzNDI5QkQ3MzEyMDk3REUzQTI2QTJDOTE2QzUxRTBDQzlEMzcwIiwibmgiOiIyRThCQzNCQTRDRjVCQkVENEQ0NEMzMjY1Q0U4RDhBRDgyOERFN0JEOTU2M0U2MjI3MkVBODc1MjgyQzc4QzVEIn0; RIO_TCOA_TICKET_HTTPS=tof:TOF4TeyJ2IjoiNCIsInRpZCI6ImdZTTZ4Um0xWXB2Uk9UOW1TQ2NPVDVxMm5KY3hTbmpWIiwiaXNzIjoiMTAuOTkuMjA4LjU3IiwiaWF0IjoiMjAyMy0wMy0xNVQxNDozODozMi40ODg3ODA2MDErMDg6MDAiLCJhdWQiOiIxMC45LjE2Ni42NSIsImhhc2giOiI1RDlGQkVERDI2Rjc0RTcyMDhGRkUyRTRBM0MzNDI5QkQ3MzEyMDk3REUzQTI2QTJDOTE2QzUxRTBDQzlEMzcwIiwibmgiOiIyRThCQzNCQTRDRjVCQkVENEQ0NEMzMjY1Q0U4RDhBRDgyOERFN0JEOTU2M0U2MjI3MkVBODc1MjgyQzc4QzVEIn0; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22joycesong%22%2C%22first_id%22%3A%2218682c1f1464e3-0b329161f9add4-1f525634-2007040-18682c1f1476fe%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E5%BC%95%E8%8D%90%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fexmail.qq.com%2F%22%7D%2C%22%24device_id%22%3A%2218682c1f1464e3-0b329161f9add4-1f525634-2007040-18682c1f1476fe%22%7D; TCOA_TICKET=TOF4TeyJ2IjoiNCIsInRpZCI6ImdZTTZ4Um0xWXB2Uk9UOW1TQ2NPVDVxMm5KY3hTbmpWIiwiaXNzIjoiMTAuOTkuMjA4LjU3IiwiaWF0IjoiMjAyMy0wMy0xNVQxNDozODozMi40ODg3ODA2MDErMDg6MDAiLCJhdWQiOiIxMC45LjE2Ni42NSIsImhhc2giOiI1RDlGQkVERDI2Rjc0RTcyMDhGRkUyRTRBM0MzNDI5QkQ3MzEyMDk3REUzQTI2QTJDOTE2QzUxRTBDQzlEMzcwIiwibmgiOiIyRThCQzNCQTRDRjVCQkVENEQ0NEMzMjY1Q0U4RDhBRDgyOERFN0JEOTU2M0U2MjI3MkVBODc1MjgyQzc4QzVEIn0"
  };
  let resp = await got( {method: 'post', url: url, body: JSON.stringify(data), decompress: false, headers: header_dict, timeout: 15000});
  if (resp.statusCode == 200){
    let rawData = resp.body;
    return JSON.parse(rawData)
  }
}
export async function search(data) {
  let url2 = "http://mmsearch.woa.com/newapi/comm_svrkit/mmsearchossopenapisvr/GetSearchResultLite"
  let resp =  await mmSearch(url2, data);
  console.log("yiyiyiiyayayayayayay");
  console.log(resp.data.rsp);
  return resp.data.rsp;
}

export async function teach(data) {
  const resp: SearchGuideResponse = { Json: "" }
  return resp
}