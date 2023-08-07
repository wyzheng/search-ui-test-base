import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {HPFCardClass, wxAdClass} from "../../lib/utils/resultMap";
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
//@description:公积金大卡测试
describe("testHPFcard", () => {

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

    //@description:query = 公积金，验证混排页召回公积金大卡
    test("testHPFcardRecall", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查混排页是否召回公积金box`
        });
        let num = 3;
        while (num != 0) {
            try {
                const image = await page.screenshot({
                    path:  basedir + "./static/pic/test_testHPFcard.png"
                })
                // await addAttach({attach: image, description: "页面截图"});
                await expect(page).toHaveElement(HPFCardClass.box);
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=公积金，验证公积金大卡样式正确
    test("testHPFcardDiff", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查公积金box样式是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(HPFCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testHPFdiff.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                //await addAttach({attach: image, description: "端午节截图"});
                let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_testHPFdiff.png');
                await expect(0.99).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(`./static/pic/test_testHPFdiff.png`, `./static/pic_diff/test_testHPFdiff.png`);
    }, 50000);

    //description:q=公积金，验证公积金大卡标题为公积金
    test("testHPFcardTitle", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查公积金大卡标题是否为公积金`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HPFCardClass.title);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_testHPFtitle.png"
                });
                //await addAttach({attach: image, description: "公积金大卡标题"});
                let title = await getOCRRes( basedir + "./static/pic/test_testHPFtitle.png");
                expect(title.ocr_comm_res.items[0].text).toBe("公积金");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=公积金，验证公积金大卡内是否有poi信息
    test("testHPFcardPoiDefault", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 检查公积金box内是否有poi信息`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HPFCardClass.poi);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_testHPFpoi.png"
                });
                //await addAttach({attach: image, description: "公积金大卡位置信息"});
                let poi = await getOCRRes( basedir + "./static/pic/test_testHPFpoi.png")
                expect(poi.ocr_comm_res.items[0].text).toBe("广东·广州");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=长沙公积金，验证公积金大卡内是否有poi信息是否为湖南长沙
    test("testHPFcardPoi", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=长沙公积金,发起搜索\n  2. 检查公积金box内是否有poi信息`
        // });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("长沙公积金");
                let ele = await page.waitForSelector(HPFCardClass.poi);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_testHPFpoi.png"
                });
                //await addAttach({attach: image, description: "公积金大卡位置信息"});
                let poi = await getOCRRes( basedir + "./static/pic/test_testHPFpoi.png");
                expect(poi.ocr_comm_res.items[0].text).toBe("湖南·长沙");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //description:q=公积金，验证公积金大卡副标题详细政策点击跳转正确
    test("testHPFcardSubTitleClick", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 点击公积金大卡副标题，检查跳转是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HPFCardClass.subtitle_link);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_testHPFsubTitleClick.png"
                });
                //await addAttach({attach: image, description: "公积金大卡副标题"});
                await page.click(HPFCardClass.subtitle_link);
                await expect(pageExtend.url).toBe("http://gjj.gz.gov.cn/bsfw/qtfw/");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=公积金，验证公积金大卡查询按钮跳转正确
    test("testHPFcardBtnQuery", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 点击公积金查询按钮，检查跳转是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele_query = await page.waitForSelector(HPFCardClass.btn_query);
                const image = await ele_query.screenshot({
                    path:  basedir + "./static/pic/test_testButton.png"
                });
                //await addAttach({attach: image, description: "公积金大卡按钮"});
                await page.click(HPFCardClass.btn_query);
                await expect(pageExtend.extendInfo).toBe("gh_1ac06b5a8f4e@app");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=公积金，验证公积金大卡提取按钮跳转正确
    test("testHPFcardBtnWithdraw", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 点击公积金提取按钮，检查跳转是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele_query = await page.waitForSelector(HPFCardClass.btn_withdraw);
                const image = await ele_query.screenshot({
                    path:  basedir + "./static/pic/test_testButton.png"
                });
                //await addAttach({attach: image, description: "公积金大卡按钮"});
                await page.click(HPFCardClass.btn_withdraw);
                await expect(pageExtend.url).toBe("https://ydd.gzgjj.gov.cn/#/pages/p4/extractRecord/index");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=公积金，验证公积金大卡贷款按钮跳转正确
    test("testHPFcardBtnLoan", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 点击公积金贷款按钮，检查跳转是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele_query = await page.waitForSelector(HPFCardClass.btn_loan);
                const image = await ele_query.screenshot({
                    path:  basedir + "./static/pic/test_testButton.png"
                });
                //await addAttach({attach: image, description: "公积金大卡按钮"});
                await page.click(HPFCardClass.btn_loan);
                await expect(pageExtend.url).toBe("https://ydd.gzgjj.gov.cn/#/pages/p5/loanApplicationStatus/index?&a&b&c");
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //description:q=公积金，验证公积金大卡缴存按钮跳转正确
    test("testHPFcardBtnDeposit", async () => {
        // await addMsg({
        //     context: undefined,
        //     message: ` 测试步骤：\n  1. 输入搜索query=公积金,发起搜索\n  2. 点击公积金缴存按钮，检查跳转是否正确`
        // });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(HPFCardClass.box);
                let elements = await ele.$$('body *'); // 获取页面上所有元素
                const text = "缴存";
                // let element = await page.evaluate(async (lis) => {
                //     if (document.querySelector(lis).innerHTML === text) {
                //         return lis;
                //     }
                // }, lis);
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);
})