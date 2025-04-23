<script lang="ts">
	import { titledFeaturesData, type TitledFeatureData } from './data'; // Adjust path
	import TitledFeatureItem from './TitledFeatureItem.svelte';
	import { fade, fly } from 'svelte/transition';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
</script>

<section class="bg-white py-16 md:py-24 dark:bg-neutral-900">
	<div class="container mx-auto px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
			<!-- Left Column: Title, Description, CTA -->
			<div class="text-center md:col-span-5 md:text-left">
				<h2
					class="mb-5 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-[2.75rem] dark:text-white"
				>
					A Fully Featured Svelte Component Library
				</h2>
				<p class="mb-8 text-lg text-gray-600 dark:text-neutral-400">
					Build functional and accessible web applications faster than ever. Includes customizable
					components and utilities for any situation.
				</p>

				<a
					class="from-primary hover:from-primary inline-flex transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r to-red-500 px-7 py-3.5 text-base font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:to-red-600 focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-red-800"
					href="#get-started"
				>
					Get Started
					<ArrowRight class="h-5 w-5" />
				</a>
			</div>

			<!-- Right Column: Features Grid -->
			<div class="md:col-span-7">
				<div class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
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
