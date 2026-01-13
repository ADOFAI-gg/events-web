import type { PageLoad } from './$types';
import { fetechCourseRecords, fromUrlMap } from '$lib/course/util/aggregator';

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

const levels = {
	a: '693d40de801b21c1c39569ea',
	b: '693d40e8801b21c1c39569fd'
} as Record<string, string>;

export const load: PageLoad = async ({ fetch, params }) => {
	const ids = [] as string[];

	if (params.level === 'all') {
		ids.push(...Object.values(levels));
	} else if (levels[params.level]) {
		ids.push(levels[params.level]);
	} else {
		ids.push(params.level);
	}

	const data = await fetechCourseRecords(ids, fromUrlMap(urls, fetch));

	return { data };
};
