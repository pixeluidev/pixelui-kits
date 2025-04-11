<script lang="ts">
	import PixelMockup from './PixelMockup.svelte';
</script>

<main
	class="grid min-h-screen grid-cols-1 place-items-center gap-8 bg-gray-200 p-10 md:grid-cols-3 dark:bg-neutral-900"
>
	<!-- Obsidian -->
	<PixelMockup color="obsidian">
		<div class="h-full bg-black p-4 text-white">
			<h3 class="font-bold">Obsidian</h3>
			<p class="mt-2 text-sm">Your app content here...</p>
		</div>
	</PixelMockup>

	<!-- Snow -->
	<PixelMockup color="snow">
		<div class="h-full bg-white p-4 text-black">
			<h3 class="font-bold">Snow</h3>
			<p class="mt-2 text-sm">Your app content here...</p>
		</div>
	</PixelMockup>

	<!-- Hazel -->
	<PixelMockup color="hazel">
		<div class="h-full bg-[#F9F9F2] p-4 text-[#3c3c33]">
			<h3 class="font-bold">Hazel</h3>
			<p class="mt-2 text-sm">Your app content here...</p>
		</div>
	</PixelMockup>
</main>
