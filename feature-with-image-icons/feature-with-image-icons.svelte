<script lang="ts">
	import { featuresImageData, FEATURE_IMAGES } from './data'; // Adjust path
	import FeatureImageItem from './feature-image-item.svelte';
	import { fade } from 'svelte/transition';

</script>

<section class="bg-white dark:bg-neutral-900 py-16 md:py-24">
	<div class="container mx-auto px-6 lg:px-8 max-w-4xl">

		<!-- Section Header -->
		<div class="text-center mb-12 md:mb-16">
			<!-- Sup Title/Badge -->
			<span
				class="inline-block text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
                Use Cases
            </span>

			<!-- Main Title -->
			<h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
				Our Platform is <span class="text-orange-500 dark:text-orange-400 italic">not</span> just for one industry
			</h2>

			<!-- Description -->
			<p class="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
				Designed with flexibility at its core, our solution adapts seamlessly to diverse professional needs, ensuring
				efficiency and security across the board.
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 md:gap-x-12 md:gap-y-12">
			{#each featuresImageData as feature, i (feature.id)}
				<!-- Apply fade-in transition with delay -->
				<div transition:fade={{ delay: i * 150, duration: 400 }}>
					<FeatureImageItem {feature} images={FEATURE_IMAGES} />
				</div>
			{/each}
		</div>

	</div>
</section>