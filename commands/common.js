import chalk from 'chalk'
import ora from 'ora'
import downloadGit from 'download-git-repo'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import fs from 'node:fs'

export const installCommonFn = async function (projectName, {
    defaultProjectName,
    gitUrl,
    branch = 'main',
    cloneSuccessPrompt = '使用以下命令安装依赖：',
    cloneSuccessStartCommands = []
} = {}) {
  if (!projectName || projectName === true) {
    projectName = await input({ message: '输入项目名称：', default: defaultProjectName })
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
    console.log(`克隆完成。${cloneSuccessPrompt}`)
    const cdCommandToast = chalk.green(`cd ${projectName}`)
    const installCommandToast = chalk.green('pnpm i')
    const successCommands = cloneSuccessStartCommands.map(text => chalk.green(text))
    console.log()
    console.group()
    console.log(cdCommandToast)
    console.log(installCommandToast)
    successCommands.forEach((cmd) => {
      console.log(cmd)
    })
    console.groupEnd()
    console.log()
  }
  spinner.start()
  downloadGit(
    `direct:${gitUrl}#${branch}`,
    projectName,
    { clone: true },
    err => {
      err
        ? (spinner.fail(), console.log(chalk.red('克隆失败', err)))
        : (spinner.succeed(), logGuide())
    }
  )
}
