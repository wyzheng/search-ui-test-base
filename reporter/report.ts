// my-custom-reporter.js
import { readErrorInfos, deepClone, dataDirPath, getOptions } from "./helper";
import * as fse from 'fs-extra';
import { Config } from '@jest/types';


class MyCustomReporter {
  _options;
  _publishResourceDir: string;

  constructor(globalConfig: Config.GlobalConfig, options) {
    const { filename = '' } = options;
    this._options = getOptions(options);
    this.init();
  }

  async onRunComplete(contexts, originalResults){
    const results = deepClone(originalResults) as any;
    const  errorInfos = await readErrorInfos();
    const paths =  Object.keys(errorInfos);
    // 更新测试结果
    for (let i = 0; i < results.testResults.length; i++) {
      if (paths.indexOf(results.testResults[i].testFilePath) != -1){
        for (let j = 0; j < results.testResults[i].testResults.length; j++) {
          if (errorInfos[results.testResults[i].testFilePath].indexOf(results.testResults[i].testResults[j].fullName) != -1){
            results.testResults[i].testResults[j].status = "errored";
          }
        }
      }
      // 更新caseId
      for (let j = 0; j < results.testResults[i].testResults.length; j++) {
        let caseId = ""
        let pref = results.testResults[i].testFilePath.split("/");
        pref[pref.length - 1] = pref[pref.length - 1].split(".")[0];
        let index = pref.indexOf("__tests__");
        for (let k = index + 1; k < pref.length; k++) {
          caseId += pref[k]+ ".";
        }
        let caseName = results.testResults[i].testResults[j].title;
        caseId += caseName;
        results.testResults[i].testResults[j].caseId = caseId;
      }
    }

    console.log(results.testResults[0].testResults);

    let fileName = `${Date.now()}${Math.random()}`
    await fse.writeJSON(`${this._options.publicPath}/${fileName}.json`, results);
    this.removeTempDir();
  }

  init() {
    this.initAttachDir();
  }

  initAttachDir() {
    this.removeTempDir();
    fse.mkdirpSync(dataDirPath);
  }

  removeTempDir() {
    fse.removeSync(dataDirPath);
  }
}

module.exports = MyCustomReporter;

