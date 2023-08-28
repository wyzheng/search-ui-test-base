import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {
    HospitalCardClass,
    HospitalServiceCardClass,
    HPFCardClass, searchRes,
    WidgetClass,
    wxAdClass
} from "../../lib/utils/resultMap";
import {getLineNum, getOCRRes, getSimilarity} from "../../lib/utils/tools";
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
//@description:widget测试
describe("testWidget", () => {
    beforeAll(async () => {
        pageExtend = await setup("微信客服", 20, 3192443972, false);
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

    //@description:query = 微信客服，验证混排页召回widget组件
    test("testWidget25Recall", async () => {
        await addMsg({
           context: undefined,
           message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 验证混排页召回widget组件`
           });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.box);
                let image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_widget25.png"
                });
                await addAttach({ attach: image, description: "客服查询widget截图" });
                await expect(page).toHaveElement(WidgetClass.box);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证widget标题为”客服查询服务“
    test("testWidget25Title", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 检查客服查询widget标题是否为”客服查询服务“`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.title);
                let image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_widget25Title.png"
                });
                await addAttach({ attach: image, description: "客服查询widget标题截图" });
                let title = await page.evaluate((el) => {
                    let ele = document.querySelector(el);
                    return ele.textContent;
                }, WidgetClass.title);
                await expect(title).toBe("客服查询服务");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证widget截图相似度大于0.9
    test("testWidget25Diff", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 检查widget截图相似度大于0.9`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.box);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_widget25Diff.png"
                });
                await addAttach({attach: image, description: "widget截图"});
                try {
                    await fs.statSync( basedir + './static/pic_diff/test_widget25Diff.png')
                } catch (e) {
                    fs.copyFileSync(basedir + "./static/pic/test_widget25Diff.png",  basedir + `./static/pic_diff/test_widget25Diff.png`);
                }
                let diffPercent = await getSimilarity(basedir + "./static/pic/test_widget25Diff.png", basedir + './static/pic_diff/test_widget25Diff.png');
                await expect(Number(diffPercent)).toBeGreaterThan(0.9);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(basedir + "./static/pic/test_widget25Diff.png", basedir + "./static/pic_diff/test_widget25Diff.png");
    }, 50000);

    //@description:query = 微信客服，验证客服查询widget点击标题跳转到公众号"gh_899112ea5fe7@app"
    test("testWidget25TitleClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 点击客服查询widget标题\n  3. 检查跳转到微信客服公众号"gh_899112ea5fe7@app"`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.title);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_widget25Title.png"
                });
                await addAttach({attach: image, description: "widget标题截图"});
                await ele.click();
                await expect(pageExtend.extendInfo).toBe("gh_899112ea5fe7@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证widget主体点击跳转到小程序"gh_899112ea5fe7@app"
    test("testWidget25ContentClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 点击客服查询widget主体任意一个电话\n  3. 检查跳转是否正常`
        });
        let num = 3;
        while (num) {
            try {
                let item = await page.waitForSelector(WidgetClass.item);
                const image = await item.screenshot({
                    path:  basedir + "./static/pic/test_widget25Body.png"
                });
                await addAttach({attach: image, description: "widget主体截图"});
                await item.click();
                await expect(pageExtend.extendInfo).toBe("gh_899112ea5fe7@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证widget的“呼叫”按钮点击之后拉起号码弹窗
    test("testWidget25TelClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 点击客服查询widget呼叫按钮\n  3. 检查是否拉起弹窗`
        });
        let num = 3;
        while (num) {
            try {
                let item = await page.waitForSelector(WidgetClass.button);
                const image = await item.screenshot({
                    path:  basedir + "./static/pic/test_widget25Button.png"
                });
                await addAttach({attach: image, description: "widget按钮截图"});
                await item.click();
                await expect(page).toHaveElement(searchRes.alert_dialog);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证widget来源点击拉起弹窗
    test("testWidget25SourceClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 点击客服查询widget内容底部来源\n  3. 检查是否拉起多来源弹窗`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.source);
                await ele.click();
                await expect(page).toHaveElement(searchRes.half_dialog);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 微信客服，验证客服查询widget点击内容底部来源弹窗中的来源切换正常
    test("testWidget25SourceSwitch", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=微信客服,发起搜索\n  2. 点击客服查询widget内容底部来源\n  3. 点击来源弹窗中的来源切换\n  4. 检查切换是否正常`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(WidgetClass.source);
                await ele.click();
                let items = await page.$$(WidgetClass.sourceItem);
                for (let item of items) {
                    await item.click();
                    await expect(page).toHaveElement(searchRes.half_dialog);
                };
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //
});