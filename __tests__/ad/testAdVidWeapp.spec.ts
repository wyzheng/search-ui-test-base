import {setup} from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import {PageExtend} from "../../lib/search-page/page-extend";
import { adAccountClass, adActivityClass, wxAdClass } from "../../lib/utils/resultMap";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { bizOperation, getHeightOfEle, superView } from "../../lib/utils/tools";

let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;

let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:joycesong
//@description:微信品专广告
describe("testAdVidWeapp", () => {

  beforeAll(async () => {
    await superView(6404915207, "wxid_6050kgxzcly712");
    pageExtend = await setup("wxadtestVidWeapp", 20, 3194254118, true);
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

  //@description:q=wxadtestVidWeapp，验证混排结果页品专广告是否召回
  test("testAdRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 检查混排页是否召回品专广告`
    });
    let num = 3;
    while(num != 0){
      try  {
        if (num != 3){
          await page.waitForTimeout(7000);
          await pageExtend.change("wxadtestVidWeapp")
        }
        const image =  await page.screenshot({
          path:  basedir + "./static/pic/test_VidWeapp.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement("div.ui-zone-ad");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },70000);

  //@description:点击广告头部，验证是否正确跳转到"唯品会特卖"小程序
  test("testAdHead", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击品专广告头部区域，检查跳转目标为\"唯品会特卖\"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.waitForSelector(wxAdClass.head);
        let ele =  await page.$(wxAdClass.head);
        let path = basedir + './static/pic/ad_head.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "广告头部截图"});
        await page.click(wxAdClass.head);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_8ed2afad9972@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:验证"进入小程序"外链文案是否正确；点击外链，验证是否正确跳转到"唯品会特卖"小程序
  test("testAdLinkWeapp", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 检查广告头部展示"进入小程序"外链\n  3. 点击"进入小程序"，检查跳转目标为\"唯品会特卖\"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.extent);
        let ele =  await page.$(wxAdClass.extent);
        let path = basedir + './static/pic/ad_extent.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "外链截图"});

        let content = await page.evaluate(async (eleClass)  => {
          return document.querySelector(eleClass.extent_content).innerHTML;
        }, wxAdClass);
        expect(content).toBe("进入小程序");

        await page.click(wxAdClass.extent);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_8ed2afad9972@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:验证广告反馈图标、弹窗展示正常，点击广告图标，验证是否正确跳转到广告投诉落地页
  test("testAdFeedback", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 检查广告头部展示"广告"反馈图标\n  3. 点击"广告"图标，展示"投诉广告"弹窗 \n  4. 点击"投诉广告"，跳转到广告投诉落地页\n  5. 再次点击"广告"反馈图标，收起"投诉广告"弹窗`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        //广告按钮
        await page.waitForSelector(wxAdClass.feedback);
        let ele =  await page.$(wxAdClass.feedback);
        let path = basedir + './static/pic/ad_feedback.png';
        let image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "广告反馈按钮"});
        await page.click(wxAdClass.feedback);

        //投诉广告按钮
        await page.waitForTimeout(700);
        await page.waitForSelector(wxAdClass.complaint);
        ele =  await page.$(wxAdClass.complaint);
        path = basedir + './static/pic/ad_complaint.png';
        image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "投诉弹窗"});
        await page.click(wxAdClass.complaint);
        await page.waitForTimeout(1000);
        let page2 = await pageExtend.click("outer");
        const screenshotBuffer = await page2.screenshot({
          path:  basedir + "./static/pic/test_feedback.png",
          fullPage: true
        })
        await addAttach({attach: screenshotBuffer, description: "广告反馈页面截图"});

        await page.bringToFront();
        //再次点击收起投诉广告按钮
        await page.click(wxAdClass.feedback);
        await page.waitForTimeout(1000);
        let display =  await page.evaluate((className) => {
          let item = document.querySelector(className.feedback_mask);
          return getComputedStyle(item).display;
        }, wxAdClass)
        expect(display).toBe("none");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:验证广告名称为"快乐测试123"，验证"官方"标签是否正常显示
  test("testAdName", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 查看广告名称为"快乐测试123"\n  3. 广告名称后展示"官方"标签，两者一行展示`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.title);
          let color = getComputedStyle(item).color;
          let inner = item.innerHTML;
          let tagTitle = document.querySelector(eleClass.tagContent).innerHTML;
          return  [color, inner, tagTitle];
        }, wxAdClass);
        expect(content[1].split("<em>")[0]).toBe("快乐测试123");
        expect(page).toHaveElement(wxAdClass.tagContent)
        expect(content[2]).toBe("官方");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击广告名称，验证是否正确跳转到"快乐测试123"公众号
  test("testAdNameClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击广告名称区域，检查跳转目标为"快乐测试123"公众号`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.headTitle);
        let ele =  await page.$(wxAdClass.headTitle);
        let path = basedir + './static/pic/ad_title.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "广告头部截图"});
        await page.click(wxAdClass.headTitle);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_1e80bb81a1d2");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击门店地址按钮，验证是否正确跳转到百度首页
  test("testAdLocation", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击测试门店地址按钮，检查跳转目标为H5外链（百度首页）`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.loc);
        let ele =  await page.$(wxAdClass.loc);
        let path = basedir + './static/pic/ad_loc.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "地址按钮"});
        await page.click(wxAdClass.loc);
        await page.waitForTimeout(700);
        let page2 = await pageExtend.click("outer");
        const screenshotBuffer = await page2.screenshot({
          path:  basedir + "./static/pic/test_baidu.png",
          fullPage: true
        })
        await addAttach({attach: screenshotBuffer, description: "跳转页面截图"});
        expect(await page2.title()).toBe("百度一下");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击在线客服按钮，验证跳转链接配置是否正确
  test("testAdService", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击在线客服按钮，检查跳转url正确`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.helper);
        let ele =  await page.$(wxAdClass.helper);
        let path = basedir + './static/pic/ad_helper.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "here is the ad head."});
        await page.click(wxAdClass.helper);
        await page.waitForTimeout(700);
        expect(pageExtend.url).toBe("https://work.weixin.qq.com/kfid/kfc7f0d8acb45de1b0a");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击联系电话按钮，验证是否正确展示弹窗及对应联系电话
  test("testAdPhone", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击联系电话按钮，显示联系电话弹窗\n  3. 检查联系电话为："17000001688"\n  4. 点击联系电话呼叫按钮，检查当前呼叫电话正确`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.phone);
        let ele = await page.$(wxAdClass.phone);
        await page.click(wxAdClass.phone);
        await page.waitForTimeout(1000);
        let path = basedir + './static/pic/ad_phone.png';
        let image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "联系电话"});
        await page.waitForSelector(wxAdClass.half_dialog);
        ele = await page.$(wxAdClass.half_dialog);
        image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "联系电话弹窗"});
        let phoneArr = ["17000001688"];
        await page.waitForSelector(wxAdClass.number);
        let content = await page.evaluate(async (eleClass)  => {
          let items = document.querySelectorAll(eleClass.number);
          let number = [];
          for (let i = 0; i < items.length; i++) {
            number.push(items[i].innerHTML);
          }
          return number;
        }, wxAdClass);

        for (let i = 0; i < phoneArr.length; i++) {
          expect(content[i]).toBe(phoneArr[i]);
        }
        for (let i = 0; i < phoneArr.length; i++) {
          let selector = wxAdClass.call_button + `:nth-of-type(${i+1}) div.ui-half-screen-sheet-button-container a`;
          let path = basedir + './static/pic/ad_call.png';
          let ele = await page.$(selector);
          await ele.screenshot({path: path});
          await page.click(selector);
          await page.waitForTimeout(1000);
          expect(pageExtend.extendInfo).toBe(phoneArr[i]);
          if(i < phoneArr.length - 1){
            await page.click(wxAdClass.phone);
          }
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

  //@description:验证广告"门店地址"、"联系电话"、 "在线客服"按钮是否在一行展示
  test("testAdPhoneStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2.查看"门店地址"、"联系电话"、 "在线客服"按钮一行展示`
    });
    let num = 3;
    while(num != 0){
      try  {
        let loc_height =  await getHeightOfEle(page, wxAdClass.loc);
        let helper_height =  await getHeightOfEle(page, wxAdClass.helper);
        let phone_height =  await getHeightOfEle(page, wxAdClass.phone);
        expect(loc_height).toBeCloseTo(helper_height, 2);
        expect(helper_height).toBeCloseTo(phone_height, 2);
        expect(phone_height).toBeCloseTo(loc_height, 2);
        let ele =  await page.$$(wxAdClass.headTitle);
        let path = basedir + './static/pic/ad_title.png';
        const image =  await ele.at(1).screenshot({path: path});
        await addAttach({attach: image, description: "信息截图"});
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:验证广告公众号账号信息展示正确；点击账号，验证是否正确跳转到"快乐测试123"公众号
  test("testAdBizAccount", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 查看视频号账号信息，标题为"快乐测试123"，底部显示"公众号"\n  3. 点击公众号账号主体，检查跳转目标为"快乐测试123"视频号`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(wxAdClass.account);
        let ele =  await page.$(wxAdClass.account);
        let path = basedir + './static/pic/ad_account.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "账号截图"});

        let content = await page.evaluate(async (eleClass)  => {
          let title = document.querySelector(eleClass.account_title).innerHTML;
          let desc = document.querySelector(eleClass.account_desc).innerHTML;
          return  [title, desc];
        }, wxAdClass);
        expect(content[0]).toBe("快乐测试123");
        expect(content[1]).toBe("公众号");

        await page.click(wxAdClass.account);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_1e80bb81a1d2");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:关注公众号，验证公众号账号是否正常显示"已关注"标签
  test("testAdBizAccountFollow", async () => {
    //公众号关注
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2.关注公众号，刷新结果页，公众号账号显示"已关注"标签`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await bizOperation("AddBizContact", 3094043316, 3194254118);
        await page.waitForTimeout(1700);
        await page.click(wxAdClass.select_tab);
        await page.waitForTimeout(700);
        await page.click(wxAdClass.select_all);
        await page.waitForTimeout(1700);

        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass.account_tag);
          return item.innerHTML;
        },  wxAdClass);
        let ele =  await page.$(wxAdClass.account);
        let image =  await ele.screenshot({path: basedir + './static/pic/ad_gzh1.png'});
        await addAttach({attach: image, description: "公众号账号已关注截图"});
        await bizOperation("DelBizContact", 3094043316, 3194254118);
        expect(content).toBe("已关注");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:验证广告小程序账号信息展示正确；点击账号，验证是否正确跳转到"唯品会特卖"小程序
  test("testAdWeappAccount", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 查看视频号账号信息，标题为"唯品会特卖"，底部显示"小程序"\n  3. 点击视频号账号主体，检查跳转目标为\"唯品会特卖\"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        let className = adAccountClass(2).account;
        await page.waitForSelector( adAccountClass(2).account);
        let ele =  await page.$$(wxAdClass.account);
        let path = basedir + './static/pic/ad_weapp.png';
        const image =  await ele.at(1).screenshot({path: path});
        await addAttach({attach: image, description: "账号截图"});

        let content = await page.evaluate(async (eleClass)  => {
          let title = document.querySelector(eleClass.account_title).innerHTML;
          let desc = document.querySelector(eleClass.account_desc).innerHTML;
          return  [title, desc];
        }, adAccountClass(2));
        expect(content[0]).toBe("唯品会特卖");
        expect(content[1]).toBe("小程序");

        await page.click(className);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_8ed2afad9972@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动1，验证是否正确跳转到广告原生页
  test("testAdHotActivity1", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第3个活动，检查跳转目标为"唯品会特卖"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(1, 0).activity);
        await page.hover(adActivityClass(1, 0).activity);
        await page.waitForTimeout(700);
        let ele =  await page.$(adActivityClass(1, 0).activity);
        let path = basedir + './static/pic/ad_activity.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "活动"});

        await page.click(adActivityClass(1, 0).activity);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579612839");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动2，验证是否正确跳转到广告原生页
  test("testAdHotActivity2", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第3个活动，检查跳转目标为"苏宁拼购"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(2, 0).activity);
        await page.hover(adActivityClass(2, 0).activity);
        await page.waitForTimeout(700);
        let ele =  await page.$(adActivityClass(2, 0).activity);
        let path = basedir + './static/pic/ad_activity.png';
        const image =  await ele.screenshot({path: path});
        await addAttach({attach: image, description: "活动"});

        await page.click(adActivityClass(2, 0).activity);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579596950");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动3，验证是否正确跳转到百度首页
  test("testAdHotActivity3", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第3个活动，检查跳转目标为检查跳转目标为H5页面（百度首页）`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(3, 0).activity);
        await page.hover(adActivityClass(3, 0).activity);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(3, 0).activity);
        await page.waitForTimeout(700);
        let page2 = await pageExtend.click("outer");
        const screenshotBuffer = await page2.screenshot({
          path:  basedir + "./static/pic/test_baidu.png",
          fullPage: true
        })
        await addAttach({attach: screenshotBuffer, description: "跳转页面截图"});
        expect(await page2.title()).toBe("百度一下");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动3左侧菜单，验证是否正确跳转到广告原生页
  test("testAdHotActivity3LeftMenu", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第3个活动右侧菜单，检查跳转目标为广告原生页，校验cavansid`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(3, 1).activity_menus);
        await page.hover(adActivityClass(3, 1).activity_menus);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(3, 1).activity_menus);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579628705");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动3右侧菜单，验证是否正确跳转到"唯品会特卖"小程序
  test("testAdHotActivity3RightMenu", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第3个活动左侧菜单，检查跳转目标为"唯品会特卖"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(3, 2).activity_menus);
        await page.hover(adActivityClass(3, 2).activity_menus);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(3, 2).activity_menus);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_8ed2afad9972@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动4，验证是否正确跳转到广告原生页
  test("testAdHotActivity4", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第4个活动，检查跳转目标为广告原生页，校验cavansid`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(4, 0).activity);
        await page.hover(adActivityClass(4, 0).activity);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(4, 0).activity);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579628714");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动4左侧菜单，验证是否正确跳转到百度首页
  test("testAdHotActivity4LeftMenu", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第4个活动左侧菜单，检查跳转目标为H5页面（百度首页）`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(4, 1).activity_menus);
        await page.hover(adActivityClass(4, 1).activity_menus);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(4, 1).activity_menus);
        await page.waitForTimeout(700);
        let page2 = await pageExtend.click("outer");
        const screenshotBuffer = await page2.screenshot({
          path:  basedir + "./static/pic/test_baidu.png",
          fullPage: true
        })
        await addAttach({attach: screenshotBuffer, description: "跳转页面截图"});
        expect(await page2.title()).toBe("百度一下");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动4右侧菜单，验证是否正确跳转到"唯品会特卖"小程序
  test("testAdHotActivity4RightMenu", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第4个活动右侧菜单，检查跳转目标为"唯品会特卖"小程序`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(4, 2).activity_menus);
        await page.hover(adActivityClass(4, 2).activity_menus);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(4, 2).activity_menus);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("gh_8ed2afad9972@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动5，验证是否正确跳转到广告原生页
  test("testAdHotActivity5", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第5个活动，检查跳转目标为广告原生页，校验cavansid`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(5, 0).activity);
        await page.hover(adActivityClass(5, 0).activity);
        await page.waitForTimeout(700);

        await page.click(adActivityClass(5, 0).activity);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579628713");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:点击热门活动5行动按钮，验证是否正确跳转到广告原生页
  test("testAdHotActivity5Action", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=wxadtestVidWeapp,发起搜索\n  2. 点击热门活动第5个活动的行动按钮，检查跳转目标为广告原生页，校验cavansid`
    });
    let num = 3;
    while(num != 0){
      try  {
        await page.bringToFront();
        await page.waitForSelector(adActivityClass(5, 0).activity_button);
        await page.hover(adActivityClass(5, 0).activity_button);
        await page.waitForTimeout(700);

        let content = await page.evaluate(async (eleClass)  => {
          return document.querySelector(eleClass.activity_button + " div").innerHTML;
        }, adActivityClass(5, 0));
        expect(content.split("<!---->")[1]).toBe("立即购买");

        await page.click(adActivityClass(5, 0).activity_button);
        await page.waitForTimeout(700);
        expect(pageExtend.extendInfo).toBe("2579628713");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);


  test("测试结果汇总", async () => {
    num = num - 1;
    pass = num - fail - err;
    resArr = [num, pass, fail, err];
    await addMsg({context: undefined, message: `当前测试集合共有${num}条用例，其中测试通过${pass}条，测试失败${fail}条，测试任务失败${err}条`});
  }, 5000);

})