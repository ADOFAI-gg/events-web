import type { PageLoad } from './$types';
import { fetechCourseRecords } from '../../util/aggregator';

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

	const { records, totalLevelCount } = await fetechCourseRecords(ids, { fetch });

	return {
		records,
		totalLevelCount
	};
};
