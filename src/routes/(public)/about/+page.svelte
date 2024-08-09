<script lang="ts">
    import SectionHeader from '$components/SectionHeader.svelte';
	import { Card } from 'flowbite-svelte';

    import lincolnBuilding from '$assets/images/lincolnbuilding.webp?enhanced';
    import tylerAvatar from '$assets/images/avatars/tyler.jpg?enhanced';
    import nathanAvatar from '$assets/images/avatars/nathan.jpg?enhanced';
    
    
</script>

<svelte:head>
	<title>LHS Connect | About</title>
</svelte:head>

<div class="w-full flex flex-col items-center p-4 gap-16">
    <div class="w-full max-w-4xl">
        <enhanced:img src={lincolnBuilding} alt="Lincoln High School" class="w-full h-32 sm:h-64 object-cover object-bottom rounded-lg" />
    </div>
	<div class="w-full max-w-4xl">
        <SectionHeader title="About LHS Connect" />
        <p class="indent-8 mt-4 sm:mt-12">
            Built by students, for students, LHS Connect is a utility website that aims to provide
            students with a centralized location for all of their school-related information. Started
            in 2022 in CS Projects at LHS, the website has since grown to include a variety of features
            from a calendar to a short link generator.
        </p>
        <br>
        <p class="indent-8">
            This website is not affiliated with Lincoln High School nor Seattle Public Schools. However,
            most of the information on this website is sourced from official school sources and some
            features are unofficially approved by staff members. If you have any questions or concerns,
            please contact us using the information below.
        </p>
    </div>
    <div class="w-full max-w-4xl">
        <SectionHeader title="Meet the Team" />
        <div class="mx-auto flex flex-wrap justify-center gap-4">
            <Card padding="md" size="xs">
                <div class="flex flex-col items-center">
                    <enhanced:img src={tylerAvatar} alt="Tyler" title="Thats meeeeee" class="w-24 h-24 rounded-full m-4" sizes="96px, 192px" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Tyler Place</h5>
                    <span class="text-gray-500 dark:text-gray-400">Lead Developer</span>
                    <p class="intent-8 mt-4 text-center">
                        LHS Senior with a passion for making websites, petting dogs, and thriving as your local <span title=":3">protogen cosplayer</span>.
                    </p>
                </div>
            </Card>
            <Card padding="md" size="xs">
                <div class="flex flex-col items-center">
                    <enhanced:img src={nathanAvatar} alt="Nathan" class="w-24 h-24 rounded-full m-4" sizes="96px, 192px" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Nathaniel Holden</h5>
                    <span class="text-gray-500 dark:text-gray-400">Assistant Developer</span>
                    <p class="intent-8 mt-4">
                        I'm a LHS Senior who likes to program as a hobby. In my free time I enjoy working on cars, skiing, snowboarding, mountain biking, and wakeboarding.
                    </p>
                </div>
            </Card>
        </div>
    </div>
</div>