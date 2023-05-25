import { WebSearchPageConfig } from "../search-page/interfaces/web-search-page-config";
import { CaseCTx} from "../search-page/interfaces/web-search-page";
import { PageExtend } from "../search-page/page-extend";
import {PageConfig} from '@tencent/web-search-puppeteer-page'


const defaultConfig: PageConfig = {
  lang: 'zh_CN',
  fontRatio: 1,
  scene: 20,
  version: 80010312,
  qqFaceFolderPath: '',
  platform: 'iOS',
  netType: 'wifi',
  type: 0,
  isHomePage: 1,
  query: ``,
  isSug: true,
  isLocalSug: false,
  sceneActionType: 1,
  sessionId: '',
  subSessionId: '',
  systemVersion: 0,
  wechatVersion: 0,
  deviceName: '',
  deviceModel: '',
  imei: '',
  deviceBrand: 'Apple',
  ostype: '',
  isClientLoading: 1,
  isOverseaApp: 0,
};

export async function setup(query: string, scene: number, uin: number, isSuperView: boolean) {
  let pageExtend = new PageExtend();
  defaultConfig.scene = scene;
  console.log(global.__TEMPLATE__);
  const stx: CaseCTx= {
    businessType: 0, page: "result", scene: 20, query:query
  }
  return await pageExtend.allocPage({
    pageCtx: stx,
    renderRemoteImage: false,
    device: 'iPhone 11 Pro Max',
    config: defaultConfig,
    context: "./asset/" + global.__TEMPLATE__,
    query: query,
    key: "1",
    uin: uin,
    isSuperview: isSuperView
  })
}