<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedSelect from '$components/form/ValidatedSelect.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import contactUsSchema from '$lib/schemas/contactUsSchema';
	import { Button, type SelectOptionType } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';

	export const feedbackTypes: SelectOptionType<string>[] = [
		{ value: 'feedback', name: 'General Feedback' },
		{ value: 'suggestion', name: 'Suggestion' },
		{ value: 'report', name: 'False Information Report' },
		{ value: 'bug', name: 'Bug Report' },
		{ value: 'other', name: 'Other' }
	];

	let emailInput: ValidatedInput<'email'>;
	let typeInput: ValidatedSelect<'type'>;
	let messageInput: ValidatedTextarea<'message'>;
</script>

<SectionHeader title="Contact Us" />
<form on:submit|preventDefault={() => alert('TODO')}>
	<div class="grid gap-6 md:grid-cols-2">
		<div class="mb-6">
			<ValidatedInput
				bind:this={emailInput}
				id="email"
				label="Email"
				visuallyRequired
				validatorObject={contactUsSchema}
				inputProps={{ type: 'email', placeholder: 'name@email.com' }}
			/>
		</div>
		<div class="mb-6">
			<ValidatedSelect
				bind:this={typeInput}
				id="type"
				label="Feedback Type"
				visuallyRequired
				validatorObject={contactUsSchema}
				selectProps={{ items: feedbackTypes, placeholder: 'Select a feedback type...' }}
			/>
		</div>
	</div>
	<div class="mb-6">
		<ValidatedTextarea
			bind:this={messageInput}
			id="message"
			label="Message"
			visuallyRequired
			validatorObject={contactUsSchema}
			textareaProps={{ placeholder: 'Your message', rows: 4 }}
		/>
	</div>
	<div class="flex justify-center">
		<Button type="submit">Send <PaperPlaneOutline class="ms-2 h-5 w-5 rotate-45" /></Button>
	</div>
</form>
