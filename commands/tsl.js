import { installCommonFn } from "./common.js"

export const installTSL = async function (projectName) {
  return installCommonFn(projectName, {
    defaultProjectName: 'test-tsl',
    gitUrl: 'https://github.com/mosuzi/ts-lib-starter.git'
  })
}
