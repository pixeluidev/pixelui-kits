<script lang="ts">
	import { featureCardsData } from './data'; // Adjust path
	import FeatureCardItem from './feature-card-item.svelte';
	import { fade } from 'svelte/transition';
</script>

<section
	class="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 dark:from-neutral-900 dark:to-neutral-800"
>
	<div class="container mx-auto px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16">
			<!-- Badge -->
			<div class="mb-4 flex justify-center">
				<span
					class="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-1 text-xs font-semibold text-orange-800 ring-1 ring-orange-200 ring-inset dark:from-orange-900/50 dark:to-amber-900/50 dark:text-orange-300 dark:ring-orange-800"
				>
					Simply The Best
				</span>
			</div>

			<!-- Title -->
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
				Integrate Effortlessly, Perform Exceptionally
			</h2>

			<!-- Description -->
			<p class="text-lg text-gray-600 dark:text-neutral-400">
				Built for flexibility and speed, our platform seamlessly fits into your stack while
				delivering unparalleled performance and privacy.
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each featureCardsData as feature, i (feature.id)}
				<!-- Apply fade-in transition with delay -->
				<div transition:fade={{ delay: i * 150, duration: 400 }}>
					<FeatureCardItem {feature} />
				</div>
			{/each}
		</div>
	</div>
</section>
