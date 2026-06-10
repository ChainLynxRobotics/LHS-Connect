<script lang="ts">
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, Card} from 'flowbite-svelte';
	import ExternalLink from '$components/ExternalLink.svelte';
	import { GithubSolid} from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Extra @ LHS Connect</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-16 p-4 pb-16">
	<div id="team" class="w-full max-w-4xl">
		<SectionHeader title="View Our Projects!" />
		<div class="mx-auto flex flex-wrap justify-center gap-4">
			<Card padding="md" size="xs">
				<div class="flex flex-col items-center">
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
						<ExternalLink
							text="AP Stats Practice"
							href="/extra/ap_stats_inference_practice"
						/>
					</h5>
					<span class="text-gray-500 dark:text-gray-400">A Project By <a href="/about#team">Tyler Place</a></span>
					<p class="intent-8 mt-4 text-center">
						This site is a practice tool to teach Inference Procedures for AP Statistics. 
						The user identifies the correct inference procedure for a given practice problem, and is scored on accuracy.
					</p>
					<div class="mt-4 flex gap-4">
						<Button
							href="https://github.com/1withspaghetti/AP-Stats-Inference-Practice"
							target="_blank"
							rel="noopener"
							title="Github"
							color="light"
							class="dark:text-white"
						>
							<GithubSolid size="lg" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	</div>
</div>