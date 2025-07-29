<script lang="ts">
	import type { FaqGridItemData } from './data';
	// Import the icon (using HelpCircle as it matches the original SVG intent)
	import { HelpCircle } from '@lucide/svelte';

	export let item: FaqGridItemData;

	// Optional: Callback prop if you want to add click interaction later
	// export let onClick: (id: number | string) => void = () => {};

	// function handleClick() {
	//   onClick(item.id);
	// }
</script>

<!-- Removed outer div, as the grid container is in the parent -->
<!-- Removed onClick={handleClick} for now, add back if needed -->
<div class="flex flex-col gap-3 p-1">
	<div class="bg-primary inline-block w-fit rounded-lg p-3 text-white">
		<HelpCircle class="h-6 w-6" strokeWidth={2} />
	</div>

	<div class="flex-1">
		<h3 class="text-lg font-semibold text-gray-800 dark:text-white">{item.question}</h3>
		<p class="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
			{item.answer}
		</p>
	</div>
</div>
