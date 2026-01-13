<script lang="ts">
	import type { HitMarginList } from '../types';
	import DividerDot from './divider-dot.svelte';

	type Props = {
		hitMargins: HitMarginList;
	};

	const { hitMargins }: Props = $props();
</script>

<span class="text-hitmargin-too-early">{hitMargins[0]}</span>
<span class="text-hitmargin-early">{hitMargins[1]}</span>
<span class="text-hitmargin-early-perfect">{hitMargins[2]}</span>
<span class="text-hitmargin-perfect">{hitMargins[3]}</span>
<span class="text-hitmargin-late-perfect">{hitMargins[4]}</span>
<span class="text-hitmargin-late">{hitMargins[5]}</span>
<span class="text-hitmargin-too-late">{hitMargins[6]}</span>

<DividerDot />

<span class="text-hitmargin-miss before:content-['M'] before:font-semibold">
	{hitMargins[8]}
</span>
<span class="text-hitmargin-overload before:content-['O'] before:font-semibold">
	{hitMargins[9]}
</span>
