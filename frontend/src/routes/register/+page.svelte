<script lang="ts">
	import '../../app.css';
	import z from 'zod';
	import axios from 'axios';
	import { created } from '../../store/store';
	import { goto } from '$app/navigation';

	let name: string;
	let password: string;
	let yes: boolean = false;
	$: type = 'password';
	$: if (yes) {
		type = 'text';
	} else {
		type = 'password';
	}

	//create a schema for the form
	const schema = z.object({
		name: z.string(),
		password: z.string(),
		paid: z.boolean()
	});

	async function handleRegisterForm() {
		const userData = schema.parse({ name, password, paid: false });
		const response = await axios.post('http://localhost:3000/users/register', userData);
		if (response.status === 201) {
			created.toggle();
			console.log($created);
			goto('/login');
		} else {
			console.log(response.data);
		}
	}
</script>

<main class="flex flex-col justify-center items-center login-main">
	<div class="space-y-4 lg:w-1/4">
		<div class="text-center mb-5 sm:w-full text-xl mt-8">Sign Up to Nesvelte Notes</div>

		<div class="space-y-1">
			<label for="name">Username</label>
			<input id="name" class="block rounded w-full" type="text" bind:value={name} maxlength="10" />
			{#if !name || name.length < 6}
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
			<button class="block border border-black p-2 w-fit" on:click|trusted={handleRegisterForm}
				>Sign Up</button
			>
			<a href="/login" class="w-fit underline p-3">Go to Login Page</a>
		</div>
	</div>
</main>
