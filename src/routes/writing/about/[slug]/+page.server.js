import { error } from '@sveltejs/kit';
import { getAllPosts, getAllExternalPosts, getPostBySlug } from '$lib/server/posts.js';

export async function load({ params }) {
	const post = getPostBySlug(params.slug);
	if (!post) error(404, 'Post not found');

	return {
		posts: getAllPosts(),
		externalPosts: getAllExternalPosts(),
		meta: post,
		html: post.html
	};
}
