<div class="about">
	<div class="about-intro">
		<h2>About this site</h2>
		<p>
			Welcome, dear friend, to my little corner of the web. I’m so very happy to have you here. If
			you’re reading this you’ve either hit a button while wondering what the fuck a ‘colophon’ is,
			or you actually care about how this site was cobbled together.
		</p>
		<p>
			If you’re so inclined, you can read a <a href="/writing/about/scott-v4"
				>somewhat rambling post</a
			> about some of the motivations behind this site.
		</p>
		<h3>Technical</h3>
		<p>
			This site was designed directly in the browser, primarily using good old HTML and CSS. It is
			built on
			<a href="https://svelte.dev/">Svelte</a>, to which the highest complement I can pay is that it
			most definitely is Not React.
		</p>
		<p>
			The trickiest thing to get right was the window management. Fortunately, this is not an actual
			OS (wild, I know) and you may be disappointed to find that there’s nothing technically
			impressive about any of this. It’s 90% smoke and mirrors, with some very rudimentary
			transform-driven drag handling and z-index recalculation that would explode in anything close
			to a stress test.
		</p>
		<p>
			Aside from the window management, having some form of routing and server-side rendering was
			important, aping OS patterns doesn’t change the fact that this is still a website and basic
			things like URLs should probably work. While windows are somewhat seamless, there’s still a
			rough route structure for key pages like the writing and contact page. Most important things
			should work with JS disabled, too. Which is nice.
		</p>
		<h3>Design</h3>
		<p>
			A website that looks like an operating system isn’t exactly unique. But it is fun. The whole
			‘somewhat retro’ vibe comes from the pseudo–pixellated assets, for which I can take zero
			credit. Connary Fagen’s <a href="https://connary.com/fonts/argent-pixel/">Argent Pixel</a> is
			the heading font, and Helena Zhang’s <a href="https://departuremono.com/">Departure Mono</a> is
			the body font. Silkscreen is used sparingly in CTAs.
		</p>
		<p>
			Smaller icons are from <a href="https://fontawesome.com/icons/packs/pixel"
				>Font Awesome’s Pixel set</a
			>. Larger icons are from
			<a href="https://www.streamlinehq.com/icons/pixel">streamline’s free pixel icons set</a>.
		</p>
	</div>
</div>

<style>
	.about-intro {
		padding: var(--space-m);
	}
	h2,
	h3 {
		font-family: 'Argent Pixel', serif;
		font-size: var(--step-3);
		font-weight: normal;
		margin: 0;
		margin-bottom: var(--space-s);
		padding: 0;
		overflow: hidden;
		white-space: nowrap;
	}
	h3 {
		font-size: var(--step-2);
		margin-bottom: var(--space-2xs);
		margin-top: var(--space-m);
	}
	p {
		margin-top: 0;
		font-family: 'DepartureMono', sans-serif;
		font-size: var(--step-pixel-0);
		color: #444;
		max-width: 900px;
		color: var(--color-text-muted);
	}
	a {
		font-style: normal;
	}
	.intro-icons {
		font-size: 24px;
		display: flex;
		gap: var(--space-m);
		margin-bottom: var(--space-xs);
	}
</style>
