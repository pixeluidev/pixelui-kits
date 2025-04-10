<script lang="ts">
	import { titledFeaturesData, type TitledFeatureData } from './data'; // Adjust path
	import TitledFeatureItem from './TitledFeatureItem.svelte';
	import { fade, fly } from 'svelte/transition';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

</script>

<section class="bg-white dark:bg-neutral-900 py-16 md:py-24">
	<div class="container mx-auto px-6 lg:px-8">

		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

			<!-- Left Column: Title, Description, CTA -->
			<div class="md:col-span-5 text-center md:text-left">
				<h2 class="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 dark:text-white mb-5 leading-tight">
					A Fully Featured Svelte Component Library
				</h2>
				<p class="text-lg text-gray-600 dark:text-neutral-400 mb-8">
					Build functional and accessible web applications faster than ever. Includes customizable components and
					utilities for any situation.
				</p>

				<a class="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-red-800 transition-all duration-300 ease-in-out transform hover:scale-105"
					 href="#get-started">
					Get Started
					<ArrowRight class="w-5 h-5" />
				</a>
			</div>

			<!-- Right Column: Features Grid -->
			<div class="md:col-span-7">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
					{#each titledFeaturesData as feature, i (feature.id)}
						<div transition:fade={{ delay: i * 100, duration: 300 }}>
							<TitledFeatureItem {feature} />
						</div>
					{/each}
				</div>
			</div>

		</div>
	</div>
</section>