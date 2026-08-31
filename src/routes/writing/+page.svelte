<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Writing from '$lib/components/Writing.svelte';
	import Window from '$lib/components/Window.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Scott is… writing</title>
	<meta property="og:image" content="https://v4-site.pages.dev/og.png" />
	<meta property="og:title" content="Scott is… writing" />
	<meta property="og:description" content="Musings on tech, design, and the Web." />
</svelte:head>

<Desktop
	initialAbout={false}
	initialScott={false}
	initialLorna={true}
	initialMD={false}
	initialCourse={true}
>
	<Window filename="writing" initX={140} initY={20} large onClose={() => goto('/')}>
		<Writing posts={data.posts} externalPosts={data.externalPosts} />
	</Window>
</Desktop>
