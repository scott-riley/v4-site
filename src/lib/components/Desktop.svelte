<script>
	import { goto } from '$app/navigation';
	import { desktopState } from '../../shared.svelte.js';
	import MenuBar from '$lib/components/MenuBar.svelte';
	import Window from '$lib/components/Window.svelte';
	import About from '$lib/components/About.svelte';
	import MindfulDesign from '$lib/components/MindfulDesign.svelte';
	import CoursePromo from '$lib/components/CoursePromo.svelte';
	import ContactPromo from '$lib/components/ContactPromo.svelte';
	import MusicPlayer from '$lib/components/MusicPlayer.svelte';
	import Gameboy from '$lib/components/Gameboy.svelte';
	import HappyText from '$lib/components/icons/HappyText.svelte';
	import ImageIcon from '$lib/components/icons/ImageIcon.svelte';
	import Arcade from '$lib/components/icons/Arcade.svelte';
	import Book from '$lib/components/icons/Book.svelte';
	import LightsOff from '$lib/components/icons/LightsOff.svelte';
	import LightsOn from '$lib/components/icons/LightsOn.svelte';
	import Mail from '$lib/components/icons/Mail.svelte';
	import Record from '$lib/components/icons/Record.svelte';

	let {
		initialAbout,
		initialScott,
		initialLorna,
		initialMD,
		initialWriting,
		initialCourse,
		initialContact,
		initialEmail
	} = $props();
	let isPlaying = $state(false);
	let showAbout = $state(initialAbout);
	let showScott = $state(initialScott);
	let showLorna = $state(initialLorna);
	let showMindfulDesign = $state(initialMD);
	let showWriting = $state(initialWriting);
	let showCoursePromo = $state(initialCourse);
	let showContact = $state(initialContact);
	let showEmailPromo = $state(initialEmail);

	import { browser } from '$app/environment';

	const toggleGame = () => {
		isPlaying = !isPlaying;
	};

	function getInitialTheme() {
		if (!browser) return 'light';
		const stored = localStorage.getItem('theme');
		if (stored) return stored;
		return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	let theme = $state(getInitialTheme());

	export function getTheme() {
		return theme;
	}

	export function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (browser) {
			localStorage.setItem('theme', theme); // explicit choice now overrides system preference permanently
			document.documentElement.setAttribute('data-theme', theme);
		}
	}

	const appNavigate = (route, e) => {
		e.preventDefault();
		if (desktopState.showMusic) {
			desktopState.miniPlayer = true;
		}
		goto(route);
	};
</script>

<div class="desktop" class:isPlaying>
	{#if !isPlaying}
		<div class="dock-wrapper">
			<nav class="dock">
				<a class="desktop-icon" href="/" onclick={(e) => appNavigate('/', e)}>
					<span>home</span>
					<HappyText />
				</a>
				<a class="desktop-icon" href="/writing" onclick={(e) => appNavigate('/writing', e)}>
					<span>writing</span>
					<Book />
				</a>
				<a href="/chatting" class="desktop-icon" onclick={(e) => appNavigate('/chatting', e)}>
					<span>say hi!</span>
					<Mail />
				</a>
				<button class="desktop-icon game-icon" onclick={toggleGame}>
					<span>play!</span>
					<Arcade />
				</button>
				<button class="desktop-icon game-icon" onclick={() => (desktopState.showMusic = true)}>
					<span>music</span>
					<Record />
				</button>
				<button class="desktop-icon" onclick={toggleTheme}>
					{#if theme === 'light'}
						<span>mode</span>
						<LightsOn />
					{:else}
						<span>mode</span>
						<LightsOff />
					{/if}
				</button>
			</nav>
		</div>
	{/if}
	<MenuBar />
	<div class="desktop-icons">
		<div class="icon-bar">
			<div class="icon-group">
				<a class="desktop-icon" href="/" onclick={(e) => appNavigate('/', e)}>
					<HappyText />
					<span>home</span>
				</a>
				<a class="desktop-icon" href="/writing" onclick={(e) => appNavigate('/writing', e)}>
					<Book />
					<span>writing</span>
				</a>
				<a href="/chatting" class="desktop-icon" onclick={(e) => appNavigate('/chatting', e)}>
					<Mail />
					<span>say hi!</span>
				</a>
				<button class="desktop-icon" onclick={toggleGame}>
					<Arcade />
					<span>play!</span>
				</button>
				<button class="desktop-icon game-icon" onclick={() => (desktopState.showMusic = true)}>
					<Record />
					<span>music</span>
				</button>
				<button class="desktop-icon" onclick={() => (showLorna = true)}>
					<ImageIcon />
					<span>lorna.txt</span>
				</button>
				<button class="desktop-icon" onclick={() => (showScott = true)}>
					<ImageIcon />
					<span>scott.txt</span>
				</button>
				<button class="desktop-icon" onclick={toggleTheme}>
					{#if theme === 'light'}
						<LightsOn />
						<span>mode</span>
					{:else}
						<LightsOff />
						<span>mode</span>
					{/if}
				</button>
			</div>
		</div>
	</div>
	{#if showAbout}
		<Window filename="about.md" initX={140} initY={20} large onClose={() => (showAbout = false)}>
			<About />
		</Window>
	{/if}
	{#if showMindfulDesign}
		<Window
			filename="mindful_design.md"
			notMobile
			initX={564}
			initY={430}
			large
			onClose={() => (showAbout = false)}
		>
			<MindfulDesign />
		</Window>
	{/if}
	{#if showCoursePromo}
		<Window
			filename="da_promo.md"
			initX={884}
			initY={580}
			clippy
			notMobile
			onClose={() => (showCoursePromo = false)}
		>
			<CoursePromo />
		</Window>
	{/if}
	{#if showEmailPromo}
		<Window
			filename="clippy_contact"
			initX={564}
			initY={430}
			clippy
			notMobile
			onClose={() => (showEmailPromo = false)}
		>
			<ContactPromo />
		</Window>
	{/if}
	{#if showLorna}
		<Window
			filename="lorna.txt"
			initX={1100}
			initY={40}
			initZ={0}
			small
			image
			onClose={() => (showLorna = false)}
		>
			<img src="https://scott.is/lorna.png" />
		</Window>
	{/if}
	{#if showScott}
		<Window
			filename="scott.txt"
			initX={208}
			initY={408}
			initZ={0}
			small
			image
			onClose={() => (showScott = false)}
		>
			<img src="https://scott.is/scott-ascii.png" />
		</Window>
	{/if}
	{#if showWriting}
		<Window filename="writing" initX={140} initY={20} large onClose={() => (showWriting = false)}>
			<About />
		</Window>
	{/if}
	<slot />
	{#if isPlaying}
		<Window filename="very_cool_game.gb" initX={500} initY={20} initZ={0} game onClose={toggleGame}>
			<Gameboy />
		</Window>
	{/if}
</div>

<style>
	:global .isPlaying .window:not(.game) {
		filter: blur(4px);
	}
	.isPlaying .desktop-icons .desktop-icon {
		filter: blur(4px);
	}
	.desktop {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: var(--color-bg-muted);
	}
	.windows {
		width: 100vw;
		height: calc(100vh - 42px);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1;
		pointer-events: none;
	}
	.desktop-icons {
		padding: var(--space-s);
		display: flex;
		flex-direction: row;
		gap: var(--space-xs);
		align-items: start;
		justify-content: start;
		background-image: url('/horns-2.png');
		background-position: bottom right;
		background-repeat: no-repeat;
		background-size: 25%;
		height: calc(100vh - 44px);
		:global([data-theme='dark']) & {
			background-image: url('/horns-dark.png');
		}
	}
	.icon-bar {
		display: flex;
		height: 100%;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.icon-group {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: auto;
		height: calc(100vh - 88px);
		align-items: center;
		justify-content: start;
		gap: var(--space-xs);
		@media (max-width: 900px) {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}
	.desktop-icon {
		padding: var(--space-2xs);
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		border: none;
		font-family: 'Geist Pixel', sans-serif;
		color: var(--color-text);
		border-radius: 8px;
		flex-grow: 0;
		text-decoration: none;
		span {
			font-size: var(--step--1);
		}
		.icon {
			font-size: 24px;
		}
	}
	:global .desktop-icon svg path {
		fill: var(--color-text);
	}
	:global .desktop-icon svg rect {
		fill: var(--color-bg-accent);
	}
	.dock-wrapper {
		position: fixed;
		bottom: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		z-index: 9999;
	}
	.dock {
		display: flex;
		position: relative;
		padding: 0 var(--space-m);
		gap: var(--space-xs);
		.desktop-icon {
			scale: 1.2;
			position: relative;
			@media (max-width: 900px) {
				scale: 1;
				&.game-icon {
					display: none;
				}
			}
			span {
				color: var(--color-bg-accent);
				padding: 0 var(--space-3xs);
				scale: 0.8;
				background: var(--color-text);
				position: absolute;
				top: -14px;
				display: none;
				white-space: nowrap;
				box-shadow:
					0px 2px var(--color-text),
					0px -2px var(--color-text),
					2px 0px var(--color-text),
					-2px 0px var(--color-text),
					0px 4px #00000038,
					2px 2px #00000038,
					-2px 2px #00000038;
			}
			&:hover {
				transform: translateY(-4px);
				span {
					display: block;
				}
			}
		}
		&:before {
			position: absolute;
			content: '';
			z-index: -1;
			width: 100%;
			left: 0;
			bottom: 0;
			height: 44px;
			background: var(--color-bg-accent);
			border: 1.5px solid var(--color-border);
			transform: perspective(20px) rotateX(6deg);
			transform-style: preserve-3d;
			border-radius: 4px;
			box-shadow:
				0px 2px var(--color-text),
				0px -2px var(--color-text),
				2px 0px var(--color-text),
				-2px 0px var(--color-text);
		}
	}
</style>
