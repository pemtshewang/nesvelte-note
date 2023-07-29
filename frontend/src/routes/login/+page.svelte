<script lang="ts">
	import '../../app.css';
	import { created } from '../../store/store';
	import { fly } from 'svelte/transition';

	let username: string;
	let password: string;
	let yes: boolean = false;
	$: type = 'password';
	$: if (yes) {
		type = 'text';
	} else {
		type = 'password';
	}

	async function handleLoginForm() {
		const formData = new FormData();
		formData.append('username', username);
		console.log($created);
	}
	function hideSnackBar() {
		created.toggle();
	}

	$: if ($created) {
		setTimeout(() => {
			hideSnackBar();
		}, 5000);
	}
</script>

<main class="flex flex-col justify-center items-center login-main">
	<div class="space-y-4 lg:w-1/4">
		<div class="text-center mb-5 sm:w-full text-xl mt-8">Login into Nesvelte Notes</div>

		{#if $created}
			<div
				class="text-green-700"
				in:fly={{ duration: 2000, x: -200 }}
				out:fly={{ duration: 2000, x: 200 }}
			>
				Registration Successful
			</div>
		{/if}

		<div class="space-y-1">
			<label for="username">Username</label>
			<input
				id="username"
				class="block rounded w-full"
				type="text"
				bind:value={username}
				maxlength="10"
			/>
			{#if !username || username.length < 6}
				<p class="text-red-500 text-sm">Username should be at least 6 characters</p>
			{/if}
		</div>
		<div class="space-y-1">
			<label for="password">Password</label>
			<input
				id="password"
				class="block rounded w-full"
				type="password"
				bind:value={password}
				maxlength="20"
			/>
			{#if !password || password.length < 8}
				<p class="text-red-500 text-sm">Password should be at least 8 characters</p>
			{/if}
			<label class="flex items-center">
				<input type="checkbox" bind:checked={yes} class="mr-2" />
				Show Password
			</label>
		</div>
		<div class="flex flex-col justify-center items-center space-y-1">
			<button class="block border border-black p-2 w-fit" on:click|trusted={handleLoginForm}
				>Login</button
			>
			<a href="/register" class="w-fit underline p-3"> Go to Register Page </a>
		</div>
	</div>
</main>
