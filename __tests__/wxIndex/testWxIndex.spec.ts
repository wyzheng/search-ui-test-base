import { getHeightOfEle, getLeftOfEle, getOCRRes, getSizeOfEle } from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import {addAttach, addMsg} from "jest-html-reporters/helper";
import { wxIndexClass } from "../../lib/utils/resultMap";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let num = 0;

//@owner:joycesong
//@description:微信指数box测试
describe("testWxIndex", () => {

  beforeAll(async () => {
    pageExtend = await setup("薛之谦",20, 3192443972, false, 8192);
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

  //@description:q=薛之谦，验证微信指数box是否召回
  test("testWxIndexRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=薛之谦,发起搜索\n  2. 检查垂搜页是否召回微信指数box`
    });
    let num = 3;
    while (num != 0) {
      try {
        let image = await page.screenshot({
          path: "./static/pic/test_wxindex.png"
        })
        await addAttach({ attach: image, description: "页面截图" });
        await expect(page).toHaveElement(wxIndexClass.box);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=薛之谦，验证微信指数标题为query
  test("testWxIndexTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=薛之谦,发起搜索\n  2. 检查微信指数标题为query`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(wxIndexClass.title);
        let image = await ele.screenshot({
          path: "./static/pic/test_wxindex_title.png"
        })
        await addAttach({ attach: image, description: "标题截图" });
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, wxIndexClass.title);
        await expect(content).toBe("薛之谦");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=薛之谦，验证微信指数box来源icon和文字一行展示
  test("testWxIndexInfo", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=薛之谦,发起搜索\n  2. 验证微信指数box来源为'微信指数小程序'`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(wxIndexClass.foot);
        let image = await ele.screenshot({
          path: "./static/pic/test_wxindex_foot.png"
        })
        await addAttach({ attach: image, description: "来源截图" });
        let h1 = await getHeightOfEle(page, wxIndexClass.icon);
        let h2 = await getHeightOfEle(page, wxIndexClass.source);
        expect(h1).toBe(h2);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=薛之谦，验证微信指数box来源
  test("testWxIndexSrc", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=薛之谦,发起搜索\n  2. 验证微信指数box来源为'微信指数小程序'`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(wxIndexClass.source);
        let image = await ele.screenshot({
          path: "./static/pic/test_wxindex_sourceWord.png"
        })
        await addAttach({ attach: image, description: "标题截图" });
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, wxIndexClass.source);
        await expect(content.replace(/[\r\n]/g, "").replace(/\ +/g, "")).toBe("微信指数小程序");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=薛之谦，点击验证跳转小程序正确
  test("testWxIndexClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=薛之谦,发起搜索\n  2. 点击微信指数，验证微信指数跳转目标正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.click(wxIndexClass.panel);
        await expect(pageExtend.extendInfo).toBe("gh_935b85261f35@app");
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