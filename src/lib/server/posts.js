import matter from 'gray-matter';
import { marked } from 'marked';

const postModules = import.meta.glob('/src/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function parsePosts(modules) {
	return Object.entries(modules).map(([path, raw]) => {
		const { data, content } = matter(raw);
		const slug = path.split('/').pop().replace('.md', '');
		return { slug, ...data, content };
	});
}

export function getAllPosts() {
	return parsePosts(postModules).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export function getPostBySlug(slug) {
	const post = getAllPosts().find((p) => p.slug === slug);
	if (!post) return null;
	return { ...post, html: marked(post.content) };
}

const externalPostModules = import.meta.glob('/src/external-posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export function getAllExternalPosts() {
	return parsePosts(externalPostModules).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}

export function getExternalPostBySlug(slug) {
	return getAllExternalPosts().find((p) => p.slug === slug) ?? null;
}

const projectModules = import.meta.glob('/src/projects/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export function getAllProjects() {
	return parsePosts(projectModules);
}

export function getProjectBySlug(slug) {
	return getAllProjects().find((p) => p.slug === slug) ?? null;
}

const featuresModules = import.meta.glob('/src/features/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export function getAllFeatures() {
	return parsePosts(featuresModules);
}

export function getFeatureBySlug(slug) {
	return getAllFeatures().find((p) => p.slug === slug) ?? null;
}
