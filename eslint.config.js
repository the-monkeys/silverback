import { configApp } from '@adonisjs/eslint-config'
export default configApp([
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 4,
				},
			],
			'@unicorn/filename-case': ['off', { case: 'snakeCase' }],
		},
	},
])
