import {getHeightOfEle, getLeftOfEle, getOCRRes, getSimilarity, getSizeOfEle} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser} from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {gaokaoCardClass, searchRes} from "../../lib/utils/resultMap";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;

//@owner:miyawei
//@description:高考大卡测试
describe("testGaokaoCard", () => {

  beforeAll(async () => {
    pageExtend = await setup("高考",20, 3192443972, false);
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

  //@description:q=高考时间，验证高考大卡是否召回且在首位
  test("testDateCardRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=高考时间,发起搜索\n  2. 检查垂搜页是否召回高考box`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("高考时间");
        let firstbox = await page.$(searchRes.first_box);
        let gaokaoCard = await page.$(gaokaoCardClass.box);
        let image = await page.screenshot({
          path: "./static/pic/test_gaokaotimebox.png"
        })
        await addAttach({ attach: image, description: "页面截图" });
        await expect(firstbox).toStrictEqual(gaokaoCard);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=江苏高考时间，验证高考大卡地址POI为江苏
  test("testPoiProvince", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=江苏高考时间,发起搜索\n  2. 检查高考box内POI为江苏`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("江苏高考时间");
        let ele = await page.$(gaokaoCardClass.poi);
        let image = await ele.screenshot({
          path: "./static/pic/test_jiangsugaokaotimebox.png"
        })
        await addAttach({ attach: image, description: "poi截图" });
        const spanValue = await page.$eval(gaokaoCardClass.poi, (ele) =>
          ele.textContent);
        await expect(spanValue).toBe("江苏")
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=高考时间 上海，验证高考大卡地址POI为上海
  test("testPoiCity", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=高考时间 上海,发起搜索\n  2. 验证高考大卡地址POI为上海`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("高考时间 上海");
        let ele = await page.$(gaokaoCardClass.poi);
        let image = await ele.screenshot({
          path: "./static/pic/test_shanghaigaokaopoi.png"
        })
        await addAttach({ attach: image, description: "poi截图" });
        const spanValue = await page.$eval(gaokaoCardClass.poi, (ele) =>
          ele.textContent);
        await expect(spanValue).toBe("上海")
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=高考时间，验证验证高考大卡样式与上个版本diff率不低于0.9
  test("testGaokaoCardDiff", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=高考时间,发起搜索\n  2. 验证高考大卡样式与上个版本diff率`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("高考时间");
        let ele = await page.$(gaokaoCardClass.box);
        let imgPath = "./static/pic/test_gaokaocardstyle.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "高考时间卡片截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_gaokaocardstyle.png');
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

  //@description:q=高考时间，验证poi点击拉起弹窗
  test("testGaokaoPoiWindow", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=高考时间,发起搜索\n  2. 验证poi点击拉起弹窗`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(gaokaoCardClass.poi);
        let image = await ele.screenshot({
          path: "./static/pic/test_poiwindow.png"
        })
        await page.click(gaokaoCardClass.poi);
        await page.waitForTimeout(3000);

        //await addAttach({ attach: image, description: "弹窗截图" });
        await expect(page).toHaveElement(gaokaoCardClass.window)
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=高考，验证高考part1召回
  test("testGaokaoPart1Recall", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=高考,发起搜索\n  2. 验证高考part1召回`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(gaokaoCardClass.part1);
        let image = await ele.screenshot({
          path: "./static/pic/test_gaokaopart1.png"
        })
        await page.click(gaokaoCardClass.part1);
        await page.waitForTimeout(3000);
        //await addAttach({ attach: image, description: "part1截图" });
        await expect(page).toHaveElement(gaokaoCardClass.part1);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description:q=高考，验证高考part2召回
  test("testGaokaoPart2Recall", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=高考,发起搜索\n  2. 验证高考part2召回`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(gaokaoCardClass.part2);
        let image = await ele.screenshot({
          path: "./static/pic/test_gaokaopart2.png"
        })
        await page.click(gaokaoCardClass.part2);
        await page.waitForTimeout(3000);
        //await addAttach({ attach: image, description: "part2截图" });
        await expect(page).toHaveElement(gaokaoCardClass.part2);
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