import {
  getLeftOfEle,
  getLineNum,
  getOCRRes,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { bizWeAppClass, bizWeAppsList } from "../../lib/utils/resultMap";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:joycesong
//@description:公众号组件测试
describe("testBizBox", () => {

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

  //@description:query = 果壳，验证混排页召回果壳公众号
  test("testBizRecall", async () => {
    /*await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查混排页是否召回公众号box`
    });*/
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_testBiz.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(bizWeAppsList(1, 0, 0).account);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 果壳，验证混排页召回果壳公众号
  test("testBIzBoxTitle", async () => {
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
        await addAttach({attach: image, description: "标题截图"});
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
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 果壳，验证公众号标题不超过两行
  test("testBizTitle", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查公众号账号标题不超过两行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(bizWeAppsList(1,0,0).accountTitle);
        let ele = await page.$(bizWeAppsList(1,0,0).accountTitle);
        const image = await ele.screenshot({
          path: "./static/pic/test_testbiztitlec.png"
        })
        // await addAttach({attach: image, description: "公众号账号标题"});
        let linNum = await getLineNum("./static/pic/test_testbiztitlec.png");
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

  //@description:query = 果壳，验证公众号描述不超过两行
  test("testBizDesc", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查公众号描述不超过两行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(bizWeAppsList(1,0,0).accountDesc);
        let ele = await page.$(bizWeAppsList(1,0,0).accountDesc);
        const image = await ele.screenshot({
          path: "./static/pic/test_testWeappdesc.png"
        })
        await addAttach({attach: image, description: "公众号描述"});

        let linNum = await getLineNum("./static/pic/test_testWeappdesc.png");
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

  //@description:query = 果壳，验证公众号描述、标题、来源是否左对齐
  test("testBizInfoStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 验证公众号描述、公众号标题、公众号来源是否左对齐`
    });
    let num = 3;
    while (num != 0) {
      try {
        let left1 = await getLeftOfEle(page, bizWeAppsList(1,0,0).accountDesc);
        let left2 = await getLeftOfEle(page, bizWeAppsList(1,0,0).accountTitle);
        let left3 = await getLeftOfEle(page, bizWeAppsList(1,0,0).accountSourceIcon);

        expect(left1).toBe(left2)
        expect(left1).toBe(left3)
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 果壳，验证公众号召回服务
  test("testBizService", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 验证公众号描述、公众号标题、公众号来源是否左对齐`
    });
    let num = 3;
    let content;
    while (num != 0) {
      try {
        await expect(page).toHaveElement(bizWeAppsList(1, 0, 0).bizService);
        let ele = await page.waitForSelector(bizWeAppsList(1, 0, 0).bizService);
        const image = await ele.screenshot({
          path: "./static/pic/test_testbizservice.png"
        });
        let item = await page.$$(bizWeAppsList(1, 0, 0).bizService).then((arr) =>{
          return arr.length;
        })
        console.log(item);
        let wording = ["果壳市集", "生活健康指南", "科学漫画合集", "科技解读"]
        for (let i = 0; i < item; i++) {
          let content = await page.evaluate(async (eleClass) => {
            let item = document.querySelector(eleClass + " p");
            return item.innerHTML;
          }, bizWeAppsList(1, 0, i + 1).bizServiceText);
          content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
          await expect(wording.indexOf(content)).not.toBe(-1);
          await page.click(bizWeAppsList(1, 0, i + 1).bizServiceLink);
          expect(pageExtend.extendInfo).toBe("gh_d23b07c3d852@app");
        }
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 果壳，点击更多入口验证是否跳转到公众号垂搜页
  test("testBizBoxMore", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 点击更多入口，验证是否跳转到公众号垂搜页`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(bizWeAppClass.more);
        await page.click(bizWeAppClass.more);
        await page.waitForTimeout(2000);
        const image = await page.screenshot({
          path: "./static/pic/test_testbiztab.png"
        })
        await addAttach({attach: image, description: "垂搜截图"});
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 随申办，验证是否召回随申办公众号
  test("testBizRecall2", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=随申办,发起搜索\n  2. 验证混排结果是否召回随申办公众号`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("随申办");
        const image = await page.screenshot({
          path: "./static/pic/test_testBiz.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(bizWeAppsList(1, 0, 0).account);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 随申办，验证公众号带事业单位标签
  test("testBizTag", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=随申办,发起搜索\n  2. 验证公众号带事业单位标签`
    });
    let num = 3;
    while (num != 0) {
      try {
        let content = await page.evaluate(async (eleClass) => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, bizWeAppsList(1, 1, 0).accountTagTitle);
        content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
        await expect(content).toBe("事业单位");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 上海发布，验证公众号带政府标签
  test("testBizGovernmentTag", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=上海发布,发起搜索\n  2. 检查公众号带政府标签`
    });
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("上海发布");
        let content = await page.evaluate(async (eleClass) => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, bizWeAppsList(1, 0, 0).accountTagTitle);
        content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
        await expect(content).toBe("政府");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 界面新闻，验证公众号带媒体标签
  test("testBIzMediaTag", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=界面新闻,发起搜索\n  2. 公众号带媒体标签`
    });
    let num = 3;
    while (num != 0) {
      try {
        let content = await page.evaluate(async (eleClass) => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, bizWeAppsList(1, 0, 0).accountTagTitle);
        content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
        await expect(content).toBe("媒体");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 中国国画石，验证公众号带其他组织标签
  test("testBizOtherTag", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中国国画石,发起搜索\n  2. 公众号带其他组织标签`
    });
    let num = 3;
    while (num != 0) {
      try {
        let content = await page.evaluate(async (eleClass) => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, bizWeAppsList(1, 0, 0).accountTagTitle);
        content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
        await expect(content).toBe("其他组织");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 中医蔡锦芳，验证公众号来源为"个人"
  test("testPersonalBiz", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中医蔡锦芳,发起搜索\n  2. 验证公众号来源为\"个人\" `
    });
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("中医蔡锦芳");
        let ele = await page.waitForSelector(bizWeAppsList(1, 0, 1).accountSourceText)
        const image = await ele.screenshot({
          path: "./static/pic/test_testbiztag.png"
        })

        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, bizWeAppsList(1, 0, 1).accountSourceText);
        await expect(content).toBe("个人");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 极摄会，验证公众号账号无认证
  test("testBizNoAuth", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=极摄会,发起搜索\n  2. 验证公众号账号无认证`
    });
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("极摄会");
        const image = await page.screenshot({
          path: "./static/pic/test_testbiztag.png"
        })
        await expect(page).not.toHaveElement(bizWeAppsList(1, 0, 0).accountSourceIcon);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 民权碧桂园，验证混排不召回公众号(封禁账号)
  test("testNoBIzRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=民权碧桂园,发起搜索\n  2. 验证混排不召回公众号`
    });
    let num = 3;
    while (num != 0) {
      try {
        //await pageExtend.change("中医蔡锦芳");
        const image = await page.screenshot({
          path: "./static/pic/test_testbiztag.png"
        })
        await expect(page).not.toHaveElement(bizWeAppsList(0, 0, 0).account.split(":")[0]);
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
    await addMsg({context: undefined, message: `当前测试集合共有${num}条用例，其中测试通过${pass}条，测试失败${fail}条，测试任务失败${err}条`});
  }, 5000);

})