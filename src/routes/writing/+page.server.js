import { getAllPosts } from '$lib/server/posts.js';

export async function load() {
	return { posts: getAllPosts() };
}
