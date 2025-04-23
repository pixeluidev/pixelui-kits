<!-- src/lib/components/site-navbar/site-navbar.svelte -->
<script lang="ts">
	import { Menu, X, ArrowRight, LogIn } from 'lucide-svelte';
	import { page } from '$app/stores'; // To detect current route for active links
	import { mainNavLinks, type NavLink } from './data';

	import { PixelUiLogo } from '../pixel-ui-logo'; // Assuming logo component path

	// --- Component State ---
	let mobileMenuOpen = $state(false);

	// --- Computed State ---
	// Determine if a link is active based on the current page path
	const isActive = (href: string) => {
		// Handle root path separately for exact match
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		// For other paths, check if the current path starts with the link's href
		// This handles nested routes like /blog/post-1 being active for /blog link
		return $page.url.pathname.startsWith(href);
	};

	// --- Event Handlers ---
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-neutral-700/50 dark:bg-neutral-900/80"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Left Section Logo -->
			<div class="flex flex-shrink-0 items-center">
				<a href="/" aria-label="Pixel UI Home">
					<PixelUiLogo class="h-8 w-auto text-orange-500" />
					<!-- Fallback text if logo fails or for screen readers -->
					<span class="sr-only">Pixel UI</span>
				</a>
			</div>

			<!-- Center Section Desktop Navigation Links -->
			<div class="hidden sm:ml-6 sm:flex sm:space-x-6 lg:space-x-8">
				{#each mainNavLinks as link (link.href)}
					<a
						href={link.href}
						class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-150 {isActive(
							link.href
						)
							? 'border-orange-500 text-gray-900 dark:text-white'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200'}"
						aria-current={isActive(link.href) ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Right Section CTAs & Mobile Menu Button -->
			<div class="flex items-center">
				<!-- Desktop CTAs (Hidden on small screens) -->
				<div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
					<a
						href="/login"
						class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200"
					>
						Sign In
					</a>
					<a
						href="/signup"
						class="inline-flex items-center gap-1.5 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
					>
						Get Started
						<ArrowRight class="h-4 w-4" />
					</a>
				</div>

				<!-- Mobile menu button -->
				<div class="flex items-center sm:hidden">
					<button
						type="button"
						onclick={toggleMobileMenu}
						class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-inset dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
						aria-controls="mobile-menu"
						aria-expanded={mobileMenuOpen}
					>
						<span class="absolute -inset-0.5"></span>
						<span class="sr-only">Open main menu</span>
						{#if mobileMenuOpen}
							<X class="block h-6 w-6" aria-hidden="true" />
						{:else}
							<Menu class="block h-6 w-6" aria-hidden="true" />
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if mobileMenuOpen}
		<div
			class="border-t border-gray-200 bg-white sm:hidden dark:border-neutral-700/50 dark:bg-neutral-800"
			id="mobile-menu"
		>
			<div class="space-y-1 px-2 pt-2 pb-3">
				{#each mainNavLinks as link (link.href)}
					<a href={link.href} onclick={closeMobileMenu}
						class="block rounded-md px-3 py-2 text-base font-medium transition-colors {isActive(
							link.href
						)
							? 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
							: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100'}"
						aria-current={isActive(link.href) ? 'page' : undefined}
						>
						{link.label}
					</a>
				{/each}
			</div>
			<!-- Mobile CTAs -->
			<div class="space-y-3 border-t border-gray-200 px-4 py-4 dark:border-neutral-700">
				<a
					href="/signup"
					onclick={closeMobileMenu}
					class="block w-full rounded-md bg-orange-500 px-4 py-2.5 text-center text-base font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
				>
					Get Started
				</a>
				<a
					href="/login"
					onclick={closeMobileMenu}
					class="block w-full rounded-md px-4 py-2.5 text-center text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
				>
					Sign In
				</a>
			</div>
		</div>
	{/if}
</nav>
