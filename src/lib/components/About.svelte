<script>
	import { onMount } from 'svelte';
	onMount(() => {
		const el = document.querySelector('.verb');

		function scrambleMorph(oldWord, newWord, onFrame, onComplete, speed = 50) {
			const maxLength = Math.max(oldWord.length, newWord.length);
			const letters = 'abcdefghijklmnopqrstuvwxyz';
			const states = [];

			for (let i = 0; i < maxLength; i++) {
				const target = newWord[i] || '';
				const current = oldWord[i] || '';
				const cycles = i + 3; // increasing number of scrambles
				states.push({ current, target, cyclesLeft: cycles });
			}

			function tick() {
				let output = '';
				let done = true;

				for (const state of states) {
					if (state.cyclesLeft > 0) {
						state.current = letters[Math.floor(Math.random() * letters.length)];
						state.cyclesLeft--;
						done = false;
					} else {
						state.current = state.target;
					}
					output += state.current;
				}

				onFrame(output);

				if (!done) setTimeout(tick, speed);
				else if (onComplete) onComplete();
			}

			tick();
		}
		const words = ['making fun shit', 'trying his best', 'thinking abt lyf', 'cuddling his dog'];
		let index = 0;

		function next() {
			const oldWord = words[index];
			index = (index + 1) % words.length;
			const newWord = words[index];

			scrambleMorph(
				oldWord,
				newWord,
				(text) => (el.textContent = text),
				() => setTimeout(next, 2000), // pause before next morph
				40 // speed
			);
		}
		if (window.matchMedia('(min-width: 720px)').matches) {
			el.textContent = words[0];
			setTimeout(next, 2000);
		}
	});
</script>

<div class="about">
	<div class="about-intro">
		<div class="intro-icons">
			<i class="fa-pixel fa-regular fa-skull"></i>
			<i class="fa-pixel fa-regular fa-heart"></i>
			<i class="fa-pixel fa-regular fa-key"></i>
			<i class="fa-pixel fa-regular fa-bolt"></i>
			<i class="fa-pixel fa-regular fa-lightbulb"></i>
		</div>
		<h2>Scott is… <span class="verb">making fun shit</span></h2>
		<p>
			Welcome, dear friend, to my little slice of the web. This is where you’ll find whatever piece
			of myself I have been able to plonk into the ether.
		</p>
		<p>
			If you’re interested in working with me, you can visit my <a href="/professional"
				>very professional one-pager</a
			>. If you want to follow me online you can find me on
			<a href="https://bsky.app/profile/scott.is">Bluesky</a> until someone brings phpBB back.
		</p>
	</div>
</div>

<style>
	.about-intro {
		padding: var(--space-m);
	}
	h2 {
		font-family: 'Argent Pixel', serif;
		font-size: var(--step-3);
		font-weight: normal;
		margin: 0;
		margin-bottom: var(--space-s);
		padding: 0;
		overflow: hidden;
		white-space: nowrap;
	}
	p {
		margin-top: 0;
		font-family: 'Argent Pixel', serif;
		color: #444;
		max-width: 900px;
		color: var(--color-text-muted);
	}
	.intro-icons {
		font-size: 24px;
		display: flex;
		gap: var(--space-m);
		margin-bottom: var(--space-xs);
	}
</style>
