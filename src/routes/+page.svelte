<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
	import { auth, db } from '$lib/firebase.js';

	let city = '';
	let lat = null;
	let lng = null;
	let fetchError = false;
	let userId = null;
	let selectedCities = [];

	// Fetch city from localStorage on mount
	onMount(() => {
		const storedCity = localStorage.getItem('selectedCity');
		if (storedCity) {
			city = storedCity;
		}
	});
	async function handleGoogleSignIn() {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();

		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// Successful sign-in, you now have access to the user's details
			console.log('Google Sign-In Successful: ', user);
		} catch (error) {
			console.error('Google Sign-In Error: ', error);
		}
	}
	// Firebase Authentication State Listener
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			userId = user.uid;
			await fetchData();
		} else {
			// Handle the case when the user is not logged in
		}
	});

	// Fetch selected cities from Firestore
	async function fetchData() {
		if (!userId) return;

		const userRef = doc(db, 'users', userId);
		const docSnap = await getDoc(userRef);

		if (docSnap.exists()) {
			selectedCities = docSnap.data().selectedCities || [];
		} else {
			// Create a new document
			await setDoc(userRef, { selectedCities: [] });
		}
	}

	// Save the selected city to Firestore
	async function saveCity(city) {
		if (!userId) return;

		const userRef = doc(db, 'users', userId);
		await setDoc(
			userRef,
			{
				selectedCities: [...selectedCities, city]
			},
			{ merge: true }
		);
	}

	const handleCityInput = (event) => {
		localStorage.setItem('selectedCity', event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		fetchError = false;

		try {
			const apiUrl = `https://geocode.search.hereapi.com/v1/geocode?apikey=pRUCD1WMxuGTb38ov8so4kznWMv19GLkDeo6rgT8Yko&q=${city}&limit=1`;
			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error('City lookup failed');
			}

			const data = await response.json();
			lat = data.items[0].position.lat;
			lng = data.items[0].position.lng;
			localStorage.setItem('latitude', data.items[0].position.lat);
			localStorage.setItem('longitude', data.items[0].position.lng);

			// Save the selected city to Firestore
			await saveCity(city);

			// Navigate to choicePage
			goto('./loading', { state: { city, lat, lng } });
		} catch (error) {
			console.error('Error fetching coordinates:', error);
			fetchError = true;
		}
	};
</script>

<main>
	<!-- Hero Section with Video Background -->
	<section class="video-bg">
		<video autoplay loop muted playsinline>
			<source src="/Background.mp4" type="video/mp4" />
			Your browser does not support the video tag.
		</video>
		<div class="video-content">
			<div class="border-white">
				<h1 id="Discover-text">Discover the World's Best Cities</h1>
			</div>
			<div class="flex items-center">
				<form on:submit={handleSubmit}>
					<input
						type="text"
						bind:value={city}
						on:input={handleCityInput}
						placeholder="Enter your dream city"
						style="padding: 10px 20px;
						font-size: 16px;
						border-radius: 9999px;
						color: black;"
					/>
					<input type="date" class="date-input mr-2" />
					<input type="date" class="date-input" />
					<button type="submit">Explore</button>
				</form>

				{#if fetchError}
					<p class="error-message">Error fetching city details. Please try again.</p>
				{/if}
			</div>
		</div>
	</section>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

	:global(body) {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.video-bg {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.video-bg video {
		min-width: 100%;
		min-height: 100%;
	}

	.video-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#Discover-text {
		font-size: 80px;
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: white;
	}

	.date-input {
		padding: 8px 16px;
		font-size: 16px;
		border-radius: 9999px;
		border: 1px solid #ccc;
		background-color: #f9f9f9;
	}

	button {
		padding: 10px 20px;
		font-size: 16px;
		border-radius: 9999px;
		background-color: #3490dc;
		color: white;
		border: none;
		cursor: pointer;
	}
	/*  */
	button:hover {
		background-color: #2779bd;
	}
</style>
