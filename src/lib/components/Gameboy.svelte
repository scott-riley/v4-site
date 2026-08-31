<script>
	import Game from './game/Game.svelte';
</script>

<div class="gameboy">
	<div class="screen">
		<div class="panel">
			<div class="game-player"><Game /></div>
			<div class="logo">
				<i>playin’ boi</i> <b>Dadvance</b>
			</div>
		</div>
	</div>
	<div class="tendo">
		<span>Nontondo</span>
	</div>
	<div class="controls">
		<div class="d-pad">
			<button class="up"></button>
			<button class="right"></button>
			<button class="down"></button>
			<button class="left"></button>
		</div>
		<div class="buttons">
			<button class="a"><span>A</span></button>
			<button class="b"><span>B</span></button>
		</div>
	</div>
	<div class="start-select">
		<button class="start"></button>
		<button class="select"></button>
	</div>
</div>

<style>
	.gameboy {
		height: 766px;
		width: 450px;
	}
	.screen {
		width: 100%;
		padding: 24px;
		box-sizing: border-box;
		.panel {
			width: 100%;
			background: var(--color-shadow-solid);
			border-radius: 12px;
			padding: 8px;
		}
		.game-player {
			background: var(--color-bg-accent);
			width: 100%;
			aspect-ratio: 10/9;
			border-radius: 4px;
		}
	}
	.logo {
		padding: 12px var(--space-m);
		text-align: center;
		i {
			text-transform: uppercase;
			font-family: 'Argent Pixel', serif;
			font-size: var(--step-1);
		}
		b {
			font-weight: 400;
			text-transform: uppercase;
			font-size: var(--step-1);
		}
	}
	.tendo {
		display: flex;
		justify-content: center;
		span {
			padding: 2px 12px;
			border: 2px solid var(--color-text-muted);
			border-radius: 99px;
			font-size: var(--step--1);
			opacity: 0.4;
		}
	}
	.controls {
		display: flex;
		flex-direction: row;
		gap: var(--space-s);
		position: relative;
		justify-content: space-between;
	}
	.d-pad {
		position: relative;
		padding: var(--space-m);
		/*width: 120px;
		height: 120px;*/
		transform: translateX(40px) translateY(10px);
		&:after {
			content: '';
			width: 34px;
			height: 34px;
			border-radius: 999px;
			background: var(--color-text-muted);
			top: 33px;
			left: 28px;
			position: absolute;
		}
		button {
			width: 30px;
			height: 40px;
			background: var(--color-text);
			border: none;
			position: absolute;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
		}
		.up {
			left: 30px;
			top: 0;
		}
		.left {
			rotate: 90deg;
			left: 0;
		}
		.right {
			rotate: 90deg;
			left: 60px;
		}
		.down {
			top: 60px;
			rotate: 180deg;
		}
	}
	.buttons {
		padding: var(--space-xs);
		background: var(--color-shadow-solid);
		border-radius: 999px;
		display: flex;
		gap: var(--space-m);
		transform: translateX(-30px) translateY(10px) rotate(-24deg);
		button {
			background: var(--color-text);
			color: var(--color-bg-accent);
			aspect-ratio: 1/1;
			border-radius: 999px;
			font-family: 'Geist Pixel', sans-serif;
			font-size: 24px;
			width: 44px;
			height: 44px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			span {
				rotate: 24deg;
			}
		}
	}
	.start-select {
		display: flex;
		gap: var(--space-xl);
		justify-content: center;
		transform: translateX(-10px) translateY(60px);
		button {
			background: var(--color-text);
			width: 12px;
			height: 54px;
			border-radius: 999px;
			rotate: 70deg;
			border: none;
		}
	}
</style>
