import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {HospitalCardClass, HospitalServiceCardClass, searchRes, shebaoCardClass} from "../../lib/utils/resultMap";
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
                let first_box = await page.waitForSelector(searchRes.first_box);
                let ele = await page.waitForSelector(HospitalCardClass.box);
                const image = await page.screenshot({
                    path:  basedir + "./static/pic/test_testHPFcard.png"
                });
                await addAttach({attach: image, description: "页面截图"});
                let first_box_text = await first_box.evaluate((node) => node.innerHTML);
                let ele_text = await ele.evaluate((node) => node.innerHTML);
                await expect(first_box_text).toBe(ele_text);
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
                let ele = await page.waitForSelector(HospitalCardClass.headBg);
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
                await expect(text.ocr_comm_res.items[0].text).toBe("广东省第二人民医院");
                let content = await page.evaluate((ele) => {
                    let element = document.querySelector( ele + " em");
                    return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
                }, HospitalCardClass.title);
                await expect(content).toBe("广东省第二人民医院");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡医院别名
    test("testHospitalCardAlias", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 验证医院大卡医院别名`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.alias);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardAlias.png"
                });
                await addAttach({attach: image, description: "医院别名截图"});
                let text = await page.evaluate((element) => {
                    return element.textContent;
                }, ele);
                await expect(text).toBe("别名：广东省应急医院");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡样式和上个模板的diff率
    test("testHospitalCardDiff", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 验证医院大卡样式和上个模板的diff率`
        });
        let num = 3;
        while (num != 0) {
            try {
                pageExtend.change("广东省第二人民医院");
                let ele = await page.waitForSelector(HospitalCardClass.box);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardDiff.png"
                });
                await addAttach({attach: image, description: "医院大卡样式截图"});
                let diff = await getSimilarity(basedir + "./static/pic/test_HospitalcardDiff.png", basedir + "./static/pic_diff/test_HospitalcardDiff.png");
                await expect(0.99).toBeLessThan(Number(diff));
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
        fs.copyFileSync(basedir + "./static/pic/test_HospitalcardDiff.png", basedir + "./static/pic_diff/test_HospitalcardDiff.png");
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡医院Poi信息点击
    test("testHospitalCardPoi", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 验证医院大卡医院Poi信息`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.poi);
                await page.click(HospitalCardClass.poi);
                await page.waitForTimeout(5000);
                const image = await page.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardPoi.png"
                });
                await addAttach({attach: image, description: "医院Poi点击截图"});
                expect(page).toHaveElement(searchRes.half_dialog);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广东省第二人民医院，验证医院大卡医院电话点击
    test("testHospitalCardTel", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广东省第二人民医院,发起搜索\n  2. 验证医院大卡医院电话点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.tel);
                await page.click(HospitalCardClass.tel);
                const image = await page.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardTel.png"
                });
                await addAttach({attach: image, description: "医院电话点击截图"});
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

    //@description:query = 广州市妇女儿童医疗中心，验证医院大卡医院官网点击
    test("testHospitalCardWeb", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院大卡医院官网点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("广州市妇女儿童医疗中心");
                let ele = await page.waitForSelector(HospitalCardClass.web);
                await page.click(HospitalCardClass.web);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardWeb.png"
                });
                await addAttach({attach: image, description: "医院官网点击截图"});
                await page.waitForTimeout(5000);
                expect(pageExtend.url).toBe("http://www.gzfezx.com/");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广州市妇女儿童医疗中心，验证医院大卡医院排名点击跳转到小程序"gh_af2a9332297a@app"
    test("testHospitalCardRank", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院大卡医院排名点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("广州市妇女儿童医疗中心");
                let ele = await page.waitForSelector(HospitalCardClass.rank);
                await page.click(HospitalCardClass.rank);
                await page.waitForTimeout(5000);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardRank.png"
                });
                await addAttach({attach: image, description: "医院排名点击截图"});
                expect(pageExtend.extendInfo).toBe("gh_af2a9332297a@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广州市妇女儿童医疗中心，验证医院服务、官方账号更多>箭头点击跳转到原生页
    test("testHospitalCardMoreServiceArrowClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院服务、官方账号更多>箭头点击跳转到原生页`
        });
        let num = 3;
        while (num != 0) {
            try {
                let eles = await page.$$(HospitalCardClass.moreArrow);
                for (let ele of eles) {
                    await ele.click();
                    await page.waitForTimeout(5000);
                    expect(pageExtend.extendInfo).toBe("https://wsad.weixin.qq.com/wsad/zh_CN/htmledition/wow/mmsearchoutlinks/hospital_page.html?datahouse_id=6734668161779565839&longitude=113.32455&latitude=23.10004&search_id=778450814811430490");
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

    //@description:query = 广州市妇女儿童医疗中心，验证医院大卡更多服务外显不超过4个
    test("testHospitalCardMoreServiceNum", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院大卡更多服务外显不超过4个`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.service);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalcardMoreService.png"
                });
                await addAttach({attach: image, description: "更多服务截图"});
                let eles = await ele.$$(HospitalCardClass.serviceItem);
                expect(eles.length).toBeLessThanOrEqual(4);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广州市妇女儿童医疗中心，验证医院大卡官方账号外显不超过4个
    test("testHospitalCardMoreAccountNum", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院大卡官方账号外显不超过4个`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.service);
                let eles = await ele.$$(HospitalCardClass.accountItem);
                expect(eles.length).toBeLessThanOrEqual(3);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 广州市妇女儿童医疗中心，验证医院大卡更多服务外显不超过4个
    test("testHospitalCardMoreNum", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=广州市妇女儿童医疗中心,发起搜索\n  2. 验证医院大卡更多服务外显不超过4个`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(HospitalCardClass.service);
                let eles = await ele.$$(HospitalCardClass.serviceItem);
                expect(eles.length).toBeLessThanOrEqual(4);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡召回
    test("testHospitalCardServiceRecall", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡召回`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("妇幼保健院");
                let ele = await page.waitForSelector(HospitalServiceCardClass.box);
                const image = await ele.screenshot({
                    path:  basedir + "./static/pic/test_HospitalServiceCard.png"
                });
                await addAttach({attach: image, description: "医院服务截图"});
                try {
                    await fs.statSync( basedir + './static/pic_diff/test_testMajorCard.png')
                } catch (e) {
                    fs.copyFileSync(basedir + "./static/pic/test_HospitalServiceCard.png",  basedir + `./static/pic_diff/test_testMajorCard.png`);
                }
                let diffPercent = await getSimilarity(basedir + "./static/pic/test_HospitalServiceCard.png", basedir + './static/pic_diff/test_shebaocardstyle.png');
                await expect(Number(diffPercent)).toBeGreaterThan(0.9);
                expect(page).toHaveElement(HospitalCardClass.box);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡样式diff
    test("testHospitalServiceStyleDiff", async () => {
        await addMsg({
          context: undefined,
          message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡样式diff`
        });
        let num = 3;
        while (num != 0) {
          try {
            let ele = await page.waitForSelector(HospitalServiceCardClass.box);
            let imgPath =  basedir + "./static/pic/test_HospitalServiceStyleDiff.png"
            const image = await ele.screenshot({
              path: imgPath
            });
            await addAttach({attach: image, description: "社保大卡截图"});
            let diffPercent = await getSimilarity(imgPath, './static/pic_diff/test_HospitalServiceStyleDiff.png');
            await expect(Number(diffPercent)).toBeGreaterThan(0.9);
            break;
          } catch (e) {
            if (num == 1) {
              throw e;
            }
            num--;
          }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡标题飘绿
    test("testHospitalServiceTitle", async () => {
        await addMsg({
          context: undefined,
          message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡标题飘绿`
        });
        let num = 3;
        while (num != 0) {
          try {
              await pageExtend.change("妇幼保健院");
              let ele = await page.waitForSelector(HospitalServiceCardClass.titleHighlight);
              let imgPath =  basedir + "./static/pic/test_HospitalServiceTitle.png"
              const image = await ele.screenshot({
                  path: imgPath
              });
            await addAttach({attach: image, description: "医院服务标题截图"});
            let title = await page.evaluate((el) => {
                let element = document.querySelector(el);
                let title = element.textContent;
                return title;
            }, HospitalServiceCardClass.titleHighlight);
            await expect(title).toBe("医院服务");
            break;
          } catch (e) {
            if (num == 1) {
              throw e;
            }
            num--;
          }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡poi
    test("testHospitalServicePoi", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡poi点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("妇幼保健院");
                let ele = await page.waitForSelector(HospitalServiceCardClass.poi);
                const image = await ele.screenshot({
                    path: basedir + "./static/pic/test_HospitalServicePoi.png"
                });
                await addAttach({attach: image, description: "医院服务poi截图"});
                let text = await page.evaluate((el) => {
                    return el.textContent;
                }, ele);
                await expect(text).toBe("广东·广州");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务描述信息
    test("testHospitalServiceDesc", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务描述信息`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("妇幼保健院");
                let ele = await page.waitForSelector(HospitalServiceCardClass.desc);
                const image = await ele.screenshot({
                    path: basedir + "./static/pic/test_HospitalServiceDesc.png"
                });
                await addAttach({attach: image, description: "医院服务描述截图"});
                let text = await page.evaluate((el) => {
                    return el.textContent;
                }, ele);
                await expect(text).toBe("聚合本地公立医院资源，在线完成服务");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡最多包含3个医院，多的出更多按钮
    test("testHospitalServiceNum", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡最多包含3个医院，多的出更多按钮`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("妇幼保健院");
                let ele = await page.$$(HospitalServiceCardClass.hospitalItem);
                expect(ele.length).toBeLessThanOrEqual(3);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:query = 妇幼保健院，验证医院服务大卡更多按钮跳转
    test("testHospitalServiceMoreBtn", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=妇幼保健院,发起搜索\n  2. 验证医院服务大卡更多按钮跳转`
        });
        let num = 3;
        while (num != 0) {
            try {
                await pageExtend.change("妇幼保健院");
                await page.waitForSelector(HospitalServiceCardClass.more);
                await page.click(HospitalServiceCardClass.more);
                expect(pageExtend.extendInfo).toBe("gh_8e88e2b28133@app");
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