import {
  getHeightOfEle,
  getLeftOfEle,
  getSizeOfEle
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { musicCardClass, musicClass, tabClass } from "../../lib/utils/resultMap";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let num = 0;


//@owner:joycesong
//@description:音乐大卡测试
describe("testMusicCard", () => {

  beforeAll(async () => {
    pageExtend = await setup("海阔天空", 20, 3192443972, false);
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

  //@description:q=海阔天空，验证音乐大卡是否召回
  test("testMusicCardRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 检查混排页是否召回音乐大卡`
    });
    let num = 3;
    while (num != 0) {
      try {
        let image = await page.screenshot({
          path: "./static/pic/test_testMusicCard.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(musicCardClass(0).box);
        let ele = await page.$(musicCardClass(0).box);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardbox.png"
        })
        await addAttach({attach: img, description: "音乐大卡截图"});
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证音乐大卡是否置顶
  test("testMusicCardRank", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 检查混排页音乐大卡是否置顶`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).box);

        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardbox.png"
        })
        await addAttach({attach: img, description: "音乐box截图"});

        // 根据第一个box的id判断是否是表情音乐大卡
        let boxid = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass);
          let id = item.getAttribute("data-component-boxid")
          return id;
        }, "div.exposure-block > :not(.sticky-hint)");
        console.log(boxid);
        await expect(boxid).toBeStartWith("0x200-3-");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证音乐专辑图案正方形展示
  test("testMusicCardThumb", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=海阔天空\n  2. 验证音乐专辑图案1:1正方形展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicCardClass(0).musicThumb);
        await page.click(musicCardClass(0).musicThumb);
        let size = await getSizeOfEle(page, musicCardClass(0).musicThumb);
        expect(size[0]).toBe(size[1])
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证召回音乐名称、专辑、tag信息左对齐展示
  test("testMusicCardInfoDisplay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=海阔天空\n  2. 验证召回音乐名称、专辑、tag信息左对齐展示`
    });
    let num = 3;
    while (num != 0) {
      try {

        let h1 = await getLeftOfEle(page, musicCardClass(0).musicName);
        let h2 = await getLeftOfEle(page, musicCardClass(0).musicArtist);
        expect(h1).toBe(h2);

        let content = await page.evaluate(async (eleClass) => {
          let element = document.querySelector(eleClass.musicTags);
          return !!element;
        }, musicCardClass(0));
        if (content){
          let h3 = await getLeftOfEle(page, musicCardClass(0).musicTags);
          expect(h2).toBe(h3);
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

  //@description:q=海阔天空，验证歌词、播放、K歌按钮一行对齐展示
  test("testMusicCardStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 验证歌词、播放、K歌按钮一行对齐展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).musicOpts);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardOpts.png"
        })
        await addAttach({attach: img, description: "音乐大卡操作按钮截图"});

        let h1 = await getHeightOfEle(page, musicCardClass(0).musicLyric);
        let h2 = await getHeightOfEle(page, musicCardClass(0).musicPlay);
        let h3 = await getHeightOfEle(page, musicCardClass(0).musicK);
        expect(h1).toBeCloseTo(h2, 2);
        expect(h2).toBeCloseTo(h3, 2);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证召回歌词按钮，点击跳转百度百科小程序
  test("testMusicCardLyric", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 验证召回歌词按钮，点击跳转百度百科小程序`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).musicLyric);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardLyric.png"
        })
        await addAttach({attach: img, description: "音乐大卡歌词按钮截图"});

        await page.click(musicCardClass(0).musicLyric);
        expect(pageExtend.extendInfo).toBe("gh_03033a44feb0@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证召回K歌按钮，点击跳转全民K歌小程序
  test("testMusicCardK", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 验证召回K歌按钮，点击跳转全民K歌小程序`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).musicK);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardK.png"
        })
        await addAttach({attach: img, description: "音乐大卡K歌按钮截图"});

        await page.click(musicCardClass(0).musicK);
        expect(pageExtend.extendInfo).toBe("gh_4336286303e4@app");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

//@description:q=海阔天空，验证召回播放按钮，验证点击跳转参数正确
  test("testMusicCardPlay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 召回播放按钮，验证点击跳转参数正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).musicPlay);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardPlay.png"
        })
        await addAttach({attach: img, description: "音乐大卡播放按钮截图"});

        await page.click(musicCardClass(0).musicPlay);
        await page.waitForTimeout(1000);
        let content = await page.evaluate(async (eleClass) => {
          let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          let arr =  artist.split(" · ")
          if (arr.length == 1){
            return [name, arr[0], ""];
          }
          return [name, arr[0], arr[1]];
        }, musicCardClass(0));

        await expect(content[0]).toBe(pageExtend.extendInfo["songName"]);
        await expect(content[1].replace("/", ";")).toBe(pageExtend.extendInfo["singerName"]);
        if (content[2] != ""){
          await expect(content[2]).toBe(pageExtend.extendInfo["albumName"]);
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

  //@description:q=海阔天空，验证召回更多版本入口，验证点击跳转音乐垂搜
  test("testMusicCardTab", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 验证召回更多版本入口，验证点击跳转音乐垂搜`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicCardClass(0).musicMore);
        let img = await ele.screenshot({
          path: "./static/pic/test_testmusicCardMore.png"
        })
        await addAttach({attach: img, description: "音乐大卡更多入口截图"});

        let content = await page.evaluate(async (eleClass) => {
          return  document.querySelector(eleClass.musicMoreWord).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
        }, musicCardClass(0));
        await expect(content).toBe("更多版本");

        await page.click(musicCardClass(0).musicMore);
        await page.waitForTimeout(3000);

        const image = await page.screenshot({
          path: "./static/pic/test_testMusicCardTab.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});

        content = await page.evaluate(async (eleClass) => {
          let element = document.querySelector(eleClass.selected);
          if (element){
            return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
          }else{
            return ""
          }
        }, tabClass);
        await expect(content).toBe("音乐");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=海阔天空，验证召回更多版本入口，验证首位音乐内容与混排相同
  test("testMusicCardTabContent", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=海阔天空,发起搜索\n  2. 验证召回更多版本入口，验证点击跳转音乐垂搜`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.click(tabClass.select_all);
        await page.waitForTimeout(3000);

        let content = await page.evaluate(async (eleClass) => {
          let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          return [name, artist];
        }, musicCardClass(0));

        await page.click(musicCardClass(0).musicMore);
        await page.waitForTimeout(3000);

        let tabContent = await page.evaluate(async (eleClass) => {
          let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          return [name, artist];
        }, musicClass(1));

        await expect(content[0]).toBe(tabContent[0]);
        await expect(content[1]).toBe(tabContent[1]);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);
})