import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
	return redirect(302, '/awc2025/qualifier/all')
}
