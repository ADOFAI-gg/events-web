<script lang="ts">
	import type { fetechCourseRecords } from '../util/aggregator';
	import { createWindowVirtualizer } from '$lib/virtualizer.svelte';
	import CourseRecord from './course-record.svelte';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';

	const {
		data
	}: {
		data: Awaited<ReturnType<typeof fetechCourseRecords>>;
	} = $props();

	const { records, totalLevelCount } = $derived(data);

	const virtualizer = $derived(
		createWindowVirtualizer({
			count: records.length,

			estimateSize: () => 60,
			overscan: 3
		})
	);

	let elements = $state<HTMLDivElement[]>([]);

	$effect(() => {
		elements.forEach((el) => virtualizer.measureElement(el));
	});

	const virtualItems = $derived(virtualizer.getVirtualItems());
</script>

<div class="mt-4 relative" style="height: {virtualizer.getTotalSize()}px;">
	<div
		style="transform: translateY({virtualItems[0]
			? virtualItems[0].start - virtualizer.options.scrollMargin
			: 0}px)"
		class="absolute top-0 left-0 w-full"
	>
		{#each virtualItems as item, i (item.index)}
			{@const record = records[item.index]}
			<div bind:this={elements[i]} data-index={item.index} class="relative">
				<CourseRecord {record} ordinal={item.index + 1} isMultiple={totalLevelCount > 1} />
				{#if item.index === 63}
					<div
						class="absolute z-50 bottom-0 left-0 w-full border-b-2 border-gg-yellow pointer-events-none select-none"
					>
						<div
							class="bg-gg-yellow text-black translate-y-1/2 inline-flex px-2 py-0.5 rounded-md text-sm font-medium absolute left-0 bottom-0"
						>
							<Localized id="cut-line" />
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
