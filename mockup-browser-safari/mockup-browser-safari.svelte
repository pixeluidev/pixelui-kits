<script lang="ts">
	import SafariBrowserMockup from './browser-mockup.svelte';
</script>

<main
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-10 dark:from-neutral-900 dark:to-neutral-800"
>
	<!-- Contoh Penggunaan -->
	<div class="w-full max-w-3xl">
		<SafariBrowserMockup
			contentHeight="h-[500px]"
			tabTitle="Svelte Tutorial"
			url="https://pixelui.dev"
		>
			<!-- Konten Anda, misalnya iframe atau div -->
			<iframe
				class="h-full w-full border-none"
				loading="lazy"
				src="https://pixelui.dev"
				title="Svelte Tutorial"
			></iframe>

			<!-- Atau konten statis -->
			<!-- <div class="p-6">
					<h2 class="text-xl font-semibold mb-4 dark:text-white">Safari Mockup Content</h2>
					<p class="text-gray-700 dark:text-neutral-300">
							Konten halaman web Anda akan muncul di sini.
					</p>
			</div> -->
		</SafariBrowserMockup>
	</div>
</main>
