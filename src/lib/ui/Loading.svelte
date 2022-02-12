<script lang="ts">
	export let fullScreen: boolean = false;
</script>

{#if fullScreen}
	<div class="page-wrap">
		<div>Loading...</div>
	</div>
{:else}
	<div>Loading...</div>
{/if}

<style>
	div {
		text-align: center;
        font-size: 3rem;
	}

    .page-wrap {
        position: fixed;
        height: 100vh;
        width: 100vw;
        display: grid;
        place-content: center;
    }
</style>
