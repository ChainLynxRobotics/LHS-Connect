<script lang="ts">
	import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
    import { GradientButton, Helper, Modal, Tooltip } from "flowbite-svelte";
	import { InfoCircleOutline } from "flowbite-svelte-icons";
	import { string } from "yup";

    let modalOpen = false;

    let clubsInput: ValidatedTextarea;

    async function handleSubmit() {
        let strData = await clubsInput.validate();
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
        <div class="w-full">
            <ValidatedTextarea
                bind:this={clubsInput}
                id="clubs"
                label="Data"
                validator={string().required().max(10000).label("CSV")}
                visuallyRequired
                textareaProps={{ rows: 10, placeholder: "Paste the CSV content here" }}
            />
        </div>
        <GradientButton type="submit" color="purpleToPink">Import</GradientButton>
        <Helper>Note: This will not publish the data but it will overwrite everything already in the table</Helper>
    </form>
</Modal>