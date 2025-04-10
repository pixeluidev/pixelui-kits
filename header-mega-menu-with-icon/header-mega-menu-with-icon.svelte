<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Logo from '../logo.svelte';
	import { slide } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import MegaMenuWithIcons from './mega-menu.svelte';
	import { megaMenuIconLinksData } from './data'; // Import data
	import Menu from 'lucide-svelte/icons/menu';
	import X from 'lucide-svelte/icons/x';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';

	let isMobileMenuOpen: boolean = false;
	let isMegaMenuOpen: boolean = false;

	// Refs
	let megaMenuButtonEl: HTMLButtonElement | null = null;
	let megaMenuWrapperEl: HTMLDivElement | null = null;
	let mobileNavEl: HTMLDivElement | null = null; // Ref for the container to check clicks outside
	let mobileToggleBtnEl: HTMLButtonElement | null = null;

	// Toggles & Closers
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen && isMegaMenuOpen) isMegaMenuOpen = false;
	}

	function toggleMegaMenu() {
		isMegaMenuOpen = !isMegaMenuOpen;
		// Note: Mega menu can stay open when mobile menu is also open on larger screens if needed.
		// Adjust logic here if they should be mutually exclusive on all screen sizes.
	}

	function closeMegaMenu() {
		isMegaMenuOpen = false;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}

	// Click Outside
	function handleClickOutside(event: MouseEvent) {
		// Close Mega Menu check
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

		// Close Mobile Menu check (only if mobile menu container exists and click is outside toggle + container)
		if (
			browser &&
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
	let currentPath = '/'; // Replace with your router logic
</script>

<header
	class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
>
	<nav class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
		<!-- Logo -->
		<a class="flex items-center space-x-3 rtl:space-x-reverse" href="/category/headers">
			<Logo class="size-8" />
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
			>Pixel UI</span
			>
		</a>

		<!-- CTA & Mobile Toggle -->
		<div class="flex items-center space-x-2 md:order-2 md:space-x-3 rtl:space-x-reverse">
			<a
				class="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none sm:inline-block dark:text-white dark:hover:bg-neutral-700 dark:focus:ring-offset-neutral-900"
				href="/category/headers">Login</a
			>
			<a
				class="rounded-lg bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
				href="/category/headers">Sign up</a
			>
			<button
				aria-controls="mega-menu-icons-container"
				aria-expanded={isMobileMenuOpen}
				aria-label="Open main menu"
				bind:this={mobileToggleBtnEl}
				class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
				on:click|stopPropagation={toggleMobileMenu}
				type="button"
			>
				<span class="sr-only">Open main menu</span>
				{#if !isMobileMenuOpen}
					<Menu class="h-5 w-5" />
				{:else}
					<X class="h-5 w-5" />
				{/if}
			</button>
		</div>

		<!-- Navigation Container -->
		<div
			bind:this={mobileNavEl}
			class="w-full items-center justify-between md:order-1 md:flex md:w-auto"
			class:hidden={!isMobileMenuOpen && true}
			class:md:!flex={true}
			id="mega-menu-icons-container"
		>
			<!-- Mobile Menu Content (Conditionally Rendered & Transitioned) -->
			{#if isMobileMenuOpen}
				<div class="mt-4 md:hidden" transition:slide={{ duration: 250, axis: 'y' }}>
					<ul class="flex flex-col space-y-2 font-medium">
						<li>
							<a
								href="/static"
								class="block rounded px-3 py-2"
								class:text-orange-600={currentPath === '/'}
								class:dark:text-orange-400={currentPath === '/'}
								class:text-gray-900={currentPath !== '/'}
								class:dark:text-white={currentPath !== '/'}
								class:hover:bg-gray-100={currentPath !== '/'}
								class:dark:hover:bg-neutral-700={currentPath !== '/'}
								aria-current={currentPath === '/' ? 'page' : undefined}
								on:click={closeMobileMenu}>Home</a
							>
						</li>
						<li>
							<!-- Mobile Mega Menu Trigger (simplified) -->
							<button
								bind:this={megaMenuButtonEl}
								on:click|stopPropagation={toggleMegaMenu}
								type="button"
								class="flex w-full items-center justify-between rounded px-3 py-2 font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700"
								aria-expanded={isMegaMenuOpen}
							>
								Company
								<ChevronDown
									class={`ms-2 h-2.5 w-2.5 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
								/>
							</button>
							{#if isMegaMenuOpen}
								<div
									bind:this={megaMenuWrapperEl}
									class="mt-2 ps-4"
									transition:fade={{ duration: 150 }}
								>
									<MegaMenuWithIcons menuData={megaMenuIconLinksData} onClose={closeMegaMenu} />
								</div>
							{/if}
						</li>
						<li>
							<a
								href="/team"
								class="block rounded px-3 py-2"
								class:text-orange-600={currentPath === '/team'}
								class:dark:text-orange-400={currentPath === '/team'}
								class:text-gray-900={currentPath !== '/team'}
								class:dark:text-white={currentPath !== '/team'}
								class:hover:bg-gray-100={currentPath !== '/'}
								class:dark:hover:bg-neutral-700={currentPath !== '/'}
								on:click={closeMobileMenu}>Team</a
							>
						</li>
					</ul>
				</div>
			{/if}

			<!-- Desktop Menu Content (Always in DOM, hidden on mobile) -->
			<ul
				class="mt-4 hidden flex-col font-medium md:mt-0 md:flex md:flex-row md:space-x-6 lg:space-x-8 rtl:space-x-reverse"
			>
				<li>
					<a
						aria-current={currentPath === '/' ? 'page' : undefined}
						class="block py-2 focus:text-orange-600 focus:outline-none md:p-0 dark:focus:text-orange-400"
						class:dark:hover:text-orange-400={currentPath !== '/'}
						class:dark:text-orange-400={currentPath === '/'}
						class:dark:text-white={currentPath !== '/'}
						class:hover:text-orange-600={currentPath !== '/'}
						class:md:bg-transparent={true}
						class:text-gray-900={currentPath !== '/'}
						class:text-orange-600={currentPath === '/'}
						href="/static">Home</a
					>
				</li>
				<li class="relative">
					<button
						aria-expanded={isMegaMenuOpen}
						bind:this={megaMenuButtonEl}
						class="flex w-full items-center justify-between py-2 font-medium focus:text-orange-600 focus:outline-none md:w-auto md:border-0 md:p-0 dark:focus:text-orange-400"
						class:dark:hover:text-orange-400={true}
						class:dark:text-orange-400={isMegaMenuOpen}
						class:dark:text-white={!isMegaMenuOpen}
						class:hover:text-orange-600={true}
						class:text-gray-900={!isMegaMenuOpen}
						class:text-orange-600={isMegaMenuOpen}
						id="mega-menu-icons-dropdown-button"
						on:click|stopPropagation={toggleMegaMenu}
						type="button"
					>
						Company
						<ChevronDown
							class={`ms-2 h-2.5 w-2.5 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : 'rotate-0'}`}
						/>
					</button>
					{#if isMegaMenuOpen}
						<div bind:this={megaMenuWrapperEl} transition:fade={{ duration: 150 }}>
							<MegaMenuWithIcons menuData={megaMenuIconLinksData} onClose={closeMegaMenu} />
						</div>
					{/if}
				</li>
				<li>
					<a
						class="block py-2 focus:text-orange-600 focus:outline-none md:p-0 dark:focus:text-orange-400"
						class:dark:hover:text-orange-400={currentPath !== '/team'}
						class:dark:text-orange-400={currentPath === '/team'}
						class:dark:text-white={currentPath !== '/team'}
						class:hover:text-orange-600={currentPath !== '/team'}
						class:md:bg-transparent={true}
						class:text-gray-900={currentPath !== '/team'}
						class:text-orange-600={currentPath === '/team'}
						href="/team">Team</a
					>
				</li>
			</ul>
		</div>
	</nav>
</header>
