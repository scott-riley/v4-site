<script>
	let contactingStatus = $state(null);
	import { enhance } from '$app/forms';
	let { form } = $props();
</script>

<form class="contact-form" method="POST" use:enhance>
	<div class="message">
		<div class="message-top">
			<div class="top-line">
				<span>To:</span> Scott Riley <i>hugs@scott.is</i>
			</div>
			<div class="top-line">
				<label for="email">From:</label>
				<input
					type="email"
					required
					class="inline-mail-field"
					value=""
					placeholder="lovely@person.xyz"
					id="email"
					name="email"
				/>
			</div>
			<div class="top-line">
				<input
					type="text"
					class="inline-mail-field"
					value=""
					placeholder="Subject"
					name="subject"
				/>
			</div>
		</div>
		<textarea class="message-content" name="message" required placeholder="Your wonderful message…"
		></textarea>
		<div class="form-actions">
			<div class="response">
				{#if form?.success}
					<div>
						<i class="fa-pixel fa-regular fa-thumbs-up"></i>
						<span>Message sent, thanks babes! xoxo</span>
					</div>
				{:else if form?.success === false}
					<div>
						<i class="fa-pixel fa-regular fa-triangle-exclamation"></i>
						<span>Something fucked up!</span>
					</div>
				{:else}
					<div>
						<i class="fa-pixel fa-regular fa-comment-dots"></i>
						<span>Pls don’t spam, it upsets the frogs</span>
					</div>
				{/if}
			</div>
			<button type="submit">Send Message</button>
		</div>
	</div>
</form>

<style>
	.top-line,
	.form-actions {
		font-size: var(--step-pixel-0);
		padding: 0 var(--space-s);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		gap: var(--space-3xs);
		i {
			font-style: normal;
			opacity: 0.77;
		}
		.inline-mail-field,
		span,
		label {
			padding: var(--space-2xs);
			background: none;
			border: none;
			color: var(--color-text);
			font-family: 'Departure Mono', sans-serif;
			font-size: var(--step-pixel-0);
		}
		.inline-mail-field {
			display: block;
			width: 100%;
			&:focus {
				outline: none;
				background: var(--color-bg-muted);
			}
		}
	}
	.message-content {
		padding: var(--space-m);
		background: transparent;
		width: 100%;
		border: none;
		color: var(--color-text);
		font-size: var(--step-1);
		font-family: 'Argent Pixel', serif;
		font-weight: normal;
		resize: vertical;
		&:focus {
			outline: none;
			background: var(--color-bg-muted);
		}
		&[placeholder]:empty::before {
			content: attr(placeholder);
			z-index: 9;
			line-height: 1.7;
			word-break: break-all;
			user-select: none;
			opacity: 0.77;
		}

		&[placeholder]:empty:focus::before {
			content: '';
		}
	}
	.form-actions {
		padding: var(--space-xs) var(--space-m);
		padding-bottom: var(--space-xs);
		border-top: 1px solid var(--color-border);
		border-bottom: none;
		display: flex;
		justify-content: space-between;
	}
	.response,
	.response span {
		font-size: var(--step-pixel--1);
	}
	button[type='submit'] {
		font-family: 'Silkscreen', sans-serif;
		padding: var(--space-3xs) var(--space-2xs);
		color: var(--color-bg-accent);
		background: var(--color-text);
		border: none;
		font-size: var(--step-pixel-0);
		font-weight: normal;
		box-shadow:
			0px 4px var(--color-text),
			0px -4px var(--color-text),
			4px 0px var(--color-text),
			-4px 0px var(--color-text),
			0px 8px var(--color-shadow-solid),
			4px 4px var(--color-shadow-solid),
			-4px 4px var(--color-shadow-solid);
	}
</style>
