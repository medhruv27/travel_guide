<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// The city and coordinates received from the previous page

	export let cityName;
	export let lat;
	export let lng;
	lat = localStorage.getItem('latitude');
	lng = localStorage.getItem('longitude');

	let isLoading = true; // Show loading state initially
	let placeData = [];
	let fetchError = false; // Track errors
	async function fetchData() {
		const apiUrl = `https://browse.search.hereapi.com/v1/browse?apikey=pRUCD1WMxuGTb38ov8so4kznWMv19GLkDeo6rgT8Yko&at=${lat},${lng}&limit=10&categories=300-3000-0025`;

		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Could not fetch places');
			}

			const data = await response.json();

			// Extract relevant data
			placeData = data.items.map((item) => ({
				name: item.title,
				id: item.id,
				position: {
					lat_new: item.position.lat,
					lng_new: item.position.lng
				}
			}));

			// Store in localStorage
			console.log('placeData:', placeData);
			localStorage.setItem('places', JSON.stringify(placeData));
		} catch (error) {
			console.error('Error fetching places:', error);
			fetchError = true;
		}
	}
	onMount(async () => {
		await fetchData();
		cityName = localStorage.getItem('selectedCity');
		lat = localStorage.getItem('latitude');
		lng = localStorage.getItem('longitude');
		// Simulate loading time or wait for data
		await new Promise((resolve) => setTimeout(resolve, 100)); // .5-second delay

		isLoading = false; // Hide loading state
		setTimeout(() => {
			goto('/choicePage', { state: { city: cityName, lat, lng, places: placeData } });
		}, 500); // Redirect after 2 seconds
	});
</script>

<main>
	{#if isLoading}
		<div class="loading-container">
			<h1>Fetching details for {cityName}...</h1>
		</div>
	{:else}
		<div class="loading-container">
			<h1>Fetched details for {cityName}!</h1>
			<p>Coordinates: {lat}, {lng}</p>
		</div>
	{/if}
</main>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
