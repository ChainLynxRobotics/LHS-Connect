<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedSelect from '$components/form/ValidatedSelect.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import contactUsSchema from '$lib/schemas/contactUsSchema';
	import { Button, type SelectOptionType } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';

	let email: ValidatedInput<'email'>;
	let type: ValidatedSelect<'type'>;
	let message: ValidatedTextarea<'message'>;

	export const feedbackTypes: SelectOptionType<string>[] = [
		{ value: 'feedback', name: 'General Feedback' },
		{ value: 'suggestion', name: 'Suggestion' },
		{ value: 'report', name: 'False Information Report' },
		{ value: 'bug', name: 'Bug Report' },
		{ value: 'other', name: 'Other' }
	];
</script>

<SectionHeader title="Contact Us" />
<form>
	<div class="grid gap-6 md:grid-cols-2">
		<div class="mb-6">
			<ValidatedInput
				bind:this={email}
				id="email"
				label="Email"
				validatorObject={contactUsSchema}
				inputProps={{ type: 'email', placeholder: 'name@email.com' }}
			/>
		</div>
		<div class="mb-6">
			<ValidatedSelect
				bind:this={type}
				id="type"
				label="Feedback Type"
				validatorObject={contactUsSchema}
				selectProps={{ items: feedbackTypes, placeholder: 'Select a feedback type...' }}
			/>
		</div>
	</div>
	<div class="mb-6">
		<ValidatedTextarea
			bind:this={message}
			id="message"
			label="Message"
			validatorObject={contactUsSchema}
			textareaProps={{ placeholder: 'Your message', rows: 4 }}
		/>
	</div>
	<div class="flex justify-center">
		<Button type="submit">Send <PaperPlaneOutline class="ms-2 h-5 w-5 rotate-45" /></Button>
	</div>
</form>
