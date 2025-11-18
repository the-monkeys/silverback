import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
	index({ inertia }: HttpContext) {
		return inertia.render('login')
	}

	async store(ctx: HttpContext) {
		const { email } = ctx.request.only(['email'])

		ctx.logger.info('Login requested by user', email)

		const user = await User.findBy('email', email)

		if (user) {
			await ctx.auth.use('web').login(user)
			return ctx.response.redirect('/')
		}

		ctx.logger.warn(email, 'not found')

		return ctx.inertia.render('login')
	}
}
