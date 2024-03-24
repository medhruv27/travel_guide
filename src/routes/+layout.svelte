<script>
	import { getAuth } from 'firebase/auth';

	import LoginModal from '$lib/components/LoginModal.svelte';
	import { onAuthStateChanged } from 'firebase/auth';

	const auth = getAuth();
	let isLoggedIn = false;
	let showModal = false;

	onAuthStateChanged(auth, (user) => {
		isLoggedIn = !!user;
	});
</script>

<header>
	{#if !isLoggedIn}
		<button on:click={() => (showModal = true)}>Login</button>
	{/if}
</header>

<main>
	<slot />
</main>

{#if showModal}
	<LoginModal on:close={() => (showModal = false)} />
{/if}
