import { getAllPosts, getAllExternalPosts } from '$lib/server/posts.js';

export async function load() {
	return { posts: getAllPosts(), externalPosts: getAllExternalPosts() };
}
