<script lang="ts">
	import { Github, Twitter, Send, Dribbble } from 'lucide-svelte'; // Import potential icons
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';
	import { footerLinkGroups, socialLinks } from './data';
	import { PixelUiLogo } from '../pixel-ui-logo'; // Assuming logo component path

	// Map string keys from data to actual Lucide components
	const iconMap: Record<string, ComponentType<Icon>> = {
		github: Github,
		twitter: Twitter,
		discord: Send, // Replace with actual Discord icon if available/imported
		dribbble: Dribbble
	};

	const currentYear = new Date().getFullYear();

	// Optional Newsletter Form State (if you uncomment the form)
	// let newsletterEmail: string = $state('');
	// let newsletterState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	// let newsletterMessage: string = $state('');

	// function handleNewsletterSubmit() {
	//     newsletterState = 'submitting';
	//     newsletterMessage = '';
	//     console.log('Subscribing:', newsletterEmail);
	//     // Simulate API
	//     setTimeout(() => {
	//         if (Math.random() > 0.2) {
	//             newsletterState = 'success';
	//             newsletterMessage = 'Thanks for subscribing!';
	//             newsletterEmail = '';
	//         } else {
	//             newsletterState = 'error';
	//             newsletterMessage = 'Could not subscribe. Please try again.';
	//         }
	//     }, 1000);
	// }
</script>

<footer class="bg-gray-100 dark:bg-neutral-900" aria-labelledby="footer-heading">
	<h2 id="footer-heading" class="sr-only">Footer</h2>
	<div class="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
		<div class="xl:grid xl:grid-cols-3 xl:gap-8">
			<!-- Logo & Description Column -->
			<div class="space-y-8 xl:col-span-1">
				<a href="/" aria-label="Pixel UI Home">
					<PixelUiLogo class="size-10 text-orange-500" />
				</a>
				<p class="text-sm leading-6 text-gray-600 dark:text-neutral-400">
					Beautifully crafted Svelte + Tailwind components to build your next project faster.
				</p>
				<!-- Social Links -->
				<div class="flex space-x-6">
					{#each socialLinks as link (link.label)}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-gray-400 transition-colors duration-150 hover:text-gray-500 dark:text-neutral-500 dark:hover:text-neutral-400"
						>
							<span class="sr-only">{link.label}</span>
							{#if iconMap[link.icon]}
								<svelte:component this={iconMap[link.icon]} class="h-6 w-6" aria-hidden="true" />
							{:else}
								<!-- Fallback text if icon key is wrong -->
								{link.label.slice(0, 1)}
							{/if}
						</a>
					{/each}
				</div>
			</div>

			<!-- Navigation Links Columns -->
			<div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
				<div class="md:grid md:grid-cols-2 md:gap-8">
					{#each footerLinkGroups.slice(0, 2) as group (group.title)}
						<!-- First 2 groups -->
						<div>
							<h3 class="text-sm leading-6 font-semibold text-gray-900 dark:text-white">
								{group.title}
							</h3>
							<ul role="list" class="mt-4 space-y-3">
								{#each group.links as link (link.href)}
									<li>
										<a
											href={link.href}
											class="text-sm leading-6 text-gray-600 transition-colors duration-150 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-200"
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
				<div class="md:grid md:grid-cols-2 md:gap-8">
					{#each footerLinkGroups.slice(2) as group (group.title)}
						<!-- Remaining groups -->
						<div>
							<h3 class="text-sm leading-6 font-semibold text-gray-900 dark:text-white">
								{group.title}
							</h3>
							<ul role="list" class="mt-4 space-y-3">
								{#each group.links as link (link.href)}
									<li>
										<a
											href={link.href}
											class="text-sm leading-6 text-gray-600 transition-colors duration-150 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-200"
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}

					<!-- Optional Newsletter Signup (Uncomment to enable) -->
					<!--
                    <div class="mt-10 md:mt-0">
                         <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Subscribe to our newsletter</h3>
                         <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-neutral-400">The latest news, articles, and resources, sent to your inbox weekly.</p>
                         <form class="mt-4 sm:flex sm:max-w-md" on:submit|preventDefault={handleNewsletterSubmit}>
                            <label for="email-address" class="sr-only">Email address</label>
                            <input type="email" name="email-address" id="email-address" autocomplete="email" required bind:value={newsletterEmail} placeholder="Enter your email" class="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-800 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:w-64 sm:text-sm sm:leading-6 xl:w-full" />
                            <div class="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                                <button type="submit" disabled={newsletterState === 'submitting'} class="flex w-full items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:opacity-70">Subscribe</button>
                            </div>
                         </form>
                         {#if newsletterMessage}
                             <p class="mt-2 text-xs {newsletterState === 'error' ? 'text-red-500' : 'text-green-600'}">{newsletterMessage}</p>
                         {/if}
                    </div>
                    -->
				</div>
			</div>
		</div>

		<!-- Bottom Copyright -->
		<div class="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-white/10">
			<p class="text-center text-xs leading-5 text-gray-500 dark:text-neutral-500">
				© {currentYear} Pixel UI. All rights reserved.
			</p>
		</div>
	</div>
</footer>
