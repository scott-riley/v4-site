<script>
	import Desktop from '$lib/components/Desktop.svelte';
	import About from '$lib/components/About.svelte';
	import Window from '$lib/components/Window.svelte';
</script>

<svelte:head>
	<meta property="og:image" content="https://v4-site.pages.dev/og.png" />
	<meta property="og:title" content="Scott is… making fun shit" />
	<meta
		property="og:description"
		content="Welcome, dear friend, to my little slice of the web. This is where you’ll find whatever piece of myself I have been able to plonk into the ether."
	/>
</svelte:head>

<Desktop
	initialAbout={true}
	initialScott={true}
	initialLorna={true}
	initialMD={true}
	initialWriting={false}
></Desktop>
