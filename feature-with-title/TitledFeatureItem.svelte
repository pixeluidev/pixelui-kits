<script lang="ts">
	import type { TitledFeatureData } from './data'; // Adjust path

	export let feature: TitledFeatureData;
</script>

<div class="flex items-start gap-4 p-1 group">
	<!-- Icon -->
	<div
		class="mt-1 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 transition-colors duration-200">
		<svelte:component class="w-6 h-6" strokeWidth={1.75} this={feature.icon} />
	</div>
	<!-- Content -->
	<div class="flex-1">
		<h3
			class="text-base font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-200">{feature.title}</h3>
		<p class="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{feature.description}</p>
	</div>
</div>