import { installCommonFn } from "./common.js"

export const installV3MS = async function (projectName) {
  return installCommonFn(projectName, {
    defaultProjectName: 'test-v3ms',
    gitUrl: 'https://github.com/mosuzi/vue3-monorepo-scaffold.git',
    cloneSuccessPrompt: '使用以下命令启动示例：',
    cloneSuccessStartCommands: ['pnpm demo']
  })
}
