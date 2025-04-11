<script lang="ts">
	import IphoneMockup from './mockup.svelte';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-200 p-10 md:flex-row dark:bg-neutral-900"
>
	<!-- Contoh 1: Konten Slot -->
	<div class="w-full max-w-[300px] sm:max-w-xs">
		<IphoneMockup>
			<div class="h-full bg-white p-4 text-black dark:bg-black dark:text-white">
				<h2 class="mb-2 text-lg font-bold">App Screen</h2>
				<p class="mb-4 text-sm">This is content inside the slot.</p>
				<div class="space-y-2">
					{#each Array(8) as a, i}
						<div class="rounded-md bg-gray-100 p-3 text-xs dark:bg-neutral-800">
							List Item {a}
							{i + 1}
						</div>
					{/each}
				</div>
			</div>
		</IphoneMockup>
	</div>

	<!-- Contoh 2: Menggunakan Image -->
	<div class="w-full max-w-[300px] sm:max-w-xs">
		<IphoneMockup>
			<img
				alt="image"
				class="h-full w-auto"
				src="https://images.unsplash.com/photo-1744074060781-b4765f2ef607?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			/>
		</IphoneMockup>
	</div>

	<!-- Contoh 3: Warna Lain -->
	<div class="w-full max-w-[300px] sm:max-w-xs">
		<IphoneMockup>
			<div
				class="flex h-full items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 p-4 text-xl font-bold text-white"
			>
				Gold Phone Content
			</div>
		</IphoneMockup>
	</div>
</main>
