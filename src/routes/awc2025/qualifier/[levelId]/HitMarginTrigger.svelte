<script lang="ts">
	import { melt, type AnyMeltElement } from '@melt-ui/svelte'

	interface Props {
		element: AnyMeltElement
		name: string
		value: number
	}

	const { element, name, value }: Props = $props()
</script>

<div use:melt={$element} class="hitmargin hitmargin-{name}">{value}</div>

<style lang="scss">
	.hitmargin {
		font-size: 16px;
	}

	.hitmargin-overload::before {
		content: 'O';
	}

	.hitmargin-miss::before {
		content: 'M';
	}

	.hitmargin-miss::before,
	.hitmargin-overload::before {
		font-weight: 600;
	}
</style>
