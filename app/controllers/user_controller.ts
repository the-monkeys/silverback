import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
	/**
	 * Display a list of resource
	 */
	async index({ inertia }: HttpContext) {
		return inertia.render('user-management/create')
	}
}
