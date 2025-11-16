import { Head } from '@inertiajs/react'
import { JSX } from 'react'
import Layout from '~/layouts/homelayout'

function Home() {
	return (
		<>
			<Head title="Homepage" />
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="bg-muted/50 aspect-video rounded-xl" />
				<div className="bg-muted/50 aspect-video rounded-xl" />
				<div className="bg-muted/50 aspect-video rounded-xl" />
			</div>
			<div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
		</>
	)
}

Home.layout = (page: JSX.Element) => <Layout children={page} />

export default Home
