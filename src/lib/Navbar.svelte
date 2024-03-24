<script>
	let menuOpen = false;

	const toggleMenu = () => {
		menuOpen = !menuOpen;
	};
</script>

<main>
	<div
		class="fix-nav"
		role="button"
		aria-expanded={menuOpen ? 'true' : 'false'}
		tabindex="0"
		on:click={toggleMenu}
		on:keydown={(event) => (event.key === 'Enter' || event.key === ' ') && toggleMenu()}
	>
		<button type="button" class="navbar-left nav-a">
			<div>PicturePerfect</div>
			<div class={['disc', 'disc2', menuOpen ? 'open-menu' : '']} />
			<div></div>
		</button>

		<div class="mode">
			<div class="disc mode-disc"></div>
			<div class="light">Light Mode</div>
		</div>

		<div class="nav">
			<div class="nav-left">
				<button type="button" class="button nav-a">Portfolio</button>
				<button type="button" class="button nav-a">Contact Us</button>
			</div>

			<div class="nav-right">
				<div
					class="menu-bar fix-nav-menu-bar"
					role="button"
					tabindex="0"
					on:click={toggleMenu}
					on:keydown={(event) => (event.key === 'Enter' || event.key === ' ') && toggleMenu()}
				>
					<div class="line" id="line-1"></div>
					<div class="line" id="line-2"></div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	/* Your CSS styles here */
	.fix-nav {
		position: absolute;
		display: none;
		top: 0;
		left: 0;
		height: 6%;
		width: 94%;
		z-index: 15;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1% 3%;
		cursor: pointer;
		background-color: black;
		color: white;
	}

	.fix-nav.open {
		display: flex;
	}

	.mode {
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 7%;
		justify-content: space-around;
	}

	.mode:hover {
		cursor: pointer;
		color: #636363;
	}

	.nav {
		display: flex;
		width: 35%;
		justify-content: space-between;
	}

	.button {
		text-decoration: none;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.button:hover {
		color: #898989;
	}

	.nav-a {
		color: white;
	}

	.nav > div {
		display: flex;
		justify-content: space-between;
	}

	.nav-left {
		width: 40%;
	}

	.nav-right {
		width: 30%;
	}

	/* menu bar */
	.menu-bar {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		transition: 0.5s;
		cursor: pointer;
		z-index: 15;
	}

	.line {
		width: 30px;
		height: 1px;
		background-color: white;
		transition: 0.5s;
	}

	.menu-bar:hover {
		justify-content: space-between;
	}

	#line-1,
	#line-2 {
		transform-origin: center center;
	}
</style>
