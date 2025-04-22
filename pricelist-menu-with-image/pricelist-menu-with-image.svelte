<!-- src/lib/components/price-list/price-list-section.svelte -->
<script lang="ts">
	import PriceListItem from './price-list-item.svelte';
	import { samplePriceListItems, type PriceListItemData } from './data'; // Gunakan data contoh

	// Prop untuk data, memungkinkan penggunaan data dari luar
	const items: PriceListItemData[] = samplePriceListItems;
	// Props opsional untuk judul section
	const sectionTitle: string | undefined = undefined; // Contoh: "Our Menu"
	const sectionDescription: string | undefined = undefined;

</script>

<section class="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	{#if sectionTitle}
		<div class="mb-8 text-center">
			<h2 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{sectionTitle}</h2>
			{#if sectionDescription}
				<p class="mt-3 text-base text-gray-600 dark:text-neutral-400 sm:mt-4">{sectionDescription}</p>
			{/if}
		</div>
	{/if}

	{#if items.length > 0}
		<div class="divide-y divide-gray-100 dark:divide-neutral-700/50">
			{#each items as item (item.id)}
				<PriceListItem {item} />
			{/each}
		</div>
	{:else}
		<p class="text-center text-gray-500 dark:text-neutral-400">No items available.</p>
	{/if}
</section>