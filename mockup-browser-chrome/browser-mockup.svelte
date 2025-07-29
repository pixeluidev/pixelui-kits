<script lang="ts">
	import { Lock } from '@lucide/svelte';

	// --- Props ---
	/** URL yang ditampilkan di address bar */
	export let url: string = 'https://pixelui.dev';

	/** Tinggi area konten (gunakan kelas Tailwind, misal 'h-64', 'h-96', 'h-[500px]') */
	export let contentHeight: string = 'h-80'; // Default height

	/** Kelas CSS tambahan untuk diterapkan pada frame terluar */
	export let frameClass: string = ''; // Untuk kustomisasi tambahan

	/** Opsi untuk menyembunyikan kontrol jendela */
	export let hideControls: boolean = false;

	/** Opsi untuk menyembunyikan address bar */
	export let hideAddressBar: boolean = false;

	// Gabungkan kelas default dengan kelas kustom
	$: finalFrameClasses = `
        relative w-full bg-white dark:bg-neutral-800 rounded-xl shadow-2xl
        border border-gray-200 dark:border-neutral-700 overflow-hidden
        ${frameClass}
    `.trim();
</script>

<!-- Frame Mockup Browser -->
<div class={finalFrameClasses}>
	<!-- Header / Title Bar -->
	<div
		class="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5 dark:border-neutral-700 dark:bg-neutral-700/50"
	>
		{#if !hideControls}
			<!-- Kontrol Jendela (macOS style) -->
			<div class="flex space-x-1.5">
				<span
					class="block h-3 w-3 rounded-full border border-red-500/30 bg-red-400 dark:border-red-600/50 dark:bg-red-500/80"
				></span>
				<span
					class="block h-3 w-3 rounded-full border border-yellow-500/30 bg-yellow-400 dark:border-yellow-600/50 dark:bg-yellow-500/80"
				></span>
				<span
					class="block h-3 w-3 rounded-full border border-green-500/30 bg-green-400 dark:border-green-600/50 dark:bg-green-500/80"
				></span>
			</div>
		{/if}

		{#if !hideAddressBar}
			<!-- Address Bar -->
			<div class="mx-2 flex-grow sm:mx-4">
				<div
					class="flex items-center gap-1.5 truncate rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-500 dark:bg-neutral-600/70 dark:text-neutral-300"
				>
					<Lock
						class="h-2.5 w-2.5 flex-shrink-0 text-gray-400 dark:text-neutral-400"
						strokeWidth={2.5}
					/>
					<span class="truncate">{url}</span>
				</div>
			</div>
		{:else}
			<!-- Placeholder jika address bar disembunyikan tapi kontrol ada -->
			{#if !hideControls}
				<div class="flex-grow"></div>
			{/if}
		{/if}

		{#if !hideControls && !hideAddressBar}
			<!-- Placeholder kosong di kanan untuk keseimbangan jika diperlukan -->
			<div class="w-10 flex-shrink-0"></div>
		{/if}
	</div>

	<!-- Area Konten (Gunakan slot) -->
	<div class="bg-white dark:bg-neutral-800 {contentHeight} overflow-y-auto">
		<slot>
			<!-- Konten default jika tidak ada yang dimasukkan -->
			<div
				class="flex h-full items-center justify-center p-4 text-gray-400 italic dark:text-neutral-500"
			>
				Browser content goes here...
			</div>
		</slot>
	</div>
</div>

<style>
	/* Opsi untuk scrollbar styling jika kontennya scrollable */
	/*@tailwind base;*/
	/*@tailwind components;*/
	/*@tailwind utilities;*/
	/*@layer utilities {*/
	/*    div[class*="overflow-y-auto"]::-webkit-scrollbar { width: 6px; height: 6px; }*/
	/*    div[class*="overflow-y-auto"]::-webkit-scrollbar-track { @apply bg-gray-100 dark:bg-neutral-700/50 rounded-b-lg; }*/
	/*    div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb { @apply bg-gray-300 dark:bg-neutral-600 rounded; }*/
	/*    div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb:hover { @apply bg-gray-400 dark:bg-neutral-500; }*/
	/*    div[class*="overflow-y-auto"] {*/
	/*        scrollbar-width: thin;*/
	/*        scrollbar-color: theme('colors.gray.300') theme('colors.gray.100');*/
	/*    }*/
	/*    .dark div[class*="overflow-y-auto"] {*/
	/*        scrollbar-color: theme('colors.neutral.600') theme('colors.neutral.700/50');*/
	/*    }*/
	/*}*/
</style>
