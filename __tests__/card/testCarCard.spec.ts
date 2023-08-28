import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {carCardClass, searchRes} from "../../lib/utils/resultMap";
import {
    getBottomHeightOfEle, getDiff,
    getHeightOfEle, getLeftOfEle,
    getLineNum,
    getOCRRes, getRightOfEle,
    getSimilarity,
    getTopHeightOfEle
} from "../../lib/utils/tools";
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
//@description:车型大卡测试
describe("testCarCard", () => {
    beforeAll(async () => {
        pageExtend = await setup("奥迪A6L", 20, 3193557056, false);
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
    });

    //@description:query = 奥迪A6L，验证混排页召回车型大卡组件，且置顶
    test("testCarCardRecall", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证混排页召回车型大卡组件，且置顶`
        });
        let num = 3;
        while (num) {
            try {
                let fist_ele = await page.waitForSelector(searchRes.first_box);
                let ele = await page.waitForSelector(carCardClass.box);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardBox.png"
                });
                await addAttach({attach: image, description: "车型大卡截图"});
                await expect(page).toHaveElement(carCardClass.box);
                let ele_html = await page.evaluate((ele) => {
                    return ele.innerHTML;
                }, ele);
                let fist_ele_html = await page.evaluate((ele) => {
                    return ele.innerHTML;
                }, fist_ele);
                await expect(ele_html).toBe(fist_ele_html);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证车型卡片截图相似度大于0.98
    test("testCarCardDiff", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证车型卡片截图相似度大于0.98`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.box);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardDiff.png"
                });
                try {
                    await fs.statSync( basedir + './static/pic_diff/test_carCardDiff.png')
                } catch (e) {
                    fs.copyFileSync(basedir + "./static/pic/test_carCardDiff.png",  basedir + `./static/pic_diff/test_carCardDiff.png`);
                }
                await addAttach({attach: image, description: "车型卡片截图"});
                let diffPercent = await getSimilarity(basedir + "./static/pic/test_carCardDiff.png", basedir + "./static/pic_diff/test_carCardDiff.png");
                await expect(Number(diffPercent)).toBeGreaterThan(0.98);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
        fs.copyFileSync(basedir + "./static/pic/test_carCardDiff.png",  basedir + `./static/pic_diff/carCard.png`);
    }, 50000);

    //@description:query = 宝马，验证混排页召回车型大卡组件，且不置顶
    test("testCarCardSubBoxRecall", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=宝马,发起搜索\n  2. 验证混排页召回车型大卡组件，且不置顶`
        });
        let num = 3;
        while (num) {
            try {
                await pageExtend.change("宝马");
                let ele = await page.waitForSelector(carCardClass.box);
                let fist_ele = await page.$(searchRes.first_box);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardBox.png"
                });
                await addAttach({attach: image, description: "车型大卡截图"});
                await expect(page).toHaveElement(carCardClass.box);
                let ele_html = await page.evaluate((ele) => {
                    return ele.innerHTML;
                }, ele);
                let fist_ele_html = await page.evaluate((ele) => {
                    return ele.innerHTML;
                }, fist_ele);
                await expect(ele_html).not.toBe(fist_ele_html);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证车型大卡组件标题为“奥迪A6L",且高亮
    test("testCarCardTitle", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证车型大卡组件标题为“奥迪A6L",且高亮，且加粗`
        });
        let num = 3;
        while (num) {
            try {
                await pageExtend.change("奥迪A6L");
                let ele = await page.waitForSelector(carCardClass.title);
                await expect(page).toHaveElement(carCardClass.title);
                let ele_html = await page.evaluate((ele) => {
                    return ele.textContent.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("");
                }, ele);
                await expect(ele_html).toBe("奥迪A6L");
                let color = await page.evaluate((ele) => {
                    return color =  window.getComputedStyle(ele).color;
                }, ele);
                await expect(color).toBe("rgba(0, 0, 0, 0.9)");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证品牌信息为“一汽奥迪 轿车”
    test("testCarCardBrand", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证品牌信息为“一汽奥迪 轿车”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.brand);
                await expect(page).toHaveElement(carCardClass.brand);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardBrand.png"
                });
                await addAttach({attach: image, description: "品牌信息截图"});
                let ele_html = await page.evaluate((ele) => {
                    return ele.textContent.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("");
                }, ele);
                await expect(ele_html).toBe("一汽奥迪轿车");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证车型大卡展示2张图片，且一行展示，有“一共xx张”标签
    test("testCarCardImg", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证车型大卡展示2张图片，且一行展示，有“一共xx张”标签`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.$$(carCardClass.img);
                let image = await ele[0].screenshot({
                    path: basedir + "./static/pic/test_carCardImg.png"
                });
                await addAttach({attach: image, description: "图片截图"});
                await expect(ele.length).toBe(2);

                let top_height_left = await getTopHeightOfEle(page, carCardClass.img+':nth-child(1)');
                let top_height_right = await getTopHeightOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(top_height_left).toBe(top_height_right);
                let bottom_height_left = await getBottomHeightOfEle(page, carCardClass.img+':nth-child(1)');
                let bottom_height_right = await getBottomHeightOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(bottom_height_left).toBe(bottom_height_right);

                let ele_tag = await page.waitForSelector(carCardClass.imgTag);
                let image1 = await ele_tag.screenshot({
                    path: basedir + "./static/pic/test_carCardImgTag.png"
                });
                await addAttach({attach: image, description: "标签截图"});
                let ele_html = await page.evaluate((el) => {
                    return el.innerHTML.match(/[\u4e00-\u9fa5_a-zA-Z0-9]/g).join("");
                }, ele_tag);
                await expect(ele_html).toMatch(/共\d+(?:\.\d+)?(?:万)?张/);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证颜色参数与左边图片左对齐、右边界不超过图片右边界，且超长时省略为“三色点”图标
    test("testCarCardColor", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证颜色参数与左边图片左、右边界不超过图片右边界， \n, 3. 超长时省略为“三色点”图标`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.color);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardDescColor.png"
                });
                await addAttach({attach: image, description: "颜色参数截图"});

                // 验证颜色参数左边界与图片左边界对齐
                let color_left = await getLeftOfEle(page, carCardClass.color);
                let img_left = await getLeftOfEle(page, carCardClass.img+':nth-child(1)');
                await expect(color_left).toBe(img_left);

                // 验证颜色参数右边界不超过图片右边界
                let color_right = await getRightOfEle(page, carCardClass.color);
                let img_right = await getRightOfEle(page, carCardClass.img+':nth-child(1)');
                await expect(color_right).toBeLessThanOrEqual(img_right);

                // 验证如果颜色描述超长，省略为“三色点”图标
                if (Math.abs(color_right - img_right) <= 2) {
                    await expect(page).toHaveElement(carCardClass.colorIcon);
                }
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证价格参数与右边图片左对齐、右边界不超过图片右边界
       test("testCarCardPrice", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证价格参数与左边图片左、右边界不超过图片右边界，\n  3. 且超长时换行`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.price);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardDescPrice.png"
                });
                await addAttach({attach: image, description: "价格参数截图"});

                // 验证价格参数左边界与图片左边界对齐
                let color_left = await getLeftOfEle(page, carCardClass.price);
                let img_left = await getLeftOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(color_left).toBe(img_left+2);

                // 验证价格参数右边界不超过图片右边界
                let color_right = await getRightOfEle(page, carCardClass.color);
                let img_right = await getRightOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(color_right).toBeLessThanOrEqual(img_right);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证油耗参数与左边图片左对齐、右边界不超过图片右边界
    test("testCarCardEnergy", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证油耗参数与左边图片左、右边界不超过图片右边界`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.energy);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardDescEnergy.png"
                });
                await addAttach({attach: image, description: "油耗参数截图"});

                // 验证油耗参数左边界与图片左边界对齐
                let energy_left = await getLeftOfEle(page, carCardClass.energy);
                let img_left = await getLeftOfEle(page, carCardClass.img+':nth-child(1)');
                await expect(energy_left).toBe(img_left);

                // 验证油耗参数右边界不超过图片右边界
                let energy_right = await getRightOfEle(page, carCardClass.energy);
                let img_right = await getRightOfEle(page, carCardClass.img+':nth-child(1)');
                await expect(energy_right).toBeLessThanOrEqual(img_right);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 奥迪A6L，验证发动机参数与右边图片左对齐、右边界不超过图片右边界
    test("testCarCardEngine", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证发动机参数与左边图片左、右边界不超过图片右边界`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.engine);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardDescEngine.png"
                });
                await addAttach({attach: image, description: "发动机参数截图"});

                // 验证发动机参数左边界与图片左边界对齐
                let engine_left = await getLeftOfEle(page, carCardClass.engine);
                let img_left = await getLeftOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(engine_left).toBe(img_left+2);

                // 验证发动机参数右边界不超过图片右边界
                let engine_right = await getRightOfEle(page, carCardClass.engine);
                let img_right = await getRightOfEle(page, carCardClass.img+':nth-child(2)');
                await expect(engine_right).toBeLessThanOrEqual(img_right);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，验证更多车型模块标题为“更多车型”
    test("testCarCardTypeTitle", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证更多车型模块标题为“更多车型”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.typeTitle);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardTitle.png"
                });
                await addAttach({attach: image, description: "车型模块标题截图"});
                let content = await page.evaluate((carCardClass) => {
                    return document.querySelector(carCardClass.typeTitle).textContent;
                }, carCardClass);
                await expect(content).toBe("车型");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，验证更多车型模块最多展示3个车型
    test("testCarCardTypeNum", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证更多车型模块最多展示3个车型`
        });
        let num = 3;
        while (num) {
            try {
                let eles = await page.$$(carCardClass.compItem);
                let image = await eles[0].screenshot({
                    path: basedir + "./static/pic/test_carCardTypeNum.png"
                });
                await addAttach({attach: image, description: "车型item截图"});
                await expect(eles.length).toBeLessThanOrEqual(3);

                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，验证"更多"按钮点击跳转到小程序“gh_ca200d3e5300@app”
    test("testCarCardMoreBtnClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 点击更多按钮，跳转到小程序“gh_ca200d3e5300@app”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.more);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardMoreBtnClick.png"
                });
                await addAttach({attach: image, description: "更多按钮截图"});
                await ele.click();
                await page.waitForTimeout(2000);
                await expect(pageExtend.extendInfo).toBe("gh_ca200d3e5300@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，验证更多车型模块单条车型信息最多展示1行
    test("testCarCardTypeLineNum", async () => {
       await addMsg({
           context: undefined,
           message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证更多车型模块单条车型信息最多展示1行`
       });
       let num = 3;
       while (num) {
           try {
                let eles = await page.$$(carCardClass.compItemInfo);
                for (let ele of eles) {
                    let image = await eles[0].screenshot({
                        path: basedir + "./static/pic/test_carCardTypeInfoLineNum.png"
                    });
                    await addAttach({attach: image, description: "单条信息截图"});
                    let lineNum = await getLineNum(basedir + "./static/pic/test_carCardTypeInfoLineNum.png");
                    await expect(lineNum).toBeLessThanOrEqual(1);
                };
                break;
           } catch (e) {
               if (num == 1) {
                   throw e;
               }
               num = num - 1;
           }
       }
    }, 50000);

     //description:query = 奥迪A6L，验证来源信息为“易车”
    test("testCarCardSource", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 验证来源信息为“易车”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.source);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardSource.png"
                });
                await addAttach({attach: image, description: "来源信息截图"});
                let content = await page.evaluate((carCardClass) => {
                    return document.querySelector(carCardClass.source).textContent.match(/[\u4e00-\u9fa5]+/g)[0];
                }, carCardClass);
                await expect(content).toBe("易车");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，点击标题，跳转到小程序“gh_ca200d3e5300@app”
    test("testCarCardTitleClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 点击标题，跳转到小程序“gh_ca200d3e5300@app”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.title);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardTitleClick.png"
                });
                await addAttach({attach: image, description: "标题截图"});
                await ele.click();
                await page.waitForTimeout(2000);
                await expect(pageExtend.extendInfo).toBe("gh_ca200d3e5300@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，点击图片，跳转到小程序“gh_ca200d3e5300@app”,且锚点到外观
    test("testCarCardImgClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 点击图片，跳转到小程序“gh_ca200d3e5300@app, 且锚点到外观”`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.img);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardImgClick.png"
                });
                await addAttach({attach: image, description: "图片截图"});
                await ele.click();
                await page.waitForTimeout(2000);
                await expect(pageExtend.extendInfo).toBe("gh_ca200d3e5300@app");
                //await expect(pageExtend.weappPath).toBe("gh_ca200d3e5300@app");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //description:query = 奥迪A6L，点击描述信息，跳转到小程序“gh_ca200d3e5300@app”，且锚点到车型信息
    test("testCarCardTypeInfoClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=奥迪A6L,发起搜索\n  2. 点击描述信息，跳转到小程序“gh_ca200d3e5300@app”,且锚点到车型信息`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.describeItem);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardTypeInfo.png"
                });
                await addAttach({attach: image, description: "车型信息截图"});
                await ele.click();
                await page.waitForTimeout(2000);
                await expect(pageExtend.extendInfo).toBe("gh_ca200d3e5300@app");
                //await expect(pageExtend.weappPath).toBe("carPages/pages/carSeriesSummary/carSeriesSummary.html?s1s_ad_clickid=1692934248802-0684816723&s1s_box_type=5e21cff7f48b58a089794256baba94fcc56dc4fe&sid=2573&channel=100055&platFormId=39&source=souyisou&pfrom=souyisoutoufang");
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
        }
    }, 50000);

    //@description:query = 宝马，验证混车型大卡组件退阶样式的截图相似度大于0.95
    test("testCarCardSubBoxDiff", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=宝马,发起搜索\n  2. 验证混车型大卡组件退阶样式的截图相似度大于0.95`
        });
        let num = 3;
        while (num) {
            try {
                let ele = await page.waitForSelector(carCardClass.box);
                let image = await ele.screenshot({
                    path: basedir + "./static/pic/test_carCardSubDiff.png"
                });
                await addAttach({attach: image, description: "混车型大卡组件截图"});
                try {
                    await fs.statSync(basedir + './static/pic_diff/test_carCardSubDiff.png')
                } catch (e) {
                    fs.copyFileSync(basedir + './static/pic/test_carCardSubDiff.png', basedir + `./static/pic_diff/test_carCardSubDiff.png`);
                }
                let diffPercent = await getSimilarity(basedir + "./static/pic/test_carCardSubDiff.png", basedir + "./static/pic/test_carCardSubDiff.png");
                await expect(Number(diffPercent)).toBeGreaterThanOrEqual(0.95);
                break;
            } catch (e) {
                if (num == 1) {
                    throw e;
                }
                num = num - 1;
            }
            fs.copyFileSync(basedir + `./static/pic/test_carCardSubDiff.png`, basedir + `./static/pic_diff/test_carCardSubDiff.png`);
        }
    }, 50000);

    //
});