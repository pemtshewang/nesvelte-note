<!-- scripts start -->
<script lang="ts">
	import gif from '../assets/notebook.gif';
	import '../app.css';
	import Nav from './nav.svelte';
</script>

<!-- style ends -->
<main class="">
	<Nav />
	<div class="content grid grid-cols-2 p-10">
		<div class="icon ml-auto pr-4">
			<img src={gif} alt="image of the notebook" class="h-[10rem] w-[10rem]" />
		</div>
		<div class="text flex flex-col justify-center pb-10">
			<div class="text-2xl">Notes with svelte blazingly fast</div>
			<div class="indent-4 tracking-wide mt-4 text-xl">CRUD your notes at a breeze</div>
		</div>
	</div>
	<div class="flex justify-center">
		<a href="/login" class="btn text-xl">Enter</a>
	</div>
</main>

<!-- scripts end -->

<!-- page starts -->

<!-- page ends -->
