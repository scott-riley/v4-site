import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export function getAllPosts() {
	const dir = path.resolve('src/posts');
	const posts = fs
		.readdirSync(dir)
		.filter((f) => f.endsWith('.md'))
		.map((filename) => {
			const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
			const { data } = matter(raw);
			return { slug: filename.replace('.md', ''), ...data };
		});

	const sorted = posts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
	console.log(sorted.map((p) => [p.slug, p.pubDate]));
	return sorted;
}

export function getAllExternalPosts() {
	const dir = path.resolve('src/external-posts');
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith('.md'))
		.map((filename) => {
			const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
			const { data } = matter(raw);
			return { slug: filename.replace('.md', ''), ...data };
		});
}
