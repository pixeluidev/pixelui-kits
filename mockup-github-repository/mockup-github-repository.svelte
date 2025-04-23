<script lang="ts">
	// Impor data dan tipe
	import { repoNavItems, repoFilesData, type RepoNavItem, type RepoFileData } from './data'; // Adjust path
	// Impor ikon Lucide
	import Book from 'lucide-svelte/icons/book';
	import Lock from 'lucide-svelte/icons/lock';
	import GitBranch from 'lucide-svelte/icons/git-branch';
	import Star from 'lucide-svelte/icons/star';
	import GitFork from 'lucide-svelte/icons/git-fork';
	import FileIcon from 'lucide-svelte/icons/file-text';
	import FolderIcon from 'lucide-svelte/icons/folder';

	// --- Props ---
	export let contentBg: string = 'bg-gray-200 dark:bg-gray-800';
	export let username: string = 'pixeluidev';
	export let repoName: string = 'pixelui';
	export let description: string =
		'PixelUI is a collection of free Tailwind CSS components that can be used in your next project';
	export let isPrivate: boolean = false;
	export let currentBranch: string = 'master';
	export let stars: number = 123;
	export let forks: number = 45;
	export let files: RepoFileData[] = repoFilesData;
	export let navItems: RepoNavItem[] = repoNavItems;
	export let activeTabId: string = 'code'; // Default tab aktif
	export let theme: 'light' | 'dark' = 'light';
	export let frameClass: string = '';

	// --- Styling Dinamis ---
	let bgColor: string = 'bg-gray-200 dark:bg-gray-800';
	let textColor: string;
	let mutedTextColor: string;
	let borderColor: string;
	let cardBgColor: string;
	let headerBgColor: string;
	let hoverBgColor: string;
	let activeTabBorderColor: string;
	let activeTabTextColor: string;
	let inactiveTabTextColor: string;
	let inactiveTabHoverTextColor: string;
	let inactiveTabHoverBorderColor: string;
	let iconColorActive: string;
	let iconColorInactive: string;
	let iconColorInactiveHover: string;
	let proseDarkClass = 'dark:prose-invert'; // Kelas untuk prose di dark mode

	$: {
		if (theme === 'light') {
			bgColor = 'bg-gray-50 dark:bg-neutral-900';
			textColor = 'text-gray-900 dark:text-neutral-100';
			mutedTextColor = 'text-gray-500';
			borderColor = 'border-gray-200 dark:border-neutral-700';
			cardBgColor = 'bg-white dark:bg-neutral-800';
			headerBgColor = 'bg-white dark:bg-neutral-800';
			hoverBgColor = 'hover:bg-gray-100';
			activeTabBorderColor = 'border-primary';
			activeTabTextColor = 'text-primary font-semibold'; // Aktif lebih jelas
			inactiveTabTextColor = 'text-gray-500';
			inactiveTabHoverTextColor = 'hover:text-gray-700';
			inactiveTabHoverBorderColor = 'hover:border-gray-300';
			iconColorActive = 'text-primary';
			iconColorInactive = 'text-gray-400';
			iconColorInactiveHover = 'group-hover:text-gray-500';
			proseDarkClass = ''; // Tidak perlu invert di light mode
		} else {
			// dark theme
			bgColor = 'bg-neutral-900';
			textColor = 'text-neutral-100';
			mutedTextColor = 'text-neutral-400'; // Sedikit lebih terang
			borderColor = 'border-neutral-700'; // Sedikit lebih terlihat
			cardBgColor = 'bg-neutral-800'; // Background card lebih solid
			headerBgColor = 'bg-neutral-800';
			hoverBgColor = 'hover:bg-neutral-700';
			activeTabBorderColor = 'border-orange-400';
			activeTabTextColor = 'text-orange-400 font-semibold'; // Aktif oranye terang
			inactiveTabTextColor = 'text-neutral-400'; // Inaktif lebih terang
			inactiveTabHoverTextColor = 'hover:text-neutral-200'; // Hover lebih terang
			inactiveTabHoverBorderColor = 'hover:border-neutral-600';
			iconColorActive = 'text-orange-400';
			iconColorInactive = 'text-neutral-500'; // Ikon inaktif lebih redup
			iconColorInactiveHover = 'group-hover:text-neutral-400'; // Hover ikon inaktif
			proseDarkClass = 'dark:prose-invert'; // Aktifkan invert untuk prose
		}
	}

	$: finalFrameClasses = `
        relative w-full shadow-lg rounded-lg border overflow-hidden
        ${bgColor} ${borderColor}
        ${frameClass}
    `.trim();

	// --- Fungsi Helper untuk Kelas Ikon Tab ---
	function getTabIconClasses(itemId: string): string {
		let classes = 'w-4 h-4 transition-colors duration-150 ease-in-out';
		if (activeTabId === itemId) {
			classes += ` ${iconColorActive}`;
		} else {
			classes += ` ${iconColorInactive} ${iconColorInactiveHover}`;
		}
		return classes;
	}

	// --- Fungsi ---
	function setActiveTab(id: string) {
		activeTabId = id;
	}
</script>

<!-- Mockup Repositori Git -->
<div class="wrapper px-10">
	<div class={finalFrameClasses}>
		<!-- Header Repo -->
		<header class={`border-b p-4 sm:p-5 ${borderColor} ${headerBgColor}`}>
			<div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
				<!-- Nama Repo & Status -->
				<div class="flex min-w-0 items-center gap-3">
					<Book class={`h-5 w-5 ${mutedTextColor} flex-shrink-0`} strokeWidth={1.5} />
					<h1 class="text-lg font-semibold sm:text-xl ${textColor} truncate">
						<a
							class={`-ml-0.5 rounded px-0.5 hover:underline focus:ring-1 focus:ring-orange-400 focus:outline-none ${textColor}`}
							href="https://github.com/pixeluidev/pixelui-kits"
							target="_blank">{username}</a
						>
						<span class={`${mutedTextColor} mx-1`}>/</span>
						<a
							class={`-ml-0.5 rounded px-0.5 hover:underline focus:ring-1 focus:ring-orange-400 focus:outline-none ${textColor} font-bold`}
							href="https://github.com/pixeluidev/pixelui-kits"
							target="_blank">{repoName}</a
						>
					</h1>
					<span
						class={`inline-flex items-center gap-1.5 border ${borderColor} rounded-full px-2 py-0.5 text-xs font-medium ${mutedTextColor}`}
					>
						{#if isPrivate}
							<Lock class="h-2.5 w-2.5" /> Private
						{:else}
							Public
						{/if}
					</span>
				</div>
				<!-- Tombol Aksi Kanan -->
				<div class="flex flex-shrink-0 items-center space-x-2">
					<button
						class={`flex items-center gap-1 border px-3 py-1.5 text-xs font-medium ${borderColor} ${cardBgColor} ${textColor} rounded-md ${hoverBgColor} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					>
						<Star class="h-3.5 w-3.5" />
						Star
						<span
							class={`ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] dark:bg-neutral-700 ${mutedTextColor}`}
							>{stars}</span
						>
					</button>
					<button
						class={`flex items-center gap-1 border px-3 py-1.5 text-xs font-medium ${borderColor} ${cardBgColor} ${textColor} rounded-md ${hoverBgColor} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					>
						<GitFork class="h-3.5 w-3.5" />
						Fork
						<span
							class={`ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] dark:bg-neutral-700 ${mutedTextColor}`}
							>{forks}</span
						>
					</button>
				</div>
			</div>
			{#if description}
				<p class={`mt-2 text-sm ${mutedTextColor}`}>{description}</p>
			{/if}
		</header>

		<!-- Navigasi Tab -->
		<div class={`border-b ${borderColor} scrollbar-hide overflow-x-auto ${headerBgColor}`}>
			<nav aria-label="Tabs" class="-mb-px flex space-x-4 px-4 sm:space-x-6 sm:px-5">
				{#each navItems as item (item.id)}
					<button
						type="button"
						onclick={() => setActiveTab(item.id)}
						class={`group inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-in-out focus:outline-none
                            ${
															activeTabId === item.id
																? `${activeTabBorderColor} ${activeTabTextColor}`
																: `border-transparent ${inactiveTabTextColor} ${inactiveTabHoverTextColor} ${inactiveTabHoverBorderColor}`
														}`}
						aria-current={activeTabId === item.id ? 'page' : undefined}
					>
						<!-- *** FIX: Gunakan helper untuk kelas ikon *** -->
						<svelte:component
							this={item.icon}
							class={getTabIconClasses(item.id)}
							strokeWidth={activeTabId === item.id ? 2.5 : 2}
						/>
						{item.label}
						{#if item.count !== undefined}
							<span
								class={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors duration-150 ease-in-out ${activeTabId === item.id ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' : `bg-gray-100 dark:bg-neutral-700 ${mutedTextColor} group-hover:bg-gray-200 dark:group-hover:bg-neutral-600`}`}
							>
								{item.count}
							</span>
						{/if}
					</button>
				{/each}
			</nav>
		</div>

		<!-- Konten Utama (Placeholder - Tampilkan konten berdasarkan tab aktif) -->
		<div class={`p-4 sm:p-6 ${contentBg}`}>
			{#if activeTabId === 'code'}
				<!-- Daftar File/Folder -->
				<div class={`rounded-md border ${borderColor} ${cardBgColor} overflow-hidden`}>
					<!-- Added overflow-hidden -->
					<!-- Header Daftar File -->
					<div
						class={`border-b px-4 py-2.5 ${borderColor} flex items-center justify-between gap-2 bg-gray-50 dark:bg-neutral-700/50`}
					>
						<div class="flex items-center gap-2">
							<GitBranch class={`h-4 w-4 ${mutedTextColor}`} />
							<span class={`text-sm font-medium ${textColor}`}>{currentBranch}</span>
						</div>
						<span class={`text-xs ${mutedTextColor} hidden sm:inline`}>Latest commit</span>
					</div>
					<!-- Body Daftar File -->
					<ul class={`divide-y ${borderColor}`}>
						{#each files as file (file.name)}
							<li
								class={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-100 ${hoverBgColor}`}
							>
								<div class="flex min-w-0 items-center gap-2.5">
									<!-- Added min-w-0 -->
									{#if file.type === 'dir'}
										<FolderIcon class={`h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400`} />
									{:else}
										<FileIcon class={`h-4 w-4 ${mutedTextColor} flex-shrink-0`} />
									{/if}
									<a
										href="https://github.com/pixeluidev/pixelui-kits"
										target="_blank"
										class={`-ml-0.5 truncate rounded px-0.5 hover:underline focus:ring-1 focus:ring-orange-400 focus:outline-none ${textColor}`}
										>{file.name}</a
									>
								</div>
								<div class="ml-4 flex flex-shrink-0 items-center space-x-4">
									<span
										class={`truncate text-xs ${mutedTextColor} hidden max-w-[200px] md:inline lg:max-w-[300px]`}
										>{file.lastCommitMessage}</span
									>
									<span class={`text-xs ${mutedTextColor} hidden w-20 text-right sm:inline`}
										>{file.lastCommitDate}</span
									>
								</div>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Placeholder Readme -->
				<div class={`mt-6 rounded-md border ${borderColor} ${cardBgColor} p-6`}>
					<h3 class={`mb-3 text-base font-semibold ${textColor} flex items-center gap-2`}>
						<Book class="h-4 w-4" />
						README.md
					</h3>
					<div class={`prose prose-sm ${proseDarkClass} max-w-none ${mutedTextColor} `}>
						<p>
							PixelUI is a collection of free Tailwind CSS components that can be used in your next
							project. With a range of components, you can build your next marketing website, admin
							dashboard, eCommerce store and much more.
						</p>
						<pre class="font-mono"><code
								>yarn add pixelui
yarn dev</code
							></pre>
						<p>Find more information in the official documentation.</p>
					</div>
				</div>
			{:else}
				<!-- Placeholder untuk tab lain -->
				<div
					class={`flex min-h-[200px] items-center justify-center text-center italic ${mutedTextColor} py-10`}
				>
					Content for '{navItems.find((item) => item.id === activeTabId)?.label ?? activeTabId}' tab
					goes here...
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	@layer utilities {
		.scrollbar-hide {
			scrollbar-width: none;
			-ms-overflow-style: none;
		}

		.scrollbar-hide::-webkit-scrollbar {
			display: none;
		}
	}

	/* Ensure prose styles apply if using @tailwindcss/typography */
	/* (Pastikan plugin typography sudah diinstall & dikonfigurasi) */
	.prose :where(code):not(:where([class~='not-prose'] *))::before {
		content: '' !important;
	}

	.prose :where(code):not(:where([class~='not-prose'] *))::after {
		content: '' !important;
	}

	/* Penyesuaian warna kode di prose */
	.prose code {
		@apply rounded bg-orange-100/60 px-1 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/40 dark:text-orange-300;
	}

	.prose pre {
		@apply overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-xs dark:border-neutral-700 dark:bg-neutral-800/60;
	}

	.prose pre code {
		@apply border-none bg-transparent p-0 font-normal whitespace-pre text-inherit dark:bg-transparent;
	}
</style>
