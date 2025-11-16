import { Head } from '@inertiajs/react'

function Home() {
	return (
		<>
			<Head title="Homepage" />
		</>
	)
}

Home.layout = (page) => (
	<Layout>
		<Home />
	</Layout>
)

export default Home
