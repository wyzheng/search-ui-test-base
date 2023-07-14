import {
    getLineNum,
    getOCRRes,
} from "../../lib/utils/helper";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {bizWeAppsList, HPFcardClass, HPFcardList} from "../../lib/utils/resultMap";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;


describe("testHPFcard#公积金大卡组件测试", () => {

    beforeAll(async () => {
        pageExtend = await setup("公积金", 20, 3192443972, false);
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

    /**@authoredBy:miyawei**/
    test("testHPFcardRecall#query=公积金，验证混排页召回公积金大卡", async () => {
        /* await addMsg({
           context: undefined,
           message: ` 测试步骤：\n  1. 输入搜索query=果壳,发起搜索\n  2. 检查混排页是否召回公众号box`
         });*/
        let num = 3;
        while (num != 0) {
            try {
                const image = await page.screenshot({
                    path: "./static/pic/test_testHPFcard.png"
                })
                // await addAttach({attach: image, description: "页面截图"});
                await expect(page).toHaveElement(HPFcardList(1, 0, 0).title);
                break;
            } catch (e) {
                if (num == 1) {
                    if (e.constructor.name == "JestAssertionError") {
                        fail++;
                    } else {
                        err++;
                        await addMsg({
                            context: undefined,
                            message: `测试任务出错...`
                        });
                    }
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    /**@authoredBy:miyawei**/
    test("testHPFcardRecall#query=公积金，验证poi是否正确", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查公积金box内是否有poi信息`
        });
        let num = 3;
        while (num != 0) {
            try {
                await page.waitForSelector(HPFcardList(1, 0, 0).poi)
                let ele = await page.$(HPFcardList(1, 0, 0).poi)
                const image = await page.screenshot({
                    path: "./static/pic/test_testHPFcard.png"
                })
                await addAttach({attach: image, description: "公众号账号标题"});
                let linNum = await getLineNum("./static/pic/test_testbiztitlec.png");
                expect(linNum).toBeLessThanOrEqual(2);
                break;
            } catch (e) {
                if (num == 1) {
                    if (e.constructor.name == "JestAssertionError") {
                        fail++;
                    } else {
                        err++;
                        await addMsg({
                            context: undefined,
                            message: `测试任务出错...`
                        });
                    }
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    /**@authoredBy:miyawei**/
    test("testHPFcardRecall#query=公积金，验证poi是否正确", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查公积金box内是否有poi信息`
        });
        let num = 3;
        while (num != 0) {
            try {
                await page.waitForSelector(HPFcardList(1, 0, 0).poi)
                let ele = await page.$(HPFcardList(1, 0, 0).poi)
                const image = await page.screenshot({
                    path: "./static/pic/test_testHPFcard.png"
                })
                await addAttach({attach: image, description: "公积金大卡位置信息"});
                let linNum = await getLineNum("./static/pic/test_testHPFpoi.png");
                expect(linNum).toBeLessThanOrEqual(2);
                break;
            } catch (e) {
                if (num == 1) {
                    if (e.constructor.name == "JestAssertionError") {
                        fail++;
                    } else {
                        err++;
                        await addMsg({
                            context: undefined,
                            message: `测试任务出错...`
                        });
                    }
                    throw e;
                }
                num--;
            }
        }
    }, 50000);
})