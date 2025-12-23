import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

interface LevelDefinition {
	id: string;
	name: string;
}

interface PlayRecord {
	id: string;
	displayName: string;
	avatarUrl: string;
	updatedAt: number;
	xAcc: number;
	hitMargins: number[];
}

const items: LevelDefinition[] = [
	{
		id: '13e823a1e3b13effeaf45407fdcbc8f6',
		name: 'awc2025-qualifier-level-a'
	},
	{
		id: '4e252b743aff12697859963e2e226cad',
		name: 'awc2025-qualifier-level-b'
	}
];

export const load: PageLoad = async (ev) => {
	const id = ev.params.levelId;

	const recordMap: Record<string, PlayRecord> = {};
	const idsToFetch = items.filter((x) => {
		if (id === 'all') return true;
		if (x.id === id) return true;

		return false;
	});

	if (idsToFetch.length === 0 && id !== 'all') return error(404, 'level not found');

	for (const level of idsToFetch) {
		const data: PlayRecord[] = (await import(`./data/${level.id}.json`)).default;

		for (const item of data) {
			if (!recordMap[item.id]) {
				recordMap[item.id] = Object.assign({}, item);
				continue;
			}

			const existing = recordMap[item.id];
			existing.xAcc += item.xAcc;
			existing.updatedAt += item.updatedAt;

			for (let i = 0; i < 12; i++) {
				existing.hitMargins[i] += item.hitMargins[i];
			}
		}
	}

	const records: PlayRecord[] = Object.values(recordMap);

	records.sort((a, b) => {
		const xacc = b.xAcc - a.xAcc;
		const miss = a.hitMargins[8] + a.hitMargins[9] - b.hitMargins[8] + b.hitMargins[9];
		const perf = b.hitMargins[3] - a.hitMargins[3];
		const time = a.updatedAt - b.updatedAt;

		return xacc || miss || perf || time;
	});

	if (records.length < 32 && records.length !== 0) {
		records.push(...new Array(32 - records.length).fill(null));
	}

	return {
		levels: items,
		id,
		records
	};
};
