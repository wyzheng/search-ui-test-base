import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { HospitalCardClass } from "../../lib/utils/resultMap";
import {getLineNum, getOCRRes, getSimilarity} from "../../lib/utils/tools";
import * as url from "url";
const fs = require('fs');

let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:医院大卡测试
describe("testHospitalCard", () => {
    beforeAll(async () => {
        pageExtend = await setup("广东省第二人民医院", 20, 3192443972, false);
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

    //@description:query = 广东省第二人民医院，验证混排页召回医院大卡
    test("testHospitalCard", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 检查混排页是否召回医院大卡`
        });
        let num = 3;
        while (num != 0) {
            try {
                const image = await page.screenshot({
                    path:  basedir + "./static/pic/test_testHPFcard.png"
                });
                await addAttach({attach: image, description: "页面截图"});
                await expect(page).toHaveElement(HospitalCardClass.box);
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡头部背景图
    test("testHospitalCardTitleBg", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 检查医院大卡头部背景图是否正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.head_bg);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardTitleBg.png"
                });
                await addAttach({attach: image, description: "头部背景截图"});
                const backgroundImageUrl = await page.evaluate((element) => {
                    const style = window.getComputedStyle(element);
                    return style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
                }, ele);
                await expect(backgroundImageUrl).toBe("https://res.wx.qq.com/t/fed_upload/b7d892fb-a6e2-40ac-8747-a39f42e017f2/hospital.png");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡头部医院标题为”广东省第二人民医院“，并且飘绿
    test("testHospitalCardTitle", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 验证医院大卡头部医院标题为”广东省第二人民医院“，并且飘绿`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.title);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardTitle.png"
                });
                await addAttach({attach: image, description: "头部医院标题截图"});
                let text = await getOCRRes(basedir + "./static/pic/test_HospitalcardTitle.png");
                await expect(text.comm_res.items[0].text).toBe("广东省第二人民医院");
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