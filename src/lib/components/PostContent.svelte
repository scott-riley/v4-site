<script>
	let { meta, html } = $props();
</script>

<div class="post-image ascii scanlines">
	<img src={`/blog/${meta.image}`} />
	<h1>{meta.title}</h1>
</div>
<article>
	<div class="inner-content">
		{@html html}
	</div>
</article>

<style>
	.post-image {
		position: relative;
		max-width: 1200px;
		margin: auto;
		@media (max-width: 900px) {
			&:before,
			&:after {
				display: none;
			}
		}
		img {
			@media (max-width: 900px) {
				display: none;
			}
		}
		h1 {
			background: var(--color-bg-accent);
			font-weight: normal;
			padding: 0 var(--space-m);
			font-family: 'Argent Pixel', serif;
			margin: 0;
			margin-top: var(--space-s);
			@media (min-width: 740px) {
				font-size: var(--step-5);
				padding: 0 var(--space-l);
				position: absolute;
				text-align: center;
				left: var(--space-2xl);
				right: var(--space-2xl);
				text-wrap: pretty;
				bottom: 0;
				font-size: var(--step-5);
				z-index: 9999;
				margin: 0;
				padding: 0 var(--space-l);
				padding-top: var(--space-l);
			}
		}
	}
	article {
		font-family: 'Pixel Operator', sans-serif;
		.inner-content {
			max-width: 70ch;
			margin: auto;
			@media (max-width: 900px) {
				max-width: 90%;
			}
		}
		h1 {
			font-family: 'Argent Pixel', serif;
			font-weight: normal;
			font-size: var(--step-5);
			text-align: center;
		}
		:global h2 {
			font-family: 'Argent Pixel', serif;
			font-weight: normal;
			font-size: var(--step-3);
			margin-bottom: var(--size-m);
		}
		:global h3 {
			font-family: 'Argent Pixel', serif;
			font-weight: normal;
			font-size: var(--step-2);
			margin-bottom: var(--size-m);
		}
		.inner-content > :global(p):first-child {
			font-family: 'Argent Pixel', serif;
			font-size: var(--step-1);
			margin-bottom: 2rem;
			line-height: 1.3;
			@media (min-width: 740px) {
				&::first-letter {
					font-size: 7rem;
					padding: 6px;
					margin-right: 12px;
					border: 2px solid var(--color-text);
					box-shadow: 4px 3px 0 var(--color-text);
					float: left;
				}
			}
		}
		:global p {
			font-family: 'DepartureMono', sans-serif;
			font-size: var(--step-pixel-0);
			letter-spacing: 0.2px;
			line-height: 1.5;
			sup {
				font-size: var(--step--2);
				--webkit-font-smoothing: subpixel-antialiased;
				-moz-osx-font-smoothing: none;
			}
			a {
				font-style: normal;
			}
		}
		:global blockquote {
			margin: 0;
			padding: 0 var(--space-m);
			border: 3px solid var(--color-border);
			margin-top: var(--space-m);
			margin-bottom: var(--space-m);
			box-shadow:
				3px 3px 0 var(--color-bg-muted),
				5px 5px 0 var(--color-border);
			margin-left: calc(var(--space-m) * -1);
			margin-right: calc(var(--space-m) * -1);
			& > p {
				font-family: 'Argent Pixel', serif;
				font-style: italic;
				font-size: var(--step-1);
				line-height: 1.44;
				max-width: 100%;
			}
		}
	}
</style>
