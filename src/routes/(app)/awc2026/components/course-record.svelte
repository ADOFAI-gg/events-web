<script lang="ts">
	import { cn, Panel } from '@adofai-gg/ui';
	import Icon from '@iconify/svelte';
	import { Collapsible } from 'bits-ui';
	import HitMargins from './hit-margins.svelte';
	import DividerDot from './divider-dot.svelte';
	import { Localized } from '@nubolab-ffwd/svelte-fluent';

	type Props = {
		ordinal: number;
	};

	const { ordinal }: Props = $props();

	const hitMargins = new Array(10).fill(10000);

	let open = $state(false);
</script>

<Collapsible.Root class="w-full" bind:open>
	<Collapsible.Trigger
		class="border-t border-white/20 p-4 flex items-center w-full cursor-pointer gap-4 hover:bg-gg-darkblue/10 active:bg-gg-darkblue/20 transition-colors"
	>
		<Icon
			icon="gg:chevron-right"
			class={cn('size-4 transition-transform text-white/60', open && 'rotate-90')}
		/>
		<div class="w-12 font-mono text-left text-lg font-semibold before:content-['#']">{ordinal}</div>
		<div class="flex lg:gap-4 grow flex-col lg:flex-row">
			<div class="text-lg font-medium text-left">HyonsuHairDanceMaster</div>
			<div class="grow"></div>

			<div class="flex gap-2 items-center flex-wrap">
				<div class="flex items-center gap-1 text-white/60">
					<Icon icon="ggev:accuracy" class="size-3.5" />
					<span class="after:content-['%']">10.987</span>
				</div>

				<DividerDot />

				<HitMargins {hitMargins} />
			</div>
		</div>
	</Collapsible.Trigger>

	<Collapsible.Content
		class="data-[state=open]:animate-collapsible-in data-[state=closed]:animate-collapsible-out overflow-hidden bg-gg-darkblue/20"
	>
		<div class="p-4">
			<h3 class="text-white/80 text-sm">
				<Localized id="awc2026-course-per-level" />
			</h3>

			<div class="border-white/20 border-y divide-y divide-white/20 mt-2">
				{#each new Array(10) as _, i}
					<div class="p-4 flex lg:items-center lg:gap-4 lg:justify-between flex-col lg:flex-row">
						<div class="text-left">HYONSU - Sans Universe</div>

						<div class="flex gap-2 items-center flex-wrap">
							<div class="flex items-center gap-1 text-white/60">
								<Icon icon="ggev:accuracy" class="size-3.5" />
								<span class="after:content-['%']">10.987</span>
							</div>

							<DividerDot />

							<HitMargins {hitMargins} />
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Collapsible.Content>
</Collapsible.Root>
