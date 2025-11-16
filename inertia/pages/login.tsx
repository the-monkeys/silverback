import { Head } from '@inertiajs/react'
import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from '~/components/Login/LoginForm'

export default function Login() {
	return (
		<>
			<Head title="login" />
			<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm md:max-w-4xl">
					<LoginForm />
				</div>
			</div>
		</>
	)
}
