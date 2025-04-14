<script lang="ts">
	import { featuresImageData, FEATURE_IMAGES } from './data'; // Adjust path
	import FeatureImageItem from './feature-image-item.svelte';
	import { fade } from 'svelte/transition';
</script>

<section class="bg-white py-16 md:py-24 dark:bg-neutral-900">
	<div class="container mx-auto max-w-4xl px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mb-12 text-center md:mb-16">
			<!-- Sup Title/Badge -->
			<span
				class="mb-2 inline-block text-sm font-semibold tracking-wider text-primary uppercase dark:text-orange-400"
			>
				Use Cases
			</span>

			<!-- Main Title -->
			<h2 class="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl dark:text-white">
				Our Platform is <span class="text-primary italic dark:text-orange-400">not</span> just for
				one industry
			</h2>

			<!-- Description -->
			<p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-neutral-400">
				Designed with flexibility at its core, our solution adapts seamlessly to diverse
				professional needs, ensuring efficiency and security across the board.
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-x-12 md:gap-y-12">
			{#each featuresImageData as feature, i (feature.id)}
				<!-- Apply fade-in transition with delay -->
				<div transition:fade={{ delay: i * 150, duration: 400 }}>
					<FeatureImageItem {feature} images={FEATURE_IMAGES} />
				</div>
			{/each}
		</div>
	</div>
</section>
