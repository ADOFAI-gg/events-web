<script lang="ts">
	import {
		Container,
		getGlobalContext,
		Icon,
		Tooltip,
		translateKey,
		Translation,
		type TranslationKey
	} from '@adofai-gg/ui'
	import type { PageData } from './$types'
	import SectionTitle from '$lib/components/SectionTitle.svelte'
	import { fade } from 'svelte/transition'
	import HitMarginTrigger from './HitMarginTrigger.svelte'

	interface Props {
		data: PageData
	}

	const { data }: Props = $props()

	const { language } = getGlobalContext()

	const cutlineText = $derived(translateKey($language, 'common:cut-line', {}).replace("'", "\\'"))

	let tabs = $derived.by(() => {
		return [
			{
				id: 'all',
				name: 'awc2025:qualifier-level-all' as TranslationKey
			},
			...data.levels
		]
	})

	const items = $derived.by(() => {
		return data.records
	})
</script>

{#snippet hitMarginItem(value: number, name: string)}
	<Tooltip>
		{#snippet trigger({ trigger })}
			<HitMarginTrigger element={trigger} {name} {value} />
		{/snippet}

		<span class="hitmargin-{name} hitmargin-tooltip">
			<Translation key="common:hitmargin-{name}" />
		</span>
	</Tooltip>
{/snippet}

<Container>
	<SectionTitle>
		<Translation key="awc2025:qualifier-title" />
	</SectionTitle>
	<div class="tabs">
		{#each tabs as tab (tab.id)}
			{@const active = data.id === tab.id}
			<a href="/awc2025/qualifier/{tab.id}" class="tab" class:active>
				<Translation key={tab.name} />
				{#if active}<div transition:fade={{ duration: 200 }} class="highlight"></div>{/if}
			</a>
		{/each}
	</div>

	<div class="records" style="--cutline-text: '{cutlineText}';">
		{#each items as item, i}
			{@const rank = i + 1}

			{#if item}
				{@const hitMargins = item.hitMargins}
				<div class="record">
					<div class="rank">
						{rank}
					</div>
					<img src={item.avatarUrl} alt="avatar" class="avatar" />
					<div class="record-details">
						<div class="player-name">{item.displayName}</div>
						<div class="stats">
							<div class="accuracy">
								<Icon icon="accuracy" alt="XAccuracy" size={16} />
								<span>{(item.xAcc * 100).toFixed(3)}%</span>
							</div>
							<div class="separator"></div>
							<div class="hit-margins">
								{@render hitMarginItem(hitMargins[0], 'too-early')}
								{@render hitMarginItem(hitMargins[1], 'early')}
								{@render hitMarginItem(hitMargins[2], 'early-perfect')}
								{@render hitMarginItem(hitMargins[3], 'perfect')}
								{@render hitMarginItem(hitMargins[4], 'late-perfect')}
								{@render hitMarginItem(hitMargins[5], 'late')}
								{@render hitMarginItem(hitMargins[6], 'too-late')}

								<div class="separator"></div>

								{@render hitMarginItem(hitMargins[8], 'miss')}
								{@render hitMarginItem(hitMargins[9], 'overload')}
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="record not-set">
					<div class="rank">
						{rank}
					</div>

					<div class="player-name">-</div>
				</div>
			{/if}
		{:else}
			<div class="no-records">
				<Translation key="common:no-records" />
			</div>
		{/each}
	</div>
</Container>

<style lang="scss">
	@use '@adofai-gg/ui/style-system/colors' as *;

	.tabs {
		display: flex;
		gap: 16px;
		margin-top: 8px;
	}

	.tab {
		position: relative;
		display: flex;
		flex-grow: 1;
		width: 0;
		background-color: rgba($darkblue, 0.2);
		padding: 16px 16px;
		border-radius: 8px;
		justify-content: center;
		align-items: center;
		font-weight: 500;
	}

	.highlight {
		position: absolute;
		width: 100%;
		height: 4px;
		bottom: 0;
		left: 0;
		background-color: $blue;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.records {
		margin-top: 8px;
		margin-bottom: 64px;
	}

	.record {
		position: relative;
		display: flex;
		padding: 16px;
		align-items: center;
		gap: 16px;
		border-top: 1px solid rgba(255, 255, 255, 0.2);

		&.not-set {
			.rank,
			.player-name {
				opacity: 0.4;
			}
		}
	}

	.rank {
		font-size: 24px;
		width: 48px;
		text-align: center;
		&::before {
			content: '#';
		}
	}

	.record-details {
		flex-grow: 1;
	}

	.player-name {
		font-weight: 500;
		font-size: 20px;
	}

	$avatar_size: 48px;

	.avatar {
		width: $avatar_size;
		height: $avatar_size;
		border-radius: calc($avatar_size / 2);
	}

	.no-records {
		font-size: 20px;
		text-align: center;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 500;
		padding: 16px 0;
	}

	.record:nth-child(32) {
		&::before {
			position: absolute;
			left: 0;
			bottom: 0;
			content: '';
			width: 100%;
			height: 2px;
			background-color: $yellow;
		}

		&::after {
			content: var(--cutline-text);
			position: absolute;
			left: 0;
			bottom: 0;
			transform: translateY(50%);
			background-color: $yellow;
			color: black;
			padding: 2px 8px;
			border-radius: 6px;
			font-weight: 500;
			font-size: 14px;
		}
	}

	.stats {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.accuracy {
		display: flex;
		align-items: center;
		opacity: 0.6;
		gap: 4px;
	}

	.separator {
		width: 2px;
		height: 2px;
		border-radius: 2px;
		background-color: rgba(255, 255, 255, 0.4);
	}

	.hit-margins {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.hitmargin-tooltip {
		font-weight: 500;
	}
</style>
