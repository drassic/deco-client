<script lang="ts">
	import type { MarkdownSectionI } from '$lib/interfaces/Course';
	import SvelteMarkdown from 'svelte-markdown';

	export let section: MarkdownSectionI;
</script>

<SvelteMarkdown source={section.content} />
