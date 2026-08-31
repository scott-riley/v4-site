import { error } from '@sveltejs/kit';
import {
	getAllProjects,
	getAllFeatures,
	getProjectBySlug,
	getFeatureBySlug
} from '$lib/server/posts.js';

export async function load({ params }) {
	const post = getFeatureBySlug(params.slug);
	if (!post) error(404, 'Post not found');

	return {
		projects: getAllProjects(),
		features: getAllFeatures(),
		meta: post,
		html: post.html
	};
}
