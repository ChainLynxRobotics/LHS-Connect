<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Card, Modal } from 'flowbite-svelte';

	import { DiscordSolid, InstagramSolid, GithubSolid, MailBoxOutline, StarOutline } from 'flowbite-svelte-icons';
	import ExternalLink from '$components/ExternalLink.svelte';

	let copyTextModal = $state(false);
	let copyTextContent = $state('');
	function copyText(text: string) {
		navigator.clipboard.writeText(text);
		copyTextContent = text;
		copyTextModal = true;
	}
</script>

<svelte:head>
	<title>Extra @ LHS Connect</title>
</svelte:head>

	<div id="team" class="w-full max-w-4xl">
		<SectionHeader title="Meet the Team" />
		<div class="mx-auto flex flex-wrap justify-center gap-4">
			<Card padding="md" size="xs">
				<div class="flex flex-col items-center">
					<enhanced:img
						src={tylerAvatar}
						alt="Tyler"
						title="Thats meeeeee"
						class="m-4 h-24 w-24 rounded-full"
						sizes="96px, 192px"
					/>
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Tyler Place</h5>
					<span class="text-gray-500 dark:text-gray-400">Former Lead Developer</span>
					<p class="intent-8 mt-4 text-center">
						I made .
					</p>
					<div class="mt-4 flex gap-4">
						<Button
							href="mailto:contact@lhsconnect.com"
							target="_blank"
							rel="noopener"
							title="Mail"
							color="light"
							class="dark:text-white"
						>
							<MailBoxOutline size="lg" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	</div>
</div>
