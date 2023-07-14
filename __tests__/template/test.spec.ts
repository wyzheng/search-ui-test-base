import {
  getHeightOfEle,
  getLeftOfEle,
  getLineNum,
  getOCRRes,
} from "../../lib/utils/tools";
import { setup } from "../../lib/utils/setup";
import { Page, Browser } from "puppeteer";
import { PageExtend } from "../../lib/search-page/page-extend";
import { addAttach, addMsg } from "jest-html-reporters/helper";
import { bizWeAppClass, bizWeAppsList } from "../../lib/utils/resultMap";


let page: Page;
let browser:  Browser;
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
        if (num == 1){
          throw e;
        }
        num--;
      }
    }
  },50000);


})