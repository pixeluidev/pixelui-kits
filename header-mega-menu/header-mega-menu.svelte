<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { slide } from 'svelte/transition'; // Use slide for mobile menu
	import { fade } from 'svelte/transition'; // Use fade for mega menu
	import MegaMenu from './mega-menu.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let isMobileMenuOpen: boolean = false;
	let isMegaMenuOpen: boolean = false;

	// --- Refs for click outside detection ---
	let megaMenuButtonEl: HTMLButtonElement | null = null;
	let megaMenuWrapperEl: HTMLDivElement | null = null; // Wrapper for the conditionally rendered MegaMenu
	let mobileNavEl: HTMLDivElement | null = null; // Reference to the mobile navigation container
	let mobileToggleBtnEl: HTMLButtonElement | null = null; // Reference to the mobile toggle button

	// --- Toggle Functions ---
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen && isMegaMenuOpen) {
			isMegaMenuOpen = false; // Close mega menu if mobile opens
		}
	}

	function toggleMegaMenu() {
		isMegaMenuOpen = !isMegaMenuOpen;
		if (isMegaMenuOpen && isMobileMenuOpen) {
			isMobileMenuOpen = false; // Close mobile menu if mega opens
		}
	}

	// --- Close Functions ---
	function closeMegaMenu() {
		isMegaMenuOpen = false;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// --- Click Outside Logic ---
	function handleClickOutside(event: MouseEvent) {
		// Close Mega Menu if click is outside button AND wrapper
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

		// Close Mobile Menu if click is outside button AND nav container
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
			// This code runs ONLY in the browser, preventing SSR errors.
			window.addEventListener('click', handleClickOutside, true); // Use capture phase
		}
	});

	onDestroy(() => {
		if (browser) {
			// Always clean up listeners
			window.removeEventListener('click', handleClickOutside, true); // Use capture phase
		}
	});

	// Reactive class for active link state (example)
	// In a real app, you'd likely use page store or routing info
	let currentPath = '/'; // Example, replace with actual router path
</script>

<header
	class="sticky top-0 z-50 flex w-full flex-wrap border-b border-gray-200 bg-white text-sm shadow-sm sm:flex-nowrap sm:justify-start dark:border-gray-700 dark:bg-gray-800/80 dark:backdrop-blur-md"
>
	<nav aria-label="Global" class="relative mx-auto w-full max-w-[85rem] px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
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
					class="inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-100 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
					onclick={toggleMobileMenu}
				>
					{#if !isMobileMenuOpen}
						<Menu class="size-5 shrink-0" />
					{:else}
						<X class="size-5 shrink-0" />
					{/if}
				</button>
			</div>

			<!-- Desktop Navigation & Collapsible Mobile Menu Area -->
			<div
				bind:this={mobileNavEl}
				class="absolute top-16 right-0 left-0 grow basis-full overflow-hidden transition-all duration-300 ease-in-out sm:relative sm:top-auto sm:right-auto sm:left-auto sm:block sm:basis-auto sm:overflow-visible"
				class:bg-white={isMobileMenuOpen}
				class:dark:bg-gray-800={isMobileMenuOpen}
				class:p-4={isMobileMenuOpen}
				class:shadow-md={isMobileMenuOpen}
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
						<div
							class="flex flex-col gap-y-3 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:ps-5"
						>
							<a
								class="block rounded-md px-3 py-2 text-base font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none sm:inline-block sm:py-5 sm:text-sm"
								class:text-orange-600={currentPath === '/active'}
								class:dark:text-orange-400={currentPath === '/active'}
								class:font-semibold={currentPath === '/active'}
								class:text-gray-700={currentPath !== '/active'}
								class:dark:text-gray-300={currentPath !== '/active'}
								class:hover:text-gray-900={currentPath !== '/active'}
								class:dark:hover:text-white={currentPath !== '/active'}
								class:hover:bg-gray-100={currentPath !== '/active'}
								class:dark:hover:bg-gray-700={currentPath !== '/active'}
								href="/active"
								aria-current={currentPath === '/active' ? 'page' : undefined}
								onclick={closeMobileMenu}
							>
								Active
							</a>

							<!-- Mega Menu Trigger Wrapper (relative positioning context) -->
							<div class="relative">
								<button
									bind:this={megaMenuButtonEl}
									id="hs-mega-menu"
									type="button"
									class="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none sm:w-auto sm:justify-start sm:py-5 sm:text-sm dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
									aria-haspopup="menu"
									aria-expanded={isMegaMenuOpen}
									onclick={toggleMegaMenu}
								>
									Mega Menu
									<ChevronDown
										class={`ms-auto size-4 shrink-0 transition-transform duration-300 sm:ms-2 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
									/>
								</button>

								{#if isMegaMenuOpen}
									<div bind:this={megaMenuWrapperEl} transition:fade={{ duration: 150 }}>
										<MegaMenu onClose={closeMegaMenu} />
									</div>
								{/if}
							</div>

							<a
								class="block rounded-md px-3 py-2 text-base font-medium focus:ring-2 focus:ring-orange-400 focus:outline-none sm:inline-block sm:py-5 sm:text-sm"
								class:text-orange-600={currentPath === '/project'}
								class:dark:text-orange-400={currentPath === '/project'}
								class:font-semibold={currentPath === '/project'}
								class:text-gray-700={currentPath !== '/project'}
								class:dark:text-gray-300={currentPath !== '/project'}
								class:hover:text-gray-900={currentPath !== '/project'}
								class:dark:hover:text-white={currentPath !== '/project'}
								class:hover:bg-gray-100={currentPath !== '/project'}
								class:dark:hover:bg-gray-700={currentPath !== '/project'}
								href="/project"
								onclick={closeMobileMenu}
							>
								Project
							</a>
						</div>
					</div>
				{:else if !isMobileMenuOpen}
					<div
						class="hidden flex-col gap-y-3 sm:mt-0 sm:flex sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:ps-5"
					>
						<a
							class="text-sm font-medium focus:text-orange-600 focus:outline-none sm:px-3 sm:py-5 dark:focus:text-orange-400"
							class:text-orange-600={currentPath === '/active'}
							class:dark:text-orange-400={currentPath === '/active'}
							class:font-semibold={currentPath === '/active'}
							class:text-gray-700={currentPath !== '/active'}
							class:dark:text-gray-300={currentPath !== '/active'}
							class:hover:text-orange-600={currentPath !== '/active'}
							class:dark:hover:text-orange-400={currentPath !== '/active'}
							href="/active"
							aria-current={currentPath === '/active' ? 'page' : undefined}
						>
							Active
						</a>

						<div class="relative">
							<button
								bind:this={megaMenuButtonEl}
								id="hs-mega-menu"
								type="button"
								class="flex w-full items-center text-sm font-medium text-gray-700 hover:text-orange-600 focus:text-orange-600 focus:outline-none sm:w-auto sm:px-3 sm:py-5 dark:text-gray-300 dark:hover:text-orange-400 dark:focus:text-orange-400"
								aria-haspopup="menu"
								aria-expanded={isMegaMenuOpen}
								onclick={toggleMegaMenu}
							>
								Mega Menu
								<ChevronDown
									class={`ms-1 size-4 shrink-0 transition-transform duration-300 sm:ms-2 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
								/>
							</button>

							{#if isMegaMenuOpen}
								<div bind:this={megaMenuWrapperEl} transition:fade={{ duration: 150 }}>
									<MegaMenu onClose={closeMegaMenu} />
								</div>
							{/if}
						</div>

						<a
							class="text-sm font-medium focus:text-orange-600 focus:outline-none sm:px-3 sm:py-5 dark:focus:text-orange-400"
							class:text-orange-600={currentPath === '/project'}
							class:dark:text-orange-400={currentPath === '/project'}
							class:font-semibold={currentPath === '/project'}
							class:text-gray-700={currentPath !== '/project'}
							class:dark:text-gray-300={currentPath !== '/project'}
							class:hover:text-orange-600={currentPath !== '/project'}
							class:dark:hover:text-orange-400={currentPath !== '/project'}
							href="/project"
						>
							Project
						</a>
					</div>
				{/if}
			</div>
		</div>
	</nav>
</header>
