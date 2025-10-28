import { spawn } from 'child_process'

const args = process.argv.slice(2)

let dbType = 'mongo'
let connection = null

args.forEach(arg => {
  if (arg.startsWith('--db=')) {
    dbType = arg.split('=')[1]
  }
  if (arg.startsWith('--connection=')) {
    connection = arg.split('=')[1]
  }
})

if (!connection) {
  console.error('Debes especificar la conexión con --connection')
  process.exit(1)
}

const script = dbType === 'postgres' ? './pg/index.js' : './mongo/index.js'

const child = spawn('node', [script, `--connection=${connection}`], {
  stdio: 'inherit'
})

child.on('exit', (code) => {
  process.exit(code)
})
