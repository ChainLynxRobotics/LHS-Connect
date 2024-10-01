<script lang="ts">
	import ValidatedInput from "$components/form/ValidatedInput.svelte";
	import ValidatedTextarea from "$components/form/ValidatedTextarea.svelte";
	import clubSchema from "$lib/schemas/clubSchema";
	import type { Club } from "$lib/types/ClubPageData";
	import { Button } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";


    export let club: Club;

    const dispatch = createEventDispatcher<{
        submit: Club;
        cancel: null;
    }>();

    let name = club.name;
    let day = club.day;
    let time = club.time;
    let location = club.location;
    let advisor = club.advisor;
    let instagram = club.instagram;
    let desc = club.desc;

    let nameInput: ValidatedInput<'name'>;
    let dayInput: ValidatedInput<'day'>;
    let timeInput: ValidatedInput<'time'>;
    let locationInput: ValidatedInput<'location'>;
    let advisorInput: ValidatedInput<'advisor'>;
    let instagramInput: ValidatedInput<'instagram'>;
    let descInput: ValidatedTextarea<'desc'>;

    async function handleEditModalSubmit(e: SubmitEvent) {
        if (
            ![
                await nameInput.validate(),
                await dayInput.validate(),
                await timeInput.validate(),
                await locationInput.validate(),
                await advisorInput.validate(),
                await instagramInput.validate(),
                await descInput.validate()
            ].every((v) => v)
        )
            return;
        const club = {
            name,
            day,
            time,
            location,
            advisor,
            instagram,
            desc
        };
        dispatch('submit', club);
    }

</script>

<form class="flex flex-col space-y-6" on:submit|preventDefault={handleEditModalSubmit}>
    <div>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Edit Club</h3>
	</div>
    <div>
		<ValidatedInput
			bind:this={nameInput}
			id="name"
			label="Name"
			bind:value={name}
			validatorObject={clubSchema}
			visuallyRequired
		/>
	</div>
    <div>
        <ValidatedInput
            bind:this={dayInput}
            id="day"
            label="Day"
            bind:value={day}
            validatorObject={clubSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={timeInput}
            id="time"
            label="Time"
            bind:value={time}
            validatorObject={clubSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={locationInput}
            id="location"
            label="Location"
            bind:value={location}
            validatorObject={clubSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={advisorInput}
            id="advisor"
            label="Advisor"
            bind:value={advisor}
            validatorObject={clubSchema}
            visuallyRequired
        />
    </div>
    <div>
        <ValidatedInput
            bind:this={instagramInput}
            id="instagram"
            label="Instagram"
            bind:value={instagram}
            validatorObject={clubSchema}
        />
    </div>
    <div>
        <ValidatedTextarea
            bind:this={descInput}
            id="desc"
            label="Description"
            bind:value={desc}
            validatorObject={clubSchema}
        />
    </div>

    <div class="mb-4 mt-6 flex gap-4 justify-center">
		<Button type="button" color="alternative" on:click={() => dispatch('cancel')}>Cancel</Button>
		<Button type="submit">Save</Button>
	</div>
</form>