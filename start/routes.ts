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
const HomeController = () => import('#controllers/home_controller')
const UserController = () => import('#controllers/user_controller')
const SessionController = () => import('#controllers/session_controller')

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
if (process.env.NODE_ENV === 'development') {
	router.get('/user-management/create', [UserController, 'index']).use(middleware.auth())
	router.get('/api/users/create-user', [UserController, 'index']).use(middleware.auth())
}
