<script lang="ts">
	import { faqListData } from './data'; // Adjust path
	import FaqCollapsedItem from './faq-collapsed-item.svelte';

	// State: ID of the currently open item. Start with the first one open.
	let activeItemId: number | string | null = faqListData[0]?.id ?? null;

	// Function to handle toggling, passed as prop to child
	function handleToggle(itemId: number | string) {
		activeItemId = activeItemId === itemId ? null : itemId;
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="container mx-auto px-6 py-10">
		<h1 class="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
			Frequently Asked Questions
		</h1>

		{#each faqListData as faqItem (faqItem.id)}
			<FaqCollapsedItem
				item={faqItem}
				isOpen={activeItemId === faqItem.id}
				onToggle={handleToggle}
			/>
		{/each}

		{#if faqListData.length === 0}
			<p class="mt-8 text-center text-gray-500 dark:text-gray-400">
				No FAQs available at the moment.
			</p>
		{/if}
	</div>
</section>
