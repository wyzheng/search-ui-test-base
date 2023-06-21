import {setup} from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import {PageExtend} from "../../lib/search-page/page-extend";
import {
  getLeftOfEle,
  getLineNum,
  getOCRRes,
  getSizeOfEle,
  channelOperation, getBottomHeightOfEle, getTopHeightOfEle, getRightOfEle, getDiff, getSimilarity
} from "../../lib/utils/tools";
import {articleClass, bizWeAppsList, channelClass} from "../../lib/utils/resultMap";
import {addAttach, addMsg} from "jest-html-reporters/helper";
import exp from "constants";
import fs from "fs";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:miyawei
//@description:视频号动态组件测试
describe("testChannel", () => {

  beforeAll(async () => {
    pageExtend = await setup("李子柒", 20, 3191396391, false);
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

  //@description:query = 李子柒，验证各个入口页召回视频号
  test("testChannelRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,在各个入口发起搜索\n  2. 检查混排页是否召回视频号动态box`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_channelrecall.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(channelClass.channel);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },5000000);

  //@description:query = 李子柒，验证样式正确
  test("testChannelDiff", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查混排页的视频号动态样式和上个模板一致`
    });
    let num = 3;
    while (num != 0) {
      try {
        let channelBoxEle = await page.$(channelClass.boxBound);
        let imgPath = "./static/pic/test_channelstyle.png"
        const image = await channelBoxEle.screenshot({
          path: imgPath
        })
        await addAttach({attach: image, description: "box截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_channelstyle.png')
        await expect(0.9).toBeLessThan(Number(diffPercent))
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_channelstyle.png`, `./static/pic_diff/test_channelstyle.png`);
  },50000);

  //@description:query = 李子柒，验证视频号动态高亮
  test("testChannelBoxHighlight", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查检查文章高亮`
    });
    let num = 3;
    while (num != 0) {
      try {
        let channelEle = await page.$(channelClass.boxLeft);
        let highlightEle = await page.$$(channelClass.highlight);
        const matchingElements = await Promise.all(
          highlightEle.map(async (el) => await el.evaluate((el) => el.outerHTML))
        );
        const notMatchingElements = await channelEle.evaluate((el) =>
          el.outerHTML.replace(/<em class="highlight">.*?<\/em>/g, ''));
        const querySet = new Set("李子柒".split(''));
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

  //@description:query = 李子柒，验证左右box上下左右高度对齐
  test("testChannelStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 验证左右box上下左右高度对齐`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        let eleLeft = await page.$(channelClass.boxLeft);
        await page.waitForSelector(channelClass.boxRight);
        let eleRight = await page.$(channelClass.boxRight);
        let Height1 = await getTopHeightOfEle(page, channelClass.boxLeft);
        let Height2 = await getTopHeightOfEle(page, channelClass.boxRight);
        let Bottom1 = await getBottomHeightOfEle(page, channelClass.boxLeft);
        let Bottom2 = await getBottomHeightOfEle(page, channelClass.boxRight);
        let left1 = await getLeftOfEle(page, 'div.search_result')
        let right1 = await getRightOfEle(page, 'div.search_result')
        let left2 = await getLeftOfEle(page, channelClass.boxLeft)
        let right2 = await getRightOfEle(page, channelClass.boxRight)
        expect(Height1).toBe(Height2);
        expect(Bottom1).toBe(Bottom2);
        expect(left2 - left1).toBe(right1 - right2)
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证无点赞信息的情况下视频号描述不超过2行
  test("testChannelDescWithoutAvatar", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查视频号描述信息不超过2行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.descLeft);
        let ele = await page.$(channelClass.descLeft);
        const image = await ele.screenshot({
          path: "./static/pic/test_channeldesc1.png"
        })
        await addAttach({attach: image, description: "无点赞描述截图"});
        let linNum = await getLineNum("./static/pic/test_channeldesc1.png");
        expect(linNum).toBeLessThanOrEqual(2);
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证有点赞信息的情况下视频号描述不超过1行
  test("testChannelDescWithAvatar", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查视频号描述信息不超过1行`
    });
    let num = 3;
    while (num != 0) {
      try {
        //调用接口点赞该视频号动态
        await channelOperation("cutebot111", 3, 13852287066425727020);
        await page.waitForSelector(channelClass.descRight);
        let ele = await page.$(channelClass.descRight);
        const image = await ele.screenshot({
          path: "./static/pic/test_channeldesc2.png"
        })
        await addAttach({attach: image, description: "有点赞描述截图"});
        let linNum = await getLineNum("./static/pic/test_channeldesc2.png");
        //调用接口取消点赞该视频号动态
        channelOperation("cutebot111", 4, 13852287066425727020);
        expect(linNum).toBeLessThanOrEqual(1);
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，检查外显的点赞人数与实际点赞人数一致
  test("testChannelSocialInfo", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查外显的点赞人数与实际点赞人数一致`
    });
    let num = 3;
    while (num != 0) {
      try {
        //调用接口点赞该视频号动态
        channelOperation("cutebot111", 3, 13852287066425727020);
        channelOperation("miyawyzzzz", 3, 13852287066425727020);
        channelOperation("cutebot333", 3, 13852287066425727020);
        await page.waitForSelector(channelClass.socialInfo);
        let ele = await page.$(channelClass.socialInfo);
        const image = await ele.screenshot({
          path: "./static/pic/test_channelsocialinfo.png"
        })
        await addAttach({attach: image, description: "social信息截图"});
        let socialInfo = await getOCRRes("./static/pic/test_channelsocialinfo.png");
        let likeNum = parseInt(socialInfo["ocr_comm_res"]["items"][0]["text"].match(/\d+/g));
        expect(likeNum).toBe(3);
        break;
      } catch (e) {
        if (num == 1) {
           throw e;
          }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证视频号动态点击
  test("testChannelClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态，验证是否跳转到视频号动态落地页`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        await page.click(channelClass.boxLeft);
        const image = await page.screenshot({
          path: "./static/pic/test_channellick.png"
        })
        await addAttach({attach: image, description: "落地页截图"});
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证视频号动态点击中的播放按钮点击
  test("testVideoPlayerClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态点击中的播放按钮点击，验证是否跳转到视频号feed页`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.playerIcon);
        await page.click(channelClass.playerIcon);
        const image = await page.screenshot({
          path: "./static/pic/test_channelplayerlick.png"
        })
        await addAttach({attach: image, description: "落地页截图"});
        expect(pageExtend.extendInfo).toBe("14078879530265676091");
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  // //@description:query = 李子柒，验证视频号动态点击中的静音按钮点击
  // test("testVideoMuteClick", async () => {
  //   // await addMsg({
  //   //   context: undefined,
  //   //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态点击中的静音按钮点击，验证是否跳转到视频号feed页`
  //   // });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       await page.waitForSelector(channelClass.muteIcon);
  //       await page.click(channelClass.muteIcon);
  //       await expect(page).toHaveElement(channelClass.unmuteIcon);
  //       await page.waitForSelector(channelClass.unmuteIcon);
  //       await page.click(channelClass.unmuteIcon);
  //       await expect(page).toHaveElement(channelClass.muteIcon);
  //       break;
  //     } catch (e) {
  //        if (num == 1) {
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);

  //@description:query = 李子柒，点击视频号动态，验证跳转落地页的docid与点击的一致
  test("testChannelId", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态，验证视频号动态落地页feedid`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        await page.click(channelClass.boxLeft);
        const image = await page.screenshot({
          path: "./static/pic/test_channelid.png"
        })
        await addAttach({attach: image, description: "动态落地页截图"});
        await expect(pageExtend.extendInfo).toBe("14078879530265676091")
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，点击视频号动态，在跳转落地页点赞，点赞信息会出现在搜索页
  test("testChannelLike", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态，在落地页点赞，验证点赞信息会出现在搜索页`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        await page.click(channelClass.boxLeft);
        // 调用接口点赞左边视频号: feedid=14078879530265676091
        channelOperation("cutebot111", 3, 14078879530265676091);
        await pageExtend.change("李子柒");
        expect(page).toHaveElement(`div.mixed-box__bd > div:nth-child(1) div.rich-media__info div.rich-media__social-info__title`);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    //调用接口取消点赞
    channelOperation("cutebot111", 4, 14078879530265676091);
  },50000);

  test("> 测试结果汇总", async () => {
    num = num - 1;
    pass = num - fail - err;
    resArr = [num, pass, fail, err];
    await addMsg({context: undefined, message: `当前测试集合共有${num}条用例，其中测试通过${pass}条，测试失败${fail}条，测试任务失败${err}条`});
  }, 5000);

})