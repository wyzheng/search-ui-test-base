import {setup} from "../../lib/utils/setup";
import Puppeteer from "puppeteer";
import {PageExtend} from "../../lib/search-page/page-extend";
import {
  getLeftOfEle,
  getLineNum,
  getOCRRes,
  getSizeOfEle,
  compareImagesWithResemble,
  channelOperation, getBottomHeightOfEle, getTopHeightOfEle
} from "../../lib/utils/tools";
import {articleClass, bizWeAppsList, channelClass} from "../../lib/utils/resultMap";
import {addMsg} from "jest-html-reporters/helper";
import exp from "constants";


let page: Puppeteer.Page ;
let browser:  Puppeteer.Browser;
let pageExtend: PageExtend;
let resArr = [];
let num = 0;
let pass = 0;
let fail = 0;
let err = 0;

//@owner:joycesong
//@description:视频号组件测试
describe("testChannel", () => {

  beforeAll(async () => {
    pageExtend = await setup("李子柒", 20, 3191396391, false);
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

  //@description:query = 李子柒，验证各个入口页召回视频号
  test("testChannelRecall", async () => {
   /* await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,在各个入口发起搜索\n  2. 检查混排页是否召回视频号动态box`
    });*/
    let num = 3;
    while (num != 0) {
      try {
        const image = await page.screenshot({
          path: "./static/pic/test_testChannelstyle.png"
        })
        // await addAttach({attach: image, description: "页面截图"});
        await expect(page).toHaveElement(channelClass.channel);
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },5000000);

  //@description:query = 李子柒，验证样式正确
  test("testChannelStyle", async () => {
   /* await addMsg({
      context: undefined,
      message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查混排页的视频号动态样式和设计稿一致`
    });*/
    let num = 3;
    while (num != 0) {
      try {
        let channelBoxEle = await page.$(channelClass.boxBound);
        let imgPath = "./static/pic_diff/test_testChannelstyle.png"
        const image = await channelBoxEle.screenshot({
          path: imgPath
        })
       // await addAttach({attach: image, description: "页面截图"});
        let diffPercent = await compareImagesWithResemble(imgPath, './static/pic/test_testChannelstyle.png')
        console.log(diffPercent)
        await expect(diffPercent).toBe(0)
        break;
      } catch (e) {
        if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证高亮
  test("testChannelBoxHighlight", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查检查文章高亮`
    // });
    let num = 3;
    while (num != 0) {
      try {
        let channelEle = await page.$(channelClass.boxLeft);
        let highlightEle = await page.$$(channelClass.highlight);
        const image = await channelEle.screenshot({
          path: "./static/pic/test_testChannelhighlight.png"
        })
        const matchingElements = await Promise.all(
          highlightEle.map(async (el) => await el.evaluate((el) => el.outerHTML))
        );
        const notMatchingElements = await channelEle.evaluate((el) =>
          el.outerHTML.replace(/<em class="highlight">.*?<\/em>/g, ''));
        const querySet = new Set("李子柒".split(''));
        const matchingEleSet = new Set(matchingElements);
        const notMatchingEleSet = new Set(notMatchingElements.split(''));
        const match = new Set([...querySet].filter(x => matchingEleSet.has(x)));
        const notMatch = new Set([...querySet].filter(x => notMatchingEleSet.has(x)));
        expect(Array.from(match).join('') != '');
        expect(Array.from(notMatch).join('') == '');
        break;
      } catch (e) {
        if (num == 1) {
          if (num == 1) {
            throw e;
          }
          num--;
        }
      }
    }
  },50000);

  //@description:query = 李子柒，验证左右box上下高度对齐
  test("testChannelDescWithoutAvatar", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查视频号描述信息不超过3行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        let eleLeft = await page.$(channelClass.boxLeft);
        await page.waitForSelector(channelClass.boxRight);
        let eleRight = await page.$(channelClass.boxRight);
        const image = await eleLeft.screenshot({
          path: "./static/pic/test_testchanneldesc1.png"
        })
        let Height1 = await getTopHeightOfEle(page, eleLeft);
        let Height2 = await getTopHeightOfEle(page, eleRight);
        let Bottom1 = await getBottomHeightOfEle(page, eleLeft);
        let Bottom2 = await getBottomHeightOfEle(page, eleRight);
        expect(Height1).toBe(Height2);
        expect(Bottom1).toBe(Bottom2);
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证无点赞信息的情况下视频号描述不超过2行
  test("testChannelDescWithoutAvatar", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查视频号描述信息不超过3行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.descLeft);
        let ele = await page.$(channelClass.descLeft);
        const image = await ele.screenshot({
          path: "./static/pic/test_testchanneldesc1.png"
        })
        let linNum = await getLineNum("./static/pic/test_testChanneldesc1.png");
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

  //@description:query = 李子柒，验证有点赞信息的情况下视频号描述不超过1行
  test("testChannelDescWithAvatar", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查视频号描述信息不超过4行`
    // });
    let num = 3;
    while (num != 0) {
      try {
        //调用接口点赞该视频号动态
        channelOperation('cutebot111', 1, 13852287066425727020)
        await page.waitForSelector(channelClass.descRight);
        let ele = await page.$(channelClass.descRight);
        const image = await ele.screenshot({
          path: "./static/pic/test_testChanneldesc2.png"
        })
        let linNum = await getLineNum("./static/pic/test_testChanneldesc2.png");
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

  //@description:query = 李子柒，检查外显的点赞人数与实际点赞人数一致
  test("testChannelSocialInfo", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 检查外显的点赞人数与实际点赞人数一致`
    // });
    let num = 3;
    while (num != 0) {
      try {
        //调用接口点赞该视频号动态
        //channelOperation('cutebot111', 1, 13852287066425727020)
        await page.waitForSelector(channelClass.socialInfo);
        let ele = await page.$(channelClass.socialInfo);
        const image = await ele.screenshot({
          path: "./static/pic/test_testChannelsocialinfo.png"
        })
        let socialInfo = await getOCRRes("./static/pic/test_testChannelsocialinfo.png");

        let likeNum = parseInt(socialInfo["ocr_comm_res"]["items"][0]["text"].match(/\d+/g));
        expect(likeNum).toBe(3);
        break;
      } catch (e) {
        if (num == 1) {
           throw e;
          }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证视频号动态点击
  test("testChannelClick", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态，验证是否跳转到视频号动态落地页`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        await page.click(channelClass.boxLeft);
        const image = await page.screenshot({
          path: "./static/pic/test_testArticleClick.png"
        })
        //await addAttach({attach: image, description: "垂搜截图"});
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);

  //@description:query = 李子柒，验证视频号动态点击中的播放按钮点击
  test("testVideoPlayerClick", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态点击中的播放按钮点击，验证是否跳转到视频号feed页`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.videoPlayer);
        await page.click(channelClass.videoPlayer);
        const image = await page.screenshot({
          path: "./static/pic/test_testchannelclick.png"
        })
        //await addAttach({attach: image, description: "垂搜截图"});
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);


  //@description:query = 李子柒，验证视频号动态落地页操作
  test("testChannelClick", async () => {
    // await addMsg({
    //   context: undefined,
    //   message: ` 测试步骤：\n  1. 输入搜索query=李子柒,发起搜索\n  2. 点击视频号动态，验证是否跳转到视频号动态落地页`
    // });
    let num = 3;
    while (num != 0) {
      try {
        await page.waitForSelector(channelClass.boxLeft);
        await page.click(channelClass.boxLeft);
        const image = await page.screenshot({
          path: "./static/pic/test_testArticleClick.png"
        })
        await expect(pageExtend.extendInfo).toBe("")
        break;
      } catch (e) {
         if (num == 1) {
          throw e;
        }
        num--;
      }
    }
  },50000);
  // //@description:query = 随申办，验证公众号带事业单位标签
  // test("testBizTag", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=随申办,发起搜索\n  2. 验证公众号带事业单位标签`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       let content = await page.evaluate(async (eleClass) => {
  //         let item = document.querySelector(eleClass);
  //         return item.innerHTML;
  //       }, bizWeAppsList(1, 1, 0).accountTagTitle);
  //       content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
  //       await expect(content).toBe("事业单位");
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);

  // //@description:query = 上海发布，验证公众号带政府标签
  // test("testBizGovernmentTag", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=上海发布,发起搜索\n  2. 检查公众号带政府标签`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       //await pageExtend.change("上海发布");
  //       let content = await page.evaluate(async (eleClass) => {
  //         let item = document.querySelector(eleClass);
  //         return item.innerHTML;
  //       }, bizWeAppsList(1, 0, 0).accountTagTitle);
  //       content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
  //       await expect(content).toBe("政府");
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  // //@description:query = 界面新闻，验证公众号带媒体标签
  // test("testBIzMediaTag", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=界面新闻,发起搜索\n  2. 公众号带媒体标签`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       let content = await page.evaluate(async (eleClass) => {
  //         let item = document.querySelector(eleClass);
  //         return item.innerHTML;
  //       }, bizWeAppsList(1, 0, 0).accountTagTitle);
  //       content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
  //       await expect(content).toBe("媒体");
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  // //@description:query = 中国国画石，验证公众号带其他组织标签
  // test("testBizOtherTag", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=中国国画石,发起搜索\n  2. 公众号带其他组织标签`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       let content = await page.evaluate(async (eleClass) => {
  //         let item = document.querySelector(eleClass);
  //         return item.innerHTML;
  //       }, bizWeAppsList(1, 0, 0).accountTagTitle);
  //       content = content.replace(/[\r\n]/g, "").replace(/\ +/g, "");
  //       await expect(content).toBe("其他组织");
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  // //@description:query = 中医蔡锦芳，验证公众号来源为"个人"
  // test("testPersonalBiz", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=中医蔡锦芳,发起搜索\n  2. 验证公众号来源为\"个人\" `
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       //await pageExtend.change("中医蔡锦芳");
  //       let ele = await page.waitForSelector(bizWeAppsList(1, 0, 1).accountSourceText)
  //       const image = await ele.screenshot({
  //         path: "./static/pic/test_testbiztag.png"
  //       })
  //
  //       let content = await page.evaluate(async (eleClass)  => {
  //         let item = document.querySelector(eleClass);
  //         return item.innerHTML;
  //       }, bizWeAppsList(1, 0, 1).accountSourceText);
  //       await expect(content).toBe("个人");
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  // //@description:query = 极摄会，验证公众号账号无认证
  // test("testBizNoAuth", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=极摄会,发起搜索\n  2. 验证公众号账号无认证`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       //await pageExtend.change("极摄会");
  //       const image = await page.screenshot({
  //         path: "./static/pic/test_testbiztag.png"
  //       })
  //       await expect(page).not.toHaveElement(bizWeAppsList(1, 0, 0).accountSourceIcon);
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  // //@description:query = 民权碧桂园，验证混排不召回公众号(封禁账号)
  // test("testNoBIzRecall", async () => {
  //   await addMsg({
  //     context: undefined,
  //     message: ` 测试步骤：\n  1. 输入搜索query=民权碧桂园,发起搜索\n  2. 验证混排不召回公众号`
  //   });
  //   let num = 3;
  //   while (num != 0) {
  //     try {
  //       //await pageExtend.change("中医蔡锦芳");
  //       const image = await page.screenshot({
  //         path: "./static/pic/test_testbiztag.png"
  //       })
  //       await expect(page).not.toHaveElement(bizWeAppsList(0, 0, 0).account.split(":")[0]);
  //       break;
  //     } catch (e) {
  //       if (num == 1) {
  //         if (e.constructor.name == "JestAssertionError") {
  //           fail++;
  //         } else {
  //           err++;
  //           await addMsg({
  //             context: undefined,
  //             message: `测试任务出错...`
  //           });
  //         }
  //         throw e;
  //       }
  //       num--;
  //     }
  //   }
  // },50000);
  //
  test("> 测试结果汇总", async () => {
    num = num - 1;
    pass = num - fail - err;
    resArr = [num, pass, fail, err];
    await addMsg({context: undefined, message: `当前测试集合共有${num}条用例，其中测试通过${pass}条，测试失败${fail}条，测试任务失败${err}条`});
  }, 5000);

})