<script>
	import { goto } from '$app/navigation';
	import Desktop from '$lib/components/Desktop.svelte';
	import Professional from '$lib/components/Professional.svelte';
	import Window from '$lib/components/Window.svelte';
	import PostContent from '$lib/components/PostContent.svelte';

	let { data } = $props();
</script>

<Desktop
	initialAbout={false}
	initialScott={false}
	initialLorna={false}
	initialMD={false}
	initialCourse={false}
>
	<Window filename="professional" initX={140} initY={20} large post onClose={() => goto('/')}>
		<Professional projects={data.projects} features={data.features} />
	</Window>

	<Window
		filename={data.meta.url}
		initX={260}
		initY={10}
		large
		post
		onClose={() => goto('/professional')}
		browserWindow
		browserURL={data.meta.url}
	>
		<iframe src={data.meta.url} width="100%" height="100%" />
	</Window>
</Desktop>
