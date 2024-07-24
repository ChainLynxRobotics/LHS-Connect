<script lang="ts">
    import { page } from '$app/stores'
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { ChevronDownOutline } from 'flowbite-svelte-icons';

    $: activeUrl = $page.url.pathname;

    let activeClass = 'rounded-none md:border-b-4 border-red-500';
    let inactiveClass = 'rounded-none';
</script>

<Navbar class="px-4 sticky w-full z-20 top-0 start-0 border-b shadow-md bg-gray-200">
    <NavBrand href="/">
        <!-- <img src="/imgs/icon.png" alt="Logo" class="me-3 h-6 sm:h-9"> -->
        <span class="self-center whitespace-nowrap text-xl font-bold">LHS Connect</span>
    </NavBrand>
    <NavHamburger />
    <NavUl {activeUrl} {activeClass} {inactiveClass}>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/info">Links & Info</NavLi>
        <NavLi href="/clubs">Club List</NavLi>
        <NavLi href="/calendar">Calendar</NavLi>
        <NavLi class="cursor-pointer">
            More<ChevronDownOutline class="w-6 h-6 ms-2 text-primary-800 dark:text-white inline" />
        </NavLi>
        <Dropdown class="w-44 z-20">
            <DropdownItem href="/link-generator">Short Link Generator</DropdownItem>
            <DropdownItem href="/file-transfer">File Transfer</DropdownItem>
            <DropdownItem href="/about">About</DropdownItem>
            <DropdownItem href="/contact">Contact</DropdownItem>
        </Dropdown>
    </NavUl>
</Navbar>
<slot></slot>