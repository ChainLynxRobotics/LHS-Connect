<script lang="ts">
	import type { FooterData } from '$lib/types/GlobalPageData';

	interface Props {
		data: FooterData;
	}

	let { data }: Props = $props();
</script>

<footer class="mt-16 w-full bg-gray-100 p-8 text-gray-500 dark:bg-gray-800 dark:text-gray-500">
	<div class="flex flex-wrap justify-center gap-8 lg:gap-16">
		{#each data.usefulLinks.cards as card}
			<div>
				<h3 class="mb-2 text-lg font-bold">{card.title}</h3>
				{#if card.subtitle}
					<p class="text-xs">{card.subtitle}</p>
				{/if}
				<ul class="list-none">
					{#each card.links as link}
						<li class="mb-1">
							<a href={link.url} target="_blank" rel="noopener" class="underline">{link.title}</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
	<div class="my-8 h-[1px] bg-current lg:mx-16"></div>
	<div class="mb-4 text-center">
		<a href="/about#contact" class="underline">Contact</a>
		<span class="mx-2">•</span>
		<a href="/about?type=report#contact" class="underline">Report Incorrect Information</a>
		<span class="mx-2">•</span>
		<a href="/discord" target="_blank" class="underline">Discord</a>
	</div>
	<p class="text-center text-xs">
		This website is not affiliated with Lincoln High School or Seattle Public Schools.
	</p>
</footer>
