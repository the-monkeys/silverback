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

router.get('/login', [SessionController, 'index'])
router.post('/login', [SessionController, 'store'])

if (process.env.NODE_ENV === 'development') {
	router.get('/users', [UserController, 'index'])
}
