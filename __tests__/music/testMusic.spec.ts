import { getHeightOfEle, getLeftOfEle, getOCRRes, getSizeOfEle } from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { musicClass, tabClass } from "../../lib/utils/resultMap";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let num = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:joycesong
//@description:音乐box测试
describe("testMusic", () => {

  beforeAll(async () => {
    pageExtend = await setup("胡彦斌", 20, 3192443972, false);
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

  //@description:q=胡彦斌，验证音乐box是否召回
  test("testMusicRecall", async () => {
     /*await addMsg({
       context: undefined,
       message: ` 测试步骤：\n  1. 输入搜索query=胡彦斌,发起搜索\n  2. 检查混排页是否召回音乐box`
     });*/
    let num = 3;
    while (num != 0) {
      try {
        let image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusic.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(musicClass(0).box);
        let ele = await page.$(musicClass(0).box);

         let img = await ele.screenshot({
          path:  basedir + "./static/pic/test_testmusicbox.png"
        })
        await addAttach({attach: img, description: "音乐box截图"});
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=胡彦斌，验证音乐box标题为"query-音乐"，且query部分高亮
  test("testMusicBoxTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证音乐box标题为"query-音乐"`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(0).title);
        let ele = await page.$(musicClass(0).title);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_testmusictitle.png"
        });
        await addAttach({attach: image, description: "标题截图"});
        let ocrres = await getOCRRes( basedir + "./static/pic/test_testmusictitle.png");
        console.log(ocrres);
        await expect(ocrres.ocr_comm_res.items[0].text.replace(" ", "")).toBe("胡彦斌-音乐");
        let content = await page.evaluate(async (eleClass)  => {
          let item = document.querySelector(eleClass + " >em");
          return item.innerHTML;
        }, musicClass(0).title);
        await expect(content).toBe("胡彦斌");
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=胡彦斌，验证音乐专辑图案正方形展示
  test("testMusicThumb", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证音乐专辑图案1:1正方形展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicThumb);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await page.click(musicClass(1 + i).musicThumb);
          let size = await getSizeOfEle(page, musicClass(1 + i).musicThumb);
          expect(size[0]).toBe(size[1])
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

  //@description:q=胡彦斌，验证音乐K歌按钮点击跳转全民K歌小程序"gh_4336286303e4@app"
  test("testMusicK", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证音乐item召回K歌按钮\n  3. 点击K歌按钮，跳转全民K歌小程序`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicK);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await page.click(musicClass(1 + i).musicK);
          await page.waitForTimeout(1000);
          expect(pageExtend.extendInfo).toBe("gh_4336286303e4@app");
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

  //@description:q=胡彦斌，验证召回音乐播放按钮，点击验证跳转参数
  test("testMusicPlay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证音乐item召回播放按钮\n  3. 点击播放按钮，验证跳转参数`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicPlay);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await page.click(musicClass(1 + i).musicPlay);
          await page.waitForTimeout(1000);
          let content = await page.evaluate(async (eleClass) => {
            let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let arr =  artist.split(" · ")
            return [name, arr[0], arr[1]];
          }, musicClass(1 + i));
          await expect(content[0]).toBe(pageExtend.extendInfo["songName"]);
          await expect(content[1]).toBe(pageExtend.extendInfo["singerName"]);
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

  //@description:q=胡彦斌，验证召回音乐K歌按钮、播放按钮一行展示
  test("testMusicIconDisplay", async () => {
    /*await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证召回音乐K歌按钮、播放按钮一行展示`
    });*/
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicPlay);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          let h1 = await getHeightOfEle(page, musicClass(1 + i).musicK);
          let h2 = await getHeightOfEle(page, musicClass(1 + i).musicPlay);
          expect(h1).toBe(h2)
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

  //@description:q=胡彦斌，验证召回音乐信息左对齐展示
  test("testMusicInfoDisplay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证召回音乐信息左对齐展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicPlay);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          let content = await page.evaluate(async (eleClass) => {
            let element = document.querySelector(eleClass.musicTag);
            return !!element;
          }, musicClass(1 + i));
          let h1 = await getLeftOfEle(page, musicClass(1 + i).musicName);
          let h2 = 0;
          if (content){
            h2 = await getLeftOfEle(page, musicClass(1 + i).musicTag);
          }else{
            h2 = await getLeftOfEle(page, musicClass(1 + i).musicArtist);
          }
          expect(h1).toBe(h2)
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



  //@description:q=胡彦斌，验证音乐item点击，验证点击跳转参数
  test("testMusicItemClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击音乐item，验证跳转参数"`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicPlay);
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await page.click(musicClass(1 + i).musicItem);
          await page.waitForTimeout(1000);
          let content = await page.evaluate(async (eleClass) => {
            let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let arr =  artist.split(" · ")
            return [name, arr[0], arr[1]];
          }, musicClass(1 + i));
          await expect(content[0]).toBe(pageExtend.extendInfo["songName"]);
          await expect(content[1]).toBe(pageExtend.extendInfo["singerName"]);
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


  //@description:q=胡彦斌，验证box来源为“QQ音乐”，且来源icon与文字一行展示
  test("testMusicSource", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 验证box来源展示为QQ音乐\n  3. 验证来源icon与文字一行展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(1).musicSource);
        let content = await page.evaluate(async (eleClass) => {
          let element = document.querySelector(eleClass.musicSource);
          if (element){
            return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
          }else{
            return ""
          }
        }, musicClass(1));
        await expect(content).toBe("QQ音乐");
        let h1 = await getHeightOfEle(page, musicClass(0).musicSource);
        let h2 = await getHeightOfEle(page, musicClass(0).musicIcon);
        expect(h1).toBe(h2);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);


  //@description:q=胡彦斌，点击更多按钮，验证跳转到音乐垂搜tab
  test("testMusicMore", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击更多入口\n  3. 验证跳转到音乐垂搜tab`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(0).more);
        await page.click(musicClass(0).more);
        await page.waitForTimeout(3000);

        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusicTab.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});

        let content = await page.evaluate(async (eleClass) => {
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

  //@description:q=胡彦斌，点击更多按钮，验证跳转到音乐垂搜tab
  test("testMusicTabTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击更多入口\n  3. 验证音乐垂搜box标题为音乐`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(musicClass(0).more);
        await page.click(musicClass(0).more);
        await page.waitForTimeout(3000);

        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusicTab.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});
        let content = await page.evaluate(async (eleClass) => {
          let element = document.querySelector(eleClass.title);
          if (element){
            return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
          }else{
            return ""
          }
        }, musicClass(0));
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


  //@description:q=胡彦斌，点击更多按钮，验证音乐垂搜box前三位召回K歌按钮
  test("testMusicTabK", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击更多按钮\n  3. 验证垂搜box前三位召回K歌按钮，点击跳转全民K歌小程序`
    });
    let num = 3;
    while (num != 0) {
      try {

        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusicTabK.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});

        for (let i = 0; i < 3; i++) {
          await expect(page).toHaveElement(musicClass(i + 1).musicK);
          await page.click(musicClass(1 + i).musicK);
          await page.waitForTimeout(1000);
          expect(pageExtend.extendInfo).toBe("gh_4336286303e4@app");
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

  //@description:q=胡彦斌，点击更多按钮，验证音乐垂搜召回播放按钮
  test("testMusicTabPlay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击更多入口\n  3. 验证垂搜box前三位召回播放按钮\n  4. 点击播放按钮验证跳转参数正确`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusicTabPlay.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});
        let musicItems = await page.$$(musicClass(1).musicAll);

        for (let i = 0; i < musicItems.length; i++) {
          await expect(page).toHaveElement(musicClass(i + 1).musicPlay);
          await page.click(musicClass(1 + i).musicPlay);
          await page.waitForTimeout(2000);
          let content = await page.evaluate(async (eleClass) => {
            let name = document.querySelector(eleClass.musicName).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let artist = document.querySelector(eleClass.musicArtist).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
            let arr =  artist.split(" · ")
            if (arr.length == 1){
              return [name, arr[0], ""];
            }
            return [name, arr[0], arr[1]];
          }, musicClass(1 + i));

          await expect(content[0]).toBe(pageExtend.extendInfo["songName"]);
          await expect(content[1].replace("/", ";")).toBe(pageExtend.extendInfo["singerName"]);
          if (content[2] != ""){
            await expect(content[2]).toBe(pageExtend.extendInfo["albumName"]);
          }
        }
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },60000);

  //@description:q=胡彦斌，点击更多按钮，验证垂搜item来源为QQ音乐
  test("testMusicTabSource", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=胡彦斌\n  2. 点击更多入口\n  3. 验证垂搜item来源为QQ音乐`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_testMusicTabPlay.png"
        })
        await addAttach({attach: image, description: "垂搜tab截图"});
        let musicItems = await page.$$(musicClass(1).musicAll);

        for (let i = 0; i < musicItems.length; i++) {
          await expect(page).toHaveElement(musicClass(i + 1).musicTabSource);
          let content = await page.evaluate(async (eleClass) => {
            return document.querySelector(eleClass.musicTabSource).innerHTML.replace(/<em class="highlight">|<\/em>/g, '');
          }, musicClass(1 + i));
          await expect(content).toBeStartWith("QQ音乐");
        }
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },60000);


  //@description:q=我们顾森西音乐，验证不召回版权受限歌曲
  test("testMusicLimited", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=我们顾森西音乐\n  2. 验证不召回版权受限歌曲`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.click(tabClass.select_all);
        await page.waitForTimeout(3000);

        await pageExtend.change("我们顾森西音乐");
        await page.waitForTimeout(2000);
        await expect(page).not.toHaveElement(musicClass(0).box)
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=曾经的你，验证召回原唱歌曲并展示原唱tag
  test("testMusicOriginal", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=曾经的你\n  2. 验证召回原唱歌曲`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("曾经的你");
        await page.waitForTimeout(2000);
        let musicItems = await page.$$(musicClass(1).musicAll);
        let tagNum = 0;
        for (let i = 0; i < musicItems.length; i++) {
          let content = await page.evaluate(async (eleClass) => {
            let element = document.querySelector(eleClass.musicTagContent);
            if (element){
              return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
            }else{
              return ""
            }
          }, musicClass(1 + i));
          if (content != ""){
            await expect(content).toBe("原唱");
            tagNum ++;
          }
        }
        expect(0).toBeLessThan(tagNum);
        break;
      } catch (e) {
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:q=剩下的我承受，验证召回歌曲并展示歌词
  test("testMusicLyrics", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=剩下的我承受\n  2. 验证召回歌曲并展示歌词，命中query部分飘绿展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("剩下的我承受");
        await page.waitForTimeout(2000);
        let ele = await page.$(musicClass(0).box);
        let img = await ele.screenshot({
          path:  basedir + "./static/pic/test_testMusicLyric.png"
        })
        await addAttach({attach: img, description: "歌词音乐截图"});
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await expect(page).toHaveElement(musicClass(1 + i).musicLyric);

          let content = await page.evaluate(async (eleClass) => {
            let element = document.querySelector(eleClass.musicLyric + " em");
            if (element){
              return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
            }else{
              return ""
            }
          }, musicClass(1 + i));
          if (content != ""){
            await expect(content).toBe("剩下的我承受");
          }
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


  //@description:q=剩下的我承受，验证召回歌曲展示歌词，且与社交关系链tag互斥
  test("testMusicLyricsDisPlay", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=剩下的我承受\n  2. 验证召回歌曲并展示歌词，歌词与社交关系链tag展示互斥`
    });
    let num = 3;
    while (num != 0) {
      try {
        await pageExtend.change("剩下的我承受");
        await page.waitForTimeout(2000);
        let ele = await page.$(musicClass(0).box);
        let img = await ele.screenshot({
          path:  basedir + "./static/pic/test_testMusicLyric.png"
        })
        await addAttach({attach: img, description: "歌词音乐截图"});
        let musicItems = await page.$$(musicClass(1).musicAll);
        for (let i = 0; i < musicItems.length; i++) {
          await expect(page).toHaveElement(musicClass(1 + i).musicLyric);
          await expect(page).not.toHaveElement(musicClass(1 + i).musicRelationTag);
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

  //@description:q=剩下的我承受，点击更多跳转垂搜页，验证第一个音乐item展示歌词，且命中query部分飘绿展示
  test("testMusicTabLyrics", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入q=剩下的我承受\n  2. 点击更多跳转垂搜页\n  3. 验证第一个音乐item展示歌词，且命中query部分飘绿展示`
    });
    let num = 3;
    while (num != 0) {
      try {
        let ele = await page.$(musicClass(0).box);
        let img = await ele.screenshot({
          path:  basedir + "./static/pic/test_testMusicLyricTab.png"
        })
        await addAttach({attach: img, description: "歌词音乐截图"});

        let content = await page.evaluate(async (eleClass) => {
          let element = document.querySelector(eleClass.musicLyric + " em");
          if (element){
            return element.innerHTML.replace(/[\r\n]/g, "").replace(/\ +/g, "");
          }else{
            return ""
          }
        }, musicClass(1 ));
        if (content != "") {
          await expect(content).toBe("剩下的我承受");
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
})