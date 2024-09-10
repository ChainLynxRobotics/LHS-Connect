<script lang="ts">
	import { GradientButton, Modal, Tooltip } from "flowbite-svelte";
	import { InfoCircleOutline } from "flowbite-svelte-icons";

    let modalOpen = false;
</script>

<div class="flex items-center gap-2">
    <GradientButton outline color="purpleToPink">Auto Import</GradientButton>
    <InfoCircleOutline class="w-6 h-6 text-gray-700 dark:text-gray-400" />
    <Tooltip>Import clubs from a CSV file, clicking this button will open a menu with instructions</Tooltip>
</div>

<Modal bind:open={modalOpen} size="lg" autoclose={false}>
    TODO
</Modal>