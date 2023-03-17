import {
  getHeightOfEle,
  getLeftOfEle,
  getLineNum,
  getOCRRes,
} from "../../lib/utils/helper";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "jest-html-reporters/helper";
import { bizWeAppClass, bizWeAppsList } from "../../lib/utils/resultMap";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;


describe("testBiz#公众号组件测试", () => {

  beforeAll(async () => {
    pageExtend = await setup("果壳", 20, 3192443972, false);
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

  test("testBizRecall#query=果壳，验证混排页召回果壳公众号", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查混排页是否召回公众号box`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_testBiz.png"
        })
       // await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(bizWeAppsList(1, 0, 0).account);
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
            await addMsg({
              context: undefined,
              message: `测试任务出错...`
            });
          }
          throw e;
        }
        num--;
      }
    }
  },50000);


  test("testBizBoxTitle#query = 果壳，公众号box标题为\"query-公众号\"", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查检查公众号box标题为title-公众号`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(bizWeAppClass.title)
        let ele = await page.$(bizWeAppClass.title)
        const image = await ele.screenshot({
          path: "./static/pic/test_testBiztitle.png"
        })
        //await addAttach({attach: image, description: "标题截图"});
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.title + " >em");
          let color = getComputedStyle(item).color;
          return item.innerHTML;
        }, bizWeAppClass);
        await expect(content).toBe("果壳");
        let ocrres = await getOCRRes("./static/pic/test_testBiztitle.png")
        console.log(ocrres);
        await expect(ocrres.ocr_comm_res.items[0].text.replace(" ", "")).toBe("果壳-公众号");
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
            await addMsg({
              context: undefined,
              message: `测试任务出错...`
            });
          }
          throw e;
        }
        num--;
      }
    }
  },50000);
})