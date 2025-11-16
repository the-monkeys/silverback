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
		},
	},
])
