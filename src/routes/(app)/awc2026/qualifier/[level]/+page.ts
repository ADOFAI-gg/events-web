import { encode } from '@adofai-gg/ui';
import type { PageLoad } from './$types';
import ky from 'ky';
import type { AggregatedReocrd, CourseRankingData, CourseRecord, HitMarginList } from '../../types';

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

	const aggregated = {} as Record<string, AggregatedReocrd>;
	let totalLevelCount = 0;

	for (const id of ids) {
		const res = await ky(encode`https://course.adofai.gg/api/courses/${id}/ranking`, {
			fetch
		}).json<CourseRankingData>();

		for (const record of res.records) {
			const levels = res.course?.levels;
			const getLevelName = (i: number) => {
				const level = levels?.[i];
				if (!level) return '';
				return `${level.artist} - ${level.song}`;
			};

			const existing = aggregated[record.user.displayName];
			if (!existing) {
				aggregated[record.user.displayName] = {
					...record,
					sum: getCourseSum(record),
					playRecords: record.playRecords.map((x, i) => ({
						...x,
						levelName: getLevelName(i)
					}))
				};
				continue;
			}

			const currentSum = getCourseSum(record);

			existing.sum.hitMargins = sumHitMargins(existing.sum.hitMargins, currentSum.hitMargins);
			existing.sum.xAcc += currentSum.xAcc;

			existing.playRecords.push(
				...record.playRecords.map((x, i) => ({
					...x,
					levelName: getLevelName(i)
				}))
			);
		}

		totalLevelCount += res.course?.levelCount ?? 0;
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
