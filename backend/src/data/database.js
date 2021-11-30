import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { LowSync, JSONFileSync } from 'lowdb'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'data.json')
const adapter = new JSONFileSync(file)
const db = new LowSync(adapter)
db.read();

export default db;