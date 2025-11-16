import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Info } from 'lucide-react'
import { Form } from '@inertiajs/react'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form className="p-6 md:p-8" method="POST">
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Welcome</h1>
								<p className="text-muted-foreground text-balance">Login to Silverback</p>
							</div>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input id="email" type="email" name="email" placeholder="m@example.com" required />
							</Field>
							<Field>
								<Button type="submit">Login</Button>
							</Field>
							<FieldDescription className="text-center flex items-center gap-2">
								<Info /> If unable to login contact administrator
							</FieldDescription>
						</FieldGroup>
					</Form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="/placeholder.svg"
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
