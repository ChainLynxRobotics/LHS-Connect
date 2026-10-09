<script lang="ts">
	import schoologyLogo from '$assets/images/logos/schoology.svg';
	import officeLogo from '$assets/images/logos/office.svg';
	import outlookLogo from '$assets/images/logos/outlook.svg';
	import lincolnLogo from '$assets/images/logos/sps.webp?enhanced';
	// no matching SPS svg
	import sourceLogo from '$assets/images/logos/source.png?enhanced';
	// no svg logo for The Source :(
	import cleverLogo from '$assets/images/logos/clever.svg';
	import collegeBoardLogo from '$assets/images/logos/collegeboard.svg';
	import khanAcademyLogo from '$assets/images/logos/khanacademy.svg';
	import schooLinksLogo from '$assets/images/logos/schooLinksLogo.png?enhanced';
	// no matching Naviance svg

	const links = [
		{
			name: 'Schoology',
			url: 'http://districtlms.seattleschools.org/',
			img: schoologyLogo,
		},
		{
			name: 'Office',
			url: 'https://portal.office.com/',
			img: officeLogo,
		},
		{
			name: 'Outlook',
			url: 'https://outlook.office.com/mail',
			img: outlookLogo,
		},
		{
			name: 'Lincoln Website',
			url: 'https://lincolnhs.seattleschools.org/',
			img: lincolnLogo,
		},
		{
			name: 'Source',
			url: 'https://ps.seattleschools.org/',
			img: sourceLogo,
		},
		{
			name: 'Clever',
			url: 'https://clever.com/in/seattleschools',
			img: cleverLogo,
		},
		{
			name: 'College Board',
			url: 'https://prod.idp.collegeboard.org/',
			img: collegeBoardLogo,
			darkInverse: true,
		},
		{
			name: 'Khan Academy',
			url: 'https://www.khanacademy.org/login',
			img: khanAcademyLogo,
		},
		{
			name: 'SchooLinks',
			url: 'https://app.schoolinks.com/login/k12',
			img: schooLinksLogo,
		},
	];
</script>

<div class="my-2 flex overflow-x-auto">
	{#each links as link}
		<a
			href={link.url}
			target="_blank"
			title={`Open ${link.name} in a new tab`}
			class="flex-shrink-0 rounded-xl px-4 py-4 transition-colors focus-within:outline-none focus-within:ring-4 hover:bg-gray-100 dark:hover:bg-gray-800 lg:px-8"
		>
			{#if typeof link.img === 'string'}
				<img
					src={link.img}
					alt={link.name + ' Logo'}
					class={`w-12 rounded ${link.darkInverse ? 'dark:invert' : ''}`}
				/>
			{:else}
				<enhanced:img
					src={link.img}
					alt={link.name + ' Logo'}
					sizes="96px, 128px"
					class={`w-12 rounded ${link.darkInverse ? 'dark:invert' : ''}`}
				/>
			{/if}
		</a>
	{/each}
</div>
