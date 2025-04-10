<script lang="ts">
	import type { TitledFeatureData } from './data'; // Adjust path

	export let feature: TitledFeatureData;
</script>

<div class="group flex items-start gap-4 p-1">
	<!-- Icon -->
	<div
		class="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-colors duration-200 dark:bg-orange-900/30 dark:text-orange-400"
	>
		<svelte:component class="h-6 w-6" strokeWidth={1.75} this={feature.icon} />
	</div>
	<!-- Content -->
	<div class="flex-1">
		<h3
			class="mb-1 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-orange-700 dark:text-white dark:group-hover:text-orange-300"
		>
			{feature.title}
		</h3>
		<p class="text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{feature.description}</p>
	</div>
</div>
