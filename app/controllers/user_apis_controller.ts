import { Bcrypt } from '@adonisjs/core/hash/drivers/bcrypt'
import type { HttpContext } from '@adonisjs/core/http'
import { MonkeysDB } from 'drizzle/db.js'
import { userAccount, userAuthInfo } from 'drizzle/schema.js'

export default class UserApisController {
	async index(ctx: HttpContext) {
		return ctx.response.json({ hello: 'world' })
	}
	async createUser(ctx: HttpContext) {
		ctx.logger.info('User created by ' + ctx.auth.user)

		const body = ctx.request.body()

		const newUser = {
			accountId: body.accountId,
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			username: body.username,
			userStatus: Number(body.userStatus),
		} satisfies typeof userAccount.$inferInsert

		try {
			const newUserId = await MonkeysDB.insert(userAccount)
				.values(newUser)
				.returning({ id: userAccount.id })

			if (newUserId.length === 0) {
				ctx.logger.error('Failed to create user')

				ctx.response.status(500)
				return ctx.response.json({
					status: 'error',
					error: 'Failed to creat user',
				})
			}

			const passwordHash = await new Bcrypt({ saltSize: 10 }).make(body.password)

			const newUserAuth = {
				authProviderId: 1, // for now default will be monkeys
				emailValidationStatus: body.email_validation_status,
				passwordHash,
				userId: newUserId[0].id,
			} satisfies typeof userAuthInfo.$inferInsert

			await MonkeysDB.insert(userAuthInfo).values(newUserAuth)
		} catch (e) {
			ctx.logger.error(e)

			return ctx.response.json({ status: 'error', error: e })
		}
	}
}
