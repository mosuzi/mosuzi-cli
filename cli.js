import { program } from 'commander'

import { installV3MS } from './index.js'

program
  .command('v3ms [name]')
  .description('download v3ms into a specified dictionary')
  .action(name => {
    installV3MS(name)
  })

program.version('1.0.0', '-v, -V, --version')

program.parse()
