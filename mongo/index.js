import { readFileSync } from 'fs'
import { MongoClient, UUID } from 'mongodb'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { dbs } = JSON.parse(
  // change example.json to the file you want to use
  readFileSync(join(__dirname, './delete-example.json'), 'utf-8')
)

const args = process.argv.slice(2)
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

(async () => {
  const client = new MongoClient(connection)
  try {
    await client.connect()
    console.log('Conectado a MongoDB')

    for (const dbName of dbs) {
      const db = client.db(dbName.name)

      for (const collection of dbName.collections) {
        let query

        if (collection.where) {
          query = collection.where

          if (query._id && typeof query._id === 'string') {
            query._id = new UUID(query._id)
          }
        } else {
          query = {}
        }

        const result = await db.collection(collection.name).deleteMany(query)
        console.log(`Deleted ${result.deletedCount} docs from ${dbName.name}.${collection.name}`)
      }
    }
  } catch (error) {
    console.error('Error eliminando documentos:', error)
  } finally {
    await client.close()
  }
})()
