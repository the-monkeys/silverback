import { usePage } from '@inertiajs/react'
import { Fragment, ReactNode } from 'react'
import { AppSidebar } from '~/components/app-sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '~/components/ui/breadcrumb'
import { Separator } from '~/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
	const page = usePage()

	const breadcrumbs = page.url.split('/').toSpliced(0, 1)

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((breadcrumb, index) => {
									const Component =
										index === breadcrumbs.length - 1 ? BreadcrumbPage : BreadcrumbLink

									return (
										<Fragment key={index}>
											<BreadcrumbItem>
												<Component href={'/' + breadcrumbs.slice(0, index + 1).join('/')}>
													{breadcrumb
														.split(/-| /)
														.filter(Boolean)
														.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
														.join(' ')}
												</Component>
											</BreadcrumbItem>

											{index !== breadcrumbs.length - 1 && (
												<BreadcrumbSeparator className="hidden md:block" />
											)}
										</Fragment>
									)
								})}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
