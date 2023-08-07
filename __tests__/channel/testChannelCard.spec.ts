import {
  getLeftOfEle,
  getLineNum,
  getOCRRes, getRightOfEle, getSimilarity,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import {
  channelCardClass,
  tabClass
} from "../../lib/utils/resultMap";
import * as fs from "fs";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";

let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:视频号大卡组件测试
describe("testChannelCard", () => {

  beforeAll(async () => {
    pageExtend = await setup("湖北发布", 20, 3191396391, false);
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

  //@description:query = 湖北发布，验证混排页召回湖北发布视频号大卡
  test("testChannelCardRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证混排页召回湖北发布视频号大卡`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_channelcard.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(channelCardClass.box);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 湖北发布，验证视频号大卡高亮
  test("testChannelBoxHighlight", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 检查检查视频号大卡高亮是否正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        let channelEle = await page.$(channelCardClass.box);
        let highlightEle = await page.$$(channelCardClass.box);
        const image = await channelEle.screenshot({
          path:  basedir + "./static/pic/test_Channelhighlight.png"
        })
        const matchingElements = await Promise.all(
          highlightEle.map(async (el) => await el.evaluate((el) => el.outerHTML))
        );
        const notMatchingElements = await channelEle.evaluate((el) =>
          el.outerHTML.replace(/<em class="highlight">.*?<\/em>/g, ''));
        const querySet = new Set("湖北发布".split(''));
        const matchingEleSet = new Set(matchingElements);
        const notMatchingEleSet = new Set(notMatchingElements.split(''));
        const match = new Set([...querySet].filter(x => matchingEleSet.has(x)));
        const notMatch = new Set([...querySet].filter(x => notMatchingEleSet.has(x)));
        expect(Array.from(match).join('') != '');
        expect(Array.from(notMatch).join('') == '');
        break;
      } catch (e) {
        if (num == 1) {
          if (num == 1) {
            throw e;
          }
          num--;
        }
      }
    }
  },50000);

    //@description:query = 湖北发布，验证样式正确
  test("testChannelCardDiff", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 检查混排页的视频号动态样式和设计稿一致`
    });
    let num = 3;
    while (num != 0) {
      try {
        let channelBoxEle = await page.$(channelCardClass.box);
        let imgPath =  basedir + "./static/pic/test_channelcardstyle.png"
        const image = await channelBoxEle.screenshot({
          path: imgPath
        });
        await addAttach({attach: image, description: "box截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_channelcardstyle.png');
        await expect(0.9).toBeLessThan(Number(diffPercent));
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_channelcardstyle.png`, `./static/pic_diff/test_channelcardstyle.png`);
  },50000);

  //@description:query = 湖北发布，验证视频号大卡title为：湖北发布-视频号
  test("testChannelCardTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证视频号大卡title为：湖北发布-视频号`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.title)
        let ele = await page.$(channelCardClass.title)
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelcardtitle.png"
        })
        await addAttach({attach: image, description: "标题截图"});
        let ocrres = await getOCRRes( basedir + "./static/pic/test_channelcardtitle.png")
        console.log(ocrres);
        await expect(ocrres.ocr_comm_res.items[0].text.replace(" ", "")).toBe("湖北发布-视频号");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 湖北发布，验证视频号大卡名称不超过1行
  test("testChannelCardName", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 检查视频号大卡名称不超过一行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.accountName);
        let ele = await page.$(channelCardClass.accountName);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelcardname.png"
        })
        await addAttach({attach: image, description: "名称截图"});
        let linNum = await getLineNum( basedir + "./static/pic/test_channelcardname.png");
        expect(linNum).toBeLessThanOrEqual(1);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 湖北发布，验证视频号认证信息不超过一行
  test("testchannelCardCert", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证视频号认证信息不超过一行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.accountCert);
        let ele = await page.$(channelCardClass.accountCert);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/testchannelcardcert.png"
        })
        await addAttach({attach: image, description: "认证信息截图"});
        let linNum = await getLineNum( basedir + "./static/pic/testchannelcardcert.png");
        expect(linNum).toBeLessThanOrEqual(1);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 加加kiana，验证视频号描述信息不超过2行
  test("testchannelCardDesc", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=加加kiana,发起搜索\n  2. 验证视频号描述信息不超过2行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("加加kiana");
        await page.waitForSelector(channelCardClass.accountDesc);
        let ele = await page.$(channelCardClass.accountDesc);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelcarddesc.png"
        })
        await addAttach({attach: image, description: "描述截图"});
        let linNum = await getLineNum( basedir + "./static/pic/test_channelcarddesc.png");
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

  //@description:query = 湖北发布，验证视频号描述、标题、来源、视频号动态是否左对齐,box大小是否正常
  test("testchannelCardStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证视频号描述、标题、来源、视频号动态是否左对齐,box大小是否正常`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("湖北发布");
        let left1 = await getLeftOfEle(page, channelCardClass.accountAvatar);
        let left2 = await getLeftOfEle(page, channelCardClass.channelBlock);
        let left3 = await getLeftOfEle(page, channelCardClass.accountInfo);
        let right1 = await getRightOfEle(page, channelCardClass.accountInfo);
        let right2 = await getRightOfEle(page, channelCardClass.channelRight);
        let right3 = await getRightOfEle(page, channelCardClass.accountAvatar);
        let left_bound = await getLeftOfEle(page, 'div.search_data');
        let boxleft_bound = await getLeftOfEle(page, channelCardClass.box);
        let right_bound = await getRightOfEle(page, 'div.search_data');
        let boxright_bound = await getRightOfEle(page, channelCardClass.box);
        expect(boxleft_bound - left_bound).toBe(8)   //视频号大卡左边界与整体搜索结果对齐
        expect(right_bound - boxright_bound).toBe(8) //视频号大卡右边界与整体搜索结果对齐
        expect(right3).toBeLessThan(left3)                          //icon右边界与描述信息不重合
        expect(left1 - left2).toBeLessThan(1)        //icon与视频号动态左边界对齐（误差不超过1pix)
        expect(right1).toBe(right2)                                 //视频号动态右边界与描述信息对齐
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 湖北发布，验证视频号大卡内的视频号动态有发布时间信息
  test("testChannelCardDate", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 证视频号大卡内的视频号动态有发布时间信息`
    });
    let num = 3;
    while (num != 0) {
      try {
        await expect(page).toHaveElement(channelCardClass.date);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 湖北发布，验证视频号大卡内的视频号动态有点赞信息
  test("testChannelCardLike", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证视频号大卡内的视频号动态有点赞信息`
    });
    let num = 3;
    while (num != 0) {
      try {
        await expect(page).toHaveElement(channelCardClass.like);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 人民日报，验证视频号大卡头部标题点击跳垂搜
  test("testChannelCardMore", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=人民日报,发起搜索\n  2. 验证视频号大卡头部标题点击条垂搜`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("人民日报");
        await page.waitForSelector(channelCardClass.moreHandler);
        await page.click(channelCardClass.moreHandler);
        await page.waitForTimeout(3000);
        let ele = await page.$(tabClass.select_tab);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelcardmore.png"
        })
        await addAttach({attach: image, description: "tab截图"});
        let content = await getOCRRes(`./static/pic/test_channelcardmore.png`)
        expect(content.ocr_comm_res.items[0].text).toBe('视频号')
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
    await page.click(tabClass.select_all);
  },50000);

  //@description:query = 人民日报，验证视频号大卡更多按钮点击切到视频号tab
  test("testChannelCardSwitchTab", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=人民日报,发起搜索\n  2. 验证视频号大卡更多按钮点击切到视频号tab`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("人民日报");
        await page.waitForSelector(channelCardClass.more);
        await page.click(channelCardClass.more);
        await page.waitForTimeout(3000);
        let ele = await page.$(tabClass.select_tab);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelcardswitchtab.png"
        })
        //await addAttach({attach: image, description: "切tab截图"});
        let content = await getOCRRes(`./static/pic/test_channelcardswitchtab.png`)
        expect(content.ocr_comm_res.items[0].text).toBe('视频号')
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
    await page.click(tabClass.select_all);
  },50000);

  //@description:query = 湖北发布，点击视频号box，验证视频号落地页信息与搜索页一致
  test("testchannelCardClickInfo", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 验证视频号落地页信息与搜索页一致`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("湖北发布");
        await page.waitForSelector(channelCardClass.accountContainer);
        await page.click(channelCardClass.accountContainer);
        await page.waitForTimeout(3000);
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_channelcardclick.png"
        })
        await addAttach({attach: image, description: "视频号落地页截图"});
        await expect(pageExtend.extendInfo).toBe("v2_060000231003b20faec8c6e48118c3d1ca05e933b0778d8942e832097e41c28af96c7a4a3282@finder");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
    await page.click(tabClass.select_all);
  },50000);

  test("> 测试结果汇总", async () => {
    num = num - 1;
    pass = num - fail - err;
    resArr = [num, pass, fail, err];
  })
})