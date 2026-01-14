<script lang="ts">
	import { Localized } from '@nubolab-ffwd/svelte-fluent';
	import type { PageProps } from './$types';
	import CourseList from '$lib/course/components/course-list.svelte';

	const { data }: PageProps = $props();
</script>

<h1 class="text-4xl font-medium">
	<Localized id="awc2026-course-title" />
</h1>

<CourseList data={data.data} cutLinePosition={16} />
