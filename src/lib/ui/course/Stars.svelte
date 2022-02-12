<script lang="ts">
	import { getSVG } from '$lib/helpers/svg';

	export let stars: number;
	export let ratingsCount: number;

	const tenthStars = Math.round(stars * 10) / 10;
	const halfStars = Math.round(stars * 2);
	const hasHalf = halfStars % 2 === 1;
	const fullStars = halfStars / 2 - (hasHalf ? 0.5 : 0);
	const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

	const starSVG = getSVG('star');
</script>

<div class="star-wrap">
	{#each Array(fullStars) as _}
		<svg viewBox={starSVG.viewbox}>
			<path d={starSVG.path} fill="#ffc21c" />
		</svg>
	{/each}
	{#if hasHalf}
		<svg viewBox={starSVG.viewbox}>
			<defs>
				<linearGradient id="halfstar">
					<stop offset="0%" stop-color="#ffc21c" />
					<stop offset="50%" stop-color="#ffc21c" />
					<stop offset="50%" stop-color="rgba(0,0,0,0)" />
					<stop offset="100%" stop-color="rgba(0,0,0,0)" />
				</linearGradient>
			</defs>
			<path d={starSVG.path} fill="url(#halfstar)" />
		</svg>
	{/if}
	{#each Array(emptyStars) as _}
		<svg viewBox={starSVG.viewbox}>
			<path d={starSVG.path} fill="none" />
		</svg>
	{/each}
	<div>({ratingsCount})</div>
</div>

<style>
	.star-wrap {
		display: flex;
		flex-direction: row;
	}

	svg {
		height: 20px;
		width: 20px;
		stroke: #ffb01c;
	}
</style>
