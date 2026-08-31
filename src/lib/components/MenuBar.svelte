<script>
	import { onMount } from 'svelte';
	let now = $state(new Date());
	function formatMenuBarDate(date = new Date()) {
		return date.toLocaleDateString('en-GB', {
			weekday: 'short',
			day: 'numeric',
			month: 'short'
		});
	}
	function formatMenuBarTime(date = new Date()) {
		return date.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}
	let date = 'Aug 1';
	onMount(() => {
		$effect(() => {
			const id = setInterval(() => (now = new Date()), 1000 * 10);
			return () => clearInterval(id);
		});

		const jsDate = Date.now();
	});
</script>

<header class="menubar">
	<nav>
		<a class="logo" href="/">
			<i class="fa-pixel fa-regular fa-skull"></i>
			<span>scott.is</span>
		</a>
	</nav>
	<div class="icons">
		<button class="square">
			<i class="fa-pixel fa-regular fa-battery-bolt"></i>
		</button>
		<button class="square">
			<i class="fa-pixel fa-regular fa-volume"></i>
		</button>
		<button class="square">
			<i class="fa-pixel fa-regular fa-signal-bars"></i>
		</button>
		<div class="datetime">
			<span>{formatMenuBarDate(now)}</span>
			<span>{formatMenuBarTime(now)}</span>
		</div>
	</div>
</header>

<style>
	.menubar {
		border-bottom: 1px solid var(--color-border);
		padding: var(--space-3xs) var(--space-m);
		font-size: var(--step--1);
		display: flex;
		justify-content: space-between;
		background: var(--color-bg-accent);
		box-shadow:
			0 0 0 1px var(--color-bg-muted),
			0 0 0 3px var(--color-shadow-solid);
		z-index: 999;
		position: fixed;
		top: 0;
		width: 100%;
		height: 42px;
		box-sizing: border-box;
	}
	nav {
		display: flex;
		flex-direction: row;
		gap: var(--space-m);
		align-items: center;
	}
	.logo {
		display: flex;
		flex-direction: row;
		gap: var(--space-2xs);
		align-items: center;
		color: var(--color-text);
		text-decoration: none;
	}
	:global .menubar nav i {
		font-size: 12px;
	}
	.icons {
		display: flex;
		gap: var(--space-s);
		align-items: center;
	}
	.datetime {
		display: flex;
		gap: var(--space-xs);
	}
	button {
		-webkit-appearance: none;
		border: none;
		background: transparent;
		font-family: 'Geist Pixel', sans-serif;
		font-size: var(--step--1);
		padding: var(--space-3xs) var(--space-2xs);
		border-radius: 8px;
		margin: 0;
		color: var(--color-text);
		&:hover {
			background: #efefef;
		}
		&.square {
			padding: var(--space-3xs);
			@media (max-width: 900px) {
				&:nth-child(2),
				&:nth-child(3) {
					display: none;
				}
			}
		}
	}
</style>
