<script lang="ts">
	import BrowserMockup from './browser-mockup.svelte';
</script>

<main
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-10 dark:from-neutral-900 dark:to-neutral-800"
>
	<!-- Contoh Penggunaan Dasar -->
	<div class="mb-10 w-full max-w-2xl">
		<BrowserMockup url="https://pixelui.dev/category/mockups">
			<!-- Masukkan konten Anda di sini -->
			<div class="p-6">
				<h2 class="mb-4 text-xl font-semibold dark:text-white">Dashboard Content</h2>
				<p class="text-gray-700 dark:text-neutral-300">
					Ini adalah area konten di dalam mockup browser. Anda bisa menempatkan gambar, teks, atau
					bahkan komponen lain di sini.
				</p>
				<img
					alt="Contoh Grafik"
					class="mt-4 rounded shadow-sm"
					src="https://plus.unsplash.com/premium_photo-1720970650017-e39447272615?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				/>
			</div>
		</BrowserMockup>
	</div>
</main>
