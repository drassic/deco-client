<script lang="ts">
	import logo from './svelte-logo.svg';

	import { mdiAccount } from '@mdi/js';
	import Dropdown from '../profile/Dropdown.svelte';
	import { onMount } from 'svelte';
	import OnBoarding from '@metamask/onboarding'
import { userStore } from '$lib/stores/userStore';

	let searchInput = '';
	let showProfileDropDown = false;

	onMount(() => {
		userStore.initialize();
	});
</script>

<header>
	<div class="corner">
		<a sveltekit:prefetch href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true" class="search-border">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<form action={'/course/' + searchInput} method="GET">
			<!-- <i><svg><path d={mdiMagnify} fill="currentColor"/></svg></i> -->
			<input
				type="text"
				name="text"
				class="search"
				placeholder="Search contract (0xABC123...)"
				minlength="10"
				bind:value={searchInput}
			/>
		</form>
		<svg viewBox="0 0 2 3" aria-hidden="true" class="search-border">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<div class="profile-icon">
			<svg
				viewBox="3 3 18 18"
				tabindex="-1"
				on:click={() => (showProfileDropDown = !showProfileDropDown)}
			>
				<path d={mdiAccount} fill="currrentColor" />
			</svg>
		</div>
		{#if showProfileDropDown}
			<div class="dropdown-wrap">
				<Dropdown on:close={() => (showProfileDropDown = false)} />
			</div>
		{/if}
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
		position: relative;
	}

	.dropdown-wrap {
		position: absolute;
		right: 0em;
		top: 3em;
		z-index: 10;
	}

	.corner a,
	.profile-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.profile-icon {
		cursor: pointer;
	}

	.profile-icon svg:hover {
		opacity: 0.8;
	}

	.corner img,
	svg {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	form {
		background-color: var(--background);
		height: 100%;
		display: grid;
		width: 50vw;
		max-width: 500px;
		place-items: ceneter;
	}

	.search-border {
		width: 2em;
		height: 3em;
		display: block;
	}

	input {
		background-color: rgba(0, 0, 0, 0);
		border: none;
	}

	path {
		fill: var(--background);
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
