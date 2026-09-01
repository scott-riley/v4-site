<script>
	import { onMount } from 'svelte';
	import { desktopState, getNextZ } from '../../shared.svelte.js';
	import Clippy from '$lib/components/icons/Clippy.svelte';
	let {
		filename,
		filetype,
		initX,
		initY,
		initZ,
		large,
		small,
		image,
		game,
		onClose,
		clippy,
		post,
		player,
		browserWindow,
		browserURL,
		notMobile,
		miniPlayer
	} = $props();
	let x = $state(initX);
	let y = $state(initY);
	let z = $state(0);
	let dragging = $state(false);
	let isMobile = $state(false);
	let maximized = $state(false);
	let offset = { x: 0, y: 0 };
	let windowEl;
	const EDGE_MARGIN = 16;
	const BOTTOM_MARGIN = 64;

	function bringToFront() {
		z = getNextZ();
	}

	function clampToViewport() {
		if (!windowEl) return;
		const rect = windowEl.getBoundingClientRect();
		const maxX = window.innerWidth - rect.width - EDGE_MARGIN;
		const maxY = window.innerHeight - rect.height - BOTTOM_MARGIN;

		x = Math.max(EDGE_MARGIN, Math.min(x, maxX));
		y = Math.max(EDGE_MARGIN, Math.min(y, maxY));
	}

	onMount(() => {
		bringToFront();
		clampToViewport();
		window.addEventListener('resize', clampToViewport);
		const mq = matchMedia('(max-width: 900px)');
		isMobile = mq.matches;
		mq.addEventListener('change', (e) => (isMobile = e.matches));
		return () => window.removeEventListener('resize', clampToViewport);
	});

	function handlePointerDown(e) {
		dragging = true;
		bringToFront();
		offset = { x: e.clientX - x, y: e.clientY - y };
		e.currentTarget.setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e) {
		if (!dragging) return;
		if (e.clientX - offset.x > 0) {
			x = e.clientX - offset.x;
		} else {
			x = 0;
		}
		if (e.clientY - offset.y > 10) {
			y = e.clientY - offset.y;
		} else {
			y = 10;
		}
	}

	function handlePointerUp(e) {
		dragging = false;
		e.currentTarget.releasePointerCapture(e.pointerId);
	}
</script>

<div
	bind:this={windowEl}
	class="window"
	class:dragging
	class:large
	class:small
	class:game
	class:clippy
	class:post
	class:browserWindow
	class:mobile={isMobile}
	class:notMobile
	class:player
	class:maximized
	class:miniPlayer
	onpointerdowncapture={bringToFront}
	style={isMobile || maximized ? '' : `transform: translate3d(${x}px, ${y}px, 0); z-index: ${z}`}
>
	<header>
		<div class="filename">
			<span>{filename}</span>
		</div>
		<div
			class="drag"
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
		>
			<button class="handle"></button>
		</div>
		<div class="icons">
			{#if browserWindow}
				<a class="square close" href={browserURL} target="_blank">
					<i class="fa-pixel fa-regular fa-arrow-up-right-from-square"></i>
				</a>
			{/if}
			{#if player && !miniPlayer}
				<button class="square close" onclick={() => (desktopState.miniPlayer = !miniPlayer)}>
					<i class="fa-pixel fa-regular fa-compress"></i>
				</button>
			{/if}
			{#if player && miniPlayer}
				<button class="square close" onclick={() => (desktopState.miniPlayer = !miniPlayer)}>
					<i class="fa-pixel fa-regular fa-expand"></i>
				</button>
			{/if}
			{#if (post || browserWindow) && maximized}
				<button class="square close" onclick={() => (maximized = !maximized)}>
					<i class="fa-pixel fa-regular fa-compress"></i>
				</button>
			{/if}
			{#if (post || browserWindow) && !maximized}
				<button class="square close" onclick={() => (maximized = !maximized)}>
					<i class="fa-pixel fa-regular fa-expand"></i>
				</button>
			{/if}
			<button class="square close" onclick={onClose}>
				<i class="fa-pixel fa-regular fa-xmark"></i>
			</button>
		</div>
	</header>
	<div class="window-content" class:scanlines={image} class:ascii={image}>
		{#if clippy}
			<div class="clippy-icon">
				<Clippy />
			</div>
		{/if}
		<slot />
	</div>
	{#if player && !miniPlayer}
		<div class="window-footer">
			<span>Bangers I’ve enjoyed on heavy rotation the past week. Updated (some) Mondays.</span>
		</div>
	{/if}
</div>

<style>
	@media (max-width: 900px) {
		.notMobile {
			display: none;
		}
	}
	.icons {
		display: flex;
		gap: var(--space-3xs);
	}
	.close {
		background: none;
		color: var(--color-text);
		border: none;
	}
	.window {
		background: var(--color-bg-accent);
		min-width: 320px;
		border: 1px solid var(--color-border);
		position: absolute;
		top: 0;
		left: 0;
		min-height: 200px;
		box-shadow:
			0 0 0 1px var(--color-bg-muted),
			4px 4px 0 2px var(--color-shadow-solid);
		pointer-events: auto;
		transition: none;
		overflow: hidden;
		&.large {
			width: 55vw;
			max-width: 720px;
			@media (max-width: 900px) {
				width: 100%;
				height: 100vh;
			}
		}
		&.clippy {
			max-width: 540px;
			min-height: 0;
			@media (max-width: 900px) {
				display: none;
			}
			.window-content {
				display: flex;
				align-items: center;
			}
			.clippy-icon {
				padding-left: var(--space-m);
				:global svg {
					scale: 1.2;
				}
			}
			:global h2 {
				font-size: var(--step-0);
				margin: 0;
			}
			:global p {
				font-family: 'Geist Pixel', sans-serif;
				font-size: Var(--step--1);
				margin: 0;
				margin-top: var(--space-3xs);
			}
			:global a {
				font-style: normal;
			}
		}
		&.game {
			border-radius: 16px;
			overflow: hidden;
			border-bottom-right-radius: 126px;
			box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
		}
		&.small {
			width: 320px;
			@media (max-width: 900px) {
				display: none;
			}
		}
		&.post {
			width: 86vw;
			max-width: 1040px;
			max-height: 84vh;
			z-index: 999;
			@media (max-width: 780px) {
				width: 100%;
			}
		}
		&.browserWindow {
			max-width: 1140px;
		}
		&.player {
			width: 66vw;
			max-width: 720px;
		}
		&.miniPlayer {
			max-width: 420px;
			min-height: 0;
		}
		&.maximized {
			width: 100vw;
			height: 100vh;
			max-width: 100vw;
			left: 0;
			top: 0;
		}
	}
	header {
		padding: 0 var(--space-2xs);
		font-size: var(--step--1);
		display: grid;
		grid-template-columns: auto 1fr 20px;
		justify-content: space-between;
		align-items: center;
		justify-content: space-between;
		background: var(--color-bg-muted);
		border-bottom: 1px solid var(--color-border);
		width: 100%;
		.filename {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.browserWindow &,
		.post &,
		.player & {
			grid-template-columns: auto 1fr auto;
		}
		.drag {
			height: 36px;
			padding: var(--space-3xs) var(--space-2xs);
			cursor:
				url('https://pixelarticons.com/free/cursors/grab.png') 4 1,
				auto;
			position: relative;
			.dragging & {
				cursor:
					url('https://pixelarticons.com/free/cursors/grabbing.png') 4 1,
					auto;
			}
			.handle {
				height: 1px;
				width: calc(100% - 16px);
				background: var(--color-text);
				content: '';
				position: absolute;
				top: 17.5px;
				left: 8px;
				right: 0;
				padding: 0;
				border: none;
			}
			&:after {
				height: 1px;
				width: calc(100% - 16px);
				background: var(--color-text);
				content: '';
				position: absolute;
				top: 12px;
				left: 8px;
				right: 0;
			}
			&:before {
				height: 1px;
				width: calc(100% - 16px);
				background: var(--color-text);
				content: '';
				position: absolute;
				bottom: 12px;
				left: 8px;
				right: 0;
			}
		}

		.gameboy & {
			overflow: hidden;
		}
	}
	:global .window-content a {
		color: var(--color-text);
		text-decoration: underline;
		text-decoration-color: var(--color-underline);
		text-decoration-thickness: 2px;
		font-style: italic;
	}
	:global .window-content img {
		width: 100%;
		[data-theme='dark'] & {
			/*filter: invert(1);*/
		}
	}
	.post .window-content,
	.large .window-content {
		position: relative;
		max-height: calc(84vh - 44px);
		overflow: auto;
		&.scanlines {
			background: white;
		}
	}
	.browserWindow .window-content {
		height: calc(84vh - 44px);
	}
	.window-footer {
		border-top: 1px solid var(--color-border);
		padding: var(--space-3xs);
		font-size: var(--step--1);
	}
</style>
