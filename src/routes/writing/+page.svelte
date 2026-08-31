<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Writing from '$lib/components/Writing.svelte';
	import Window from '$lib/components/Window.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Scott is… writing</title>
</svelte:head>

<Desktop
	initialAbout={false}
	initialScott={true}
	initialLorna={true}
	initialMD={false}
	initialCourse={true}
>
	<Window filename="writing" initX={140} initY={20} large onClose={() => goto('/')}>
		<Writing posts={data.posts} externalPosts={data.externalPosts} />
	</Window>
</Desktop>
