<script lang="ts">
	import type { FeatureCardData } from '$lib/data'; // Adjust path if needed

	export let feature: FeatureCardData;
</script>

<div
	class="group flex h-full flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl md:p-8 dark:border-neutral-700/50 dark:bg-neutral-800"
>
	<!-- Icon -->
	<div class="mb-5 text-orange-500 dark:text-orange-400">
		<svelte:component class="h-10 w-10" strokeWidth={1.5} this={feature.icon} />
	</div>

	<!-- Title -->
	<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>

	<!-- Description -->
	<p class="flex-grow text-sm leading-relaxed text-gray-600 dark:text-neutral-300">
		{feature.description}
	</p>

	<!-- Optional: Add a subtle underline effect on hover -->
	<!-- <div class="mt-auto pt-4">
		 <span class="inline-block h-0.5 w-10 bg-orange-300 dark:bg-orange-700 group-hover:w-16 transition-all duration-300 ease-in-out"></span>
 </div> -->
</div>
