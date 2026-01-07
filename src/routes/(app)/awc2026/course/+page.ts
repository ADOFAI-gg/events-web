import { fetechCourseRecords } from '../util/aggregator';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const { records, totalLevelCount } = await fetechCourseRecords(['693d40ec801b21c1c3956a10'], {
		fetch
	});

	return {
		records,
		totalLevelCount
	};
};
