<script lang="ts">
	import { page } from '$app/stores';
	import type { TopicI } from '$lib/interfaces/Course';
	import Topic from '$lib/ui/course/Topic.svelte';
	import { userStore } from '$lib/stores/userStore';
	import { get } from 'svelte/store';
	import type { CourseSummary } from '$lib/objects/CourseSummary';
	import Summary from '$lib/ui/course/CourseSummary.svelte';
	import { CourseHelper } from '$lib/helpers/courseContract';
	import Loading from '$lib/ui/Loading.svelte';

	const courseAddress = $page.params.address;
	let courseSummary: CourseSummary;
	const regHelper = get(userStore).regHelper;
	let courseHelper: CourseHelper;
	let loadingSummary = true;
	let loadingCourse = true;

	let topics: TopicI[] = [];
	const selectedTopicIdx = 0;

	function isStudent() {
		if (courseSummary.price === 0) {
			return false;
			// check local storage if course is favourited
		} else {
			return courseSummary.isStudent;
		}
	}

	function start() {
		loadTopics();
	}

	async function register() {
		loadingCourse = true;
		try {
			await regHelper.register(courseAddress, courseSummary);
			await loadTopics();
		} catch (e) {
			console.error(e);
		} finally {
			loadingCourse = false;
		}
	}

	async function loadTopics() {
		loadingCourse = true;
		try {
			topics = await courseHelper.getTopics();
		} catch (e) {
			console.error(e);
		} finally {
			loadingCourse = false;
		}
	}

	async function init() {
		try {
			courseSummary = await regHelper.courseSummary(courseAddress);
			courseHelper = new CourseHelper(courseAddress, courseSummary.price > 0);
			if (isStudent()) {
				loadTopics();
			}
		} catch (e) {
		} finally {
			loadingSummary = false;
		}
	}

	init();
</script>

{#if loadingSummary}
	<h1><Loading fullScreen={true} /></h1>
{:else}
	<div class="page-wrap">
		<Summary {...courseSummary} />
		<!-- <div class="contents">Sidebar with topics</div> -->
		{#if isStudent()}
			{#if loadingCourse}
				<Loading />
			{:else}
				<div class="topic-wrap">
					<!-- <h1>{course.name}</h1> -->
					<Topic topic={topics[selectedTopicIdx]} />
				</div>
			{/if}
		{:else if courseSummary.price === 0}
			<button on:click={start}>Start</button>
		{:else}
			<button on:click={register}>Register</button>
		{/if}
	</div>
{/if}

<style>
	.page-wrap {
		width: 95vw;
		max-width: 1000px;
		position: relative;
		margin: auto;
	}

	.topic-wrap {
		margin: auto;
		width: 100%;
	}
</style>
