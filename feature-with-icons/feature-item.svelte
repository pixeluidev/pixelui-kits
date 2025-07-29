<script lang="ts">
	import type { FeatureItemData } from './data'; // Adjust path if needed

	export let feature: FeatureItemData;
</script>

<div
	class="relative flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
>
	<!-- Optional: Subtle decorative overlay/gradient -->
	<!-- <div class="absolute inset-0 opacity-5 dark:opacity-10 bg-gradient-to-br from-orange-100 via-transparent to-transparent rounded-xl"></div> -->

	<!-- Icon -->
	<div
		class="text-primary mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50 dark:text-orange-400"
	>
		<feature.icon class="h-6 w-6" strokeWidth={2} />
	</div>

	<!-- Content -->
	<div class="relative z-10">
		<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
		<p class="text-sm leading-relaxed text-gray-600 dark:text-neutral-300">{feature.description}</p>
	</div>
</div>
