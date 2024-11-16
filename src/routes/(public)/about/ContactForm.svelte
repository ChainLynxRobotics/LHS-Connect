<script lang="ts">
	import { page } from '$app/stores';
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedSelect from '$components/form/ValidatedSelect.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import contactUsSchema from '$lib/validation/contactUsSchema';
	import { Button, type SelectOptionType } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';

	export const feedbackTypes: SelectOptionType<string>[] = [
		{ value: 'suggestion', name: 'Suggestion' },
		{ value: 'report', name: 'Incorrect Information Report' },
		{ value: 'bug', name: 'Bug Report' },
		{ value: 'other', name: 'Other' }
	];

	let emailInput: ValidatedInput<'email'> | undefined = $state();
	let typeInput: ValidatedSelect<'type'> | undefined = $state();
	let messageInput: ValidatedTextarea<'message'> | undefined = $state();

	let email = $state('');
	let type = $state($page.url.searchParams.get('type') || '');
	let message = $state('');
</script>

<SectionHeader title="Contact Us" />
<form
	onsubmit={(e) => {
		e.preventDefault();
		alert('TODO');
	}}
>
	<div class="grid gap-6 md:grid-cols-2">
		<div class="mb-6">
			<ValidatedInput
				bind:this={emailInput}
				id="email"
				label="Email"
				bind:value={email}
				visuallyRequired
				validatorObject={contactUsSchema}
				inputProps={{ type: 'email', placeholder: 'name@email.com' }}
			/>
		</div>
		<div class="mb-6">
			<ValidatedSelect
				bind:this={typeInput}
				id="type"
				label="Category"
				bind:value={type}
				visuallyRequired
				validatorObject={contactUsSchema}
				selectProps={{ items: feedbackTypes, placeholder: 'Select a category...' }}
			/>
		</div>
	</div>
	<div class="mb-6">
		<ValidatedTextarea
			bind:this={messageInput}
			id="message"
			label="Message"
			bind:value={message}
			visuallyRequired
			validatorObject={contactUsSchema}
			textareaProps={{ placeholder: 'Your message', rows: 4 }}
		/>
	</div>
	<div class="flex justify-center">
		<Button type="submit">Send <PaperPlaneOutline class="ms-2 h-5 w-5 rotate-45" /></Button>
	</div>
</form>
