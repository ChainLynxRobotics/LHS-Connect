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
		SidebarDropdownItem
	} from 'flowbite-svelte';
	import {
		AngleLeftOutline,
		ArrowLeftToBracketOutline,
		CalendarMonthOutline,
		ChartPieOutline,
		ChartPieSolid,
		HomeOutline,
		HomeSolid,
		LinkOutline,
		TableRowOutline,
		UserCircleOutline
	} from 'flowbite-svelte-icons';
	import Menu from 'flowbite-svelte/Menu.svelte';
	import { sineIn } from 'svelte/easing';

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
			href: '/admin/panel/links'
		}
	];

	let breakPoint: number = 1024;
	let width: number;

	let drawerHidden = false;

	$: mobile = width < breakPoint;
	$: if (!mobile) drawerHidden = false; // Default to closed on mobile

	$: activeUrl = $page.url.pathname;

	// Close drawer on navigation
	$: if (activeUrl && mobile) drawerHidden = true;
</script>

<svelte:head>
	<title>LHS Connect Admin | Panel</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />

<Drawer
	bind:hidden={drawerHidden}
	activateClickOutside={mobile}
	backdrop={mobile}
	transitionType="fly"
	transitionParams={{
		x: -320,
		duration: 200,
		easing: sineIn
	}}
	width="w-64"
	class="pb-32"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
	<Sidebar asideClass="w-54" {activeUrl}>
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded">
			<SidebarGroup>
				<SidebarItem href="/" label="Back to Public Page">
					<svelte:fragment slot="icon">
						<svelte:component
							this={AngleLeftOutline}
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
			<SidebarGroup border>
				{#each pages as { label, href, icon, children }, i}
					{#if children}
						<SidebarDropdownWrapper {label}>
							<svelte:fragment slot="icon">
								<svelte:component
									this={icon}
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
							{#each children as { label, href }, i}
								<SidebarDropdownItem {label} {href} active={activeUrl === href} />
							{/each}
						</SidebarDropdownWrapper>
					{:else}
						<SidebarItem {href} {label}>
							<svelte:fragment slot="icon">
								<svelte:component
									this={icon}
									class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
					{/if}
				{/each}
			</SidebarGroup>
			<SidebarGroup border>
				<SidebarItem href="/admin/panel/account" label="Account">
					<svelte:fragment slot="icon">
						<svelte:component
							this={UserCircleOutline}
							class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem label="Log Out" spanClass="ms-3 text-red-500 dark:text-red-400">
					<svelte:fragment slot="icon">
						<svelte:component
							this={ArrowLeftToBracketOutline}
							class="h-6 w-6 text-red-500 transition duration-75 dark:text-red-400"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<main class="w-full lg:pl-64">
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
		<slot />
	</div>
</main>
