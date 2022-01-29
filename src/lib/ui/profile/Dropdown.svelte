<script lang="ts">
	import { clickOutside } from '$lib/scripts/clickOutslide';
	import { userStore } from '$lib/stores/userStore';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const user = userStore;
</script>

<div
	class="wrapper"
	use:clickOutside={() => {
		dispatch('close');
	}}
>
	{#if $user.account}
		<ul>
			<li>
				{$user.account}
			</li>
		</ul>
	{:else if $user.walletReady}
		<ul>
			<li on:click={user.login}>Login with Metamask</li>
		</ul>
	{:else}
		<ul>
			<li on:click={() => user.installMetaMask()}>Add Metamask</li>
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
		padding: 15px;
		background-color: white;
		float: right;
	}
</style>
