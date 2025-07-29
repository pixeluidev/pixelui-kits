<script lang="ts">
	import { Lock, RefreshCw } from '@lucide/svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte'; // Atau ChevronsLeft/Right untuk back/forward
	import type { Snippet } from 'svelte';

	type Props = {
		url: string;
		tabTitle: string;
		contentHeight: string;
		hideControls: boolean;
		hideHeader: boolean;
		children: Snippet<[]>;
	};

	const { url, tabTitle, contentHeight, hideControls, hideHeader, children }: Props = $props();

	// Gabungkan kelas default dengan kelas kustom
	const finalFrameClasses = $derived(`
		relative w-full bg-gray-100 dark:bg-neutral-800/50 rounded-lg sm:rounded-xl shadow-xl
		border border-gray-200/80 dark:border-neutral-700/60 overflow-hidden backdrop-blur-md bg-opacity-80 dark:bg-opacity-80
		${contentHeight}
	`);

	// Ekstrak domain dari URL untuk tampilan yang lebih bersih di address bar (opsional)
	const displayUrl = $derived(
		(() => {
			try {
				const parsedUrl = new URL(url);
				// Opsi: Tampilkan hanya domain atau bagian path yang lebih pendek
				return (
					parsedUrl.hostname.replace(/^www\./, '') +
					(parsedUrl.pathname.length > 1 ? parsedUrl.pathname : '')
				);
			} catch (e) {
				return url; // Fallback jika URL tidak valid
			}
		})()
	);
</script>

<!-- Frame Mockup Browser Safari -->
<div class={finalFrameClasses}>
	{#if !hideHeader}
		<!-- Header / Title Bar - Gaya Safari -->
		<div
			class="flex items-center gap-1.5 border-b border-gray-200/70 bg-gradient-to-b from-gray-100/90 to-gray-50/80 px-3 py-2 dark:border-neutral-700/50 dark:from-neutral-700/80 dark:to-neutral-700/70"
		>
			{#if !hideControls}
				<!-- Kontrol Jendela (macOS style) -->
				<div class="flex space-x-1.5">
					<span class="block h-3 w-3 rounded-full bg-[#FF5F57]"></span>
					<!-- Merah -->
					<span class="block h-3 w-3 rounded-full bg-[#FEBC2E]"></span>
					<!-- Kuning -->
					<span class="block h-3 w-3 rounded-full bg-[#28C840]"></span>
					<!-- Hijau -->
				</div>
			{/if}

			<!-- Navigasi & Address Bar Tengah -->
			<div class="flex flex-grow items-center justify-center px-4 sm:px-10 md:px-16">
				<!-- Tombol Back/Forward (Placeholder) -->
				<button
					class="rounded p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 dark:text-neutral-500 dark:hover:text-neutral-300"
					disabled
				>
					<ChevronLeft class="h-4 w-4" />
				</button>
				<button
					class="ml-0.5 rounded p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 dark:text-neutral-500 dark:hover:text-neutral-300"
				>
					<ChevronRight class="h-4 w-4" />
				</button>

				<!-- Address Bar -->
				<div class="mx-2 flex-grow sm:mx-3">
					<div
						class="flex items-center justify-center gap-1 truncate rounded-md border border-gray-200/50 bg-white/70 px-3 py-1 text-xs text-gray-700 shadow-inner dark:border-neutral-600/50 dark:bg-neutral-600/50 dark:text-neutral-200"
					>
						<Lock
							class="h-2.5 w-2.5 flex-shrink-0 text-gray-500 dark:text-neutral-400"
							strokeWidth={2.5}
						/>
						<span class="truncate font-medium">{displayUrl}</span>
						<!-- Tampilkan URL bersih -->
					</div>
				</div>

				<!-- Tombol Refresh (Placeholder) -->
				<button
					class="rounded p-1 text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300"
				>
					<RefreshCw class="h-3.5 w-3.5" />
				</button>
			</div>

			{#if !hideControls}
				<!-- Placeholder untuk tombol ekstensi/plus di kanan -->
				<div class="flex space-x-1.5 opacity-0">
					<!-- Samakan ukuran dengan kontrol kiri -->
					<span class="block h-3 w-3"></span>
					<span class="block h-3 w-3"></span>
					<span class="block h-3 w-3"></span>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Area Konten (Gunakan slot) -->
	<div class="bg-white dark:bg-neutral-800 {contentHeight} overflow-y-auto">
		{#if children}
			{@render children()}
		{:else}
			<div
				class="flex h-full items-center justify-center p-4 text-center text-gray-400 italic dark:text-neutral-500"
			>
				Safari content area...<br /> Embed your page or component here.
			</div>
		{/if}
	</div>
</div>
