<script>
	import { goto } from '$app/navigation';
	let { projects, features } = $props();
	let showGrid = $state(false);
</script>

<div class="writing folder">
	<div class="folder-header">
		<div class="folder-name">
			<i class="fa-pixel fa-regular fa-folder"></i>
			<h2>very_professional_work</h2>
		</div>
	</div>
	<div class="folder-content" class:grid={showGrid}>
		{#each projects as project (project.slug)}
			<div class="folder-item reversed">
				<div class="item-details">
					<div class="item-icon">
						<i class="fa-pixel fa-regular fa-palette"></i>
					</div>
					{#if project.type === 'external'}
						<a class="item-name" href={project.url} target="_blank">
							{project.title}
							<i class="fa-pixel fa-regular fa-arrow-up-right-from-square"></i>
						</a>
					{:else}
						<a
							class="item-name"
							href={`/professional/with/${project.slug}`}
							onclick={goto(`/professional/with/${project.slug}`)}>{project.title}</a
						>
					{/if}
				</div>
				<div class="item-meta">
					<span>{project.role}</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="folder-header">
		<div class="folder-name">
			<i class="fa-pixel fa-regular fa-folder"></i>
			<h2>talks_and_podcasts</h2>
		</div>
	</div>
	<div class="folder-content" class:grid={showGrid}>
		{#each features as feature (feature.slug)}
			<div class="folder-item">
				<div class="item-details">
					<div class="item-icon">
						<i class="fa-pixel fa-regular fa-{feature.icon}"></i>
					</div>
					<a
						class="item-name"
						href={`/speaking/at/${feature.slug}`}
						onclick={goto(`/speaking/at/${feature.slug}`)}>{feature.title}</a
					>
				</div>
				<div class="for">for {feature.pub}</div>
			</div>
		{/each}
	</div>
</div>
