import { getSimilarity } from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
//import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {shebaoCardClass} from "../../lib/utils/resultMap";
import {addAttach, addMsg} from "jest-html-reporters/helper";

let page: Page;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:社保大卡测试
describe("testShebaoCard", () => {

  beforeAll(async () => {
    pageExtend = await setup("社保",20, 3191396391, false, true);
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

  //@description:q=社保，验证社保大卡是否召回且在首位
  test("testShebaoCardRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 检查垂搜页是否召回社保大卡`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("社保");
        let firstbox = await page.$(`div.search_result div:nth-child(1)`);
        let shebaoCard = await page.$(shebaoCardClass.box);
        let image = await page.screenshot({
          path:  basedir + "./static/pic/test_shebaobox.png"
        })
        await addAttach({ attach: image, description: "页面截图" });
        await expect(firstbox).toStrictEqual(shebaoCard);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=社保，验证社保大卡地址POI为广东广州
  test("testPoiOrigin", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 检查社保box内POI为当前定位城市`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(shebaoCardClass.poi);
        let image = await ele.screenshot({
          path:  basedir + "./static/pic/test_shebaopoi.png"
        })
        await addAttach({ attach: image, description: "poi截图" });
        const spanValue = await page.$eval(shebaoCardClass.poi, (ele) =>
          ele.textContent);
        await expect(spanValue.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("")).toBe("广东广州");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=深圳社保，验证社保大卡地址POI为广东深圳
  test("testPoi", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=深圳社保,发起搜索\n  2. 检查社保box内POI为深圳`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("深圳社保");
        let ele = await page.$(shebaoCardClass.poi);
        let image = await ele.screenshot({
          path:  basedir + "./static/pic/test_shenzhenshebaopoi.png"
        })
        await addAttach({ attach: image, description: "poi截图" });
        const spanValue = await page.$eval(shebaoCardClass.poi, (ele) =>
          ele.textContent);
        await expect(spanValue.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("")).toBe("广东深圳")
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证验证社保大卡样式与上个版本diff率不低于0.9
  test("testshebaoCardDiff", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 验证社保大卡样式与上个版本diff率`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("社保");
        let ele = await page.$(shebaoCardClass.box);
        let imgPath =  basedir + "./static/pic/test_shebaocardstyle.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "社保大卡截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_shebaocardstyle.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证社保常见服务点击
  test("testshebaoServiceClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 验证社保常见服务点击`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.desc_link);
        await page.click(shebaoCardClass.desc_link);
        await page.waitForTimeout(3000);
        await expect(pageExtend.extendInfo).toBe("gh_8e88e2b28133@app");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证我的社保按钮点击
  test("testshebaoButton1Click", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保时间,发起搜索\n  2. 验证我的社保按钮点击`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.service_button_item1);
        await page.click(shebaoCardClass.service_button_item1);
        await page.waitForTimeout(3000);
        let imgPath =  basedir + "./static/pic/test_shebaocardbutton1.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({ attach: image, description: "社保按钮截图" });
        await expect(pageExtend.extendInfo).toBe("gh_c02ba94d95e2@app");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证社保余额查询按钮点击
  test("testshebaoButton2Click", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保时间,发起搜索\n  2. 验证社保余额查询按钮点击`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.service_button_item2);
        await page.click(shebaoCardClass.service_button_item2);
        await page.waitForTimeout(3000);
        let imgPath =  basedir + "./static/pic/test_shebaocardbutton2.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({ attach: image, description: "社保余额截图" });
        await expect(pageExtend.url).toBe("https://card.wecity.qq.com/v2/social-insurance/gzmiquery/base-info?cityid=440100&channel=AAHgITcHBYVBBBoLWndgziDe");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证社保缴费按钮点击
  test("testshebaoButton3Click", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保时间,发起搜索\n  2. 验证社保缴费按钮点击`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.service_button_item3);
        await page.click(shebaoCardClass.service_button_item3);
        await page.waitForTimeout(3000);
        let imgPath =  basedir + "./static/pic/test_shebaocardbutton3.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({ attach: image, description: "社保缴纳截图" });
        await expect(pageExtend.extendInfo).toBe("gh_1ac06b5a8f4e@app");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=社保，验证相关账号点击
  test("testshebaoAccountClick", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 验证相关账号点击`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.account_item1);
        await page.click(shebaoCardClass.account_item1);
        await page.waitForTimeout(3000);
        let imgPath =  basedir + "./static/pic/test_shebaocardaccount1.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        //await addAttach({ attach: image, description: "相关账号截图" });
        await expect(pageExtend.extendInfo).toBe("gh_6c517d0d63f0");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

    //@description:q=社保，验证其他服务点击
  test("testshebaoPart1Recall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=社保,发起搜索\n  2. 验证其他服务点击`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(shebaoCardClass.other_service_item1);
        await page.click(shebaoCardClass.other_service_item1);
        await page.waitForTimeout(3000);
        let imgPath =  basedir + "./static/pic/test_shebaocardservice1.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({ attach: image, description: "其他服务截图" });
        await expect(pageExtend.extendInfo).toBe("gh_1ac06b5a8f4e@app");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

})