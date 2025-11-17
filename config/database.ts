import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const DB_NAME = env.get('NODE_ENV') === 'production' ? 'data/silverback.db' : 'test.db'

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
		psql: {
			client: 'pg',
			connection: {
				host: env.get('DB_HOST'),
				port: env.get('DB_PORT'),
				database: env.get('DB_DATABASE'),
				user: env.get('DB_USER'),
				password: env.get('DB_PASSWORD'),
			},
		},
	},
})

export default dbConfig
