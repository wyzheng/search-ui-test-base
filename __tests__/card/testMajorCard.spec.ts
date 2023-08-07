import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { searchRes, MajorCardClass} from "../../lib/utils/resultMap";
import { getHighlightContent, getLineNum, getOCRRes, getSimilarity } from "../../lib/utils/tools";
const fs = require('fs');

let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;

let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:专业大卡测试
describe("testMajorCard", () => {
    beforeAll(async () => {
          pageExtend = await setup("会计学", 20, 3191396391, false);
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

    //@description:q=会计学，验证专业大卡是否召回且在首位
    test("testMajorCardRecall", async () => {
      await addMsg({
        context: undefined,
        message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 检查垂搜页是否召回专业box`
      });
      let num = 3;
      while (num != 0) {
        try {
          await pageExtend.change("会计学");
          let firstbox = await page.$(searchRes.first_box);
          let majorCard = await page.$(MajorCardClass.box);
          let image = await page.screenshot({
            path:  basedir + "./static/pic/test_majorCardBox.png"
          })
          await addAttach({ attach: image, description: "页面截图" });
          await expect(firstbox).toStrictEqual(majorCard);
          break;
        } catch (e) {
          if (num == 1) {
            throw e;
          }
          num--;
        }
      }
    }, 50000);

    //@description:q=会计学，验证专业大卡样式正确
    test("testMajorCardStyle", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡样式正确`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(MajorCardClass.box);
                let imgPath =  basedir + "./static/pic/test_testMajorCardQuery001.png";
                const image = await ele.screenshot({
                    path: imgPath
                });
                await addAttach({attach: image, description: "石河子大学大卡截图"});
                try {
                    await fs.statSync( basedir + './static/pic_diff/test_testMajorCard001.png')
                } catch (e) {
                    fs.copyFileSync(imgPath,  basedir + `./static/pic_diff/test_testMajorCard001.png`);
                }
                let diffPercent = await getSimilarity(imgPath,  basedir + './static/pic_diff/test_testMajorCard001.png');
                await expect(0.99).toBeLessThan(Number(diffPercent));
                break;
            } catch (e) {
                if (num == 1) {
                  throw e;
                }
                num--;
            }
        }
        fs.copyFileSync( basedir + `./static/pic/test_testMajorCard001.png`,  basedir + `./static/pic_diff/test_testMajorCard001.png`);
    }, 50000);

    //@description:q=会计学，验证专业大卡标题高亮
    test("testMajorCardTitleHighlight", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡标题高亮`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.title_hihtlight);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_MajorCardTitleHighlight.png'
                });
                await addAttach({attach: image, description: "大卡标题截图"});
                let content = await getHighlightContent(page, MajorCardClass.title_hihtlight);
                await expect(content).toBe("会计学");
                break;
            } catch (e) {
                if(num == 1) {
                  throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的简介标题格式为：年制/学位/学科门类
    test("testMajorCardDescTitle", async () => {
        await addMsg({
            context: undefined,
           message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的简介标题`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(MajorCardClass.desc_basic);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardDescTitle.png'
                });
                await addAttach({attach: image, description: "描述标题截图"});
                let text = await getOCRRes( basedir + './static/pic/test_testMajorCardDescTitle.png');
                expect(text.ocr_comm_res.items[0].text).toMatch(/本科[^\s\/]年\/[^\s\/]+学\/[^\s\/]+类$/);
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的简介内容不超过2行
    test("testMajorCardDescContent", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的简介内容不超过2行`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(MajorCardClass.desc_content);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardDescContent.png'
                });
                await addAttach({attach: image, description: "描述内容截图"});
                let lineNumber = await getLineNum( basedir + './static/pic/test_testMajorCardDescContent.png');
                expect(lineNumber).toBeLessThanOrEqual(2);
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的“更多简介”点击跳转到小程序
    test("testMajorCardDescMore", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的“更多简介”点击跳转到小程序`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.desc_more);
                const image = await ele.screenshot({
                    path: basedir + './static/pic/test_testMajorCardDescMore.png'
                });
                await addAttach({attach: image, description: "更多简介截图"});
                await page.click(MajorCardClass.desc_more);
                expect(pageExtend.extendInfo).toBe('gh_283f4c43b06e@app');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的就业前景板块标题
    test("testMajorCardPanel1Title", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的就业前景板块标题`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.panel_1_title);
                const image = await ele.screenshot({
                    path: basedir + './static/pic/test_testMajorCardPanel1Title.png'
                });
                await addAttach({attach: image, description: "就业前景标题截图"});
                let text = await getOCRRes( basedir + './static/pic/test_testMajorCardPanel1Title.png');
                expect(text.ocr_comm_res.items[0].text).toBe('就业前景');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的就业前景内容样式为：三行，每行两列
    test("testMajorCardPanel1Content", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的就业前景内容样式`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.$(MajorCardClass.panel_1_content);
                const image = await ele.screenshot({
                    path: basedir + './static/pic/test_testMajorCardPanel1Content.png'
                });
                await addAttach({attach: image, description: "就业前景内容截图"});
                let text = await getOCRRes( basedir + './static/pic/test_testMajorCardPanel1Content.png');
                expect(text.ocr_comm_res.items[0].text).toContain("主要岗位");
                expect(text.ocr_comm_res.items[1].text).toContain("主要行业");
                expect(text.ocr_comm_res.items[2].text).toContain("平均月薪");
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的就业前景整个panel点击跳转
    test("testMajorCardPanel1Click", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的就业前景点击跳转`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.panel_1);
                const image = await ele.screenshot({
                    path: basedir + './static/pic/test_testMajorCardPanel1.png'
                });
                await addAttach({attach: image, description: "就业前景截图"});
                await page.click(MajorCardClass.panel_1);
                expect(pageExtend.extendInfo).toBe('gh_283f4c43b06e@app');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的报考指南板块标题
    test("testMajorCardPanel2Title", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的报考指南板块标题`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.panel_2_title);
                const image = await ele.screenshot({
                    path: basedir + './static/pic/test_testMajorCardPanel2Title.png'
                });
                await addAttach({attach: image, description: "报考指南标题截图"});
                let text = await getOCRRes( basedir + './static/pic/test_testMajorCardPanel2Title.png');
                expect(text.ocr_comm_res.items[0].text).toBe('报考指南');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的报考指南整个panel点击
    test("testMajorCardPanel2Click", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的报考指南了解开设院校点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.panel_2);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardPanel2.png'
                });
                await addAttach({attach: image, description: "了解开设院校截图"});
                await page.click(MajorCardClass.panel_2);
                expect(pageExtend.extendInfo).toBe('gh_283f4c43b06e@app');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡的报考指南了解开设院校点击
    test("testMajorCardPanel2MoreClick", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡的报考指南了解开设院校点击`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.panel_2_more);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardPanel2More.png'
                });
                await addAttach({attach: image, description: "了解开设院校截图"});
                await page.click(MajorCardClass.panel_2_more);
                expect(pageExtend.extendInfo).toBe('gh_283f4c43b06e@app');
                break;
            } catch (e) {
                if(num == 1) {
                throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡来源图标样式
    test("testMajorCardSourceIcon", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡来源`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.source);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardSource.png'
                });
                await addAttach({attach: image, description: "专业大卡来源截图"});
                const iconUrl = await page.evaluate((selector) => {
                    let ele =  document.querySelector(selector);
                    return ele.innerHTML.match(/url\("?(.+?)"?\)/);
                }, MajorCardClass.source)
                expect(iconUrl[0]).toContain('http://wx.qlogo.cn/mmhead/Q3auHgzwzM6tQAjrEy7OCX6oMQQpXibib8PhxT8xlNsAHyCEPe6qp9Bg/0');
                break;
            } catch (e) {
                if(num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);

    //@description:q=会计学，验证专业大卡来源名称
    test("testMajorCardSourceName", async () => {
        await addMsg({
            context: undefined,
            message: ` 测试步骤：\n  1. 输入搜索query=会计学,发起搜索\n  2. 验证专业大卡来源名称`
        });
        let num = 3;
        while (num != 0) {
            try {
                let ele = await page.waitForSelector(MajorCardClass.source);
                const image = await ele.screenshot({
                    path:  basedir + './static/pic/test_testMajorCardSource.png'
                });
                await addAttach({attach: image, description: "大卡标题截图"});
                let sourceName = await getOCRRes( basedir + './static/pic/test_testMajorCardSource.png');
                await expect(sourceName.ocr_comm_res.items[0].text).toBe("掌上高考APP");
                break;
            } catch (e) {
                if(num == 1) {
                    throw e;
                }
                num--;
            }
        }
    }, 50000);
});
