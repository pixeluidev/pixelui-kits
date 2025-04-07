<script lang="ts">
	// REMOVED: import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { FaqItemData } from './data';
	import Plus from 'lucide-svelte/icons/plus';
	import Minus from 'lucide-svelte/icons/minus';

	export let faqItem: FaqItemData;
	export let isOpen: boolean = false;

	// Define the expected signature for the callback function prop
	export let onToggle: (id: number | string) => void;
</script>

<div
	class="rounded-lg border-2 transition-colors duration-300 ease-in-out"
	class:bg-orange-50={isOpen}
	class:border-gray-100={!isOpen}
	class:border-orange-500={isOpen}
	class:dark:bg-orange-900={isOpen}
	class:dark:border-gray-700={!isOpen}
	class:dark:border-orange-600={isOpen}
>
	<button
		aria-controls={`faq-answer-${faqItem.id}`}
		aria-expanded={isOpen}
		class="flex w-full items-center justify-between rounded-lg p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:p-8 dark:focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-900"
		onclick={() => onToggle(faqItem.id)}
		type="button"
	>
		<h2 class="text-lg font-semibold text-gray-800 dark:text-white">{faqItem.question}</h2>

		<span
			class="flex-shrink-0 transform rounded-full p-1.5 transition-transform duration-300 ease-in-out"
			class:bg-blue-500={isOpen}
			class:bg-gray-100={!isOpen}
			class:dark:bg-gray-700={!isOpen}
			class:dark:text-gray-400={!isOpen}
			class:rotate-180={!isOpen}
			class:text-gray-500={!isOpen}
			class:text-white={isOpen}
		>
			{#if isOpen}
				<Minus class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
			{:else}
				<Plus class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
			{/if}
		</span>
	</button>

	{#if isOpen}
		<div
			transition:slide={{ duration: 250, easing: (t) => t * t }}
			id={`faq-answer-${faqItem.id}`}
			role="region"
			aria-labelledby={`faq-question-${faqItem.id}`}
		>
			<hr class="mx-6 border-gray-200 md:mx-8 dark:border-gray-600" />
			<p
				class="p-6 pt-4 text-sm leading-relaxed text-gray-600 md:p-8 md:pt-6 md:text-base dark:text-gray-300"
			>
				{faqItem.answer}
			</p>
		</div>
	{/if}
</div>
