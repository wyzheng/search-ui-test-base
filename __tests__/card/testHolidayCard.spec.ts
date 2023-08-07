import {getHeightOfEle, getLeftOfEle, getOCRRes, getSimilarity, getSizeOfEle} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {holidayCardClass} from "../../lib/utils/resultMap";
import fs from "fs";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:节日大卡测试
describe("testHolidayCard", () => {
  beforeAll(async () => {
    pageExtend = await setup("中秋节",20, 3191396391, false, true);
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
  });

  //@description:q=中秋节，验证节日大卡是否召回且在首位
  test("testHolidayCardRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 检查是否召回节日大卡`
    });
    let num = 3;
    while (num != 0) {
      try {
        let firstbox = await page.waitForSelector(`div.search_result div:nth-child(1)`);
        let jieriCard = await page.waitForSelector(holidayCardClass.box);
        let image = await page.screenshot({
          path:  basedir + "./static/pic/test_Holidaybox.png"
        })
        await addAttach({ attach: image, description: "页面截图" });
        await expect(firstbox).toStrictEqual(jieriCard);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=端午节，验证节日大卡日期高亮正确
  test("testDuanwujie", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=端午节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testDuanwujie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "端午节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testDuanwujie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testDuanwujie.png`, `./static/pic_diff/test_testDuanwujie.png`);
  }, 50000);

  //@description: q=劳动节，验证节日大卡日期高亮正确
  test("testLaodongjie", async () => {
    await addMsg({
     context: undefined,
     message: ` 测试步骤：\n  1. 输入搜索query=劳动节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("劳动节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testLaodongjie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "劳动节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testLaodongjie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testLaodongjie.png`, `./static/pic_diff/test_testLaodongjie.png`);
  }, 50000);

  //@description: q=国庆节，验证节日大卡日期高亮正确
  test("testGuoqingjie", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=国庆节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("国庆节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testGuoqingjie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "国庆节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testGuoqingjie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testGuoqingjie.png`, `./static/pic_diff/test_testGuoqingjie.png`);
  }, 50000);

  //@description: q=中秋节，验证节日大卡日期高亮正确
  test("testZhongqiujie", async () => {
    /*await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });*/
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("中秋节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testZhongqiujie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        //await addAttach({attach: image, description: "中秋节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testZhongqiujie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    try {
      fs.copyFileSync(`./static/pic/test_testZhongqiujie.png`, `./static/pic_diff/test_testZhongqiujie.png`);
    }catch(e){
      await addMsg({
        context: undefined,
        message: e
      });
    }
  }, 50000);

  //@description: q=春节，验证节日大卡日期高亮正确
  test("testChunjie", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=春节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("春节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testChunjie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "春节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testChunjie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testChunjie.png`, `./static/pic_diff/test_testChunjie.png`);
  }, 50000);

  //@description: q=元旦，验证节日大卡日期高亮正确
  test("testYuandan", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=元旦,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("元旦");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testYuandan.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "元旦截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testYuandan.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testYuandan.png`, `./static/pic_diff/test_testYuandan.png`);
  }, 50000);

  //@description: q=清明节，验证节日大卡日期高亮正确
  test("testQingmingjie", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=清明节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("清明节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testQingmingjie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "清明节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testQingmingjie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testQingmingjie.png`, `./static/pic_diff/test_testQingmingjie.png`);
  }, 50000);

  //@description: q=植树节，验证节日大卡日期高亮正确
  test("testZhishujie", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=植树节,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("植树节");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testZhishujie.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "植树节截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testZhishujie.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testZhishujie.png`, `./static/pic_diff/test_testZhishujie.png`);
  }, 50000);

  //@description: q=世界艾滋病日，验证节日大卡日期高亮正确
  test("testAIDSday", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=世界艾滋病日,发起搜索\n  2. 检查节日大卡日期高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("世界艾滋病日");
        let ele = await page.$(holidayCardClass.box);
        let imgPath =  basedir + "./static/pic/test_testAIDSday.png"
        const image = await ele.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "世界艾滋病日截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testAIDSday.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_testAIDSday.png`, `./static/pic_diff/test_testAIDSday.png`);
  }, 50000);

  //@description: q=中秋节，验证节日大卡切换月份为上一月
  test("testSwitchMonthPrev", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 点击节日大卡左侧箭头\n  3. 检查月份是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("中秋节");
        await page.click(holidayCardClass.month_picker_left);
        let calendar = await page.waitForSelector(holidayCardClass.calendar);
        const image1 = await calendar.screenshot({
          path:  basedir + "./static/pic/test_calendar.png"
        });
        await addAttach({attach: image1, description: "日历截图"});
        let month_picker = await page.waitForSelector(holidayCardClass.month_picker)
        const image2 = await month_picker.screenshot({
          path:  basedir + "./static/pic/test_monthPicker.png"
        });
        await addAttach({attach: image2, description: "月份选择器截图"});
        let ocr_res = await getOCRRes( basedir + "./static/pic/test_monthPicker.png");
        let month = await ocr_res.ocr_comm_res.items[0].text;
        expect(month).toBe("2023年8月");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=中秋节，验证节日大卡切换月份为下一月
  test("testSwitchMonthNext", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 点击节日大卡右侧箭头\n  3. 检查月份是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("中秋节");
        await page.click(holidayCardClass.month_picker_right);
        let calendar = await page.waitForSelector(holidayCardClass.calendar);
        let image2 = await calendar.screenshot({
          path:  basedir + "./static/pic/test_calendar.png"
        });
        await addAttach({attach: image2, description: "日历截图"});
        let month_picker = await page.waitForSelector(holidayCardClass.month_picker)
        let image1 = await month_picker.screenshot({
          path:  basedir + "./static/pic/test_monthPicker.png"
        });
        await addAttach({attach: image1, description: "月份选择器截图"});
        let ocr_res = await getOCRRes( basedir + "./static/pic/test_monthPicker.png");
        let month = ocr_res.ocr_comm_res.items[0].text;
        expect(month).toBe("2023年10月");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    };
  }, 50000);

  //@description: q=中秋节，点击日历中上月份的日期，跳转到上个月
  test("testCalendarClickPrevMonthDate", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 点击节日大卡左侧箭头\n  3. 点击日历中上月份的日期\n  4. 检查月份是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("中秋节");
        await page.click(holidayCardClass.day_picker1);
        let calendar = await page.waitForSelector(holidayCardClass.calendar);
        let image2 = await calendar.screenshot({
          path:  basedir + "./static/pic/test_calendar.png"
        });
        await addAttach({attach: image2, description: "日历截图"});
        let test_monthPicker = await page.waitForSelector(holidayCardClass.month_picker, {timeout: 3000})
        let image1 = await test_monthPicker.screenshot({
          path:  basedir + "./static/pic/test_monthPicker.png"
        });
        await addAttach({attach: image1, description: "月份选择器截图"});
        let ocr_res = await getOCRRes( basedir + "./static/pic/test_monthPicker.png");
        let month = ocr_res.ocr_comm_res.items[0].text;
        expect(month).toBe("2023年8月");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  test("testCalendarSwitchDate", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 点击日历中的本月日期（9月14日），\n  3.检查大卡标题日期是否切换成正确的日期`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.click(holidayCardClass.day_picker2);
        await page.waitForSelector(holidayCardClass.date_picked, {timeout: 3000});
        let date = await page.$eval(holidayCardClass.title, el => el.textContent);
        expect(date.trim()).toBe("2023年9月14日 星期四");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

  //@description: q=中秋节，点击日历中下月份的日期，跳转到下个月
  test("testCalendarClickNextMonthDate", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=中秋节,发起搜索\n  2. 点击日历中下月份的日期，跳转到下个月`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("中秋节");
        await page.click(holidayCardClass.day_picker3);
        let calendar = await page.$(holidayCardClass.calendar);
        let image2 = await calendar.screenshot({
          path:  basedir + "./static/pic/test_calendar.png"
        });
        await addAttach({attach: image2, description: "日历截图"});
        let test_monthPicker = await page.waitForSelector(holidayCardClass.month_picker, {timeout: 3000});
        let image1 = await test_monthPicker.screenshot({
          path:  basedir + "./static/pic/test_monthPicker.png"
        });
        await addAttach({attach: image1, description: "月份选择器截图"});
        let ocr_res = await getOCRRes( basedir + "./static/pic/test_monthPicker.png");
        let month = ocr_res.ocr_comm_res.items[0].text;
        expect(month).toBe("2023年10月");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  }, 50000);

});