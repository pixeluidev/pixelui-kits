<script lang="ts">
	import type { CheckoutStep } from './data'; // Adjust path if needed
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';

	export let steps: CheckoutStep[];
	export let currentStepId: string;

	// Find index for state calculation
	$: currentStepIndex = steps.findIndex((step) => step.id === currentStepId);
</script>

<ol
	class="mb-8 flex w-full flex-wrap items-center text-center text-sm font-medium text-gray-500 sm:text-base md:mb-12 dark:text-neutral-400"
>
	{#each steps as step, i}
		{@const isCompleted = i < currentStepIndex}
		{@const isCurrent = i === currentStepIndex}
		<li
			class={`flex items-center ${isCompleted || isCurrent ? 'text-orange-600 dark:text-orange-400' : ''} ${i < steps.length - 1 ? "w-full after:mx-4 after:hidden after:h-0.5 after:w-full after:border-1 after:border-b after:border-gray-200 after:content-[''] md:w-auto md:after:inline-block lg:after:mx-6 xl:after:mx-8 dark:after:border-neutral-700" : 'flex-1 md:flex-initial'}`}
		>
			<div
				class={`flex items-center whitespace-nowrap ${i > 0 ? 'ps-2 sm:ps-0' : ''} ${i < steps.length - 1 ? 'pe-2 sm:pe-0' : ''}`}
			>
				{#if isCompleted}
					<CheckCircle2 class="me-2 h-5 w-5 sm:me-2.5" />
				{:else}
					<!-- Elegant indicator: filled circle for current, outline for pending -->
					<span
						class={`me-2 flex h-5 w-5 items-center justify-center rounded-full border-2 sm:me-2.5 ${isCurrent ? 'border-orange-500 bg-orange-500 dark:border-orange-400 dark:bg-orange-400' : 'border-gray-400 dark:border-neutral-600'} shrink-0`}
					>
						{#if !isCurrent}
							<span class="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-neutral-600"></span>
						{/if}
					</span>
				{/if}
				<span class:font-semibold={isCurrent}>{step.label}</span>
			</div>
		</li>
	{/each}
</ol>
