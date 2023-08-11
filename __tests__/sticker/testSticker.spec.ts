import {
  getHeightOfEle,
  getLeftOfEle,
  getOCRRes,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "jest-html-reporters/helper";
import { stickersClass, tabClass, wxAdClass, wxGoodAd } from "../../lib/utils/resultMap";
import { randomInt } from "crypto";



let page: Page ;
let browser: Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:joycesong
//@description:表情box测试
describe("testSticker", () => {

  beforeAll(async () => {
    pageExtend = await setup("小蓝人", 20, 3192443972, false);
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

  //@description:q=小蓝人，验证表情box是否召回
  test("testStickerRecall", async () => {
   /* await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=小蓝人\n  2. 验证混排页是否召回表情box\n `
    });*/
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_sticker.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(stickersClass(0).box);
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，验证表情box召回且置顶
  test("testStickerRank", async () => {
    /*await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 验证混排页召回表情box且置顶展示\n `
    });*/
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("吃饭表情")
        await expect(page).toHaveElement(stickersClass(0).box);
        // 根据第一个box的id判断是否是表情box
        let boxid = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          let id = item.getAttribute("data-component-boxid")
          return id;
        }, "div.exposure-block > div:not(sticky-hint)");
        console.log(boxid);
        await expect(boxid).toBeStartWith("0x180");
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，验证表情box标题为"query-表情"
  test("testStickerBoxTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 验证表情box标题为"query-表情"\n `
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(stickersClass(0).title)
        let ele = await page.$(stickersClass(0).title)
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_teststickertitle.png"
        })
        await addAttach({attach: image, description: "标题截图"});
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass + " >em");
          return item.innerHTML;
        }, stickersClass(0).title);
        await expect(content).toBe("吃饭表情");
        let ocrres = await getOCRRes( basedir + "./static/pic/test_teststickertitle.png")
        console.log(ocrres);
        await expect(ocrres.ocr_comm_res.items[0].text.replace(" ", "")).toBe("吃饭表情-表情");
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，验证第一个为专辑
  test("testStickerAlbum", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 验证混排页召回表情box，且第一个为专辑\n `
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(stickersClass(1).stickersTag);
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          let color = getComputedStyle(item).color;
          return item.innerHTML;
        }, stickersClass(1).stickersTag);
        await expect(content).toBe("专辑");
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，验证召回4个表情
  test("testStickerNum", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 验证混排页召回表情box，一行4个\n `
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(stickersClass(0).stickersAll);
        let ele = page.$$(stickersClass(0).stickersAll);
        let stickerNum = 0;
        await ele.then((value) => {
          stickerNum = value.length;
        })
        console.log(stickerNum);
        expect(stickerNum).toBe(4);
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);


  //@description:q=吃饭表情，验证召回表情高度对齐
  test("testStickerStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 验证混排页召回表情box，一行表情对齐展示\n `
    });
    let num = 3;
    while (num != 0) {
      try {
        // 获取4个表情的高度，验证相同
        let height1 =  await getHeightOfEle(page, stickersClass(1).stickersItem);
        let height2 =  await getHeightOfEle(page, stickersClass(2).stickersItem);
        let height3 =  await getHeightOfEle(page, stickersClass(3).stickersItem);
        let height4 =  await getHeightOfEle(page, stickersClass(4).stickersItem);
        expect(height1).toBe(height2);
        expect(height2).toBe(height3);
        expect(height3).toBe(height4);
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证跳转到表情垂搜页面
  test("testStickerMore", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，验证跳转到表情垂搜页面\n `
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(stickersClass(0).more);
        await page.click(stickersClass(0).more);
        await page.waitForTimeout(4000);

        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_teststickertab.png"
        })

        await addAttach({attach: image, description: "垂搜截图"});
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          return item.innerHTML;
        }, tabClass.selected);
        await expect(content).toBe("表情");
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情垂搜页面有专辑box
  test("testStickerTabAlbum", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3. 验证垂搜页面有表情专辑box`
    });
    let num = 3;
    while (num != 0) {
      try {
        await expect(page).toHaveElement(stickersClass(0).album);
        let ele = await page.$(stickersClass(0).album)
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_teststickertabalbum.png"
        })
        await addAttach({attach: image, description: "垂搜页面专辑截图"});
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情垂搜页面有表情单品box
  test("testStickerTabSticker", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3. 验证垂搜页面有表情单品box`
    });
    let num = 3;
    while (num != 0) {
      try {

        let ele = await page.$(stickersClass(0).stickerBox)
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_stickertabbox.png"
        })
        await addAttach({attach: image, description: "垂搜页面表情单品截图"});

        await expect(page).toHaveElement(stickersClass(0).stickerBox);

        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情垂搜页面有表情单品box，且首刷21个表情
  test("testStickerTabSingle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3. 验证首刷召回21个表情`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = page.$$(stickersClass(0).stickerTabAll);
        let stickerNum = 0;
        await ele.then((value) => {
          stickerNum = value.length;
        })
        expect(stickerNum).toBe(21);
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情垂搜页面有表情单品box样式
  test("testStickerTabSingleStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3. 验证垂搜页面有表情单品行列对齐`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(stickersClass(0).more);
        await page.click(stickersClass(0).more);
        await page.waitForTimeout(4000);

        let i = randomInt(6);

        let height1 =  await getHeightOfEle(page, stickersClass((3 * i) + 1).stickerSingle);
        let height2 =  await getHeightOfEle(page, stickersClass((3 * i) + 2).stickerSingle);
        let height3 =  await getHeightOfEle(page, stickersClass((3 * i) + 3).stickerSingle);
        expect(height1).toBe(height2);
        expect(height2).toBe(height3);

        let j = randomInt(3);
        console.log(j);
        let left1 =  await getLeftOfEle(page, stickersClass(1 + j).stickerSingle);
        let left2 =  await getLeftOfEle(page, stickersClass(4 + j).stickerSingle);
        let left3 =  await getLeftOfEle(page, stickersClass(7 + j).stickerSingle);
        expect(left1).toBe(left2);
        expect(left2).toBe(left3);

        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情混排页面专辑和垂搜页面专辑相同
  test("testStickerAlbumClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3. 验证表情混排页面专辑和垂搜页面专辑相同`
    });
    let num = 3;
    while (num != 0) {
      try {
        if( num < 3) {
          await page.click(tabClass.select_all);
          await page.waitForTimeout(4000);
        }
        await page.click(stickersClass(1).stickersItem);
        let url1 = pageExtend.extendInfo;

        await page.click(stickersClass(0).more)
        await page.waitForTimeout(3000);

        await page.click(stickersClass(1).album);
        let url2 = pageExtend.extendInfo;

        expect(url1).toBe(url2)
        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=吃饭表情，点击更多，验证表情混排页面表情单品和垂搜页面表情单品相同
  test("testStickerSingleClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=吃饭表情\n  2. 点击更多，跳转到表情垂搜页面\n 3.验证表情混排页面表情单品和垂搜页面表情单品相同`
    });
    let num = 3;
    while (num != 0) {
      try {
        if( num < 3) {
          await page.click(tabClass.select_all);
          await page.waitForTimeout(4000);
        }

        let url = [];
        for (let i = 2; i < 5; i++) {
          await page.click(stickersClass(i).stickersItem);
           url.push(pageExtend.extendInfo);
        }

        await page.click(stickersClass(0).more);
        await page.waitForTimeout(3000);


        for (let i = 1; i < 4; i++) {
          await page.click(stickersClass(i).stickerSingle);
          expect(url[i - 1]).toBe(pageExtend.extendInfo);
        }

        break;
      } catch (e) {
        if (num == 1) {
          if (e.constructor.name == "JestAssertionError") {
            fail++;
          } else {
            err++;
          }
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
    await addMsg({context: undefined, message: `当前测试集合共有${num}条用例，其中测试通过${pass}条，测试失败${fail}条，测试任务失败${err}条`});
  }, 5000);

})