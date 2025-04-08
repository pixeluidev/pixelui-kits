<script lang="ts">
	import { pricingPlansData } from './data'; // Adjust path
	import PricingCardItem from './card-item.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="bg-gray-50 font-sans dark:bg-neutral-900">
	<!-- Moved bg to body for full page -->
	<div class="flex min-h-screen flex-col items-center justify-center px-4 py-16">
		<!-- Header Text -->
		<div class="mx-auto mb-12 max-w-2xl text-center font-semibold md:mb-16">
			<h1 class="text-4xl font-bold sm:text-5xl">
				<span class="tracking-wide text-orange-600 dark:text-orange-400">Flexible </span>
				<span class="text-gray-800 dark:text-white">Plans</span>
			</h1>
			<p class="pt-5 text-lg font-normal text-gray-500 dark:text-neutral-400">
				Choose a plan that works best for you and your team. Simple, powerful, scalable.
			</p>
		</div>

		<!-- Pricing Cards -->
		<!--
		Using flexbox with negative margins on center item's neighbours
		for a subtle stacking effect. Adjust margins as needed.
		On smaller screens (below sm), they stack vertically.
-->
		<div class="grid grid-cols-3">
			{#each pricingPlansData as plan, i (plan.id)}
				<!-- Apply isCenter based on index (assuming 3 plans) -->
				<div
					class="col-span-1 transition-transform duration-300 ease-in-out hover:z-20 hover:scale-105 sm:hover:scale-110"
				>
					{#key plan.id}
						<div transition:fade={{ delay: i * 100, duration: 300 }}>
							<PricingCardItem {plan} isCenter={i === 1} />
						</div>
					{/key}
				</div>
			{/each}
		</div>
	</div>
</div>
