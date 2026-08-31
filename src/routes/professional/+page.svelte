<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Window from '$lib/components/Window.svelte';
	import Professional from '$lib/components/Professional.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Scott is… chatting</title>
	<meta property="og:image" content="https://v4-site.pages.dev/og.png" />
	<meta property="og:title" content="Scott is… chatting with nice people" />
	<meta property="og:description" content="And you could be one of them." />
</svelte:head>

<Desktop
	initialAbout={false}
	initialScott={false}
	initialLorna={false}
	initialMD={false}
	initialCourse={false}
	initialEmail={false}
>
	<Window filename="professional" initX={140} initY={20} large post onClose={() => goto('/')}>
		<Professional projects={data.projects} features={data.features} />
	</Window>
</Desktop>
