<script lang="ts">
	import { userStore } from '$lib/stores/userStore';

	import Header from '$lib/ui/header/Header.svelte';
	import Intro from '$lib/ui/intro/Intro.svelte';
	import Welcome from '$lib/ui/intro/Welcome.svelte';
	import Loading from '$lib/ui/Loading.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import '../app.css';

	let initializing = true;
	const user = userStore;

	onMount(() => {
		if (!get(userStore)) {
			user.initialize();
			initializing = false;
		} else {
			initializing = false;
		}
	});
</script>

<Header />

<main>
	{#if initializing || !$user.loadedAccount}
		<Loading fullScreen={true} />
	{:else if $user.account}
		<slot />
	{:else if $user.walletReady}
		<Welcome btnAction={user.login} btnText="Login with Metamask" />
		<Intro />
	{:else}
		<Welcome btnAction={user.installMetaMask} btnText="Install Metamask" />
		<Intro />
	{/if}
</main>

<style>
</style>
