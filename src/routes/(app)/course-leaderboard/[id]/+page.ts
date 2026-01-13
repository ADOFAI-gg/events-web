import { fetechCourseRecords, fromCourseAPI } from '$lib/course/util/aggregator';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	return {
		data: await fetechCourseRecords(params.id.split(','), fromCourseAPI(fetch))
	};
};
