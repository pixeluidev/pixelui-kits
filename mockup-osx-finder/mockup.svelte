<script lang="ts">
	import { ChevronLeft, ChevronRight, Search } from '@lucide/svelte';

	// Data & Tipe
	import {
		finderSidebarItems,
		finderToolbarItems,
		type SidebarItem,
		type ToolbarItem
	} from './sidebar'; // Sesuaikan path

	// --- Props ---
	export let title: string = 'Documents';
	export let showSidebar: boolean = true;
	export let sidebarItems: SidebarItem[] = finderSidebarItems;
	export let showToolbar: boolean = true;
	export let toolbarItems: ToolbarItem[] = finderToolbarItems;
	export let showHeader: boolean = true;
	export let showControls: boolean = true;
	export let height: string = 'h-[550px]';
	export let width: string = 'w-full max-w-3xl';
	export let frameClass: string = '';
	export let theme: 'light' | 'dark' = 'light';

	// --- Styling Dinamis ---
	let frameBg: string;
	let headerBg: string;
	let headerBorder: string;
	let headerTextColor: string;
	let sidebarBg: string;
	let contentBg: string;
	let controlBorderColor: string;
	let controlBgColor: string;
	// Variabel Kelas untuk Sidebar - Dibuat lebih eksplisit
	let sidebarHoverBg: string;
	let sidebarActiveBg: string;
	let sidebarActiveText: string;
	let sidebarInactiveText: string;
	let sidebarInactiveHoverText: string;
	// Warna untuk variabel CSS scrollbar
	let scrollbarThumbColorVar: string;
	let scrollbarTrackColorVar: string = 'transparent';
	let scrollbarThumbHoverColorVar: string;

	$: {
		if (theme === 'light') {
			frameBg = 'bg-white shadow-xl';
			headerBg = 'bg-neutral-100/80 backdrop-blur-sm';
			headerBorder = 'border-neutral-200/80';
			headerTextColor = 'text-neutral-700';
			sidebarBg = 'bg-neutral-100/95 backdrop-blur-sm border-neutral-200/80';
			contentBg = 'bg-white';
			controlBorderColor = 'border-black/10';
			controlBgColor = 'bg-neutral-300/30';
			// Sidebar Light
			sidebarHoverBg = 'hover:bg-black/5';
			sidebarActiveBg = 'bg-black/10'; // Background aktif sedikit lebih gelap
			sidebarActiveText = 'text-neutral-800'; // Teks aktif lebih gelap
			sidebarInactiveText = 'text-neutral-600';
			sidebarInactiveHoverText = 'hover:text-neutral-900';
			// Scrollbar Light
			scrollbarThumbColorVar = 'rgba(107, 114, 128, 0.5)'; // gray-500
			scrollbarThumbHoverColorVar = 'rgba(75, 85, 99, 0.6)'; // gray-600
		} else {
			// dark theme
			frameBg = 'bg-[#282828] shadow-2xl shadow-black/40';
			headerBg = 'bg-[#333333]/80 backdrop-blur-sm';
			headerBorder = 'border-neutral-700/50'; // Border sedikit lebih terlihat
			headerTextColor = 'text-gray-400';
			sidebarBg = 'bg-[#333333]/95 backdrop-blur-sm border-neutral-700/50';
			contentBg = 'bg-[#282828]';
			controlBorderColor = 'border-black/20';
			controlBgColor = 'bg-neutral-400 ';
			// Sidebar Dark - Penyesuaian Kontras
			sidebarHoverBg = 'dark:hover:bg-white/10 hover:bg-white/10 '; // Hover lebih terlihat
			sidebarActiveBg = 'dark:bg-primary/30 bg-primary/30'; // Background aktif dengan aksen oranye
			sidebarActiveText = 'dark:text-orange-200 text-orange-200'; // Teks aktif lebih cerah (oranye)
			sidebarInactiveText = 'dark:text-neutral-400 text-neutral-400'; // Teks inaktif sedikit lebih terang
			sidebarInactiveHoverText = 'dark:hover:text-neutral-100 hover:text-neutral-100'; // Teks hover lebih terang
			// Scrollbar Dark
			scrollbarThumbColorVar = 'rgba(107, 114, 128, 0.4)'; // gray-500
			scrollbarThumbHoverColorVar = 'rgba(156, 163, 175, 0.5)'; // gray-400
		}
	}

	$: finalFrameClasses = `
        relative mx-auto border rounded-xl overflow-hidden
        ${height} ${width}
        ${frameBg} ${controlBorderColor}
        ${frameClass}
    `.trim();

	// --- State Internal ---
	let activeSidebarItemId: string | null =
		sidebarItems.find((item) => item.isActive)?.id ??
		sidebarItems.find((item) => !item.isSection)?.id ??
		null;

	// --- Fungsi Placeholder ---
	function handleControlClick(action: string) {
		console.log(`${action} clicked (mockup)`);
	}

	function handleSidebarItemClick(item: SidebarItem) {
		if (item.isSection) return;
		if (item.href) {
			console.log(`Navigate to: ${item.href}`);
		}
		activeSidebarItemId = item.id;
	}

	function handleToolbarItemClick(item: ToolbarItem) {
		if (item.action) {
			item.action();
		} else {
			console.log(`Toolbar item clicked: ${item.label}`);
		}
	}

	// *** Fungsi helper kelas sidebar sekarang menggunakan variabel state ***
	function getSidebarItemClasses(item: SidebarItem): string {
		const isActive = item.id === activeSidebarItemId;
		let classes =
			'flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-100 ease-in-out cursor-pointer';

		if (isActive) {
			classes += ` ${sidebarActiveBg} ${sidebarActiveText} font-semibold`;
		} else {
			classes += ` ${sidebarInactiveText} ${sidebarHoverBg} ${sidebarInactiveHoverText}`;
		}
		return classes;
	}
</script>

<!-- Frame Mockup Finder -->
<div class={finalFrameClasses}>
	<!-- Kontainer Utama -->
	<div class="flex h-full flex-col">
		{#if showHeader}
			<!-- Header / Title Bar -->
			<header
				class={`flex items-center border-b px-3 py-1.5 ${headerBg} ${headerBorder} flex-shrink-0`}
			>
				{#if showControls}
					<!-- Kontrol Jendela -->
					<div class="mr-3 flex space-x-1.5">
						<button
							onclick={() => handleControlClick('close')}
							aria-label="Close"
							class={`h-3 w-3 rounded-full border bg-[#FF5F57] ${controlBorderColor} ${controlBgColor} hover:brightness-110 focus:ring-1 focus:ring-red-400 focus:outline-none dark:hover:brightness-125`}
						></button>
						<button
							onclick={() => handleControlClick('minimize')}
							aria-label="Minimize"
							class={`h-3 w-3 rounded-full border bg-[#FEBC2E] ${controlBorderColor} ${controlBgColor} hover:brightness-110 focus:ring-1 focus:ring-yellow-400 focus:outline-none dark:hover:brightness-125`}
						></button>
						<button
							onclick={() => handleControlClick('maximize')}
							aria-label="Maximize"
							class={`h-3 w-3 rounded-full border bg-[#28C840] ${controlBorderColor} ${controlBgColor} hover:brightness-110 focus:ring-1 focus:ring-green-400 focus:outline-none dark:hover:brightness-125`}
						></button>
					</div>
				{/if}

				<!-- Navigasi Toolbar Kiri -->
				{#if showToolbar}
					<div class="flex items-center gap-1">
						<button
							onclick={() => console.log('Back')}
							class={`rounded p-1 text-neutral-500 dark:text-neutral-400 ${sidebarHoverBg} focus:bg-black/10 focus:outline-none disabled:opacity-40 dark:focus:bg-white/10`}
							disabled
						>
							<ChevronLeft class="h-4 w-4" />
						</button>
						<button
							onclick={() => console.log('Forward')}
							class={`rounded p-1 text-neutral-500 dark:text-neutral-400 ${sidebarHoverBg} focus:bg-black/10 focus:outline-none dark:focus:bg-white/10`}
						>
							<ChevronRight class="h-4 w-4" />
						</button>
					</div>
				{/if}

				<!-- Judul Window -->
				<div class="flex-grow px-4 text-center">
					{#if title}
						<span class="text-xs font-semibold {headerTextColor} truncate" {title}>{title}</span>
					{/if}
				</div>

				<!-- Toolbar Kanan -->
				{#if showToolbar}
					<div class="ml-auto flex items-center gap-1">
						{#each toolbarItems as item (item.id)}
							<button
								type="button"
								onclick={() => handleToolbarItemClick(item)}
								disabled={item.isDisabled}
								title={item.label}
								class={`rounded p-1 text-neutral-500 dark:text-neutral-400 ${sidebarHoverBg} focus:bg-black/10 focus:outline-none disabled:opacity-50 dark:focus:bg-white/10`}
							>
								<svelte:component this={item.icon} class="h-4 w-4" strokeWidth={2} />
							</button>
						{/each}
						<div class="relative ml-2 hidden max-w-[150px] flex-grow sm:block">
							<input
								type="search"
								placeholder="Search"
								class="w-full rounded-md border-none bg-black/10 py-1 pr-2 pl-7 text-xs text-neutral-600 placeholder-neutral-400 focus:ring-1 focus:ring-orange-400 dark:bg-white/10 dark:text-neutral-300 dark:placeholder-neutral-500"
							/>
							<Search
								class="pointer-events-none absolute top-1/2 left-1.5 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
							/>
						</div>
					</div>
				{/if}

				<!-- Placeholder alignment -->
				{#if !showToolbar && showControls}
					<div class="invisible flex space-x-1.5 opacity-0" aria-hidden="true">
						<span class="h-3 w-3"></span><span class="h-3 w-3"></span><span class="h-3 w-3"></span>
					</div>
				{/if}
			</header>
		{/if}

		<!-- Kontainer Body -->
		<div class="flex min-h-0 flex-1">
			{#if showSidebar}
				<!-- Sidebar -->
				<aside
					class={`w-48 flex-shrink-0 border-r md:w-56 ${headerBorder} ${sidebarBg} scrollbar-thin overflow-y-auto`}
				>
					<nav class="space-y-0.5 p-2 md:p-3">
						{#each sidebarItems as item (item.id)}
							{#if item.isSection}
								<h4
									class="px-2.5 pt-4 pb-1 text-[11px] font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
								>
									{item.label}
								</h4>
							{:else}
								<button
									type="button"
									onclick={() => handleSidebarItemClick(item)}
									class="{getSidebarItemClasses(item)} w-full"
									aria-current={item.id === activeSidebarItemId ? 'page' : undefined}
								>
									{#if item.icon && item.tagColor}
										<span
											class={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${item.tagColor.replace('text-', 'border-')} bg-opacity-30 ${item.tagColor.replace('text-', 'bg-')}`}
										></span>
									{:else if item.icon}
										<svelte:component
											this={item.icon}
											class="h-4 w-4 flex-shrink-0 opacity-80"
											strokeWidth={2}
										/>
									{:else}
										<span class="h-4 w-4 flex-shrink-0"></span> <!-- Placeholder -->
									{/if}
									<span class="flex-1 truncate text-left">{item.label}</span>
								</button>
							{/if}
						{/each}
					</nav>
				</aside>
			{/if}

			<!-- Area Konten Utama -->
			<main
				class={`scrollbar flex-1 overflow-y-auto ${contentBg} ${!showSidebar && !showHeader ? 'rounded-xl' : !showSidebar ? 'rounded-b-xl' : ''}`}
			>
				<!-- Styling scrollbar dengan variabel CSS -->
				<div
					class="h-full"
					style:--scrollbar-thumb={scrollbarThumbColorVar}
					style:--scrollbar-thumb-hover={scrollbarThumbHoverColorVar}
					style:--scrollbar-track={scrollbarTrackColorVar}
				>
					<slot>
						<!-- Konten default -->
						<div
							class={`flex h-full items-center justify-center p-10 text-center italic ${theme === 'light' ? 'text-gray-400' : 'text-neutral-500'}`}
						>
							Finder content area...
						</div>
					</slot>
				</div>
			</main>
		</div>
		<!-- End Kontainer Body -->
	</div>
	<!-- End Kontainer Utama -->
</div>

<!-- End Frame Mockup -->

<style lang="postcss">
	@reference "tailwindcss";
	@layer utilities {
		.scrollbar::-webkit-scrollbar {
			@apply h-[6px] w-[6px];
		}

		.scrollbar::-webkit-scrollbar-track {
			background-color: var(--scrollbar-track);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			@apply rounded opacity-0;
			background-color: var(--scrollbar-thumb);
		}

		.scrollbar:hover::-webkit-scrollbar-thumb {
			@apply opacity-100;
			transition: opacity 0.2s ease-in-out;
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
