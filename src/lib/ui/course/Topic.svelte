<script>
	import MarkdownSection from './MarkdownSection.svelte';
	import VideoSection from './VideoSection.svelte';
	export let topic;
</script>

<h1>{topic.name}</h1>

<div class="content">
	{#if topic.sections}
		{#each topic.sections as section}
			{#if section.type === 'md'}
				<MarkdownSection {section} />
			{:else if section.type === 'video'}
				<VideoSection {section} />
			{/if}
		{/each}
	{/if}
</div>

<style>
	.content {
		width: 100%;
	}
</style>