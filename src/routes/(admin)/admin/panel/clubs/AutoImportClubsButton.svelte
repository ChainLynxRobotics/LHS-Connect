<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
    import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
    import { GradientButton, Helper, Modal, Tooltip } from "flowbite-svelte";
	import { InfoCircleOutline } from "flowbite-svelte-icons";
	import { string } from "yup";
	import type { Club } from "$lib/types/ClubPageData";
    import Papa from "papaparse";
	import { createEventDispatcher } from "svelte";

    let modalOpen = false;

    let startInput: ValidatedInput;
    let endInput: ValidatedInput;
    let csvInput: ValidatedTextarea;

    const dispatch = createEventDispatcher<{
        submit: Club[];
    }>();

    async function handleSubmit() {
        let strData = await csvInput.validate();
        let start = await startInput.validate();
        let end = await endInput.validate();

        try {
            const records: Club[] = [];

            let line = 0;
            Papa.parse(strData, {
                step(results) {
                    line++;
                    if (line < parseInt(start)) return;
                    if (line > parseInt(end)) return;

                    if (results.errors.length > 0) {
                        console.error(results.errors);
                        return;
                    }
                    const row = results.data as any[];

                    if (row.map((v: string)=>v.trim()).filter(v=>!!v).length < 4) return; // Skip empty-ish rows

                    var instaSearch = (/(?<=[ @,"']{0,})([a-zA-Z\d._]+?)(?= ?- ?insta)/img).exec(row[6]);
                    var instaUrlSearch = (/instagram\.com\/([a-zA-Z\d._]+)/img).exec(row[6]);
                    var insta = '';
                    if (instaSearch != null) insta = instaSearch[0];
                    if (instaUrlSearch != null) insta = instaUrlSearch[1];
                    records.push({
                        name: row[0].replace('\n', ' ').trim(),
                        day: row[3].replace('\n', ' ').trim(),
                        time: row[4].replace('\n', ' ').trim(),
                        location: row[5].replace('\n', ' ').trim(),
                        advisor: row[2].replace('\n', ' ').trim(),
                        instagram: insta || undefined,
                    });
                },
                complete() {
                    dispatch("submit", records);
                    modalOpen = false;
                },
            });
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="flex items-center gap-2">
    <GradientButton outline color="purpleToPink" on:click={()=>modalOpen = true}>Auto Import</GradientButton>
    <InfoCircleOutline class="w-6 h-6 text-gray-700 dark:text-gray-400" />
    <Tooltip>Import clubs from a CSV file, clicking this button will open a menu with instructions</Tooltip>
</div>

<Modal bind:open={modalOpen} size="lg" autoclose={false} title="Auto Import From CSV">
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Instructions: Visit the ASB club excel sheet, click on file, export as CSV (without formatting), then open the CSV and paste the content here.
    </p>
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col items-center gap-4">
        <div class="flex gap-4 flex-col sm:flex-row">
            <div>
                <ValidatedInput
                    bind:this={startInput}
                    id="start"
                    label="Start Row"
                    validator={string().matches(/^\d+$/, "Must be a number").min(1).max(3 /* Characters */).label("Start Row")}
                    visuallyRequired
                    inputProps={{ type: "number", min: 1 }}
                />
            </div>
            <div>
                <ValidatedInput
                    bind:this={endInput}
                    id="end"
                    label="End Row"
                    validator={string().matches(/^\d+$/, "Must be a number").min(1).max(3 /* Characters */).label("End Row")}
                    visuallyRequired
                    inputProps={{ type: "number", min: 1 }}
                />
            </div>
        </div>
        <div class="w-full">
            <ValidatedTextarea
                bind:this={csvInput}
                id="clubs"
                label="Data"
                validator={string().required().max(100000).label("CSV")}
                visuallyRequired
                textareaProps={{ rows: 10, placeholder: "Paste the CSV content here", autocomplete: "off", spellcheck: false, autocapitalize: "off", autocorrect: "off" }}
            />
        </div>
        <GradientButton type="submit" color="purpleToPink">Import</GradientButton>
        <Helper>Note: This will not publish the data but it will overwrite everything already in the table</Helper>
    </form>
</Modal>