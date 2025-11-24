/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import env from '#start/env'
const HomeController = () => import('#controllers/home_controller')
const UserController = () => import('#controllers/user_controller')
const SessionController = () => import('#controllers/session_controller')
const UserApisController = () => import('#controllers/user_apis_controller')

router.get('/', [HomeController, 'index']).use(middleware.auth())

router.get('/login', [SessionController, 'index']).use(middleware.guest())
router.post('/login', [SessionController, 'store'])
router
	.get('/logout', async ({ auth, response }) => {
		await auth.use('web').logout()
		return response.redirect('/login')
	})
	.use(middleware.auth())

// Development server specific apis
if (env.get('NODE_ENV') === 'development') {
	router.get('/user-management/create', [UserController, 'index']).use(middleware.auth())
	router.post('/api/users/create-user', [UserApisController, 'createUser']).use(middleware.auth())
}
