<script>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	export let handleGoogleSignIn;

	let isOpen = false; // State to control modal visibility

	// Function to handle the login process
	async function handleLogin() {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();

		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			// Successful sign-in, call the parent function
			handleGoogleSignIn();
		} catch (error) {
			console.error('Google Sign-In Error: ', error);
			// Consider displaying an error message to the user
		}
	}
</script>

<div class={isOpen ? 'modal open' : 'modal'}>
	<div class="modal-content">
		<button on:click={() => (isOpen = false)}>Close</button>
		<button on:click={handleLogin}>Sign in with Google</button>
	</div>
</div>
