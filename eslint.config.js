import { configApp } from '@adonisjs/eslint-config'
export default configApp([
	{
		rules: {
			'prettier/prettier': 'off',
			'@unicorn/filename-case': ['off', { case: 'snakeCase' }],
		},
	},
])
