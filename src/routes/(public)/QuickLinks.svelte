<script lang="ts">
	import schoologyLogo from '$lib/images/schoology.png?enhanced';
	import officeLogo from '$lib/images/office.svg';
	import outlookLogo from '$lib/images/outlook.svg';
	import lincolnLogo from '$lib/images/sps.webp?enhanced';
	import sourceLogo from '$lib/images/source.png?enhanced';
	import cleverLogo from '$lib/images/clever.webp?enhanced';
	import collegeBoardLogo from '$lib/images/collegeboard.png?enhanced';
	import khanAcademyLogo from '$lib/images/khanacademy.svg';
	import navianceLogo from '$lib/images/naviance.png?enhanced';

	const links = [
		{
			name: 'Schoology',
			url: 'http://districtlms.seattleschools.org/',
			img: schoologyLogo
		},
		{
			name: 'Office',
			url: 'https://portal.office.com/',
			img: officeLogo
		},
		{
			name: 'Outlook',
			url: 'https://outlook.office.com/mail',
			img: outlookLogo
		},
		{
			name: 'Lincoln Website',
			url: 'https://lincolnhs.seattleschools.org/',
			img: lincolnLogo
		},
		{
			name: 'Source',
			url: 'https://ps.seattleschools.org/',
			img: sourceLogo
		},
		{
			name: 'Clever',
			url: 'https://clever.com/in/seattleschools',
			img: cleverLogo
		},
		{
			name: 'College Board',
			url: 'https://prod.idp.collegeboard.org/',
			img: collegeBoardLogo,
			darkInverse: true
		},
		{
			name: 'Khan Academy',
			url: 'https://www.khanacademy.org/login',
			img: khanAcademyLogo
		},
		{
			name: 'Naviance',
			url: 'https://clever.com/oauth/authorize?channel=clever-portal&client_id=998d799b68dd5e1b6a57&confirmed=true&district_id=580a531143e0d00100000157&redirect_uri=https%3A%2F%2Fid.naviance.com%2Fclever%2Fredirect&response_type=code',
			img: navianceLogo
		}
	];
</script>

<div class="w-full overflow-auto">
	<div class="my-4 flex justify-center">
		{#each links as link}
			<a
				href={link.url}
				target="_blank"
				title={`Open ${link.name} in a new tab`}
				class="flex-shrink-0 rounded-xl px-4 py-4 transition-colors focus-within:outline-none focus-within:ring-4 hover:bg-gray-200 dark:hover:bg-gray-700 lg:px-8"
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
</div>
