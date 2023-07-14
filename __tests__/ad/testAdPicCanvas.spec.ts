import {setup} from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import {PageExtend} from "../../lib/search-page/page-extend";
import { adAccountClass, wxAdClass } from "../../lib/utils/resultMap";
import { addAttach, addMsg } from "@tencent/jest-report-search/lib/helper";
import { bizOperation, getHeightOfEle, superView } from "../../lib/utils/tools";
import fs from "fs";

let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:joycesong
//@description:微信超级品专广告
describe("testAdPicCanvas", () => {

    beforeAll(async () => {
        await superView(6404900485, "wxid_igb6en2soegm12");
        pageExtend = await setup("wxadtestPicCanvas", 20, 3190188057, true);
        page = pageExtend.webSearchPage.instance;
        browser = pageExtend.browser;
    });

    afterAll(async () => {
        if (!page.isClosed()) {
            await browser.close();
        }
        /*let str = "wxadtestPicCanvas_"
        for (const item in resArr) {
            str += resArr[item] + "_"
        }
        str += "\n";
        const path = "./static/res/result.txt"
        fs.writeFile(path, str ,{mode:0o666, flag:'a'},(err)=>{
            if (err){
                console.log('文件写入失败',err)
            }else{
                console.log('文件写入成功')
            }
        })*/
    });
    beforeEach(() => {
        num = num + 1;
    })


    test("> 测试结果汇总", async () => {
        num = num - 1;
        pass = num - fail - err;
        resArr = [num, pass, fail, err];
        await addMsg({context: undefined, message: `当前测试集合共有 ${num} 条用例，其中测试通过 ${pass} 条，测试失败 ${fail} 条，测试任务失败 ${err} 条`});
    }, 5000)

})