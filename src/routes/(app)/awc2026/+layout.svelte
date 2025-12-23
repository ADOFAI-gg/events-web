<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

{@render children()}

<svelte:head>
	<title>AWC 2026</title>
</svelte:head>
