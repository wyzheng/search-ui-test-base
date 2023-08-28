import {
  getHeightOfEle,
  getLeftOfEle,
  getLineNum,
  getOCRRes, getRightOfEle, getSimilarity,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser} from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { channelAccountClass, tabClass } from "../../lib/utils/resultMap";
import fs from "fs";
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
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证混排页召回微信广告助手视频号`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_channelaccount.png"
        })
        await addAttach({attach: image, description: "页面截图"});
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

  //@description:query = 微信广告助手，验证视频号账号截图相似度大于0.9
  test("testChannelAccountDiff", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 检查混排页的视频号账号截图相似度大于0.9`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(channelAccountClass.box);
        let imgPath =  basedir + "./static/pic/test_channelaccountstyle.png"
        const image = await ele.screenshot({
          path: imgPath
        })
        await addAttach({attach: image, description: "box截图"});
        let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_channelaccountstyle.png')
        await expect(0.9).toBeLessThan(Number(diffPercent))
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
    fs.copyFileSync(`./static/pic/test_channelaccountstyle.png`, `./static/pic_diff/test_channelaccountstyle.png`);
  },50000);

  //@description:query = 微信广告助手，验证视频号账号标题为“微信广告助手-视频号”
  test("testChannelAccountBoxTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证视频号账号标题为“微信广告助手-视频号”`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.box)
        let ele = await page.$(channelAccountClass.box)
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelaccounttitle.png"
        })
        await addAttach({attach: image, description: "视频号账号标题"});
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.title + " >em");
          return item.innerHTML;
        }, channelAccountClass);
        await expect(content).toBe("微信广告助手");
        let ocrres = await getOCRRes( basedir + "./static/pic/test_channelaccounttitle.png")
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

  //@description:query = 微信广告助手，验证视频号账号名称不超过两行
  test("testChannelAccountTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 检查视频号账号名称不超过两行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountTitle);
        let ele = await page.$(channelAccountClass.accountTitle);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelaccounttitlec.png"
        })
        await addAttach({attach: image, description: "视频号账号名称"});
        let linNum = await getLineNum( basedir + "./static/pic/test_channelaccounttitlec.png");
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

  //@description:query = 微信广告助手，验证视频号账号描述不超过两行
  test("testChannelAccountDesc", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证视频号账号描述不超过两行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountDesc);
        let ele = await page.$(channelAccountClass.accountDesc);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_ChannelAccountDesc.png"
        })
        await addAttach({attach: image, description: "公众号账号描述"});
        let linNum = await getLineNum( basedir + "./static/pic/test_ChannelAccountDesc.png");
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

  //@description:query = 微信广告助手，验证视频号描述、标题、来源是否左对齐
  test("testChannelAccountInfoStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证视频号描述、标题、来源是否左对齐,box大小是否正常`
    });
    let num = 3;
    while (num != 0) {
      try {
        let left1 = await getLeftOfEle(page, channelAccountClass.accountDesc);
        let left2 = await getLeftOfEle(page, channelAccountClass.accountTitle);
        let left3 = await getLeftOfEle(page, channelAccountClass.accountSource);


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

  //@description:query = 微信广告助手，验证视频号账号box左右两侧与搜索结果页左右两侧间距为8px
    test("testChannelAccountBoxStyle", async () => {
      await addMsg({
        context: undefined,
        message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证视频号账号,box大小是否正常`
      });
        let num = 3;
        while (num != 0) {
            try {
                let left_bound = await getLeftOfEle(page, 'div.search_data');
                let boxleft_bound = await getLeftOfEle(page, channelAccountClass.box);
                let right_bound = await getRightOfEle(page, 'div.search_data');
                let boxright_bound = await getRightOfEle(page, channelAccountClass.box);
                expect(boxleft_bound - left_bound).toBe(8);
                expect(right_bound - boxright_bound).toBe(8);
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
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,发起搜索\n  2. 验证带认证的视频号展示信息小于4行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.accountInfo);
        let ele = await page.$(channelAccountClass.accountInfo);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelaccountinfo1.png"
        })
        await addAttach({attach: image, description: "带认证的视频号信息"});
        let linNum = await getLineNum( basedir + "./static/pic/test_channelaccountinfo1.png");
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

  //@description:query = 微信视频号，点击更多，验证跳转到视频号tab
  test("testChannelAccountBoxMore", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信视频号,发起搜索\n  2. 验证视频号账号更多点击切到视频号tab`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("微信视频号");
        await page.waitForSelector(channelAccountClass.more);
        await page.click(channelAccountClass.more);
        let ele = await page.$('div.search_result div.unit__outer div.unit__wrap div.selected');
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelaccountmore1.png"
        })
        await addAttach({attach: image, description: "垂搜截图"});
        let content = await getOCRRes(`./static/pic/test_channelaccountmore.png`)
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

  //@description:query = 微信广告助手，点击视频号账号box，验证视频号账号落地页账号为"v2_060000231003b20faec8cae28f1cc1d1cf03e435b077c150c1b4e9f8a1b3e3be8df4eb537b44@finder"
  test("testChannelAccountClickInfo", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,点击视频号账号box\n  2. 验证视频号账号落地页信息与搜索页一致`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelAccountClass.box);
        await page.click(channelAccountClass.box);
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_channelAccountclick.png"
        })
        await addAttach({attach: image, description: "视频号账号截图"});
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

  //@description:query = 微信广告助手，验证视频号账号企业标志为蓝色
  test("testChannelAccountTag", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=微信广告助手,点击视频号账号box\n  2. 验证视频号账号带蓝色企业标志`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.waitForSelector(channelAccountClass.tag);
        await expect(page).toHaveElement(channelAccountClass.tag);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_channelaccounttag.png"
        })
        await addAttach({attach: image, description: "企业标截图"});
        let tag = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.tag);
          let color = getComputedStyle(item, "style").backgroundImage;
          return tag;
        }, channelAccountClass);
        expect(tag).toBe("url(\"https://dldir1v6.qq.com/weixin/checkresupdate/icons_filled_channels_authentication_enterprise_a2658032368245639e666fb11533a600.png\")")
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 磐石圣经，验证混排不出视频号账号（禁搜逻辑）
  test("testNoChannelAccountRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=磐石圣经，\n  2. 验证混排页不召回视频号账号`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("磐石圣经");
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_nochannelaccount.png"
        })
        await addAttach({attach: image, description: "页面截图"});
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

    //@description:query = 磐石圣经，验证混排不出视频号账号（禁搜逻辑）
  test("testNotChannelAccount", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=磐石圣经，\n  2. 验证混排页不召回视频号账号`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_nochannelaccount.png"
        })
        await addAttach({attach: image, description: "页面截图"});
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