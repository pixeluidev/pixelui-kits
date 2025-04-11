<script lang="ts">
	import type { TestimonialListItemData } from './data'; // Adjust path
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Verified badge

	export let testimonial: TestimonialListItemData;
</script>

<div
	class="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:border-neutral-700/50 dark:bg-neutral-800"
>
	<!-- Header with Author Info -->
	<div
		class="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 p-4 dark:border-neutral-700/50 dark:bg-neutral-700/20"
	>
		<img
			alt={testimonial.authorName}
			class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm dark:border-neutral-700"
			loading="lazy"
			src={testimonial.avatarUrl}
		/>
		<div class="flex-1">
			<div class="flex items-center gap-1.5">
				<h6 class="text-sm font-semibold text-gray-800 dark:text-white">
					{testimonial.authorName}
				</h6>
				{#if testimonial.isVerified}
					<CheckCircle2
						class="h-4 w-4 text-orange-500 dark:text-orange-400"
						title="Verified Account"
					/>
				{/if}
			</div>
			<p class="text-xs font-medium text-gray-500 dark:text-neutral-400">
				{testimonial.authorHandle}
			</p>
		</div>
	</div>

	<!-- Quote Content -->
	<div class="flex-grow p-4 md:p-5">
		<p class="text-base leading-relaxed text-gray-700 dark:text-neutral-300">
			"{testimonial.quote}"
		</p>
	</div>

	<!-- Footer with Source & Date -->
	<div
		class="flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/50 p-4 dark:border-neutral-700/50 dark:bg-neutral-700/20"
	>
		<a
			class="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors duration-150 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400"
			href={testimonial.sourceUrl ?? '#'}
			rel="noopener noreferrer"
			target="_blank"
			title={`View on ${testimonial.sourceName}`}
		>
			{#if testimonial.sourceIcon}
				<svelte:component this={testimonial.sourceIcon} class="h-4 w-4" />
			{:else if testimonial.sourceLogoUrl}
				<img src={testimonial.sourceLogoUrl} class="h-4 w-auto" alt={testimonial.sourceName} />
			{:else}
				<!-- Fallback or hide -->
			{/if}
			<span>{testimonial.sourceName}</span>
		</a>
		<p class="text-xs text-gray-400 dark:text-neutral-500">{testimonial.date}</p>
	</div>
</div>
