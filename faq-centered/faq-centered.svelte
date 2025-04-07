<script lang="ts">
	import { FaqListData } from './data'; // Adjust path if needed
	import FaqCenteredItem from './faq-centered-item.svelte';

	// State variable to hold the ID of the currently active/open FAQ item
	let activeItemId: number | string | null = null;

	// This function now directly receives the ID from the child's callback
	function handleToggle(itemId: number | string) {
		// If the clicked item is already open, close it (set active to null)
		// Otherwise, set the clicked item's ID as the active one
		activeItemId = activeItemId === itemId ? null : itemId;
	}
</script>

<div class="bg-background">
	<div class="mx-auto max-w-4xl py-10">
		<h1
			class="mb-10 text-center text-2xl font-semibold text-gray-800 md:mb-12 lg:text-3xl dark:text-white"
		>
			Frequently Asked Questions
		</h1>

		<div class="space-y-4 md:space-y-6">
			{#each FaqListData as faq (faq.id)}
				<FaqCenteredItem faqItem={faq} isOpen={activeItemId === faq.id} onToggle={handleToggle} />
			{/each}
		</div>
	</div>
</div>
