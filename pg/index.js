import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import pkg from 'pg'
const { Client } = pkg

const args = process.argv.slice(2)
const __dirname = dirname(fileURLToPath(import.meta.url))

const { tables } = JSON.parse(
  // change example.json to the file you want to use
  readFileSync(join(__dirname, './delete-example.json.json'), 'utf8')
)

let connection = null

args.forEach(arg => {
  if (arg.startsWith('--connection=')) {
    connection = arg.split('=')[1]
  }
})

if (!connection) {
  console.error('Debes especificar la conexión')
  process.exit(1)
}

const client = new Client({ connectionString: connection });

(async () => {
  try {
    await client.connect()
    console.log('Conectado a Postgres')

    for (const table of tables) {
      let query
      if (table.where) {
        query = `DELETE FROM ${table.name} WHERE ${table.where}`
      } else {
        query = `DELETE FROM ${table.name}`
      }

      console.log(`Ejecutando: ${query}`)
      await client.query(query)
    }

    console.log('Datos eliminados correctamente')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.end()
  }
})()
