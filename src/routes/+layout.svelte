<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';
	import Window from '$lib/components/Window.svelte';
	import '$lib/assets/style.css';
	let { children } = $props();
	import { desktopState } from '../shared.svelte.js';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Geist+Pixel&family=Jersey+10&family=Silkscreen:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://kit.fontawesome.com/1467108498.js" crossorigin="anonymous"></script>
	<title>Scott is… making fun shit</title>
</svelte:head>

<div class="windows">
	{@render children()}
	{#if desktopState.showMusic}
		<Window
			filename="this_weeks_rotation"
			initX={740}
			initY={340}
			initZ={999}
			player
			large
			miniPlayer={desktopState.miniPlayer}
			onClose={() => (desktopState.showMusic = false)}
		>
			<MusicPlayer />
		</Window>
	{/if}
</div>

<style>
	.windows {
		width: 100vw;
		height: calc(100vh - 42px);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
	}
</style>
