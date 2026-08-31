import matter from 'gray-matter';

const postFiles = import.meta.glob('/src/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const externalPostFiles = import.meta.glob('/src/external-posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function parsePosts(files) {
	return Object.entries(files).map(([filename, raw]) => {
		const { data } = matter(raw);

		return {
			slug: filename.split('/').pop().replace(/\.md$/, ''),
			...data
		};
	});
}

export function getAllPosts() {
	const posts = parsePosts(postFiles);

	const sorted = posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

	console.log(sorted.map((p) => [p.slug, p.pubDate]));

	return sorted;
}

export function getAllExternalPosts() {
	return parsePosts(externalPostFiles);
}
