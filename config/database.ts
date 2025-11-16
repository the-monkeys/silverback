import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const DB_NAME = env.get('NODE_ENV') === 'production' ? 'silverback.db' : 'test.db'

const dbConfig = defineConfig({
	connection: 'sqlite',
	connections: {
		sqlite: {
			client: 'sqlite3',
			connection: {
				filename: DB_NAME,
			},
			migrations: {
				naturalSort: true,
				paths: ['database/migrations'],
			},
		},
	},
})

export default dbConfig
