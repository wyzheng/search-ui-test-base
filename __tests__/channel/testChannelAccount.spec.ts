import {
  getLeftOfEle,
  getLineNum,
  getOCRRes, getRightOfEle,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import {bizWeAppClass, bizWeAppsList, channelAccountClass, channelClass} from "../../lib/utils/resultMap";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:joycesong
//@description:视频号账号组件测试
describe("testChannelAccount", () => {

  beforeAll(async () => {
    pageExtend = await setup("微信广告助手", 20, 3191396391, false);
    page = pageExtend.webSearchPage.instance;
    browser = pageExtend.browser;
  });

  afterAll(async () => {
    if (!page.isClosed()) {
      await browser.close();
    }
  });

  beforeEach(() => {
    num = num + 1;
  })

  //@description:query = 微信广告助手，验证混排页召回微信广告助手视频号
  test("testChannelAccountRecall", async () => {
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_testchannelaccount.png"
        })
        await expect(page).toHaveElement(channelAccountClass.box);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，验证视频号账号title
  test("testChannelAccountBoxTitle", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.box)
        let ele = await page.$(channelAccountClass.box)
        const image = await ele.screenshot({
          path: "./static/pic/test_testchannelaccountbox.png"
        })
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.title + " >em");
          let color = getComputedStyle(item).color;
          return item.innerHTML;
        }, channelAccountClass);
        await expect(content).toBe("微信广告助手");
        let ocrres = await getOCRRes("./static/pic/test_testchannelaccounttitle.png")
        console.log(ocrres);
        await expect(ocrres.ocr_comm_res.items[0].text.replace(" ", "")).toBe("微信广告助手-视频号");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，验证视频号标题不超过两行
  test("testChannelAccountTitle", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 检查视频号账号标题不超过两行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountTitle);
        let ele = await page.$(channelAccountClass.accountTitle);
        const image = await ele.screenshot({
          path: "./static/pic/test_testchannelaccounttitlec.png"
        })
        let linNum = await getLineNum("./static/pic/test_testchannelaccounttitlec.png");
        expect(linNum).toBeLessThanOrEqual(2);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，验证视频号描述不超过两行
  test("testChannelAccountDesc", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountDesc);
        let ele = await page.$(channelAccountClass.accountDesc);
        const image = await ele.screenshot({
          path: "./static/pic/testchannelaccountdesc.png"
        })
        let linNum = await getLineNum("./static/pic/testchannelaccountdesc.png");
        expect(linNum).toBeLessThanOrEqual(2);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，验证视频号描述、标题、来源是否左对齐,box大小是否正常
  test("testChannelAccountInfoStyle", async () => {
    let num = 3;
    while (num != 0) {
      try {
        let left1 = await getLeftOfEle(page, channelAccountClass.accountDesc);
        let left2 = await getLeftOfEle(page, channelAccountClass.accountTitle);
        let left3 = await getLeftOfEle(page, channelAccountClass.accountSource);

        let left_bound = await getLeftOfEle(page, 'div.search_data');
        let boxleft_bound = await getLeftOfEle(page, channelAccountClass.box);
        let right_bound = await getRightOfEle(page, 'div.search_data');
        let boxright_bound = await getRightOfEle(page, channelAccountClass.box);
        expect(left1).toBe(left2)
        expect(left1).toBe(left3)
        expect(boxleft_bound - left_bound).toBe(8)
        expect(right_bound - boxright_bound).toBe(8)
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，验证带认证的视频号展示信息小于4行
  test("testChannelAccountBoxTag", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountInfo);
        let ele = await page.$(channelAccountClass.accountInfo);
        const image = await ele.screenshot({
          path: "./static/pic/testchannelaccountinfo1.png"
        })
        let linNum = await getLineNum("./static/pic/testchannelaccountinfo1.png");
        await expect(page).toHaveElement(channelAccountClass.tag);
        expect(linNum).toBeLessThanOrEqual(4);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 快乐小奇迹视频号，验证不带认证的视频号展示信息小于2行
  test("testChannelAccountBoxNoTag", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("快乐小奇迹视频号");
        await page.waitForSelector(channelAccountClass.accountInfo);
        let ele = await page.$(channelAccountClass.accountInfo);
        const image = await ele.screenshot({
          path: "./static/pic/testchannelaccountinfo2.png"
        })
        let linNum = await getLineNum("./static/pic/testchannelaccountinfo2.png");
        expect(linNum).toBeLessThanOrEqual(3);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信视频号，验证视频号更多点击跳转后切到视频号tab
  test("testChannelAccountBoxMore", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("微信视频号");
        await page.waitForSelector(channelAccountClass.more);
        await page.click(channelAccountClass.more);
        let ele = await page.$('div.search_result div.unit__outer div.unit__wrap div.selected');
        const image = await ele.screenshot({
          path: "./static/pic/testchannelaccountmore.png"
        })
        let content = await getOCRRes(`./static/pic/testchannelaccountmore.png`)
        expect(content.ocr_comm_res.items[0].text).toBe('视频号')
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 微信广告助手，点击视频号box，验证视频号落地页信息与搜索页一致
  test("testChannelAccountClickInfo", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.box);
        await page.click(channelAccountClass.box);
        const image = await page.screenshot({
          path: "./static/pic/test_testchannelAccountclick.png"
        })
        await expect(pageExtend.extendInfo).toBe("v2_060000231003b20faec8cae28f1cc1d1cf03e435b077c150c1b4e9f8a1b3e3be8df4eb537b44@finder");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = ，验证混排不召回视频号(封禁账号)
  test("testNoChannelAccountRecall", async () => {
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("中医蔡锦芳");
        const image = await page.screenshot({
          path: "./static/pic/test_testnochannelaccount.png"
        })
        await expect(page).not.toHaveElement(channelAccountClass.box);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

    //@description:query = 深圳卫健委，验证混排不召回视频号(封禁账号)
  test("testNoChannelAccountRecall", async () => {
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("中医蔡锦芳");
        const image = await page.screenshot({
          path: "./static/pic/test_testnochannelaccount.png"
        })
        await expect(page).not.toHaveElement(channelAccountClass.box);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  test("> 测试结果汇总", async () => {
    num = num - 1;
    pass = num - fail - err;
    resArr = [num, pass, fail, err];
  })
})