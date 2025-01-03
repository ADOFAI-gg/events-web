<script lang="ts">
	import { melt, type AnyMeltElement } from '@melt-ui/svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		meltElement: AnyMeltElement
		element: keyof svelteHTML.IntrinsicElements
		props: Omit<svelteHTML.IntrinsicElements[this['element']], 'children'>
		children?: Snippet
	}

	const { element, meltElement, props, children }: Props = $props()
</script>

<svelte:element this={element} use:melt={$meltElement} {...props}>
	{@render children?.()}
</svelte:element>
