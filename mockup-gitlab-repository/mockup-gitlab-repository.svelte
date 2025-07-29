<script lang="ts">
	// Data & Tipe
	import {
		gitlabSidebarItems,
		gitlabTabItems,
		repoFilesData,
		gitlabRepoData,
		type GitlabSidebarItem,
		type RepoFileData
	} from './data'; // Adjust path
	// Ikon Lucide
	import {
		Book,
		ChevronDown,
		Code2,
		Download,
		FileIcon,
		FolderIcon,
		GitBranch,
		GitFork,
		GitlabIcon,
		Plus,
		Star,
		History,
		Lock
	} from '@lucide/svelte';

	// --- Props ---
	// Props untuk data utama, bisa diambil dari gitlabRepoData default
	export let groupName: string = gitlabRepoData.groupName;
	export let repoName: string = gitlabRepoData.projectName;
	export let isPrivate: boolean = gitlabRepoData.isPrivate;
	export let currentBranch: string = gitlabRepoData.currentBranch;
	export let stars: number = gitlabRepoData.stars;
	export let forks: number = gitlabRepoData.forks;
	// Props untuk data list
	export let sidebarItems: GitlabSidebarItem[] = gitlabSidebarItems;
	export let tabItems = gitlabTabItems; // Subset dari sidebar atau data sendiri
	export let files: RepoFileData[] = repoFilesData;
	// Props kontrol UI
	export let activeSidebarItemId: string = 'repository'; // Item sidebar aktif
	export let activeTabId: string = 'repository'; // Tab konten aktif
	export let theme: 'light' | 'dark' = 'light'; // Tema (GitLab cenderung terang)
	export let frameClass: string = '';
	export let height: string = 'h-[700px]'; // Tinggi mockup
	export let width: string = 'w-full max-w-5xl'; // Lebar mockup

	// --- Styling Dinamis ---
	// GitLab cenderung menggunakan tema terang sebagai default, dark mode kurang umum
	// Warna utama: Biru (#292961), Ungu (#6b4fbb), Abu-abu
	export let frameBg: string;
	export let frameBorder: string;
	export let headerBg: string;
	export let sidebarBg: string;
	export let contentBg: string;
	export let textColor: string;
	export let mutedTextColor: string;
	export let linkColor: string;
	export let linkHoverColor: string;
	export let activeBg: string; // Background untuk item aktif (sidebar/tab)
	export let hoverBg: string;
	export let buttonBg: string;
	export let buttonHoverBg: string;
	export let buttonTextColor: string;
	export let buttonBorder: string;
	export let scrollbarThumb: string;
	export let scrollbarTrack: string;
	export let borderColor: string;
	export let cardBgColor: string;
	export let headerBgColor: string;
	export let hoverBgColor: string;
	export let scrollbarThumbHoverColorVar: string;

	$: {
		if (theme === 'dark') {
			// Dark Mode (Kurang umum di GitLab asli, tapi kita buat)
			frameBg = 'bg-neutral-900';
			frameBorder = 'border-neutral-700';
			headerBg = 'bg-[#1f1f1f]'; // Gelap sedikit berbeda
			sidebarBg = 'bg-[#2a2a2e]'; // Abu gelap untuk sidebar
			contentBg = 'bg-neutral-900';
			textColor = 'text-neutral-100';
			mutedTextColor = 'text-neutral-400';
			linkColor = 'text-blue-400';
			linkHoverColor = 'hover:text-blue-300';
			activeBg = 'bg-blue-600/20'; // Background aktif transparan
			hoverBg = 'hover:bg-neutral-700/50';
			buttonBg = 'bg-neutral-700';
			buttonHoverBg = 'hover:bg-neutral-600';
			buttonTextColor = 'text-neutral-100';
			buttonBorder = 'border-neutral-600';
			scrollbarThumb = 'bg-neutral-600/70';
			scrollbarTrack = 'bg-neutral-800/50';
		} else {
			// Light Mode (Default GitLab)
			frameBg = 'bg-gray-50';
			frameBorder = 'border-gray-200';
			headerBg = 'bg-white';
			sidebarBg = 'bg-[#fafafa]'; // Abu sangat terang
			contentBg = 'bg-white';
			textColor = 'text-gray-900';
			mutedTextColor = 'text-gray-500';
			linkColor = 'text-blue-600';
			linkHoverColor = 'hover:text-blue-700';
			activeBg = 'bg-blue-100/60'; // Background aktif biru muda
			hoverBg = 'hover:bg-gray-100';
			buttonBg = 'bg-white';
			buttonHoverBg = 'hover:bg-gray-50';
			buttonTextColor = 'text-gray-700';
			buttonBorder = 'border-gray-300';
			scrollbarThumb = 'bg-gray-400/50';
			scrollbarTrack = 'bg-gray-100/50';
		}
	}

	$: finalFrameClasses = `
        relative mx-auto border rounded-lg overflow-hidden
        ${height} ${width}
        ${frameBg} ${frameBorder}
        ${frameClass}
        flex flex-col {# Layout utama kolom #}
    `.trim();

	// --- Fungsi ---
	function handleSidebarClick(item: GitlabSidebarItem) {
		if (item.isSection || !item.id) return;
		activeSidebarItemId = item.id;
		// Jika tab ada yang cocok dengan ID sidebar, aktifkan tab itu
		if (tabItems.some((tab) => tab.id === item.id)) {
			activeTabId = item.id;
		}
		console.log('Sidebar item clicked:', item.label);
	}

	function handleTabClick(tabId: string) {
		activeTabId = tabId;
		// Jika item sidebar ada yang cocok, aktifkan juga
		if (sidebarItems.some((item) => item.id === tabId)) {
			activeSidebarItemId = tabId;
		}
		console.log('Tab clicked:', tabId);
	}
</script>

<!-- Mockup GitLab -->
<div class={finalFrameClasses}>
	<!-- Header Utama -->
	<header
		class={`flex items-center justify-between border-b px-4 py-2.5 ${borderColor} ${headerBgColor} flex-shrink-0`}
	>
		<!-- Kiri: Logo & Breadcrumbs -->
		<div class="flex items-center gap-3">
			<a aria-label="GitLab Home" class="flex-shrink-0" href="#">
				<!-- Ganti dengan SVG logo GitLab jika punya -->
				<GitlabIcon class={`h-6 w-6 ${theme === 'dark' ? 'text-orange-400' : 'text-[#fc6d26]'}`} />
			</a>
			<div class="text-sm font-medium ${textColor} flex items-center gap-1.5">
				<a class={`${linkColor} ${linkHoverColor} truncate`} href="#">{groupName}</a>
				<span class={`${mutedTextColor}`}>/</span>
				<a class={`font-semibold ${textColor} truncate hover:underline`} href="#">{repoName}</a>
			</div>
		</div>
		<!-- Kanan: Tombol Aksi -->
		<div class="flex items-center space-x-2">
			<span
				class={`inline-flex items-center border text-xs ${buttonBorder} ${buttonBg} ${mutedTextColor} rounded-md px-2 py-0.5`}
			>
				{#if isPrivate}
					<Lock class="me-1 h-3 w-3" /> Private
				{:else}
					Public
				{/if}
			</span>
			<button
				class={`flex items-center gap-1 border px-2.5 py-1.5 text-xs font-medium ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
			>
				<Star class="h-3.5 w-3.5" />
				<span class="hidden sm:inline">Star</span>
				<span
					class={`ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] dark:bg-neutral-700 ${mutedTextColor}`}
					>{stars}</span
				>
			</button>
			<button
				class={`flex items-center gap-1 border px-2.5 py-1.5 text-xs font-medium ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
			>
				<GitFork class="h-3.5 w-3.5" />
				<span class="hidden sm:inline">Fork</span>
				<span
					class={`ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] dark:bg-neutral-700 ${mutedTextColor}`}
					>{forks}</span
				>
			</button>
			<!-- Tombol dropdown placeholder -->
			<button
				class={`flex items-center gap-1 border px-2.5 py-1.5 text-xs font-medium ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
			>
				<Code2 class="h-3.5 w-3.5" />
				Code
				<ChevronDown class="ml-1 h-3 w-3" />
			</button>
		</div>
	</header>

	<!-- Kontainer Body Utama -->
	<div class="flex min-h-0 flex-1">
		<!-- Sidebar Kiri -->
		<aside
			class={`w-56 flex-shrink-0 border-r md:w-64 ${borderColor} ${sidebarBg} scrollbar-thin overflow-y-auto`}
		>
			<nav class="space-y-1 p-3 md:p-4">
				<!-- Tombol Add/Upload Placeholder -->
				<button
					class={`mb-3 flex w-full items-center justify-center gap-1.5 border px-3 py-2 text-xs font-semibold ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
				>
					<Plus class="h-4 w-4" />
					Add
					<ChevronDown class="ml-1 h-3 w-3" />
				</button>

				<!-- Item Sidebar -->
				{#each sidebarItems as item (item.id)}
					{#if item.isSection}
						<h4
							class="px-2 pt-4 pb-1 text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
						>
							{item.label}
						</h4>
					{:else}
						<button
							type="button"
							onclick={() => handleSidebarClick(item)}
							class={`relative flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm font-medium transition-colors duration-100 ease-in-out focus:z-10  focus:outline-none
                                    ${
																			item.id === activeSidebarItemId
																				? `${activeBg} ${linkColor} font-semibold` // Use link color for active item
																				: `${mutedTextColor} ${hoverBg} hover:text-gray-900 dark:hover:text-neutral-100`
																		}`}
							aria-current={item.id === activeSidebarItemId ? 'page' : undefined}
						>
							{#if item.icon}
								<svelte:component
									this={item.icon}
									class={`h-4 w-4 flex-shrink-0 ${item.id === activeSidebarItemId ? linkColor : mutedTextColor}`}
									strokeWidth={item.id === activeSidebarItemId ? 2.5 : 2}
								/>
							{/if}
							<span class="flex-1 truncate">{item.label}</span>
							<!-- Indikator Aktif -->
							{#if item.id === activeSidebarItemId}
								<span
									class="bg-primary absolute inset-y-0 left-0 w-1 rounded-r-md dark:bg-orange-400"
								></span>
							{/if}
						</button>
					{/if}
				{/each}
			</nav>
		</aside>

		<!-- Konten Utama -->
		<main class={`flex flex-1 flex-col overflow-hidden ${contentBg}`}>
			<!-- Header Konten (Branch, History, etc.) -->
			<div
				class={`flex items-center justify-between gap-4 border-b p-3 sm:p-4 ${borderColor} flex-shrink-0`}
			>
				<div class="flex items-center gap-2">
					<button
						class={`flex items-center gap-1.5 border text-sm font-medium ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md px-3 py-1 ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					>
						<GitBranch class="h-4 w-4" />
						{currentBranch}
						<ChevronDown class="ml-1 h-3 w-3" />
					</button>
				</div>
				<div class="flex items-center gap-2">
					<button
						class={`hidden items-center gap-1.5 border text-xs font-medium sm:flex ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md px-3 py-1 ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					>
						<History class="h-3.5 w-3.5" />
						History
					</button>
					<button
						class={`flex items-center gap-1.5 border text-xs font-medium ${buttonBorder} ${buttonBg} ${buttonTextColor} rounded-md px-3 py-1 ${buttonHoverBg} focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					>
						<Download class="h-3.5 w-3.5" />
						Download
						<ChevronDown class="ml-1 h-3 w-3" />
					</button>
				</div>
			</div>

			<!-- Navigasi Tab Konten -->
			<div class={`border-b ${borderColor} scrollbar-hide flex-shrink-0 overflow-x-auto`}>
				<nav aria-label="Repository Tabs" class="-mb-px flex space-x-4 px-3 sm:space-x-6 sm:px-4">
					{#each tabItems as item (item.id)}
						<button
							type="button"
							onclick={() => handleTabClick(item.id)}
							class={`group inline-flex items-center gap-1.5 border-b-2 px-1 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-in-out focus:outline-none
                                    ${
																			activeTabId === item.id
																				? `border-blue-500 dark:border-blue-400 ${textColor} font-semibold` // Use GitLab blue for active tab
																				: `border-transparent ${mutedTextColor} hover:border-gray-300 hover:text-gray-700 dark:hover:border-neutral-600 dark:hover:text-neutral-200`
																		}`}
							aria-current={activeTabId === item.id ? 'page' : undefined}
						>
							{item.label}
							<!-- Count can be added here similar to main nav if needed -->
						</button>
					{/each}
				</nav>
			</div>

			<!-- Area Konten Tab (Scrollable) -->
			<div class="scrollbar flex-1 overflow-y-auto p-4 sm:p-6">
				<!-- Styling scrollbar dengan variabel CSS -->
				<div
					class="h-full"
					style:--scrollbar-thumb={scrollbarThumb}
					style:--scrollbar-thumb-hover={scrollbarThumbHoverColorVar ?? scrollbarThumb}
					style:--scrollbar-track={scrollbarTrack}
				>
					{#if activeTabId === 'repository'}
						<!-- Daftar File/Folder -->
						<div class={`rounded-md border ${borderColor} ${cardBgColor} mb-6`}>
							<ul class={`divide-y ${borderColor}`}>
								{#each files as file (file.name)}
									<li
										class={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-100 ${hoverBgColor}`}
									>
										<div class="flex min-w-0 items-center gap-2.5">
											{#if file.type === 'dir'}
												<FolderIcon
													class={`h-4 w-4 flex-shrink-0 text-blue-500 dark:text-blue-400`}
												/>
											{:else}
												<FileIcon class={`h-4 w-4 ${mutedTextColor} flex-shrink-0`} />
											{/if}
											<a
												href="#"
												class={`-ml-0.5 truncate rounded px-0.5 hover:underline focus:ring-1 focus:ring-orange-400 focus:outline-none ${linkColor} ${linkHoverColor}`}
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
						<div class={`rounded-md border ${borderColor} ${cardBgColor} p-6`}>
							<h3 class={`mb-3 text-base font-semibold ${textColor} flex items-center gap-2`}>
								<Book class="h-4 w-4" />
								README.md
							</h3>
							<div class={`prose prose-sm dark:prose-invert max-w-none ${mutedTextColor}`}>
								<p>GitLab project description, setup guide, contribution details, etc.</p>
								<pre><code
										>git clone your-repo.git
cd your-repo
npm install</code
									></pre>
							</div>
						</div>
					{:else}
						<!-- Placeholder untuk tab lain -->
						<div
							class={`flex min-h-[200px] items-center justify-center text-center italic ${mutedTextColor} py-10`}
						>
							Content for '{tabItems.find((t) => t.id === activeTabId)?.label ?? activeTabId}'
							tab...
						</div>
					{/if}
				</div>
			</div>
			<!-- End Area Konten Tab -->
		</main>
		<!-- End Konten Utama -->
	</div>
	<!-- End Kontainer Body -->
</div>

<!-- Placeholder untuk Ikon GitLab SVG -->
<!-- Buat file ini: src/lib/components/icons/GitlabIcon.svelte -->
<!--
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.9 36.9" fill="currentColor" {...$$props}>
  <path d="M36.9,13.1l-1.6-5c-0.2-0.5-0.6-0.9-1.1-1.1l-5.9-1.9c-0.5-0.2-1.2-0.2-1.7,0L20.7,7c-0.1,0-0.1,0-0.2,0 H16.4c-0.1,0-0.1,0-0.2,0L10.3,5c-0.5-0.2-1.2-0.2-1.7,0L2.8,6.9C2.2,7.1,1.8,7.5,1.6,8.1l-1.6,5c-0.2,0.5,0,1.1,0.4,1.5 l18.1,18L36.5,14.6C36.9,14.2,37,13.6,36.9,13.1z M2.5,12.8L3.7,9l4.7-1.5l4,12.3L2.5,12.8z M21.7,29.8L18,14.6l3.3-10.4 l4.7,1.5l1.2,3.8L21.7,29.8z"/>
</svg>
-->

<!-- End Frame Mockup -->

<style lang="postcss">
	@reference "tailwindcss";
	@layer utilities {
		/* Scrollbar */
		.scrollbar::-webkit-scrollbar {
			@apply h-[5px] w-[5px];
		}

		.scrollbar::-webkit-scrollbar-track {
			background-color: var(--scrollbar-track);
		}

		.scrollbar::-webkit-scrollbar-thumb {
			@apply rounded;
			background-color: var(--scrollbar-thumb);
			opacity: 0;
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

		/* Prose adjustments if needed */
		.prose code {
			@apply rounded bg-orange-100/60 px-1 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/40 dark:text-orange-300;
		}

		.prose pre {
			@apply overflow-x-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-xs dark:border-neutral-700 dark:bg-neutral-800/60;
		}

		.prose pre code {
			@apply border-none bg-transparent p-0 font-normal whitespace-pre text-inherit dark:bg-transparent;
		}
	}
</style>
