import chalk from 'chalk'
import ora from 'ora'
import downloadGit from 'download-git-repo'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import fs from 'node:fs'

export const installV3MS = async function (projectName, tools) {
  //   const { ora, downloadGit, chalk, fs, input } = tools
  if (!projectName || projectName === true) {
    projectName = await input({ message: '输入项目名称：', default: 'test-v3ms' })
  }
  if (fs.existsSync(projectName)) {
    console.log(chalk.cyan('目标目录已存在'))
    const rmTargetDir = await confirm({
      message: '覆盖目标目录？',
      theme: {
        style: {
          defaultAnswer(text) {
            return chalk.cyan('Y') + '/n'
          }
        }
      }
    })
    if (!rmTargetDir) process.exit(1)
    fs.rmSync(projectName, { recursive: true, force: true })
  }
  const spinner = ora('正在克隆...')
  const logGuide = function () {
    console.log('克隆完成。使用以下命令启动示例：')
    const cdCommandToast = chalk.green(`cd ${projectName}`)
    const installCommandToast = chalk.green('pnpm i')
    const serverCommandToast = chalk.green('pnpm serve')
    console.log()
    console.group()
    console.log(cdCommandToast)
    console.log(installCommandToast)
    console.log(serverCommandToast)
    console.groupEnd()
    console.log()
  }
  spinner.start()
  downloadGit(
    'direct:https://github.com/mosuzi/vue3-monorepo-scaffold.git#main',
    projectName,
    { clone: true },
    err => {
      err
        ? (spinner.fail(), console.log(chalk.red('克隆失败', err)))
        : (spinner.succeed(), logGuide())
    }
  )
}
