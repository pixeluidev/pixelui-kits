<script lang="ts">
	import { faqGridListData } from './data'; // Adjust path if needed
	import FaqGridItem from './faq-grid-item.svelte';
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="container mx-auto px-6 py-12">
		<h1 class="text-center text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
			Frequently Asked Questions
		</h1>

		<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
			{#each faqGridListData as faqItem (faqItem.id)}
				<!-- Each FaqGridItem represents one cell in the grid -->
				<div
					class="rounded-lg border border-gray-100 p-4 transition-shadow duration-200 hover:shadow-md dark:border-gray-800"
				>
					<FaqGridItem item={faqItem} />
				</div>
			{/each}
		</div>
	</div>
</section>
