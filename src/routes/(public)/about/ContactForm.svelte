<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedSelect from '$components/form/ValidatedSelect.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import SectionHeader from '$components/SectionHeader.svelte';
	import { Button, type SelectOptionType } from 'flowbite-svelte';
	import { PaperPlaneOutline } from 'flowbite-svelte-icons';

	let validate = false;

	let formIsValid = {
		email: false,
		type: false,
		message: false
	};
	let formValues = {
		email: '',
		type: '',
		message: ''
	};

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
				id="email"
				label="Email"
				{validate}
				bind:isValid={formIsValid.email}
				bind:value={formValues.email}
				required
				pattern={/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
				inputProps={{ type: 'email', placeholder: 'name@email.com' }}
			/>
		</div>
		<div class="mb-6">
			<ValidatedSelect
				id="type"
				label="Feedback Type"
				{validate}
				bind:isValid={formIsValid.type}
				bind:value={formValues.type}
				required
				selectProps={{ items: feedbackTypes, placeholder: 'Select a feedback type...' }}
			/>
		</div>
	</div>
	<div class="mb-6">
		<ValidatedTextarea
			id="message"
			label="Message"
			{validate}
			bind:isValid={formIsValid.message}
			bind:value={formValues.message}
			required
			textareaProps={{ placeholder: 'Your message', rows: 4 }}
		/>
	</div>
	<div class="flex justify-center">
		<Button type="submit">Send <PaperPlaneOutline class="ms-2 h-5 w-5 rotate-45" /></Button>
	</div>
</form>
