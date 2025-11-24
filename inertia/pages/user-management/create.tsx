import { Head } from '@inertiajs/react'
import { FormEvent, ReactNode } from 'react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Calendar28 } from '~/components/ui/date-picker'
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/Textarea'
import Layout from '~/layouts/homelayout'

function UserManagementCreate() {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)
		console.log(formData)
	}

	return (
		<>
			<Head title="User management" />
			<div className="max-w-4xl w-full mx-auto px-4 py-10">
				<div>
					<h1 className="text-3xl font-semibold">Create User</h1>
					<p className="font-light">Create users for monkeys dev server</p>
				</div>
			</div>

			<div className="mx-auto max-w-4xl w-full px-4">
				<form method="POST" onSubmit={handleSubmit}>
					<FieldGroup className="grid grid-cols-12 gap-4">
						<Field className="col-span-12 sm:col-span-6">
							<FieldLabel htmlFor="email">First name</FieldLabel>
							<Input type="text" name="first_name" placeholder="John" required />
						</Field>

						<Field className="col-span-12 md:col-span-6">
							<FieldLabel htmlFor="email">Last name</FieldLabel>
							<Input type="text" name="last_name" placeholder="Smith" required />
						</Field>

						<Field className="col-span-12 md:col-span-6">
							<FieldLabel htmlFor="location">Location</FieldLabel>
							<Input type="text" name="location" placeholder="joe@email.com" required />
						</Field>

						<Field className="col-span-12 md:col-span-6">
							<FieldLabel htmlFor="contact_number">Contact number</FieldLabel>
							<Input type="text" name="contact_number" placeholder="+919870269199" required />
						</Field>

						<Field className="col-span-12">
							<Calendar28
								name="birth_date"
								label={<FieldLabel htmlFor="bio">Birth date</FieldLabel>}
							/>
						</Field>

						<Field className="col-span-12">
							<FieldLabel htmlFor="bio">Bio</FieldLabel>
							<Textarea name="bio" placeholder="Enter bio" />
						</Field>

						<Field className="col-span-12" orientation="horizontal">
							<Switch name="is_verified" />
							<FieldLabel htmlFor="">Is verified?</FieldLabel>
						</Field>

						<div className="flex col-span-12 gap-1">
							<Checkbox id="redirect-toggle" />
							<Label htmlFor="redirect-toggle">Redirct to created user</Label>
						</div>

						<Field className="col-span-12" orientation="horizontal">
							<Button type="submit" className="cursor-pointer">
								Create
							</Button>
							<Button type="reset" className="cursor-pointer" variant="outline">
								Reset
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</>
	)
}

UserManagementCreate.layout = (page: ReactNode) => <Layout children={page} />

export default UserManagementCreate
