<script lang="ts">
	import type { VideoSectionI } from '$lib/interfaces/Course';

	export let section: VideoSectionI;
</script>

{#if section.provider === 'lbry'}
	<iframe src={section.url} title="Course video" />
{:else}
	<video controls>
		<source src={section.url} />
		Your browser does not support the video tag.
		<track kind="captions" />
	</video>
{/if}

<style>
	video,
	iframe {
		width: 100%;
	}
</style>
