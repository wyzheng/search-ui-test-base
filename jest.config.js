var args = require('minimist')(process.argv.slice(2));
console.log("ahahahahah")
console.log(args)
const template = "fts_template-alpha-03291857-v80010188"
const resPath = "test"

module.exports = {
  //mark：0426 升级puppeteer 19.11.1 报错Error: ws does not work in the browser. Browser clients must use the native WebSocket object
  // 注释掉env以后好使了
  // testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  setupFilesAfterEnv: ["./jest.setup.js",'./lib/utils/jest-extend.ts'],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  rootDir: ".",
  globals: {
    __TEMPLATE__: template,
  },
  reporters:[
    "default",
    [
      "@tencent/jest-report-search/lib/report.js",
      {
        publicPath: `./static/res/${resPath}`
      }
    ]
  ],
};

