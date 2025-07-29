<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { SvelteComponent } from 'svelte';
	import type { MegaMenuTab } from './data';
	import type { Icon } from '@lucide/svelte';

	export let menuData: MegaMenuTab[];
	export let onClose: () => void = () => {};

	// State to track the active tab ID
	let activeTabId: string | number | null = menuData[0]?.id ?? null;

	function setActiveTab(id: string | number) {
		activeTabId = id;
	}

	// Reactive statement to get the data for the currently active tab
	$: activeTabData = menuData.find((tab) => tab.id === activeTabId);

	// Function to handle clicks on links within the menu
	function handleContentClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		if ((event.target as HTMLElement)?.closest('a[href]')) {
			onClose(); // Close the menu when a link is clicked
		}
		// Clicking non-link content doesn't close
	}
</script>

<!-- Main Wrapper for positioning and styling -->
<div
	aria-labelledby="hs-mega-menu"
	aria-orientation="vertical"
	class="absolute top-full right-0 z-20 w-full max-w-[85rem] min-w-[600px] py-2 sm:py-3"
	onclick={handleContentClick}
	role="menu"
>
	<div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
		<div
			class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
		>
			<div class="flex min-h-[15rem] flex-col sm:flex-row">
				<!-- Vertical Tab Navigation -->
				<nav
					aria-label="Tabs"
					aria-orientation="vertical"
					class="flex flex-col space-y-1 border-b border-gray-200 p-3 sm:w-48 sm:border-e sm:border-b-0 sm:p-4 md:w-56 dark:border-neutral-700"
					role="tablist"
				>
					{#each menuData as tab (tab.id)}
						<button
							type="button"
							role="tab"
							id={`mega-menu-tab-item-${tab.id}`}
							aria-controls={`mega-menu-tab-panel-${tab.id}`}
							aria-selected={activeTabId === tab.id}
							class="flex w-full items-center gap-x-3.5 rounded-md px-3.5 py-2.5 text-left text-sm transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-neutral-800"
							class:bg-orange-50={activeTabId === tab.id}
							class:dark:bg-orange-300={activeTabId === tab.id}
							class:text-orange-700={activeTabId === tab.id}
							class:dark:text-orange-400={activeTabId === tab.id}
							class:font-semibold={activeTabId === tab.id}
							class:text-gray-600={activeTabId !== tab.id}
							class:dark:text-neutral-400={activeTabId !== tab.id}
							class:hover:bg-gray-100={activeTabId !== tab.id}
							class:dark:hover:bg-neutral-700={activeTabId !== tab.id}
							class:hover:text-gray-800={activeTabId !== tab.id}
							class:dark:hover:text-neutral-200={activeTabId !== tab.id}
							onclick={() => setActiveTab(tab.id)}
							onmouseenter={() => setActiveTab(tab.id)}
						>
							{#if tab.icon}
								<svelte:component this={tab.icon} class="h-4 w-4 shrink-0" strokeWidth={2.5} />
							{/if}
							<span class="flex-1">{tab.label}</span>
						</button>
					{/each}
				</nav>

				<!-- Tab Content Panels -->
				<div class="flex-1 p-4 sm:p-6 md:p-8">
					{#key activeTabId}
						{#if activeTabData}
							<div
								id={`mega-menu-tab-panel-${activeTabData.id}`}
								role="tabpanel"
								aria-labelledby={`mega-menu-tab-item-${activeTabData.id}`}
								transition:fade={{ duration: 200 }}
								class="space-y-6"
								tabindex={0}
							>
								<!-- Gunakan index sebagai fallback key jika title tidak unik -->
								{#each activeTabData.content as contentBlock, i (contentBlock.title ?? i)}
									{#if contentBlock.type === 'text'}
										<p class="text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
											<!-- TS tahu value adalah string di sini -->
											{contentBlock.value}
										</p>
									{:else if contentBlock.type === 'links' && Array.isArray(contentBlock.value)}
										<div class="mt-4">
											{#if contentBlock.title}
												<h5
													class="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-neutral-200"
												>
													{#if contentBlock.icon}
														<svelte:component
															this={contentBlock.icon as typeof SvelteComponent<Icon>}
															class="text-primary h-4 w-4"
															strokeWidth={2}
														/>
													{/if}
													{contentBlock.title}
												</h5>
											{/if}
											<ul class="space-y-2">
												{#each contentBlock.value as link (link.label)}
													<li>
														<a
															class="group hover:text-primary focus:text-primary flex flex-col text-sm text-gray-600 focus:outline-none dark:text-neutral-400 dark:hover:text-orange-400"
															href={link.href}
														>
															<span class="font-medium underline-offset-2 group-hover:underline"
																>{link.label}</span
															>
															{#if link.description}
																<span class="text-xs text-gray-500 dark:text-neutral-500"
																	>{link.description}</span
																>
															{/if}
														</a>
													</li>
												{/each}
											</ul>
										</div>
									{:else if contentBlock.type === 'component'}
										<!-- *** FIX: Gunakan Type Assertion di sini *** -->
										<svelte:component this={contentBlock.value as typeof SvelteComponent} />
									{/if}
								{/each}
							</div>
						{/if}
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>
