<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	const { children }: Props = $props()
</script>

<h1 class="section-title">
	{@render children()}
</h1>

<style lang="scss">
	.section-title {
		margin-top: 48px;
		font-size: 32px;
		font-weight: 500;
	}
</style>
