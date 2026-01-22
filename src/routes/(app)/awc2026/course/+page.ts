import { fetechCourseRecords, fromUrlMap } from '$lib/course/util/aggregator';
import type { PageLoad } from './$types';

const urls = Object.fromEntries(
	Object.entries(
		import.meta.glob('./data/*.json', {
			query: '?url',
			eager: true
		})
	).map(([k, v]) => [
		k.slice('./data/'.length, k.length - '.json'.length),
		(v as { default: string }).default
	])
);

export const load: PageLoad = async ({ fetch }) => {
	const data = await fetechCourseRecords(['693d40ec801b21c1c3956a10'], fromUrlMap(urls, fetch));

	return {
		data
	};
};
