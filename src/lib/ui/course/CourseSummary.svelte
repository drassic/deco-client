<script lang="ts">
	import Stars from './Stars.svelte';

	export let name: string;
	export let symbol: string;
	export let stars: number;
	export let ratingsCount: number;
	export let enrollmentCount: number;
	export let price: number;

	// Get author name, and course tags from gunDB (read only)
	// Get author public address from smart contract
</script>

<div>
	<h1>{name}</h1>
	<h2>{symbol}</h2>
	<p>{stars}</p>
	<p>{enrollmentCount}</p>
	<p>{price}</p>
	<Stars {stars} {ratingsCount} />
</div>
