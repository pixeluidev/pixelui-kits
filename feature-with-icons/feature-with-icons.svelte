<script lang="ts">
	import { featuresData } from './data'; // Adjust path
	import FeatureItem from './feature-item.svelte';
	import { fade } from 'svelte/transition';
</script>

<section class="bg-gray-50 py-16 md:py-24 dark:bg-neutral-900">
	<div class="container mx-auto px-6 lg:px-8">
		<!-- Optional Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16">
			<h2 class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
				Why Choose Us?
			</h2>
			<p class="text-lg text-gray-600 dark:text-neutral-400">
				We provide reliable solutions built on quality, affordability, and exceptional service.
			</p>
		</div>

		<!-- Features Grid -->
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each featuresData as feature, i (feature.id)}
				<!-- Apply fade-in transition with delay -->
				<div transition:fade={{ delay: i * 150, duration: 400 }}>
					<FeatureItem {feature} />
				</div>
			{/each}
		</div>
	</div>
</section>
