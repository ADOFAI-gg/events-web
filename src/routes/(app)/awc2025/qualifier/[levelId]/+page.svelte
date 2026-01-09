<script lang="ts">
	import { getFluentContext, Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { PageProps } from './$types';
	import { fade } from 'svelte/transition';
	import { Avatar } from '@adofai-gg/ui';
	import Icon from '@iconify/svelte';

	const { data }: PageProps = $props();

	const tabs = $derived.by(() => {
		return [
			{
				id: 'all',
				name: 'awc2025-qualifier-level-all'
			},
			...data.levels
		];
	});

	const { localize } = getFluentContext();

	const cutlineText = $derived(localize('cut-line'));
</script>

<h1 class="text-4xl font-medium">
	<Localized id="awc2025-qualifier-title" />
</h1>

<div class="flex gap-4 mt-2">
	{#each tabs as tab (tab.id)}
		{@const active = data.id === tab.id}
		<a
			href="/awc2025/qualifier/{tab.id}"
			class="relative grow w-0 bg-gg-darkblue/20 rounded-lg font-medium contents-center text-center p-4"
		>
			<Localized id={tab.name} />
			{#if active}
				<div
					transition:fade={{ duration: 200 }}
					class="absolute bottom-0 left-0 w-full bg-gg-blue rounded-b-lg h-1"
				></div>
			{/if}
		</a>
	{/each}
</div>

<div class="mt-2" style="--cutline-text: '{cutlineText}';">
	{#each data.records as record, idx (record.id)}
		{@const ordinal = idx + 1}

		{@const hitMargins = record.hitMargins}

		<div class="border-b border-white/20 p-4 flex items-center gap-4 record relative">
			<div class="text-2xl w-12 text-center before:content-['#']">
				{ordinal}
			</div>
			<Avatar src={record.avatarUrl} class="size-12 shrink-0" />
			<div class="flex flex-col">
				<div class="text-xl font-medium">
					{record.displayName}
				</div>
				<div class="flex gap-2 items-center flex-wrap">
					<div class="flex gap-1 items-center text-white/60">
						<Icon icon="ggev:accuracy" class="size-4" />
						<span class="after:content-['%']">{(record.xAcc * 100).toFixed(3)}</span>
					</div>

					<div class="w-0.5 h-0.5 bg-white/40 rounded-full"></div>

					<div class="flex gap-2 items-center">
						<span class="text-hitmargin-too-early">{hitMargins[0]}</span>
						<span class="text-hitmargin-early">{hitMargins[1]}</span>
						<span class="text-hitmargin-early-perfect">{hitMargins[2]}</span>
						<span class="text-hitmargin-perfect">{hitMargins[3]}</span>
						<span class="text-hitmargin-late-perfect">{hitMargins[4]}</span>
						<span class="text-hitmargin-late">{hitMargins[5]}</span>
						<span class="text-hitmargin-too-late">{hitMargins[6]}</span>

						<div class="w-0.5 h-0.5 bg-white/40 rounded-full"></div>

						<span class="text-hitmargin-miss before:content-['M'] before:font-semibold"
							>{hitMargins[8]}</span
						>
						<span class="text-hitmargin-overload before:content-['O'] before:font-semibold"
							>{hitMargins[9]}</span
						>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	@reference "../../../../../app.css";

	.record:nth-child(32)::before {
		@apply bg-gg-yellow w-full h-0.5 left-0 bottom-0 content-[''] absolute;
	}

	.record:nth-child(32)::after {
		@apply content-(--cutline-text) absolute left-0 bottom-0 translate-y-1/2 bg-gg-yellow rounded-md font-medium text-sm text-black px-2 py-0.5;
	}
</style>
