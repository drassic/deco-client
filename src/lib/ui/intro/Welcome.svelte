<script lang="ts">
	export let btnAction: () => any = null;
	export let btnText: string = null;
</script>

<h1>
	<div class="welcome">
		<picture>
			<source srcset="svelte-welcome.webp" type="image/webp" />
			<img src="svelte-welcome.png" alt="Welcome" />
		</picture>
	</div>

	to DECO
</h1>

<h2>your home for DEcentralized COurses.</h2>

{#if btnAction}
	<div>
		Metamask is used to access Deco
		<button on:click={btnAction}>{btnText}</button>
	</div>
{/if}

<style>
	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
