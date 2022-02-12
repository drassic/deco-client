<script lang="ts">
	import Welcome from '$lib/ui/intro/Welcome.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Welcome />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
