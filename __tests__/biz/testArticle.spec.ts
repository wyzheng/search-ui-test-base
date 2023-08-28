import {setup} from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import {PageExtend} from "../../lib/search-page/page-extend";
import {getLeftOfEle, getLineNum, getOCRRes, getSizeOfEle, getTopHeightOfEle} from "../../lib/utils/tools";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import {articleClass} from "../../lib/utils/resultMap";


let page: Page ;
let browser:  Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;
let  basedir = __dirname.split("__tests__")[0];

//@owner:miyawei
//@description:文章组件测试
describe("testArticle", () => {

  beforeAll(async () => {
    pageExtend = await setup("《漫长的季节》里，最“爹”的人", 20, 2549809343, false);
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

  //@description:query = 《漫长的季节》里，最“爹”的人，验证混排页召回文章
  test("testArticleRecall", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 检查混排页是否召回公众号box`
    });
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_articlerecall.png"
        })
        await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement("div.basic-block-article-info");
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，验证高亮
  test("testBIzBoxHighlight", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 检查检查文章高亮`
    });
    let num = 3;
    while (num != 0) {
      try {
        let articleEle = await page.$(articleClass.box);
        let highlightEle = await page.$$(articleClass.highlight);
        const matchingElements = await Promise.all(
          highlightEle.map(async (el) => await el.evaluate((el) => el.outerHTML))
        );
        const notMatchingElements = await articleEle.evaluate((el) =>
          el.outerHTML.replace(/<em class="highlight">.*?<\/em>/g, ''));
        const querySet = new Set("爹味漫长的季节".split(''));
        const matchingEleSet = new Set(matchingElements);
        const notMatchingEleSet = new Set(notMatchingElements.split(''));
        const match = new Set([...querySet].filter(x => matchingEleSet.has(x)));
        const notMatch = new Set([...querySet].filter(x => notMatchingEleSet.has(x)));
        expect(Array.from(match).join('') != '');
        expect(Array.from(notMatch).join('') == '');
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，验证文章标题不超过1行
  test("testArticleTitle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 检查文章标题不超过一行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(articleClass.title);
        let ele = await page.$(articleClass.title);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_articletitle.png"
        })
        await addAttach({attach: image, description: "标题截图"});
        let linNum = await getLineNum( basedir + "./static/pic/test_articletitle.png");
        expect(linNum).toBeLessThanOrEqual(1);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，验证文章描述不超过两行
  test("testArticleDesc", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 检查文章描述不超过两行`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(articleClass.desc);
        let ele = await page.$(articleClass.desc);
        const image = await ele.screenshot({
          path:  basedir + "./static/pic/test_articledesc.png"
        })
        await addAttach({attach: image, description: "描述截图"});
        let linNum = await getLineNum( basedir + "./static/pic/test_articledesc.png");
        expect(linNum).toBeLessThanOrEqual(2);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，验证文章描述、标题、来源是否左对齐
  test("testArticleInfoStyle", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 验证文章描述、文章标题、文章来源是否左对齐`
    });
    let num = 3;
    while (num != 0) {
      try {
        let left1 = await getLeftOfEle(page, articleClass.title);
        let left2 = await getLeftOfEle(page, articleClass.thumb);
        let left3 = await getLeftOfEle(page, articleClass.desc);
        let left4 = await getLeftOfEle(page, articleClass.source);

        expect(left1).toBe(left2)
        expect(left3).toBe(left4)
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，验证文章图片、描述是否有重合
  test("testArticleInfoStyle2", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 验证page, articleClass.thumb`
    });
    let num = 3;
    while (num != 0) {
      try {
        let [width_thumb, height_thumb] = await getSizeOfEle(page, articleClass.thumb);
        let right = await getLeftOfEle(page, articleClass.thumb) + width_thumb;
        let left = await getLeftOfEle(page, articleClass.desc);
        expect(left >= right)
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 《漫长的季节》里，最“爹”的人，点击文章跳转到url为https://mp.weixin.qq.com/s?search_click_id=9079140861221277054-1692265974580-3841856713&__biz=MzI5MzA0MDQ5Mw==&mid=2659023385&idx=2&sn=fe735f7df803c2582f26405c77522981&chksm=f7f1e21bc0866b0db087c2b3be8d912697c28fbeff82d6835be6f7f8e7c46bcefdec9e9a3950#rd
  test("testArticleBoxClick", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=《漫长的季节》里，最“爹”的人,发起搜索\n  2. 点击文章主体，验证是否跳转到文章H5页`
    });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(articleClass.box);
        await page.click(articleClass.box);
        await page.waitForTimeout(2000);
        const image = await page.screenshot({
          path:  basedir + "./static/pic/test_articleclick.png"
        })
        await addAttach({attach: image, description: "垂搜截图"});
        await expect(pageExtend.url).toBe("https://mp.weixin.qq.com/s?search_click_id=9079140861221277054-1692265974580-3841856713&__biz=MzI5MzA0MDQ5Mw==&mid=2659023385&idx=2&sn=fe735f7df803c2582f26405c77522981&chksm=f7f1e21bc0866b0db087c2b3be8d912697c28fbeff82d6835be6f7f8e7c46bcefdec9e9a3950#rd");
        break;
      } catch (e) {
        if (num == 1) {
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