<script lang="ts">
	import type { FeatureImageData, ImageSourceMap } from './data'; // Adjust path

	export let feature: FeatureImageData;
	export let images: ImageSourceMap; // Pass the image map as a prop

	// Get the correct image source, provide a fallback if key not found
	$: imageSrc = images[feature.imageKey] || '/icons/icons/default-icon.svg'; // Fallback image path

</script>

<div
	class="flex items-start gap-4 p-4 transition-colors duration-200 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800/50 group">
	<!-- Image Icon Container -->
	<div
		class="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-orange-50/50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800/50 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-200 ease-in-out">
		<img
			alt={`Icon for ${feature.title}`}
			class="w-8 h-8 object-contain"
			loading="lazy"
			src={imageSrc}
		/>
	</div>

	<!-- Text Content -->
	<div class="flex-1">
		<h3 class="text-base font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h3>
		<p class="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{feature.description}</p>
	</div>
</div>