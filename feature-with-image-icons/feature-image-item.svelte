<script lang="ts">
	import type { FeatureImageData, ImageSourceMap } from './data'; // Adjust path

	export let feature: FeatureImageData;
	export let images: ImageSourceMap; // Pass the image map as a prop

	// Get the correct image source, provide a fallback if key not found
	$: imageSrc = images[feature.imageKey] || '/icons/icons/default-icon.svg'; // Fallback image path
</script>

<div
	class="group flex items-start gap-4 rounded-lg p-4 transition-colors duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-neutral-800/50"
>
	<!-- Image Icon Container -->
	<div
		class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-orange-200 bg-orange-50/50 shadow-sm transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md dark:border-orange-800/50 dark:bg-orange-900/30"
	>
		<img
			alt={`Icon for ${feature.title}`}
			class="h-8 w-8 object-contain"
			loading="lazy"
			src={imageSrc}
		/>
	</div>

	<!-- Text Content -->
	<div class="flex-1">
		<h3 class="mb-1 text-base font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
		<p class="text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{feature.description}</p>
	</div>
</div>
