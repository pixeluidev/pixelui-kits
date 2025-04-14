<script lang="ts">
	import { faqCategoriesData, contactIconsData } from './data';
	import FaqCategoryCard from './faq-category-card.svelte';
	import ContactIconItem from './contact-icon-item.svelte';

	// Optional handler if you implement card clicks
	function handleCategoryClick(label: string) {
		console.log('Category clicked:', label);
		// Add navigation or filtering logic here
	}
</script>

<section class="bg-white dark:bg-gray-900">
	<div class="container mx-auto max-w-6xl px-6 py-12 md:py-16 lg:py-20">
		<!-- Header Section -->
		<div
			class="relative mb-10 flex flex-col items-center justify-between gap-8 rounded-lg bg-primary px-10 py-12 md:mb-16 md:flex-row md:gap-12"
		>
			<!-- Title Area -->
			<div class="relative flex-shrink-0">
				<h1
					class="relative z-10 text-3xl leading-tight font-bold text-orange-50 md:text-4xl lg:text-5xl dark:text-white"
				>
					Frequently Asked Questions
				</h1>
				<!-- Decorative Background Title -->
			</div>
			<span
				class="pointer-events-none absolute top-1/2 -z-0 -translate-y-1/2 text-6xl font-extrabold text-gray-100 opacity-20 select-none md:text-7xl lg:text-[16rem] dark:text-gray-800"
				role="presentation"
			>
				FAQ
			</span>
			<!-- Contact Area -->
			<div class="flex-shrink-0 rounded-lg bg-white p-10 md:mt-2">
				<h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Contact Us</h2>
				<div class="flex flex-col gap-4">
					{#each contactIconsData as contact (contact.id)}
						<ContactIconItem {contact} />
					{/each}
				</div>
			</div>
		</div>

		<!-- Categories Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
			{#each faqCategoriesData as category (category.label)}
				<FaqCategoryCard {category} onClick={handleCategoryClick} />
			{/each}
		</div>
	</div>
</section>
