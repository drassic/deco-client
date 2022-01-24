<script lang="ts">
	// import { scale } from 'svelte/transition';
	// import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import type { CourseI, TopicI } from '$lib/interfaces/Course';
	import Topic from '$lib/ui/course/Topic.svelte';
	import { load as loadYML } from 'js-yaml';

	let course: CourseI;
	let loading = true;

	const address = $page.params.address;
	console.log(address);

	const topics: (CourseI | TopicI)[] = [];
	const selectedTopicIdx = 1;

	const target =
		'https://bafybeihbzp2xxie6ngnutmerd2l46jzg674ijxdxsjugq54woqe4ewbrre.ipfs.dweb.link/course.yml';

	async function loadCourse(target: string) {
		const res = await fetch(target);
		if (res.ok) {
			const yml = await res.text();
			course = loadYML(yml) as CourseI;
		} else {
			//course = null;
		}
	}

	loadCourse(target)
		.then(() => {
			topics.push(course);
			course.topics.forEach((topic) => {
				topics.push(topic);
			});
		})
		.catch(console.error)
		.finally(() => (loading = false));
</script>

{#if loading}
	<h1>Loading...</h1>
{:else}
	<div class="page-wrap">
		<!-- <div class="contents">Sidebar with topics</div> -->
		<div class="topic-wrap">
			<h1>{course.name}</h1>
			<Topic topic={topics[selectedTopicIdx]} />
		</div>
	</div>
{/if}
<!-- <iframe src={cou}></iframe> -->

<style>
	.page-wrap {
		width: 95vw;
		max-width: 1000px;
		position: relative;
		margin: auto;
	}

	.topic-wrap {
		margin: auto;
		width: 100%
	}

	/* .contents {
		overflow-y: scroll;
		position: absolute;
		width: 200px;
	} */
</style>
