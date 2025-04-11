<script lang="ts">
	import IpadMockup from './mockup.svelte';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-200 p-10 lg:flex-row dark:bg-neutral-900"
>
	<!-- Contoh 1: Silver dengan Slot -->
	<div class="w-full lg:w-auto">
		<IpadMockup color="silver">
			<div
				class="flex h-full flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 p-6 text-white"
			>
				<h2 class="mb-3 text-2xl font-bold">My Awesome iPad App</h2>
				<p class="mb-4 text-center text-sm opacity-90">
					This content is rendered within the iPad mockup using slots.
				</p>
				<button
					class="rounded-md bg-white px-5 py-2 text-sm font-medium text-blue-600 shadow hover:bg-gray-100"
				>
					Try Now
				</button>
			</div>
		</IpadMockup>
	</div>
</main>
