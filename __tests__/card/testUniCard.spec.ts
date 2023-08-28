import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {UinCardClass, searchRes, HPFCardClass, wxAdClass} from "../../lib/utils/resultMap";
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
//@description:高校大卡测试
describe("testUnicard", () => {
    beforeAll(async () => {
        pageExtend = await setup("北京邮电大学", 20, 3192443972, false);
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

    //@description:q=北京邮电大学，验证公高校大卡是否召回且在首位
    test("testUnicardRecall", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=北京邮电大学,发起搜索\n  2. 检查垂搜页是否召回高校box`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("北京邮电大学");
                let firstbox = await page.$(searchRes.first_box);
                let ele = await page.$(UinCardClass.box);
                let image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_unibox.png"
                })
                await addAttach({ attach: image, description: "高校大卡截图" });
                let firstboxText = await page.evaluate((el) => {
                    return el.innerHTML;
                }, firstbox);
                let eleText = await page.evaluate((el) => {
                    return el.innerHTML;
                }, ele);
                await expect(firstboxText).toBe(eleText);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=北京邮电大学，验证高校大卡截图相似度大于0.9
    test("testUnicard001Style", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=北京邮电大学,发起搜索\n  2. 验证高校大卡样式正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(UinCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testUniCard001.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "北京邮电大学大卡截图"});
                try {
                    await fs.statSync('./static/pic_diff/test_testUniCard001.png')
                } catch (e) {
                    fs.copyFileSync(imgPath, `./static/pic_diff/test_testUniCard001.png`);
                }
                let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testUniCard001.png');
                await expect(0.9).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(`./static/pic/test_testUniCard001.png`, `./static/pic_diff/test_testUniCard001.png`);
    }, 50000);

    //@description:q=清华大学，验证高校大卡截图相似度大于0.9
    test("testUnicard002Style", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=清华大学,发起搜索\n  2. 验证高校大卡样式正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(UinCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testUniCard002.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "清华大学大卡截图"});
                try {
                    await fs.statSync('./static/pic_diff/test_testUniCard002.png')
                } catch (e) {
                    fs.copyFileSync(imgPath, `./static/pic_diff/test_testUniCard002.png`);
                }
                let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testUniCard002.png');
                await expect(0.99).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(`./static/pic/test_testUniCard002.png`, `./static/pic_diff/test_testUniCard002.png`);
    }, 50000);

    //@description:q=石河子大学，验证高校大卡样式正确
    test("testUnicard003Style", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=石河子大学,发起搜索\n  2. 验证高校大卡样式正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(UinCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testUniCard003.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "石河子大学大卡截图"});
                try {
                    await fs.statSync('./static/pic_diff/test_testUniCard003.png')
                } catch (e) {
                    fs.copyFileSync(imgPath, `./static/pic_diff/test_testUniCard003.png`);
                }
                let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testUniCard003.png');
                await expect(0.99).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(`./static/pic/test_testUniCard003.png`, `./static/pic_diff/test_testUniCard003.png`);
    }, 50000);

    //@description:q=广东科学技术职业学院，验证高校大卡样式正确
    test("testUnicard004Style", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东科学技术职业学院,发起搜索\n  2. 验证高校大卡样式正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(UinCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testUniCard004.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "广东科学技术职业学院大卡截图"});
                try {
                    await fs.statSync('./static/pic_diff/test_testUniCard004.png')
                } catch (e) {
                    fs.copyFileSync(imgPath, `./static/pic_diff/test_testUniCard004.png`);
                }
                let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testUniCard004.png');
                await expect(0.99).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(`./static/pic/test_testUniCard004.png`, `./static/pic_diff/test_testUniCard004.png`);
    }, 50000);

    //@description:q=北京邮电大学，验证高校大卡更多官方账号点击跳转落地页有公众号\小程序\视频号
    test("testUnicardMoreAccountClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=北京邮电大学,发起搜索\n  2. 点击高校大卡更多官方账号\n  3. 验证跳转落地页有公众号\\小程序\\视频号`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(UinCardClass.more);
                await page.click(UinCardClass.more);
                let page_more = await pageExtend.click("outer");
                let imgPath =  basedir + "./static/pic/test_testUniMore.png";
                const image = await page_more.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "北京邮电大学大卡更多官方账号截图"});
                let account_title = await page_more.$$("div.content_box_title");
                let title_list = [];
                for (let title of account_title) {
                    let text = await title.evaluate(ele => {
                        return ele.innerHTML.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("")
                    });
                    title_list.push(text);
                };
                if (title_list.length == 1) {
                    let options = ['公众号', '小程序', '视频号'];
                    expect(options.includes(title_list[0])).toBe(true);
                }
                if (title_list.length == 2) {
                    await expect(title_list[0]).toBe("公众号");
                    await expect(title_list[1]).toBe("小程序");
                }
                if (title_list.length == 3) {
                    await expect(title_list[0]).toBe("公众号");
                    await expect(title_list[1]).toBe("小程序");
                    await expect(title_list[2]).toBe("视频号");
                }
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=北京邮电大学，验证高校大卡更多官方账号点击跳转落地页内容与北京邮电大学相关(icon检查)
    test("testUnicardMoreAccountIcon", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=北京邮电大学,发起搜索\n  2. 点击高校大卡更多官方账号\n  3. 验证跳转落地页内容与北京邮电大学相关（icon为北京邮电大学）`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(UinCardClass.more);
                await page.click(UinCardClass.more);
                let page2 = await pageExtend.click("outer");
                const accountItems = `div.wrap div.item`;
                const image = await page2.screenshot({
                    path:  basedir + "./static/pic/test_UnicardMoreH5.png"
                })
                await addAttach({attach: image, description: "更多账号原生页截图"});
                let content = await getOCRRes( basedir + "./static/pic/test_UnicardMoreH5.png");
                let text_list = [];
                let options = ['北邮', '北京邮电大学'];
                for (let item of content.ocr_comm_res.items) {
                    if (item.text.includes(options[0]) || item.text.includes(options[1])) {
                        text_list.push(item.text);
                    }
                }
                expect(text_list.length > 0).toBe(true);
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
