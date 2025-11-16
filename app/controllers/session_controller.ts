import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
	index({ inertia, response, auth }: HttpContext) {
		if (auth.isAuthenticated) {
			return response.redirect('/')
		}

		return inertia.render('login')
	}

	async store({ request, auth, inertia, response }: HttpContext) {
		const { email } = request.only(['email'])

		const user = await User.findBy('email', email)

		if (user) {
			await auth.use('web').login(user)
			return response.redirect('/')
		}

		return inertia.render('login')
	}
}
