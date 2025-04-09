<script lang="ts">
	import { onMount, onDestroy, type SvelteComponent } from 'svelte';
	import { browser } from '$app/environment';

	import { slide } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import MegaMenuWithTabs from './mega-menu.svelte'; // Import the new mega menu
	import { megaMenuTabsData } from './data'; // Import the tab data
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let isMobileMenuOpen: boolean = false;
	let isMegaMenuOpen: boolean = false;

	// Refs
	let megaMenuButtonEl: HTMLButtonElement | null = null;
	let megaMenuWrapperEl: HTMLDivElement | null = null;
	let mobileNavEl: HTMLDivElement | null = null;
	let mobileToggleBtnEl: HTMLButtonElement | null = null;

	// Toggles
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen && isMegaMenuOpen) isMegaMenuOpen = false;
	}

	function toggleMegaMenu() {
		isMegaMenuOpen = !isMegaMenuOpen;
		if (isMegaMenuOpen && isMobileMenuOpen) isMobileMenuOpen = false;
	}

	function onClose() {
		isMegaMenuOpen = !isMegaMenuOpen;
	}

	// Close Handlers
	function closeMegaMenu() {
		isMegaMenuOpen = false;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Click Outside
	function handleClickOutside(event: MouseEvent) {
		if (
			browser &&
			isMegaMenuOpen &&
			megaMenuButtonEl &&
			!megaMenuButtonEl.contains(event.target as Node) &&
			megaMenuWrapperEl &&
			!megaMenuWrapperEl.contains(event.target as Node)
		) {
			closeMegaMenu();
		}
		if (
			isMobileMenuOpen &&
			mobileToggleBtnEl &&
			!mobileToggleBtnEl.contains(event.target as Node) &&
			mobileNavEl &&
			!mobileNavEl.contains(event.target as Node)
		) {
			closeMobileMenu();
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('click', handleClickOutside, true);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('click', handleClickOutside, true);
		}
	});

	// Example Active Route Logic
	let currentPath = '/active'; // Replace with your router logic
</script>

<header
	class="z-50 flex w-full flex-wrap border-b border-gray-200 bg-gradient-to-b from-white to-white/95 text-sm shadow-sm sm:flex-nowrap sm:justify-start dark:border-neutral-700 dark:from-neutral-900 dark:to-neutral-900/90 dark:backdrop-blur-md"
>
	<nav aria-label="Global" class="relative mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between md:h-18">
			<!-- Brand Logo -->
			<a
				aria-label="Brand"
				class="flex-none text-xl font-bold text-gray-800 focus:opacity-80 focus:outline-none dark:text-white"
				href="/static"
			>
				Pixel UI
			</a>

			<!-- Mobile Toggle Button -->
			<div class="sm:hidden">
				<button
					aria-controls="navbar-collapse"
					aria-expanded={isMobileMenuOpen}
					aria-label="Toggle navigation"
					bind:this={mobileToggleBtnEl}
					class="inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-900"
					on:click|stopPropagation={toggleMobileMenu}
					type="button"
				>
					{#if !isMobileMenuOpen}
						<Menu class="size-5 shrink-0" />
					{:else}
						<X class="size-5 shrink-0" />
					{/if}
				</button>
			</div>

			<!-- Desktop Navigation & Collapsible Mobile Menu -->
			<div
				bind:this={mobileNavEl}
				class=" grow basis-full overflow-hidden transition-all duration-300 ease-in-out sm:relative sm:top-auto sm:right-auto sm:left-auto sm:block sm:basis-auto sm:overflow-visible"
				class:bg-white={isMobileMenuOpen}
				class:dark:bg-neutral-800={isMobileMenuOpen}
				class:p-4={isMobileMenuOpen}
				class:shadow-lg={isMobileMenuOpen}
				class:sm:bg-transparent={true}
				class:sm:p-0={true}
				class:sm:shadow-none={true}
				id="navbar-collapse"
			>
				{#if isMobileMenuOpen}
					<div
						class="transition-transform duration-300 ease-in-out"
						transition:slide={{ duration: 250, axis: 'y' }}
					>
						<!-- Mobile Links -->
						<div
							class="flex flex-col gap-y-3 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:ps-5"
						>
							<a
								class="block rounded-md px-3 py-2 text-base font-medium focus:bg-orange-50 focus:text-orange-700 focus:outline-none sm:inline-block sm:py-6 sm:text-sm dark:focus:bg-orange-900/30 dark:focus:text-orange-400"
								class:text-orange-600={currentPath === '/active'}
								class:dark:text-orange-400={currentPath === '/active'}
								class:font-semibold={currentPath === '/active'}
								class:text-gray-700={currentPath !== '/active'}
								class:dark:text-neutral-300={currentPath !== '/active'}
								class:hover:text-gray-900={currentPath !== '/active'}
								class:dark:hover:text-white={currentPath !== '/active'}
								class:hover:bg-gray-100={currentPath !== '/active'}
								class:dark:hover:bg-neutral-700={currentPath !== '/active'}
								href="/active"
								aria-current={currentPath === '/active' ? 'page' : undefined}
								on:click={closeMobileMenu}>Active</a
							>

							<!-- Mobile Mega Menu Trigger -->
							<div class="relative">
								<button
									bind:this={megaMenuButtonEl}
									id="hs-mega-menu-mobile"
									type="button"
									class="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-orange-50 focus:text-orange-700 focus:outline-none sm:w-auto sm:justify-start sm:py-6 sm:text-sm dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white dark:focus:bg-orange-900/30 dark:focus:text-orange-400"
									aria-haspopup="menu"
									aria-expanded={isMegaMenuOpen}
									on:click|stopPropagation={toggleMegaMenu}
								>
									Explore
									<ChevronDown
										class={`ms-auto size-4 shrink-0 transition-transform duration-300 sm:ms-2 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
									/>
								</button>
								{#if isMegaMenuOpen}
									<div
										bind:this={megaMenuWrapperEl}
										class="sm:hidden"
										transition:fade={{ duration: 150 }}
									>
										<MegaMenuWithTabs menuData={megaMenuTabsData} {onClose} />
									</div>
								{/if}
							</div>

							<a
								class="block rounded-md px-3 py-2 text-base font-medium focus:bg-orange-50 focus:text-orange-700 focus:outline-none sm:inline-block sm:py-6 sm:text-sm dark:focus:bg-orange-900/30 dark:focus:text-orange-400"
								class:text-orange-600={currentPath === '/project'}
								class:dark:text-orange-400={currentPath === '/project'}
								class:font-semibold={currentPath === '/project'}
								class:text-gray-700={currentPath !== '/project'}
								class:dark:text-neutral-300={currentPath !== '/project'}
								class:hover:text-gray-900={currentPath !== '/project'}
								class:dark:hover:text-white={currentPath !== '/project'}
								class:hover:bg-gray-100={currentPath !== '/project'}
								class:dark:hover:bg-neutral-700={currentPath !== '/project'}
								href="/project"
								on:click={closeMobileMenu}>Project</a
							>
						</div>
					</div>
				{:else if !isMobileMenuOpen}
					<!-- Desktop Links -->
					<div class="hidden items-center justify-end sm:flex sm:gap-x-2">
						<a
							class="px-3 py-5 text-sm font-medium focus:text-orange-600 focus:outline-none dark:focus:text-orange-400"
							class:text-orange-600={currentPath === '/active'}
							class:dark:text-orange-400={currentPath === '/active'}
							class:font-semibold={currentPath === '/active'}
							class:text-gray-700={currentPath !== '/active'}
							class:dark:text-neutral-300={currentPath !== '/active'}
							class:hover:text-orange-600={currentPath !== '/active'}
							class:dark:hover:text-orange-400={currentPath !== '/active'}
							href="/active"
							aria-current={currentPath === '/active' ? 'page' : undefined}>Active</a
						>

						<!-- Desktop Mega Menu Trigger -->
						<div class="relative">
							<button
								bind:this={megaMenuButtonEl}
								id="hs-mega-menu"
								type="button"
								class="flex items-center px-3 py-5 text-sm font-medium text-gray-700 hover:text-orange-600 focus:text-orange-600 focus:outline-none dark:text-neutral-300 dark:hover:text-orange-400 dark:focus:text-orange-400"
								aria-haspopup="menu"
								aria-expanded={isMegaMenuOpen}
								on:click|stopPropagation={toggleMegaMenu}
							>
								Explore
								<ChevronDown
									class={`ms-1 size-4 shrink-0 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
								/>
							</button>
							{#if isMegaMenuOpen}
								<div bind:this={megaMenuWrapperEl} transition:fade={{ duration: 150 }}>
									<MegaMenuWithTabs menuData={megaMenuTabsData} {onClose} />
								</div>
							{/if}
						</div>

						<a
							class="px-3 py-5 text-sm font-medium focus:text-orange-600 focus:outline-none dark:focus:text-orange-400"
							class:text-orange-600={currentPath === '/project'}
							class:dark:text-orange-400={currentPath === '/project'}
							class:font-semibold={currentPath === '/project'}
							class:text-gray-700={currentPath !== '/project'}
							class:dark:text-neutral-300={currentPath !== '/project'}
							class:hover:text-orange-600={currentPath !== '/project'}
							class:dark:hover:text-orange-400={currentPath !== '/project'}
							href="/project">Project</a
						>
					</div>
				{/if}
			</div>
		</div>
	</nav>
</header>
