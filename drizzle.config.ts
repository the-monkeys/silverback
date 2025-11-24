// drizzle.config.ts
import type { Config } from 'drizzle-kit'
import 'dotenv/config' // Make sure to load environment variables

const { env } = process
export default {
	schema: './drizzle/schema.ts', // Path where your Drizzle schema files will be generated
	dbCredentials: {
		url: `postgresql://${env['DB_USER']}:${env['DB_PASSWORD']}@${env['DB_HOST']}:${env['DB_PORT']}/${env['DB_DATABASE']}`,
	},
	dialect: 'postgresql',
} satisfies Config
