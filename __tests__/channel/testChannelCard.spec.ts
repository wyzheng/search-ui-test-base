import {
  getLeftOfEle,
  getLineNum,
  getOCRRes, getRightOfEle,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import {bizWeAppClass, bizWeAppsList, channelCardClass, channelClass} from "../../lib/utils/resultMap";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:joycesong
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
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_testchannelcard.png"
        })
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

  //@description:query = 湖北发布，验证视频号动态高亮
  test("testChannelBoxHighlight", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 检查检查视频号大卡高亮是否正确`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let channelEle = await page.$(channelCardClass.box);
        let highlightEle = await page.$$(channelCardClass.box);
        const image = await channelEle.screenshot({
          path: "./static/pic/test_testChannelhighlight.png"
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

  //@description:query = 湖北发布，验证视频号大卡title为：湖北发布-视频号
  test("testChannelCardTitle", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.title)
        let ele = await page.$(channelCardClass.title)
        const image = await ele.screenshot({
          path: "./static/pic/test_testchannelcardtitle.png"
        })
        let ocrres = await getOCRRes("./static/pic/test_testchannelcardtitle.png")
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

  //@description:query = 湖北发布，验证视频号大卡标题不超过1行
  test("testChannelCardName", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=湖北发布,发起搜索\n  2. 检查视频号大卡标题不超过两行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.accountName);
        let ele = await page.$(channelCardClass.accountName);
        const image = await ele.screenshot({
          path: "./static/pic/test_testchannelcardname.png"
        })
        let linNum = await getLineNum("./static/pic/test_testchannelcardname.png");
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
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.accountCert);
        let ele = await page.$(channelCardClass.accountCert);
        const image = await ele.screenshot({
          path: "./static/pic/testchannelcardcert.png"
        })
        let linNum = await getLineNum("./static/pic/testchannelcardcert.png");
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

  //@description:query = 龙帅食堂，验证视频号描述信息不超过2行
  test("testchannelCardDesc", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("龙帅食堂");
        await page.waitForSelector(channelCardClass.accountDesc);
        let ele = await page.$(channelCardClass.accountDesc);
        const image = await ele.screenshot({
          path: "./static/pic/testchannelcarddesc.png"
        })
        let linNum = await getLineNum("./static/pic/testchannelcarddesc.png");
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
    let num = 3;
    while (num != 0) {
      try {
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

  //@description:query = query = 湖北发布，验证视频号大卡内的视频号动态有点赞信息
  test("testChannelCardLike", async () => {
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

  //@description:query = 人民日报，验证视频号大卡更多按钮点击跳转后切到视频号tab
  test("testChannelCardMore1", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("人民日报");
        await page.waitForSelector(channelCardClass.more);
        await page.click(channelCardClass.more);
        let ele = await page.$('div.search_result div.unit__outer div.selected');
        const image = await ele.screenshot({
          path: "./static/pic/testchannelcardmore1.png"
        })
        let content = await getOCRRes(`./static/pic/testchannelcardmore1.png`)
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

  //@description:query = 人民日报，验证视频号大卡头部标题行点击跳转后切到视频号tab
  test("testChannelCardMore2", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("人民日报");
        await page.waitForSelector(channelCardClass.moreHandler);
        await page.click(channelCardClass.moreHandler);
        let ele = await page.$('div.search_result div.unit__outer div.selected');
        const image = await ele.screenshot({
          path: "./static/pic/testchannelcardmore2.png"
        })
        let content = await getOCRRes(`./static/pic/testchannelcardmore2.png`)
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

  //@description:query = 湖北发布，点击视频号box，验证视频号落地页信息与搜索页一致
  test("testchannelCardClickInfo", async () => {
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelCardClass.accountContainer);
        await page.click(channelCardClass.accountContainer);
        const image = await page.screenshot({
          path: "./static/pic/test_testchannelcardclick.png"
        })
        await expect(pageExtend.extendInfo).toBe("v2_060000231003b20faec8c6e48118c3d1ca05e933b0778d8942e832097e41c28af96c7a4a3282@finder");
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