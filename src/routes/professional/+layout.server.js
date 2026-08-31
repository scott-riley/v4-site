import { getAllProjects, getAllFeatures } from '$lib/server/posts.js';

export async function load() {
	return { projects: getAllProjects(), features: getAllFeatures() };
}
