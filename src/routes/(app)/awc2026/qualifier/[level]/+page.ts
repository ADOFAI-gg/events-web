import { encode } from '@adofai-gg/ui';
import type { PageLoad } from './$types';
import ky from 'ky';
import type { AggregatedReocrd, CourseRankingData, CourseRecord, HitMarginList } from '../../types';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

const levels = {
	a: '693d269f801b21c1c3956676',
	b: '693d269f801b21c1c3956676'
} as Record<string, string>;

export const load: PageLoad = async ({ fetch, params }) => {
	const ids = [] as string[];

	if (params.level === 'all') {
		ids.push(...Object.values(levels));
	} else if (levels[params.level]) {
		ids.push(levels[params.level]);
	} else {
		return error(404);
	}

	const aggregated = {} as Record<string, AggregatedReocrd>;
	let totalLevelCount = 0;

	for (const id of ids) {
		const res = await ky(encode`https://course.adofai.gg/api/courses/${id}/ranking`, {
			fetch
		}).json<CourseRankingData>();

		totalLevelCount += res.course.levelCount;

		for (const record of res.records) {
			const existing = aggregated[record.user.displayName];
			if (!existing) {
				aggregated[record.user.displayName] = {
					...record,
					sum: getCourseSum(record)
				};
				continue;
			}

			const currentSum = getCourseSum(record);

			existing.sum.hitMargins = sumHitMargins(existing.sum.hitMargins, currentSum.hitMargins);
			existing.sum.xAcc += currentSum.xAcc;

			existing.playRecords.push(...existing.playRecords);
		}
	}

	return {
		records: Object.values(aggregated),
		totalLevelCount
	};
};

const sumHitMargins = (...hitMargins: HitMarginList[]): HitMarginList => {
	return hitMargins.reduce((a, b) => a.map((x, i) => x + b[i]) as HitMarginList, [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	] as HitMarginList);
};

const getCourseSum = (record: CourseRecord): AggregatedReocrd['sum'] => {
	return {
		hitMargins: sumHitMargins(...record.playRecords.map((x) => x.hitMargins)),
		xAcc: record.playRecords.reduce((a, b) => a + b.xAcc, 0)
	};
};
