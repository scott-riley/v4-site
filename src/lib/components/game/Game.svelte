<script>
	import { onMount } from 'svelte';
	let playerHealth = $state(120);
	let playerMaxHealth = $state(120);
	let enemyHealth = $state(100);
	let enemyMaxHealth = $state(100);
	let enemyDead = $state(false);
	let playerDead = $state(false);
	let endGame = $state(false);
	let isPlayerTurn = $state(false);
	let canChooseMove = $state(true);
	let canProgressMessage = $state(true);
	let messages = $state([
		'UR FAV LLM wants to battle!',
		'Watch out for the EXTREMELY BEIGE SLOP attack…'
	]);
	let currentMessage = $state(0);
	let damaging = $state(null);
	let dyingWho = $state(null);
	let showStartup = $state(true);
	let showWipe = $state(false);
	let wipeEl;
	let audioContext;
	let cryEffect;
	let hitEffect;
	let battleAudio;
	let winEffect = $state(null);
	let loseEffect = $state(null);
	let criticalEffect = $state(null);
	let allLoaded = $state(false);

	function playBattleIntro() {
		showWipe = true;
		battleAudio = document.querySelector('#battle');
		cryEffect = document.querySelector('#cry');
		setTimeout(() => {
			cryEffect.volume = 0.2;
			cryEffect.play();
		}, 5000);
		if (winEffect) {
			winEffect.pause();
			winEffect ? (winEffect.currentTime = 0) : null;
		}
		if (loseEffect) {
			loseEffect.pause();
			loseEffect ? (loseEffect.currentTime = 0) : null;
		}
		battleAudio.volume = 0.5;
		battleAudio.addEventListener('ended', () => {
			battleAudio.currentTime = 14.2;
			battleAudio.play();
		});
		battleAudio.play();
		hitEffect = document.querySelector('#hit');
		// window.addEventListener('keypress');
	}

	function handleWipeEnd(e) {
		if (e.animationName.endsWith('wipe-out')) {
			showWipe = false;
			wipeEl.removeEventListener('animationend', handleWipeEnd);
		}
	}

	$effect(() => {
		if (showWipe && wipeEl) {
			wipeEl.addEventListener('animationend', handleWipeEnd);
		}
	});

	let playerEl;
	let enemyEl;

	function die(who) {
		if (dyingWho) return;
		dyingWho = who;
		const el = who === 'player' ? playerEl : enemyEl;
		cryEffect.currentTime = 0;
		cryEffect.play();
		function handleEnd(e) {
			if (e.animationName.endsWith('death-fade')) {
				el.removeEventListener('animationend', handleEnd);
				setTimeout(() => {
					endGame = true;
				}, 1000);
			}
		}
		el.addEventListener('animationend', handleEnd);
	}

	let cancelTween;
	let playerMoves = [
		{
			name: 'SNAGGLE',
			type: 'FIRE',
			power: 80,
			modifier: 2
		},
		{
			name: 'PLAY ROUGH',
			type: 'FAIRY',
			power: 60,
			modifier: 1
		},
		{
			name: 'HYPER FANG',
			type: 'NORMAL',
			power: 55,
			modifier: 0.5
		},
		{
			name: 'FACT CHECK',
			type: 'NORMAL',
			power: 30,
			modifier: 0.42
		}
	];

	let enemyMoves = [
		{
			name: 'EXTREMELY BEIGE SLOP',
			type: 'FIRE',
			power: 60,
			modifier: 1
		},
		{
			name: 'TECHNICAL DEBT',
			type: 'FAIRY',
			power: 50,
			modifier: 2
		},
		{
			name: 'EMDASH SPLASH',
			type: 'NORMAL',
			power: 15,
			modifier: 0.5
		},
		{
			name: 'IT’S NOT JUST TACKLE, IT’S BIG TACKLE',
			type: 'ROCK',
			power: 30,
			modifier: 1
		}
	];

	export function tweenNumber({
		from,
		to,
		duration = 500,
		onUpdate,
		onComplete,
		stopWhen,
		easing = (t) => t
	}) {
		const start = performance.now();
		let frame;

		function step(now) {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const value = from + (to - from) * easing(progress);

			if (stopWhen?.(value)) {
				onUpdate(Math.max(value, 0)); // clamp so the bar doesn't render negative
				onComplete?.();
				return; // don't schedule another frame
			}

			onUpdate(value);

			if (progress < 1) {
				frame = requestAnimationFrame(step);
			} else {
				onComplete?.();
			}
		}

		frame = requestAnimationFrame(step);

		return () => cancelAnimationFrame(frame);
	}

	function useMove(move, target) {
		const hit = document.querySelector('#hit');
		messages.push(`${target === 'enemy' ? 'LORNA' : 'UR FAV LLM'} uses ${move.name}…`);
		currentMessage = 0;
		if (move.modifier === 2) {
			messages.push('It’s super effective!');
		}
		if (move.modifier === 0.5) {
			messages.push('It’s not very effective…');
		}
		if (move.modifier === 0.42) {
			messages.push('UR FAV LLM became confused…');
		}
		let damage = Math.floor(((((2 * 20) / 5 + 2) * move.power * 88) / 72 / 50 + 2) * move.modifier);
		if (target === 'enemy') {
			isPlayerTurn = true;
			canProgressMessage = false;
			cancelTween?.();
			const from = enemyHealth;
			damaging = 'enemy';
			setTimeout(() => {
				hit.volume = 0.4;
				hit.play();
			}, 600);
			setTimeout(() => {
				cancelTween = tweenNumber({
					from,
					to: enemyHealth - damage,
					duration: 400,
					onUpdate: (v) => {
						enemyHealth = v;
					},
					onComplete: () => {
						damaging = null;
						canProgressMessage = true;
						if (enemyHealth <= 0) {
							enemyDead = true;
							messages.push('UR FAV LLM ran out of tokens!');
							criticalEffect.currentTime = 0;
							criticalEffect.pause();
						}
					}
				});
			}, 1200);
		}
		if (target === 'player') {
			damage = Math.floor(((((2 * 20) / 5 + 2) * move.power * 88) / 50 / 72 + 2) * move.modifier);
			cancelTween?.();
			const from = playerHealth;
			canProgressMessage = false;
			damaging = 'player';
			setTimeout(() => {
				hit.play();
			}, 600);
			setTimeout(() => {
				cancelTween = tweenNumber({
					from,
					to: playerHealth - damage,
					duration: 400,
					onUpdate: (v) => {
						playerHealth = v;
					},
					onComplete: () => {
						damaging = null;
						canProgressMessage = true;
						if (playerHealth <= 0) {
							criticalEffect.currentTime = 0;
							criticalEffect.pause();
							playerDead = true;
							messages.push('Well that was embarrassing…');
						} else if (playerHealth < 25) {
							criticalEffect = document.querySelector('#critical');
							criticalEffect.play();
						}
					}
				});
			}, 1200);
		}
	}

	function cycleMessages() {
		if (enemyDead && currentMessage == messages.length - 1) {
			winEffect = document.querySelector('#win');
			battleAudio.pause();
			battleAudio.currentTime = 0;
			winEffect.play();
			return die('enemy');
		}
		if (playerDead && currentMessage == messages.length - 1) {
			loseEffect = document.querySelector('#lose');
			battleAudio.pause();
			battleAudio.currentTime = 0;
			loseEffect.play();
			return die('player');
		}
		if (currentMessage + 1 < messages.length) {
			return currentMessage++;
		}
		messages = [];
		if (isPlayerTurn && !enemyDead) {
			const moveToUse = Math.floor(Math.random() * 3);
			console.log('MOVE', moveToUse);
			useMove(enemyMoves[moveToUse], 'player');
			isPlayerTurn = false;
			// canChooseMove = false;
		} else {
			// isPlayerTurn = true;
			// canChooseMove = true;
		}
	}

	function startGame() {
		showStartup = false;
		playBattleIntro();
	}

	function resetGameState() {
		playerHealth = 120;
		playerMaxHealth = 120;
		enemyHealth = 100;
		enemyMaxHealth = 100;
		enemyDead = false;
		playerDead = false;
		endGame = false;
		isPlayerTurn = false;
		canChooseMove = true;
		messages = ['UR FAV LLM wants to battle!', 'Watch out for the EXTREMELY BEIGE SLOP ATTACK…'];
		currentMessage = 0;
		dyingWho = null;
		showStartup = true;
		// playBattleIntro();
	}
</script>

<audio id="battle" src="/battle-long.mp3" />
<audio id="cry" src="/cry.mp3" />
<audio id="win" src="/win.mp3" />
<audio id="lose" src="/lose.mp3" />
<audio id="hit" src="/hit.mp3" />
<audio id="critical" src="/critical.mp3" />
{#if endGame}
	<div class="game-screen scanlines">
		<div class="credits">
			<div class="header">
				<h3 class="logo end-logo">
					<span>f</span>
					<span>U</span>
					<span>c</span>
					<span>k</span>
					<span>&nbsp;</span>
					<span>A</span>
					<span>I</span>
				</h3>
				<p>A scottdotis production</p>
			</div>
			<button onclick={resetGameState}
				><i class="fa-pixel fa-regular fa-arrow-rotate-right"></i>Play Again</button
			>
			<img src="/gb-intro.png" />
		</div>
	</div>
{:else if showStartup}
	<div class="game-screen scanlines">
		<div class="credits intro">
			<div class="header">
				<h3 class="logo">
					<span>P</span>
					<span>o</span>
					<span>K</span>
					<span>é</span>
					<span>L</span>
					<span>L</span>
					<span>M</span>
					<span>o</span>
					<span>N</span>
				</h3>
				<p>Beige Version</p>
				<button onclick={startGame}>
					<i class="fa-pixel fa-regular fa-play"></i>New Game
				</button>
			</div>
			<img src="/gb-intro.png" />
		</div>
	</div>
{:else}
	<div class="game-screen main-game scanlines">
		{#if showWipe}
			<div bind:this={wipeEl} class="wipe-overlay"></div>
		{/if}
		<div class="enemy">
			<div class="info">
				<span class="name" class:dying={dyingWho === 'enemy'}>UR FAV LLM</span>
				<div class="health" class:dying={dyingWho === 'enemy'}>
					<label for="enemy-health">HP:</label>
					<progress max={enemyMaxHealth} value={enemyHealth}>{enemyHealth}</progress>
				</div>
			</div>
			<div class="sprite">
				<img
					bind:this={enemyEl}
					class:dying={dyingWho === 'enemy'}
					class:damaging={damaging === 'enemy'}
					class:attacking={damaging === 'player'}
					src="/enemy.png"
				/>
			</div>
		</div>
		<div class="player">
			<div
				class="sprite"
				class:damaging={damaging === 'player'}
				class:attacking={damaging === 'enemy'}
			>
				<img
					bind:this={playerEl}
					class:dying={dyingWho === 'player'}
					class:damaging={damaging === 'player'}
					class:attacking={damaging === 'enemy'}
					src="/player.png"
				/>
			</div>
			<div class="info">
				<span class="name" class:dying={dyingWho === 'player'}>Lorna</span>
				<div class="health" class:dying={dyingWho === 'player'}>
					<label for="player-health">HP:</label>
					<progress max={playerMaxHealth} value={playerHealth}>{playerHealth}</progress>
				</div>
			</div>
		</div>
		<div class="menu">
			{#if messages?.length > 0}
				<div class="messages">
					<span class="message">{messages[currentMessage]}</span>
					<button onclick={cycleMessages} disabled={!canProgressMessage} autofocus>
						<i class="fa-pixel fa-regular fa-caret-down" fa-bounce style="color: rgb(0, 0, 0);"></i>
					</button>
				</div>
			{:else}
				<div class="moves">
					{#each playerMoves as move, i}
						<button autofocus={i === 0} onclick={() => useMove(move, 'enemy')}>{move.name}</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global .game-player {
		--color-text: black;
		--color-text-muted: #444;
		--color-bg-muted: #fefefe;
		--color-bg-accent: white;
		--color-border: black;
		--color-shadow-solid: rgba(0, 0, 0, 0.1);
		--color-underline: rgba(0, 0, 0, 0.2);
		color: var(--color-text);
	}
	.game-screen {
		aspect-ratio: 10/9;
		max-height: 480px;
		position: relative;
		border-radius: 4px;
	}
	.credits {
		height: 360px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		justify-content: center;
		button {
			background: black;
			color: white;
			-webkit-appearance: none;
			border: none;
			padding: var(--space-3xs) var(--space-s) var(--space-3xs) var(--space-2xs);
			font-family: inherit;
			font-size: 16px;
			margin-top: 16px;
			margin-bottom: 32px;
			text-decoration: none;
			font-family: 'Silkscreen', sans-serif;
			display: flex;
			align-items: center;
			gap: 8px;
			box-shadow:
				0px 4px black,
				0px -4px black,
				4px 0px black,
				-4px 0px black,
				0px 8px #00000038,
				4px 4px #00000038,
				-4px 4px #00000038;
		}
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 20px;
			.mini-logo {
				font-size: 24px;
			}
		}
		h3 {
			font-family: 'Jersey 10', sans-serif;
			/*color: white;*/
			paint-order: stroke fill;
			text-shadow: 6px 6px 0 #444;

			font-size: 54px;
			margin: 0;
		}
		img {
			max-width: 364px;
		}
		justify-content: space-between;
		gap: 2px;
		h3 {
			margin: 0;
		}
		p {
			margin: 0;
		}
		.header {
			gap: 0px;
			padding-top: 0;
		}
		.logo {
			display: inline-flex;
			font-size: 78px;
			font-weight: 900;
			letter-spacing: -1px;
		}
		.logo span {
			display: inline-block;
			transform-origin: center;
			-webkit-text-stroke: 4px white;
			color: #777;
			font-weight: bold;
		}

		.logo span:nth-child(1) {
			transform: rotate(-6deg) translateY(2px);
		}
		.logo span:nth-child(2) {
			transform: rotate(4deg) translateY(-3px);
		}
		.logo span:nth-child(3) {
			transform: rotate(-3deg) translateY(4px) scale(1.05);
		}
		.logo span:nth-child(4) {
			transform: rotate(7deg) translateY(-1px);
		}
		.logo span:nth-child(5) {
			color: black;
			transform: rotate(-8deg) translateY(3px);
		}
		.logo span:nth-child(6) {
			color: black;
			transform: rotate(2deg) translateY(-4px) scale(0.95);
		}
		.logo span:nth-child(7) {
			color: black;
			transform: rotate(-4deg) translateY(1px);
		}
		.logo span:nth-child(8) {
			transform: rotate(6deg) translateY(-2px);
		}
		.logo span:nth-child(9) {
			transform: rotate(-5deg) translateY(3px) scale(1.05);
		}
		p {
			font-family: 'Silkscreen', sans-serif;
			margin: 0;
			margin-top: -8px;
		}
		img {
			max-width: 364px;
		}
		button {
			margin-top: 32px;
		}
		.tendo {
			display: flex;
			justify-content: center;
			span {
				padding: 2px 12px;
				border: 2px solid var(--color-text-muted);
				border-radius: 99px;
				font-size: var(--step--1);
			}
		}
	}
	.menu {
		padding: 12px;
		border: 5px double var(--color-text);
		height: 125px;
		z-index: 9;
		position: relative;
		background: white;
		margin-bottom: -9px;
		box-shadow:
			0px 2px black,
			0px 3px black inset,
			0px -2px black,
			0px -2px black inset,
			2px 0px black,
			-2px 0px black;
		.messages {
			font-size: 24px;
			position: relative;
			height: 101px;
			button {
				-webkit-appearance: none;
				background: transparent;
				font-size: 24px;
				border: none;
				padding: 0;
				position: absolute;
				bottom: 3px;
				right: 3px;
				&:focus {
					outline: none;
				}
			}
		}
		.moves {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 4px;
			button {
				background: none;
				font-family: 'Geist Pixel', sans-serif;
				text-transform: uppercase;
				color: Var(--color-text);
				text-align: left;
				border: none;
				font-size: 24px;
				padding-left: 12px;
				padding-top: 8px;
				padding-bottom: 8px;
			}
		}
	}
	.game-screen {
		padding: 20px 4px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		filter: brightness(1.2);
		background: white;
		width: 386px;
		height: 367px;
		overflow: hidden;
	}
	.enemy,
	.player {
		display: flex;
		justify-content: space-between;
		padding-top: 12px;
		overflow-x: clip;
		overflow-y: visible;
	}
	.player {
		padding-right: 24px;
		align-items: end;
		z-index: 2;
		margin-top: 86px;
		.info {
			padding-bottom: 24px;
		}
		.sprite {
			width: 140px;
		}
		.sprite img {
			height: 120px;
			width: 120px;
			bottom: 0;
			right: -10px;
			top: auto;
		}
	}
	.info {
		padding-left: 24px;
		span {
			display: block;
		}
		.name {
			font-size: 20px;
			text-transform: uppercase;
		}
	}
	.sprite {
		position: relative;
		overflow: visible;
		width: 144px;
		img {
			position: absolute;
			top: 0;
			right: 24px;
			height: 100px;
			width: 100px;
			filter: grayscale(1);
		}
	}
	.health {
		border-left: 4px solid var(--color-text);
		padding-left: 12px;
		padding-bottom: 4px;
		border-bottom: 4px solid var(--color-text);
		display: flex;
		gap: 6px;
		align-items: center;
		justify-content: space-between;
		label {
			font-size: 14px;
		}
		progress {
			-webkit-appearance: none;
			appearance: none;
			height: 10px;
			width: 120px;
			border: 2px solid black;
			background: white;
			border-radius: 999px;
		}
		progress[value]::-moz-progress-bar {
			background: black;
		}
	}
	.damaging {
		animation: death-flicker 0.15s steps(1) 4;
		animation-delay: 0.4s;
	}
	.dying {
		animation:
			death-flicker 0.15s steps(1) 4,
			death-fade 0.4s ease-in forwards;
		animation-delay: 0s, 0.6s;
	}

	.attacking {
		animation: player-attack 0.3s ease-in-out forwards;
	}

	.enemy .attacking {
		animation: enemy-attack 0.3s ease-in-out forwards;
	}

	@keyframes -global-player-attack {
		0% {
			transform: translateX(0) translateY(0);
		}
		60% {
			transform: translateX(-24px) translateY(10px);
		}
		100% {
			transform: translateX(0) translateY(0);
		}
	}

	@keyframes -global-enemy-attack {
		0% {
			transform: translateX(0) translateY(0);
		}
		60% {
			transform: translateX(24px) translateY(-10px);
		}
		100% {
			transform: translateX(0) translateY(0);
		}
	}

	@keyframes -global-death-flicker {
		50% {
			opacity: 0.15;
		}
	}

	@keyframes -global-death-fade {
		to {
			opacity: 0;
		}
	}

	.wipe-overlay {
		position: absolute;
		inset: 0;
		bottom: -28px;
		background: black;
		z-index: 100;
		transform-origin: center;
		animation: wipe-out-spin 1s ease-in forwards;
		animation-delay: 2s;
		overflow: hidden;
	}

	@keyframes -global-wipe-out-spin {
		from {
			clip-path: polygon(
				50% -150%,
				65% -50%,
				150% -100%,
				100% 0%,
				200% 50%,
				100% 100%,
				150% 150%,
				50% 100%,
				-50% 150%,
				0% 50%,
				-100% 100%,
				-50% -50%,
				0% -50%
			);
			transform: rotate(0deg) scale(1);
		}
		to {
			clip-path: polygon(
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%,
				50% 50%
			);
			transform: rotate(540deg) scale(1.3);
		}
	}
</style>
