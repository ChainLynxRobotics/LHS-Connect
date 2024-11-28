<script lang="ts">
	import ValidatedInput from '$components/form/ValidatedInput.svelte';
	import ValidatedTextarea from '$components/form/ValidatedTextarea.svelte';
	import { GradientButton, Helper, Modal, Tooltip } from 'flowbite-svelte';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import { string } from 'yup';
	import Papa from 'papaparse';
	import type { IClub } from '$lib/types/crud/club';
	import type { WithoutID } from '$lib/types/crud/globalCrud';

	interface Props {
		onSubmit: (clubs: WithoutID<IClub>[]) => void;
	}

	let { onSubmit: submit }: Props = $props();

	let modalOpen = $state(false);

	let startInput: ValidatedInput | undefined = $state();
	let endInput: ValidatedInput | undefined = $state();
	let csvInput: ValidatedTextarea | undefined = $state();

	async function onsubmit(event: Event) {
		event.preventDefault();
		let strData = await csvInput!.validate();
		let start = await startInput!.validate();
		let end = await endInput!.validate();

		try {
			const records: WithoutID<IClub>[] = [];

			let line = 0;
			Papa.parse(strData, {
				step(results) {
					line++;
					if (start !== undefined && line < parseInt(start)) return;
					if (end !== undefined && line > parseInt(end)) return;

					if (results.errors.length > 0) {
						console.error(results.errors);
						return;
					}

					const row = results.data as any[];

					if (row[0] == 'Club' && line == 1) return; // Skip header
					if (row.map((v: string) => v.trim()).filter((v) => !!v).length < 4) return; // Skip empty-ish rows

					// Search for instagram username
					var instaSearch = /@?([a-zA-Z\d._]+)( ?- ?insta(gram)?)?/gim.exec(row[5]);
					var instaUrlSearch = /instagram\.com\/([a-zA-Z\d._]+)/gim.exec(row[5]);
					var insta = '';
					if (instaSearch != null) insta = instaSearch[1];
					if (instaUrlSearch != null) insta = instaUrlSearch[1];

					records.push({
						name: row[0].replace('\n', ' ').trim() || 'Unknown',
						day: row[2].replace('\n', ' ').trim() || 'Unknown',
						time: row[3].replace('\n', ' ').trim() || 'Unknown',
						location: row[1].replace('\n', ' ').trim() || 'Unknown',
						advisor: row[6].replace('\n', ' ').trim() || 'Unknown',
						instagram: insta.replace('@', '') || undefined,
						desc: row[7].replace('\n', ' ').trim() || undefined
					});
				},
				complete() {
					console.log('Parsed', records.length, 'clubs', records);
					console.log(JSON.stringify(records, null, 2));
					submit(records);
					modalOpen = false;
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="flex items-center gap-2">
	<GradientButton outline color="purpleToPink" on:click={() => (modalOpen = true)}
		>Auto Import</GradientButton
	>
	<InfoCircleOutline class="h-6 w-6 text-gray-700 dark:text-gray-400" />
	<Tooltip
		>Import clubs from a CSV file, clicking this button will open a menu with instructions</Tooltip
	>
</div>

<Modal bind:open={modalOpen} size="lg" autoclose={false} title="Auto Import From CSV">
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		Instructions: Visit the ASB club excel sheet, click on file, export as CSV (without formatting),
		then open the CSV and paste the content here.
	</p>
	<form {onsubmit} class="flex flex-col items-center gap-4">
		<div class="flex flex-col gap-4 sm:flex-row">
			<div>
				<ValidatedInput
					bind:this={startInput}
					id="start"
					label="Start Row"
					validator={string()
						.optional()
						.matches(/^\d*$/, 'Must be a number')
						.max(4 /* Characters */)
						.label('Start Row')}
					inputProps={{ type: 'number' }}
				/>
			</div>
			<div>
				<ValidatedInput
					bind:this={endInput}
					id="end"
					label="End Row"
					validator={string()
						.optional()
						.matches(/^\d*$/, 'Must be a number')
						.max(4 /* Characters */)
						.label('End Row')}
					inputProps={{ type: 'number' }}
				/>
			</div>
		</div>
		<div class="w-full">
			<ValidatedTextarea
				bind:this={csvInput}
				id="clubs"
				label="Data"
				validator={string().required().max(100000).label('CSV')}
				visuallyRequired
				textareaProps={{
					rows: 10,
					placeholder: 'Paste the CSV content here',
					autocomplete: 'off',
					spellcheck: false,
					autocapitalize: 'off',
					autocorrect: 'off'
				}}
			/>
		</div>
		<GradientButton type="submit" color="purpleToPink">Import</GradientButton>
		<Helper
			>Note: This will not publish the data but it will overwrite everything already in the table</Helper
		>
	</form>
</Modal>
