import { setup } from "../../lib/utils/setup"
import {reportError} from "../../reporter/helper";


describe("test#测试demo", () => {

  beforeAll(async () => {
    console.log("hi")
    console.log(global.__TEMPLATE__)
  });

  afterAll(async () =>{

    }
  );

  beforeEach(() => {
  })

  test("test_change#测试切换搜索词", async () => {
    let num = 3;
    while (num != 0) {
      try {
        let pageExtend = await setup("testBidPicAlt", 20, 3191396391, false);
        await pageExtend.change("nihao")
        console.log(num);
        break;
      } catch (e) {
        await reportError({context: undefined, status: "Errored"})
        throw e;
      }
    }
  }, 500000);

  test("test_error1#测试错误", async () => {
    let num = 3;
    while (num != 0) {
      try {
        throw new Error("EIHEIEHI");
      } catch (e) {
        await reportError({context: undefined, status: "Errored"})
        throw e;
      }
    }
  }, 500000);

})

