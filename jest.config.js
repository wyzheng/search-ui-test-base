var args = require('minimist')(process.argv.slice(2));
console.log("ahahahahah")
console.log(args)
const template = "fts_template-alpha-11161748-v80009792"
const resPath = "test"

module.exports = {
  testEnvironment: "jsdom",
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
      "./reporter/report.js",
      {
        "publicPath":`./static/res/${resPath}`
      }
    ],
    [
      "jest-html-reporters",
      {
        "pageTitle":"Jest Report",
        "publicPath":`./static/res/${resPath}`,
        "expand":true,
        "inlineSource":true
      }
    ],
  ],
};

