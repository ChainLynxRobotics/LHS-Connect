<script lang="ts">
	import { page } from '$app/stores';
	import ThemeSwitch from '$components/ThemeSwitch.svelte';
	import {
		CloseButton,
		Drawer,
		Navbar,
		NavBrand,
		Sidebar,
		SidebarWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarDropdownWrapper,
		SidebarDropdownItem,

		Avatar

	} from 'flowbite-svelte';
	import {
		AngleLeftOutline,
		ArrowLeftToBracketOutline,
		CalendarMonthOutline,
		ChartPieOutline,
		HomeOutline,
		LinkOutline,
		TableRowOutline,
	} from 'flowbite-svelte-icons';
	import Menu from 'flowbite-svelte/Menu.svelte';
	import type { Snippet } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import type { PageData } from './$types';
	import { Permission, Permissions } from '$lib/auth/permissions';
	
	interface Props {
		data: PageData;
		children?: Snippet;
	}

	let { data, children }: Props = $props();

	const pages = [
		{
			label: 'Dashboard',
			href: '/admin/panel',
			icon: ChartPieOutline
		},
		{
			label: 'Home Page',
			icon: HomeOutline,
			children: [
				{
					label: 'Bulletin Board',
					href: '/admin/panel/home/bulletin-board'
				},
				{
					label: 'Bell Schedule',
					href: '/admin/panel/home/bell-schedule'
				},
				{
					label: 'Saved Schedules',
					href: '/admin/panel/home/saved-schedules'
				},
				{
					label: 'Contact Info',
					href: '/admin/panel/home/contact-info'
				},
				{
					label: 'Useful Links',
					href: '/admin/panel/home/useful-links'
				}
			]
		},
		{
			label: 'Clubs',
			icon: TableRowOutline,
			href: '/admin/panel/clubs'
		},
		{
			label: 'Calendar',
			icon: CalendarMonthOutline,
			href: '/admin/panel/calendar'
		},
		{
			label: 'Short Links',
			icon: LinkOutline,
			href: '/admin/panel/links',
			permission: Permission.MANAGE_SHORT_LINKS
		}
	];

	let breakPoint: number = 1024;
	let width: number = $state(0);
	let mobile = $derived(width < breakPoint);

	let drawerHidden = $state(false);

	$effect(() => {
		if (!mobile) drawerHidden = false;
	}); // Default to closed on mobile

	// Close drawer on navigation
	let activeUrl = $derived($page.url.pathname);
	$effect(() => {
		if (activeUrl && mobile) drawerHidden = true;
	});
</script>

<svelte:head>
	<title>LHS Connect Admin | Panel</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />

<Drawer
	id="sidebar"
	bind:hidden={drawerHidden}
	activateClickOutside={mobile}
	backdrop={false}
	transitionType="fly"
	transitionParams={{
		x: -320,
		duration: 200,
		easing: sineIn
	}}
	width="w-64"
	class="pb-32"
	divClass="overflow-y-auto z-40 p-4 bg-gray-100 dark:bg-gray-800"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
	<Sidebar asideClass="w-54" {activeUrl}>
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded">
			<SidebarGroup>
				<SidebarItem href="/" label="Back to Public Page">
					<AngleLeftOutline
						slot="icon"
						class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</SidebarItem>
			</SidebarGroup>
			<SidebarGroup border>
				{#each pages as { label, href, icon: IconComponent, permission, children }, i}
					{#if !permission || Permissions.has(data.session, permission)}
						{#if children}
							<SidebarDropdownWrapper {label}>
								<IconComponent
									slot="icon"
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
								{#each children as { label, href }, i}
									<SidebarDropdownItem {label} {href} active={activeUrl === href} />
								{/each}
							</SidebarDropdownWrapper>
						{:else}
							<SidebarItem {href} {label}>
								<IconComponent
									slot="icon"
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</SidebarItem>
						{/if}
					{/if}
				{/each}
			</SidebarGroup>
			<SidebarGroup border>
				<SidebarItem href="/admin/panel/profile" label="Profile">
					<Avatar
						slot="icon"
						src={data.session.user.pfp}
						alt="Profile"
						class="h-6 w-6"
					/>
				</SidebarItem>
				<SidebarItem href="/admin/logout" label="Log Out" spanClass="ms-3 text-red-500 dark:text-red-400">
					<ArrowLeftToBracketOutline
						slot="icon"
						class="h-6 w-6 text-red-500 transition duration-75 dark:text-red-400"
					/>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<main class="min-h-screen w-full bg-white dark:bg-gray-900 lg:pl-64">
	<Navbar class="sticky start-0 top-0 z-20 w-full px-4">
		<div>
			<Menu on:click={() => (drawerHidden = false)} class="lg:hidden" />
		</div>
		<NavBrand href="/">
			<!-- <img src="/imgs/icon.png" alt="Logo" class="me-3 h-6 sm:h-9"> -->
			<span class="self-center whitespace-nowrap text-xl font-bold"
				>LHS Connect <i class="text-sm font-bold text-primary-500">Admin</i></span
			>
		</NavBrand>

		<ThemeSwitch />
	</Navbar>
	<div>
		{@render children?.()}
	</div>
</main>
