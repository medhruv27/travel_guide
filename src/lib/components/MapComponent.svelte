<script>
	import { onMount } from 'svelte';
	import * as H from '@here/maps-api-for-javascript';

	let mapContainer; // Reference to the map container element
	let map;

	onMount(() => {
		const platform = new H.service.Platform({
			apikey: 'YOUR_HERE_API_KEY' // Replace with your actual API key
		});

		const defaultLayers = platform.createDefaultLayers();

		map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
			zoom: 10,
			center: { lat: 52.5, lng: 13.4 }
		});
	});
</script>

<div id="mapContainer" bind:this={mapContainer}></div>

<style>
	#mapContainer {
		width: 600px; /* Adjust as needed */
		height: 400px; /* Adjust as needed */
	}
</style>
