<script lang="ts">
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import ThemeSwitch from './ThemeSwitch.svelte';

	$: activeUrl = $page.url.pathname;

	const activeClass = 'rounded-none md:border-b-4 border-red-500';
	const inactiveClass = 'rounded-none';
</script>

<Navbar class="sticky start-0 top-0 z-20 w-full border-b bg-gray-100 dark:bg-gray-800 px-4 shadow-md">
	<NavBrand href="/">
		<!-- <img src="/imgs/icon.png" alt="Logo" class="me-3 h-6 sm:h-9"> -->
		<span class="self-center whitespace-nowrap text-xl font-bold">LHS Connect</span>
	</NavBrand>
	<div class="flex">
		<NavUl {activeUrl} {activeClass} {inactiveClass}>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/info">Links & Info</NavLi>
			<NavLi href="/clubs">Club List</NavLi>
			<NavLi href="/calendar">Calendar</NavLi>
			<NavLi class="cursor-pointer">
				More<ChevronDownOutline class="text-primary-800 ms-2 inline h-6 w-6 dark:text-white" />
			</NavLi>
			<Dropdown class="z-20 w-44">
				<DropdownItem href="/link-generator">Short Link Generator</DropdownItem>
				<DropdownItem href="/file-transfer">File Transfer</DropdownItem>
				<DropdownItem href="/about">About</DropdownItem>
				<DropdownItem href="/contact">Contact</DropdownItem>
			</Dropdown>
		</NavUl>

		<ThemeSwitch />
		<NavHamburger />
	</div>
</Navbar>
