import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';
import { getAllPosts } from '$lib/server/posts.js';
import { getAllExternalPosts } from '$lib/server/posts.js'; // or wherever this actually lives

export async function load({ params }) {
	const filePath = path.resolve('src/external-posts', `${params.slug}.md`);
	if (!fs.existsSync(filePath)) error(404, 'Post not found');

	const raw = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(raw);
	const html = marked(content);

	return {
		posts: getAllPosts(),
		externalPosts: getAllExternalPosts(),
		meta: data,
		html
	};
}
