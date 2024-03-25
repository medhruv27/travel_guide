<script>
	import { onMount } from 'svelte';
	import MapComponent from './MapComponent.svelte';
	let cityName;
	let places;
	let mapContainer;

	let isLoading = true;

	onMount(async () => {
		cityName = localStorage.getItem('selectedCity');
		places = JSON.parse(localStorage.getItem('places'));
		isLoading = false;
	});

	function handleSubmit() {
		const checkboxes = document.querySelectorAll(
			'.choice-container input[type="checkbox"]:checked'
		);
		const selectedLocations = Array.from(checkboxes).map((checkbox) => {
			const placeName = checkbox.parentNode.textContent.trim();
			const matchingPlace = places.find((p) => p.name === placeName);
			return { lat: matchingPlace.position.lat_new, lng: matchingPlace.position.lng_new };
		});
		console.log('Selected Locations:', selectedLocations);
	}
</script>

<main>
	{#if isLoading}
		<p>Loading places...</p>
	{:else}
		<div class="upper">
			<h1>Places in {cityName} to explore</h1>
		</div>
		<MapComponent />
		<div class="choice-container">
			{#if places && places.length > 0}
				{#each places as place, i}
					<div>
						{place.name}
						<input type="checkbox" name="" id="" />
					</div>
				{/each}
			{/if}
		</div>
		<div class="submission">
			<button on:click={handleSubmit}>Submit</button>
		</div>
	{/if}
</main>

<style>
	.upper {
		width: 50%; /* Adjust as needed */
		display: flex;
		justify-content: center;
	}
	h1 {
		color: black;
		font-family: sans-serif;
	}
	.choice-container {
		display: flex;
		flex-wrap: wrap;
		width: 50%; /* Change width to 100% */
		margin: 20px 0 0 0;
	}

	.choice-container > div:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Shadow effect on hover */
	}

	.choice-container > div {
		border: solid;
		display: flex;
		border-color: black;
		border-radius: 99px;
		margin: 10px; /* Adjusted margin to create space */
		padding: 30px; /* Adjusted padding */
		color: green;
		width: calc(50% - 20px); /* Adjusted width to fit two containers in a row */
		box-sizing: border-box;
		font-size: 16px;
		font-family: sans-serif;
		cursor: pointer;
	}
	.map-container {
		width: 100%;
		height: 400px;
	}

	.choice-container > div.selected {
		background-color: lightgreen;
	}
	.submission {
		display: flex;
		justify-content: flex-start;
		width: 60%; /* Set the width to 50% to occupy the left half */
		margin: 0 auto; /* Center the .submission div horizontally */
		align-items: center;
	}
	.submission button {
		color: white;
		border-radius: 990px;
		padding: 15px 30px;
		margin: 20px;
		background-color: #3490dc;
		border: 1px solid #ccc;
		font-size: 20px;
	}
	.submission button:hover {
		cursor: pointer;
		background-color: #2779bd;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
</style>
