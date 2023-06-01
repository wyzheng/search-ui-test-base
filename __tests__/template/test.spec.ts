import {
  getHeightOfEle,
  getLeftOfEle,
  getLineNum,
  getOCRRes,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "jest-html-reporters/helper";
import { bizWeAppClass, bizWeAppsList } from "../../lib/utils/resultMap";


let page: Puppeteer.Page;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:todo
//@description:todo
describe("todo", () => {

  beforeAll(async () => {
    pageExtend = await setup("todo", 20, 3192443972, false);
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

  //@description:todo
  test("todo", async () => {
    await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. \n  2. \n 3. `
    });
    let num = 3;
    while (num != 0) {
      try {
        //todo 编写校验详情

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