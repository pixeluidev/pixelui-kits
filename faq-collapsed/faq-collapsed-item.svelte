<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { FaqItemData } from './data';
	import Plus from 'lucide-svelte/icons/plus';
	import Minus from 'lucide-svelte/icons/minus';

	export let item: FaqItemData;
	export let isOpen: boolean = false;
	export let onToggle: (id: number | string) => void;
</script>

<div class="transition-colors duration-200 ease-in-out">
	{#if !isOpen}
		<hr class="my-6 border-gray-200 dark:border-gray-700" />
	{/if}
	<button
		aria-controls={`faq-answer-${item.id}`}
		aria-expanded={isOpen}
		class="flex w-full items-center rounded-md py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-primary dark:focus-visible:ring-offset-gray-900"
		onclick={() => onToggle(item.id)}
		type="button"
	>
		<!-- Icon changes based on state -->
		{#if isOpen}
			<Minus class="h-6 w-6 flex-shrink-0 text-primary" strokeWidth={2.5} />
		{:else}
			<Plus class="h-6 w-6 flex-shrink-0 text-primary" strokeWidth={2.5} />
		{/if}

		<h2 class="mx-4 text-lg font-medium text-gray-800 md:text-xl dark:text-white">
			{item.question}
		</h2>
	</button>

	{#if isOpen}
		<div
			class="mt-4 flex md:mt-6 md:ml-10"
			transition:slide={{ duration: 250, easing: (t) => t * t }}
			id={`faq-answer-${item.id}`}
			role="region"
			aria-labelledby={`faq-question-${item.id}`}
		>
			<!-- Cleaner vertical line using border -->
			<div class="border-l-2 border-orange-400 pl-4 dark:border-primary">
				<p class="max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
					{item.answer}
				</p>
			</div>
		</div>
		{#if isOpen}
			<hr class="my-6 border-gray-200 dark:border-gray-700" />
		{/if}
	{/if}
</div>
