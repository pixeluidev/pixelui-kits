<script lang="ts">
	// Impor ikon jika diperlukan (opsional)
	// import SomeIcon from 'lucide-svelte/icons/some-icon';

	// --- Props ---
	import type { SvelteComponent } from 'svelte';

	/** Teks judul di title bar */
	export let title: string = 'Untitled Window';
	/** Komponen ikon Svelte untuk ditampilkan sebelum judul (opsional) */
	export let icon: typeof SvelteComponent | null = null; // Gunakan typeof SvelteComponent
	export let contentHeight: string = 'h-80';
	/** Tampilkan title bar? */
	export let showHeader: boolean = true;
	/** Tampilkan kontrol jendela (Minimize, Maximize, Close)? */
	export let showControls: boolean = true;
	/** Mode tema: 'light' atau 'dark' */
	export let theme: 'light' | 'dark' = 'light';
	/** Kelas CSS tambahan untuk frame terluar */
	export let frameClass: string = '';

	// --- Styling Dinamis Berdasarkan Tema ---
	let frameBg: string;
	let frameBorder: string;
	let headerBg: string;
	let headerBorder: string;
	let headerTextColor: string;
	let contentBg: string;
	let controlHoverBg: string;
	let controlCloseHoverBg: string = 'hover:bg-red-600';
	let controlCloseHoverText: string = 'hover:text-white';
	let scrollbarThumbColor: string;
	let scrollbarTrackColor: string;

	$: {
		if (theme === 'light') {
			frameBg = 'bg-white';
			frameBorder = 'border-gray-300/70'; // Border luar sedikit lebih jelas
			headerBg = 'bg-gray-100'; // Header sedikit abu-abu
			headerBorder = 'border-gray-200';
			headerTextColor = 'text-neutral-700';
			contentBg = 'bg-white';
			controlHoverBg = 'hover:bg-gray-200';
			scrollbarThumbColor = 'bg-gray-400/70';
			scrollbarTrackColor = 'bg-gray-100/80';
		} else {
			// dark theme
			frameBg = 'bg-[#1e1e1e]'; // Background frame gelap
			frameBorder = 'border-neutral-700/80';
			headerBg = 'bg-[#2d2d2d]'; // Header sedikit lebih terang dari frame
			headerBorder = 'border-neutral-700';
			headerTextColor = 'text-neutral-200';
			contentBg = 'bg-[#1e1e1e]';
			controlHoverBg = 'hover:bg-neutral-600/60';
			controlCloseHoverBg = 'hover:bg-red-500'; // Merah lebih terang di dark mode
			controlCloseHoverText = 'hover:text-white';
			scrollbarThumbColor = 'bg-neutral-600/70';
			scrollbarTrackColor = 'bg-neutral-700/50';
		}
	}

	$: finalFrameClasses = `
        relative w-full shadow-xl rounded-lg border ${frameBorder} overflow-hidden
        ${frameBg}
        ${frameClass}
    `.trim();

	// --- Fungsi Placeholder untuk Kontrol ---
	function minimize() {
		console.log('Minimize clicked (mockup)');
	}

	function maximize() {
		console.log('Maximize clicked (mockup)');
	}

	function close() {
		console.log('Close clicked (mockup)');
	}
</script>

<!-- Frame Mockup Windows -->
<div class={finalFrameClasses}>
	{#if showHeader}
		<!-- Header / Title Bar -->
		<div class={`flex h-8 items-center justify-between border-b px-2 ${headerBg} ${headerBorder}`}>
			<!-- Kiri: Ikon & Judul -->
			<div class="flex min-w-0 flex-grow items-center gap-2 pl-1">
				{#if icon}
					<div class="h-4 w-4 flex-shrink-0 {headerTextColor} opacity-80">
						<svelte:component this={icon} class="h-full w-full" />
					</div>
				{/if}
				{#if title}
					<span class="text-xs font-medium {headerTextColor} truncate" {title}>
						{title}
					</span>
				{/if}
			</div>

			{#if showControls}
				<!-- Kanan: Kontrol Jendela -->
				<div class="flex flex-shrink-0 items-center">
					<!-- Minimize -->
					<button
						onclick={minimize}
						aria-label="Minimize"
						title="Minimize"
						class={`flex h-6 w-7 items-center justify-center text-[10px] ${headerTextColor} ${controlHoverBg} transition-colors focus:bg-gray-200 focus:outline-none dark:focus:bg-neutral-600`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
						>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
					</button>
					<!-- Maximize -->
					<button
						onclick={maximize}
						aria-label="Maximize"
						title="Maximize"
						class={`flex h-6 w-7 items-center justify-center text-[10px] ${headerTextColor} ${controlHoverBg} transition-colors focus:bg-gray-200 focus:outline-none dark:focus:bg-neutral-600`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-2.5 w-2.5"
						>
							<rect x="3" y="3" width="18" height="18" rx="0" ry="0"></rect>
						</svg>
						<!-- Persegi sederhana -->
					</button>
					<!-- Close -->
					<button
						onclick={close}
						aria-label="Close"
						title="Close"
						class={`flex h-6 w-7 items-center justify-center text-[10px] ${headerTextColor} ${controlCloseHoverBg} ${controlCloseHoverText} transition-colors focus:bg-red-500 focus:text-white focus:outline-none`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Area Konten -->
	<!-- Key ditambahkan untuk memastikan style scrollbar diperbarui saat tema berubah -->
	{#key theme}
		<div
			class={`scrollbar w-full overflow-y-auto ${contentBg} ${contentHeight}`}
			style="--scrollbar-thumb: {scrollbarThumbColor}; --scrollbar-track: {scrollbarTrackColor}; --scrollbar-thumb-hover: {theme ===
			'dark'
				? 'theme(colors.neutral.500)'
				: 'theme(colors.gray.500)'};"
		>
			<slot>
				<!-- Konten default jika tidak ada slot -->
				<div
					class={`flex h-full items-center justify-center p-4 text-center italic ${theme === 'light' ? 'text-gray-400' : 'text-neutral-500'}`}
				>
					Windows content area...
				</div>
			</slot>
		</div>
	{/key}
</div>

<style lang="postcss">
	@reference "tailwindcss";
	@layer utilities {
		.scrollbar::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		.scrollbar::-webkit-scrollbar-track {
			background-color: var(--scrollbar-track);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			@apply rounded;
			background-color: var(--scrollbar-thumb);
		}

		.scrollbar::-webkit-scrollbar-thumb:hover {
			background-color: var(--scrollbar-thumb-hover);
		}

		.scrollbar {
			scrollbar-width: thin;
			scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
		}
	}
</style>
