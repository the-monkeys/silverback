'use client'

import * as React from 'react'
import { Flag, PieChart, Shield, ShieldOff, UserRoundCog } from 'lucide-react'

import { NavMain } from '~/components/nav-main'
import { NavProjects } from '~/components/nav-projects'
import { NavUser } from '~/components/nav-user'
import { TeamSwitcher } from '~/components/team-switcher'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '~/components/ui/sidebar'

// This is sample data.
const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	teams: [
		{
			name: 'Development',
			logo: Shield,
			plan: 'Enterprise',
		},
		{
			name: 'Production',
			logo: ShieldOff,
			plan: 'Startup',
		},
	],
	navMain: [
		{
			title: 'User Management',
			url: '#',
			icon: UserRoundCog,
			isActive: true,
			items: [
				{
					title: 'Create',
					url: '/user-management/create',
				},
			],
		},
	],
	projects: [
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: PieChart,
		},
		{
			name: 'Reports',
			url: '/reports',
			icon: Flag,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
