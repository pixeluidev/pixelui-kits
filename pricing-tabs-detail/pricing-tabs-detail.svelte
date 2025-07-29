<script>
	import { CheckCircle2, XCircle } from '@lucide/svelte';
	import { plans } from './plans.js';

	// --- 1. Data Plans ---

	// --- 2. Svelte State ---
	let selectedPlanId = 'standard'; // Default ke plan yang direkomendasikan

	// Reactive variable untuk mendapatkan data plan yang dipilih
	$: selectedPlan = plans.find((p) => p.id === selectedPlanId);
</script>

<section class="bg-gray-50 py-12 antialiased md:py-20 dark:bg-gray-950">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="mx-auto mb-10 max-w-2xl text-center md:mb-16">
			<h1 class="text-3xl font-bold text-gray-900 capitalize lg:text-4xl dark:text-white">
				Simple, Transparent Pricing
			</h1>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				Choose the plan that scales with your needs. No hidden fees.
			</p>
			<div class="mt-6 flex justify-center">
				<span class="bg-primary inline-block h-1 w-24 rounded-full"></span>
			</div>
		</div>

		<!-- Plan Selectors (Tabs/Cards) -->
		<div class="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 xl:mt-12">
			{#each plans as plan (plan.id)}
				{@const isSelected = plan.id === selectedPlanId}
				<button
					type="button"
					onclick={() => (selectedPlanId = plan.id)}
					aria-pressed={isSelected}
					class="focus-visible:ring-primary relative flex flex-col justify-between rounded-xl border px-6 py-5 text-left transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 sm:flex-row sm:items-center dark:focus-visible:ring-offset-gray-950"
					class:border-primary={isSelected}
					class:dark:border-primary={isSelected}
					class:border-gray-200={!isSelected}
					class:dark:border-gray-700={!isSelected}
					class:bg-white={!isSelected}
					class:dark:bg-gray-800={!isSelected}
					class:bg-orange-50={isSelected}
					class:dark:bg-orange-900={isSelected}
					class:shadow-lg={isSelected}
					class:hover:border-gray-300={!isSelected}
					class:dark:hover:border-gray-600={!isSelected}
					class:hover:shadow-md={!isSelected}
					class:scale-105={isSelected && plan.isRecommended}
				>
					<!-- Badge Rekomendasi -->
					{#if plan.isRecommended}
						<div class="absolute -top-3 right-4">
							<span
								class="bg-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-md"
							>
								Recommended
							</span>
						</div>
					{/if}

					<!-- Plan Info -->
					<div class="mb-3 flex items-center gap-3 sm:mb-0">
						<svelte:component
							this={plan.icon}
							class={`h-6 w-6 flex-shrink-0 sm:h-7 sm:w-7 ${isSelected ? 'text-primary dark:text-primary' : 'text-gray-400'}`}
							strokeWidth={2}
							aria-hidden="true"
						/>
						<h2 class="text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-100">
							{plan.name}
						</h2>
					</div>

					<!-- Price Info -->
					<div class="flex flex-col items-start space-y-1 sm:items-end">
						{#if plan.discountBadge}
							<div
								class="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
							>
								{plan.discountBadge}
							</div>
						{/if}
						<h2 class="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-100">
							{plan.price}
							{#if plan.priceSuffix}
								<span class="text-base font-medium text-gray-500 dark:text-gray-400"
									>/{plan.priceSuffix}</span
								>
							{/if}
						</h2>
					</div>
				</button>
			{/each}
		</div>

		<!-- Feature List (Updates based on selection) -->
		{#if selectedPlan}
			<div
				class="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 lg:mt-12 dark:border-gray-700 dark:bg-gray-800/50"
			>
				<h3 class="mb-6 text-xl font-semibold text-gray-800 dark:text-white">
					Features included in <span class="text-primary dark:text-orange-400"
						>{selectedPlan.name}</span
					>:
				</h3>
				<ul class="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each selectedPlan.features as feature (feature.text)}
						<li
							class="flex items-center gap-3 text-base"
							class:text-gray-700={feature.included}
							class:dark:text-gray-300={feature.included}
							class:text-gray-400={!feature.included}
							class:dark:text-gray-500={!feature.included}
							class:line-through={!feature.included}
						>
							{#if feature.included}
								<CheckCircle2
									class="text-primary h-5 w-5 flex-shrink-0"
									strokeWidth={2.5}
									aria-hidden="true"
								/>
							{:else}
								<XCircle
									class="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
									strokeWidth={2}
									aria-hidden="true"
								/>
							{/if}
							<span>{feature.text}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Main Call to Action Button -->
		<div class="mt-10 flex justify-center md:mt-12">
			<button
				class="bg-primary focus:ring-primary transform rounded-lg px-8 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 hover:bg-orange-700 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none dark:focus:ring-offset-gray-950"
			>
				{selectedPlan ? selectedPlan.ctaText : 'Choose a Plan'}
			</button>
		</div>
	</div>
</section>
