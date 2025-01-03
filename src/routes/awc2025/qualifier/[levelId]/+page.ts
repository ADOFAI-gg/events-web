import type { TranslationKey } from '@adofai-gg/ui'
import type { PageLoad } from './$types'
import { dev } from '$app/environment'
import { error } from '@sveltejs/kit'

interface LevelDefinition {
	id: string
	name: TranslationKey
}

interface PlayRecord {
	id: string
	displayName: string
	avatarUrl: string
	updatedAt: number
	xAcc: number
	hitMargins: number[]
}

const items: LevelDefinition[] = [
	// {
	// 	id: '',
	// 	name: 'awc2025:qualifier-level-a'
	// },
	// {
	// 	id: '',
	// 	name: 'awc2025:qualifier-level-b'
	// }
]

export const load: PageLoad = async (ev) => {
	const id = ev.params.levelId

	const recordMap: Record<string, PlayRecord> = {}
	const idsToFetch = items.filter((x) => {
		if (id === 'all') return true
		if (x.id === id) return true

		return false
	})

	if (idsToFetch.length === 0 && id !== 'all') return error(404, 'level not found')

	for (const level of idsToFetch) {
		const res = await ev.fetch(
			dev ? '/api/awc2025/ranking/' + level.id : 'https://bot.adofai.gg/awc2025/ranking/' + level.id
		)
		const data: PlayRecord[] = await res.json()

		for (const item of data) {
			if (!recordMap[item.id]) {
				recordMap[item.id] = Object.assign({}, item)
				continue
			}

			const existing = recordMap[item.id]
			existing.xAcc += item.xAcc

			for (let i = 0; i < 12; i++) {
				existing.hitMargins[i] += item.hitMargins[i]
			}
		}
	}

	const records: (PlayRecord | null)[] = Object.values(recordMap)

	records.sort((a, b) => b!.xAcc - a!.xAcc)

	if (records.length < 32 && records.length !== 0) {
		records.push(...new Array(32 - records.length).fill(null))
	}

	return {
		levels: items,
		id,
		records
	}
}
