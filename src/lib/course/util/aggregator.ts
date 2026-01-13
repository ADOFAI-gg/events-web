import { encode } from '@adofai-gg/ui';
import type { AggregatedReocrd, CourseRankingData, CourseRecord, HitMarginList } from '../types';
import ky, { HTTPError, type Options } from 'ky';

const defaultData = () =>
	({
		records: [],
		course: undefined
	}) as CourseRankingData;

export const fromUrlMap =
	(urls: Record<string, string>, fetch: Options['fetch']) => (id: string) =>
		urls[id]
			? ky(urls[id], {
					fetch
				})
					.json<CourseRankingData>()
					.catch((e) => {
						if (e instanceof HTTPError) {
							if (e.response.status !== 404) return Promise.reject(e);
						}

						return defaultData();
					})
			: Promise.resolve(defaultData());

export const fromCourseAPI = (fetch: Options['fetch']) => (id: string) =>
	ky(encode`https://course.adofai.gg/api/courses/${id}/ranking`, {
		fetch
	})
		.json<CourseRankingData>()
		.catch((e) => {
			if (e instanceof HTTPError) {
				if (e.response.status !== 404) return Promise.reject(e);
			}

			return defaultData();
		});

export const fetechCourseRecords = async (
	ids: string[],
	fetcher: (id: string) => Promise<CourseRankingData>
	// { fetch }: { fetch: RequestEvent['fetch'] }
) => {
	const aggregated = {} as Record<string, AggregatedReocrd>;
	let totalLevelCount = 0;

	for (const id of ids) {
		const res = await fetcher(id);

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
			existing.createdAt += record.createdAt;

			existing.playRecords.push(
				...record.playRecords.map((x, i) => ({
					...x,
					levelName: getLevelName(i)
				}))
			);
		}

		totalLevelCount += res.course?.levelCount ?? 0;
	}

	const records = Object.values(aggregated).sort((a, b) => {
		return b.sum.xAcc - a.sum.xAcc || a.createdAt - b.createdAt;
	});

	return {
		records,
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
