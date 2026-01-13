import { fetechCourseRecords, fromCourseAPI } from '$lib/course/util/aggregator';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const data = await fetechCourseRecords(['693d40ec801b21c1c3956a10'], fromCourseAPI(fetch));

	return {
		data
	};
};
