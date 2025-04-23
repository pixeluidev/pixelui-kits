<script lang="ts">
	import type { PromoInfo } from './data'; // Adjust path
	import ArrowRight from 'lucide-svelte/icons/arrow-right';

	export let promo: PromoInfo;
</script>

<div
	class="flex items-start gap-4 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800/50 dark:bg-orange-900/20"
>
	{#if promo.icon}
		<div class="text-primary mt-0.5 flex-shrink-0 dark:text-orange-400">
			<svelte:component this={promo.icon} class="h-5 w-5" strokeWidth={2} />
		</div>
	{/if}
	<div class="flex-1">
		<h4 class="text-sm font-semibold text-gray-800 dark:text-neutral-100">{promo.title}</h4>
		<p class="text-sm text-gray-600 dark:text-neutral-300">{promo.description}</p>
		{#if promo.linkText && promo.linkHref}
			<a
				href={promo.linkHref}
				class="text-primary mt-1 inline-flex items-center text-xs font-medium hover:underline dark:text-orange-400"
			>
				{promo.linkText}
				<ArrowRight class="ms-1 h-3 w-3" />
			</a>
		{/if}
	</div>
</div>
