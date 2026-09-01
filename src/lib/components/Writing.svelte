<script>
	import { goto } from '$app/navigation';
	let { posts, externalPosts } = $props();
	let showGrid = $state(false);
	const formatShortDate = (dateStr) =>
		new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: '2-digit'
		});
</script>

<div class="writing folder">
	<div class="folder-header">
		<div class="folder-name">
			<i class="fa-pixel fa-regular fa-folder"></i>
			<h2>words_4_the_homies</h2>
		</div>
	</div>
	<div class="folder-content" class:grid={showGrid}>
		{#each posts as post (post.slug)}
			<div class="folder-item">
				<div class="item-details">
					<div class="item-icon">
						<i class="fa-pixel fa-regular fa-file"></i>
					</div>
					<a
						class="item-name"
						href={`/writing/about/${post.slug}`}
						onclick={goto(`/writing/about/${post.slug}`)}>{post.title}</a
					>
				</div>
				<div class="item-meta">
					<span class="reading-time">{post.readingTime}</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="folder-header">
		<div class="folder-name">
			<i class="fa-pixel fa-regular fa-folder"></i>
			<h2>external_posts</h2>
		</div>
	</div>
	<div class="folder-content" class:grid={showGrid}>
		{#each externalPosts as post (post.url)}
			<div class="folder-item">
				<div class="item-details">
					<div class="item-icon">
						<i class="fa-pixel fa-regular fa-link"></i>
					</div>
					<a
						class="item-name"
						href={`/writing/for/${post.slug}`}
						onclick={goto(`/writing/for/${post.slug}`)}>{post.title}</a
					>
				</div>
				<div class="for">for {post.pub}</div>
			</div>
		{/each}
	</div>
</div>
