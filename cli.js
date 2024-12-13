import { program } from 'commander'
import { installV3MS, installTSL } from './index.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const packageInfo = require('./package.json')

program
  .command('v3ms [name]')
  .description('download v3ms into a specified dictionary')
  .action(name => {
    installV3MS(name)
  })

program.command('tsl [name]')
.description('download a ts lib scaffold into a specified dictionary')
.action(name => {
  installTSL(name)
})

program.version(packageInfo.version, '-v, -V, --version')

program.parse()
