import { error } from '@sveltejs/kit';
import { getAllPosts, getAllExternalPosts, getExternalPostBySlug } from '$lib/server/posts.js';

export async function load({ params }) {
	const post = getExternalPostBySlug(params.slug);
	if (!post) error(404, 'External post not found');

	return {
		posts: getAllPosts(),
		externalPosts: getAllExternalPosts(),
		meta: post
	};
}
