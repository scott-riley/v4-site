<script>
	const tracks = [
		{
			title: 'The Siren',
			artist: 'Sophie Hunter',
			youtubeId: 'AtNjDbxQZQI' // the video ID from the YouTube URL
		},
		{
			title: 'Adrift in the Ocean',
			artist: 'YOB',
			youtubeId: 'bEDqLArxyxg'
		},
		{
			title: 'La Perla',
			artist: 'Rosalía',
			youtubeId: 'w7pjt9ZH3NM'
		},
		{
			title: 'Echolalia',
			artist: 'Faetooth',
			youtubeId: 'FlocUlOHj28'
		},
		{
			title: 'Devil is Fine',
			artist: 'Zeal & Ardor',
			youtubeId: 'tBikKucdtX8'
		},
		{
			title: 'Rosanna',
			artist: 'Toto',
			youtubeId: '3tWts0Nrceg'
		},
		{
			title: `L'Via L'Viaquez`,
			artist: 'The Mars Volta',
			youtubeId: 'WweLKsq0p4U'
		}
	];

	let activeId = $state(tracks[0].youtubeId);
</script>

<div class="tracks-widget">
	<div class="ascii scanlines">
		<!-- <button><i class="fa-pixel fa-regular fa-play"></i> Play</button> -->
		<iframe
			src="https://www.youtube.com/embed/{activeId}"
			title="YouTube player"
			frameborder="0"
			controls="0"
			modestbranding="1"
			allow="accelerometer; autoplay; encrypted-media; gyroscope;"
		></iframe>
	</div>

	<ul class="tracks">
		{#each tracks as track}
			<li>
				<button
					class:active={track.youtubeId === activeId}
					onclick={() => (activeId = track.youtubeId)}
				>
					<i class="fa-pixel fa-regular fa-music"></i>
					{track.title} — {track.artist}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tracks-widget {
		display: flex;
	}
	.scanlines {
		aspect-ratio: 9 / 9;
		height: 350px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		:global(.miniPlayer) & {
			width: 80px;
			height: 80px;
		}
		button {
			z-index: 9999;
			background: var(--color-text);
			padding: var(--space-2xs) var(--space-3xs);
			font-family: 'DepartureMono', monospace;
			border: none;
			color: var(--color-bg-accent);
			pointer-events: none;
			font-size: var(--step-pixel-0);
			box-shadow:
				0px 4px var(--color-text),
				0px -4px var(--color-text),
				4px 0px var(--color-text),
				-4px 0px var(--color-text),
				0px 8px var(--color-shadow-solid),
				4px 4px var(--color-shadow-solid),
				-4px 4px var(--color-shadow-solid);
		}
	}
	.tracks-widget iframe {
		width: 100%;
		aspect-ratio: 9 / 9;
		border: none;
		filter: saturate(0%) contrast(1.2) brightness(1.2);
		margin-bottom: -8px;
		position: absolute;
		top: 0;
		left: 0;
	}
	.tracks-widget ul {
		list-style: none;
		padding: 0 var(--space-xs);
		width: 100%;
		margin-bottom: 0;
		li {
			width: 100%;
		}
	}
	.tracks button {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: var(--space-3xs) var(--space-3xs);
		margin-bottom: var(--space-xs);
		cursor: pointer;
		color: var(--color-text);
		font-size: var(--step-pixel--1);
		font-family: 'DepartureMono', sans-serif;
		letter-spacing: -0.3px;
		:global(.miniPlayer) & {
			display: none;
		}
		&.active {
			background: var(--color-text);
			color: var(--color-bg-accent);
			box-shadow:
				0px 4px var(--color-text),
				0px -4px var(--color-text),
				4px 0px var(--color-text),
				-4px 0px var(--color-text),
				0px 8px var(--color-shadow-solid),
				4px 4px var(--color-shadow-solid),
				-4px 4px var(--color-shadow-solid);
			:global(.miniPlayer) & {
				display: block;
			}
		}
	}
</style>
