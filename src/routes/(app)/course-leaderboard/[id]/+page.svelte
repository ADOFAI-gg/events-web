<script lang="ts">
	import CourseList from '$lib/course/components/course-list.svelte';
	import type { PageProps } from './$types';

	const { data, params }: PageProps = $props();
</script>

<h1>
	Custom Leaderboard for Course {params.id}
</h1>

<CourseList data={data.data} />
