<script>
	import { onMount } from 'svelte';

	export let cityName;
	export let places;
	export let lat;
	export let lng;

	onMount(async () => {
		cityName = localStorage.getItem('selectedCity');
		lat = localStorage.getItem('latitude');
		lng = localStorage.getItem('longitude');
		places = localStorage.getItem('places');
		console.log('places:', places);
	});
</script>

<main>
	<div class="choice-container">
		<h1>Places near {cityName}</h1>
		{#if places && places.length > 0}
			<ul>
				{#each JSON.parse(places) as place}
					<li>
						{place.name} ({place.position.lat_new}, {place.position.lng_new})
					</li>
				{/each}
			</ul>
		{:else}
			<p>No places found.</p>
		{/if}
	</div>
</main>
