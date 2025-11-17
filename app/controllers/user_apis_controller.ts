import type { HttpContext } from '@adonisjs/core/http'

export default class UserApisController {
	async index(ctx: HttpContext) {
		return ctx.response.json({ hello: 'world' })
	}
}
