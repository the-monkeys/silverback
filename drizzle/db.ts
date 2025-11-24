import { drizzle } from 'drizzle-orm/node-postgres'
import env from '#start/env'

export const MonkeysDB = drizzle(
	`postgresql://${env.get('DB_USER')}:${env.get('DB_PASSWORD')}@${env.get('DB_HOST')}:${env.get('DB_PASSWORD')}/${env.get('DB_DATABASE')}`
)
