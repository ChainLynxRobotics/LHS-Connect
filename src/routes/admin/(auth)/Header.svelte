<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import ThemeSwitch from '$components/ThemeSwitch.svelte';

	$: activeUrl = $page.url.pathname;

	const activeClass = 'rounded-none md:border-b-4 border-primary-500';
	const inactiveClass = 'rounded-none';
</script>

<Navbar
	class="sticky start-0 top-0 z-20 w-full border-b bg-gray-100 px-4 shadow-md dark:bg-gray-800"
>
	<NavBrand href="/">
		<!-- <img src="/imgs/icon.png" alt="Logo" class="me-3 h-6 sm:h-9"> -->
		<span class="self-center whitespace-nowrap text-xl font-bold"
			>LHS Connect <i class="text-sm font-bold text-primary-500">Admin</i></span
		>
	</NavBrand>

	<div class="flex md:order-2">
		<ThemeSwitch />
		<NavHamburger />
	</div>

	<NavUl {activeUrl} {activeClass} {inactiveClass}>
		<NavLi href="/">Back to Home</NavLi>
		<NavLi href="/admin/login">Log In</NavLi>
		<NavLi href="/admin/register">Register</NavLi>
		<NavLi href="/admin/panel">Panel</NavLi>
	</NavUl>
</Navbar>
