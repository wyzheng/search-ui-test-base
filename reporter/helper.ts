import  * as path from "path";
import * as fs from 'fs-extra';


export const dataDirPath = path.resolve('', './static/data');
// 附加消息相关
interface IReportErrParams {
  status: string;
  context: any;
}

type TAttachObject = {
  testPath: string;
  testName: string;
  description: string;
  createTime: number;
  extName?: string;
  filePath?: string;
  fileName?: string;
};

const getJestGlobalData = (globalContext) => {
  let testPath = '';
  let currentTestName = '';
  const context = globalContext || global;
  [...Object.getOwnPropertySymbols(context)].forEach((key) => {
    if (context[key] && context[key].state && context[key].matchers) {
      const state = context[key].state || {};
      testPath = state.testPath;
      currentTestName = state.currentTestName;
    }
  });
  return { testPath, testName: currentTestName };
};

const generateRandomString = () => `${Date.now()}${Math.random()}`;

/**
 *
 * @param {string} message
 * @param {object} context. Optional. It contains custom configs
 */
export const reportError = async ({ status, context }: IReportErrParams) => {
  const { testPath, testName } = getJestGlobalData(context);
  const createTime = Date.now();
  const fileName = generateRandomString();
  const attachObject: TAttachObject = {
    createTime,
    testPath,
    testName,
    description: status,
  };
  console.log("ahahahah")
  console.log(attachObject)
  console.log(`${dataDirPath}/${fileName}.json`)
  await fs.writeJSON(`${dataDirPath}/${fileName}.json`, attachObject);
};


export const readErrorInfos = async () => {
  const result: any = {};
  try {
    const exist = await fs.pathExists(dataDirPath);
    if (!exist) {
      console.info(
        'Temp folder not exist, means that attach Infos may append unsuccessful'
      );
      return result;
    }

    const attachData = await fs.readdir(dataDirPath);
    const dataList: TAttachObject[] = await Promise.all(
      attachData.map((data) =>
        fs.readJSON(`${dataDirPath}/${data}`, { throws: false })
      )
    );
    dataList.forEach((attachObject) => {
      if (!attachObject) return;
      const {
        testPath,
        testName,
        filePath,
        description,
        fileName,
        createTime,
        extName,
      } = attachObject;
      const attachMappingName = testName || 'jest-html-reporters-file-attach';

      if (!result[testPath])
        result[testPath] = [];
      if (description == "Errored")
        result[testPath].push(testName)
      /*result[testPath][attachMappingName].push({
        filePath: filePath,
        description: description || '',
        createTime,
        extName,
      });*/

    });
  } catch (err) {
    console.error(err);
    console.error('[jest-html-reporters]: parse attach failed!');
  }
  return result;
};


// 测试结果相关
interface StructureMetaData {
  keys: (string | [string, StructureMetaData])[];
}

const usingStructure: StructureMetaData = {
  keys: [
    'numFailedTestSuites',
    'numFailedTests',
    'numPassedTestSuites',
    'numPassedTests',
    'numPendingTestSuites',
    'numPendingTests',
    'numRuntimeErrorTestSuites',
    'numTodoTests',
    'numTotalTestSuites',
    'numTotalTests',
    'startTime',
    'success',
    [
      'testResults',
      {
        keys: [
          'numFailingTests',
          'numPassingTests',
          'numPendingTests',
          'numTodoTests',
          'perfStats',
          'testFilePath',
          'failureMessage',
          [
            'testResults',
            {
              keys: [
                'ancestorTitles',
                'duration',
                'failureMessages',
                'fullName',
                'status',
                'title',
              ],
            },
          ],
        ],
      },
    ],
  ],
};

const basisClone = (obj: any, structure: StructureMetaData) => {
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => basisClone(item, structure))
  }

  const { keys } = structure;
  const res = {};
  keys.forEach(item => {
    if (typeof item === 'string') {
      res[item] = obj[item];
    } else {
      const [key, innerStructure] = item;
      res[key] = basisClone(obj[key], innerStructure)
    }
  })
  return res;
};

export const deepClone = <T>(obj: T): T => {
  const res = basisClone(obj, usingStructure);
  return JSON.parse(JSON.stringify(res));
};


// For options
const PUBLIC_PATH = 'publicPath';

const constants = {
  ENVIRONMENT_CONFIG_MAP: {
    JEST_HTML_REPORTERS_PUBLIC_PATH: PUBLIC_PATH,
  },
  DEFAULT_OPTIONS: {
    [PUBLIC_PATH]: process.cwd(),
  },
};

function getEnvOptions() {
  const options = {};
  for (const name in constants.ENVIRONMENT_CONFIG_MAP) {
    if (process.env[name]) {
      options[constants.ENVIRONMENT_CONFIG_MAP[name]] = process.env[name];
    }
  }
  return options;
}

export const getOptions = (reporterOptions = {}) =>
  Object.assign(
    {},
    constants.DEFAULT_OPTIONS,
    reporterOptions,
    getEnvOptions()
  );