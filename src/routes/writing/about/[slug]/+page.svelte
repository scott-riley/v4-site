<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Writing from '$lib/components/Writing.svelte';
	import Window from '$lib/components/Window.svelte';
	import PostContent from '$lib/components/PostContent.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<Desktop
	initialAbout={false}
	initialScott={false}
	initialLorna={false}
	initialMD={false}
	initialCourse={false}
>
	<Window filename="writing" initX={140} initY={20} large>
		<Writing posts={data.posts} externalPosts={data.externalPosts} />
	</Window>

	<Window
		filename={data.meta.title}
		initX={260}
		initY={10}
		large
		post
		onClose={() => goto('/writing')}
	>
		<PostContent meta={data.meta} html={data.html} />
	</Window>
</Desktop>
