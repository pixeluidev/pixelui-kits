<script lang="ts">
	import type { PricingPlan } from './data';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Zap from 'lucide-svelte/icons/zap'; // Icon for recommended badge

	export let plan: PricingPlan;
	export let isCenter: boolean = false; // To apply slight overlap/lift effect

	// Base classes
	const baseCardClasses = 'relative w-full max-w-sm bg-white dark:bg-neutral-800 rounded-2xl shadow-lg transition-all duration-300 ease-in-out p-6 md:p-8 text-center';
	const recommendedCardClasses = 'sm:scale-110 border-2 border-orange-500 dark:border-orange-400 shadow-2xl z-10'; // Scale up on larger screens
	const adjacentCardClasses = 'sm:opacity-80 sm:hover:opacity-100'; // Slightly fade adjacent cards on larger screens

	const cardClasses = `${baseCardClasses} ${plan.isRecommended ? recommendedCardClasses : ''} ${!plan.isRecommended && isCenter ? adjacentCardClasses : ''}`;

	// Button classes
	const buttonBaseClasses = 'w-full py-3.5 mt-8 rounded-xl text-white font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 flex items-center justify-center gap-2';
	const buttonNormalClasses = 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-300 dark:focus:ring-orange-800 shadow hover:shadow-md';
	const buttonRecommendedClasses = 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 focus:ring-orange-300 dark:focus:ring-red-800 shadow-lg hover:shadow-xl';
	const buttonClasses = `${buttonBaseClasses} ${plan.isRecommended ? buttonRecommendedClasses : buttonNormalClasses}`;

</script>

<div class={cardClasses} style={isCenter && !plan.isRecommended ? 'margin-left: -2rem; margin-right: -2rem;' : ''}>
	<!-- Overlap effect -->

	<!-- Recommended Badge -->
	{#if plan.isRecommended}
		<div class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
							class="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                <Zap class="w-3 h-3" strokeWidth={3} /> Popular
            </span>
		</div>
	{/if}

	<!-- Plan Name -->
	<h2 class="font-semibold text-2xl text-gray-800 dark:text-white">{plan.name}</h2>

	<!-- Price -->
	<p class="pt-2 tracking-wide">
		<span class="text-gray-400 dark:text-neutral-400 align-top text-lg">$ </span>
		<span class="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
		<span class="text-gray-500 dark:text-neutral-400 font-medium">{plan.priceSuffix}</span>
	</p>

	<!-- Divider -->
	<hr class="mt-5 mb-6 border-gray-200 dark:border-neutral-700">

	<!-- Features List -->
	<div class="space-y-4 text-left">
		{#each plan.features as feature (feature.text)}
			<p class="flex items-center text-sm text-gray-600 dark:text-neutral-300">
                <span
									class="inline-block p-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full mr-2.5">
                    <svelte:component this={feature.icon} class="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
				<span class="flex-1">
                    {feature.text}
					{#if feature.highlight}
                        <span class="font-semibold text-gray-800 dark:text-white ml-1">{feature.highlight}</span>
                    {/if}
                </span>
			</p>
		{/each}
	</div>

	<!-- CTA Button -->
	<a class="block" href="/component/pricing-cards">
		<p class={buttonClasses}>
			<span>{plan.ctaText}</span>
			<ArrowRight class="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
		</p>
	</a>
</div>