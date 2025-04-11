<script lang="ts">
	import type { TestimonialData } from './data'; // Adjust path
	import Quote from 'lucide-svelte/icons/quote'; // Icon for quote marks

	export let testimonial: TestimonialData;

	// Base classes + conditional classes for featured card
	const baseClasses =
		'relative flex flex-col bg-white dark:bg-neutral-800 rounded-xl shadow-md hover:shadow-lg border border-gray-100 dark:border-neutral-700/50 transition-all duration-300 ease-in-out p-6 md:p-8';
	const featuredClasses =
		'lg:col-span-2 bg-gradient-to-br from-orange-50 via-white to-white dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-700 text-center'; // Span 2 cols on large screens and different style
	const cardClasses = `${baseClasses} ${testimonial.isFeatured ? featuredClasses : ''}`;
</script>

<div class={cardClasses}>
	<!-- Decorative Quote Icon -->
	<Quote
		class="absolute top-4 left-4 -z-0 h-8 w-8 rotate-180 transform text-orange-100 opacity-70 dark:text-orange-900/30"
		strokeWidth={1.5}
	/>

	<!-- Quote Text -->
	<div class="relative z-10 mb-6 flex-grow md:mb-8">
		<p
			class={`leading-relaxed font-medium text-gray-700 antialiased dark:text-neutral-200 ${testimonial.isFeatured ? 'mx-auto max-w-3xl text-lg md:text-xl' : 'text-base'}`}
		>
			{testimonial.quote}
		</p>
	</div>

	<!-- Author Info -->
	<div
		class={`mt-auto border-t border-gray-200 pt-4 dark:border-neutral-700/50 ${testimonial.isFeatured ? 'flex flex-col items-center' : 'flex flex-wrap-reverse items-center justify-between gap-x-4 gap-y-3'}`}
	>
		<div class:text-center={testimonial.isFeatured}>
			{#if testimonial.avatarUrl && !testimonial.isFeatured}
				<!-- Show avatar only if not featured -->
				<img
					src={testimonial.avatarUrl}
					alt={testimonial.authorName}
					class="float-left mr-3 mb-2 hidden h-10 w-10 rounded-full sm:block"
					loading="lazy"
				/>
			{/if}
			{#if testimonial.avatarUrl && testimonial.isFeatured}
				<!-- Show larger avatar if featured -->
				<img
					src={testimonial.avatarUrl}
					alt={testimonial.authorName}
					class="mx-auto mb-2 h-12 w-12 rounded-full"
					loading="lazy"
				/>
			{/if}
			<h6 class="text-sm font-semibold text-gray-900 dark:text-white">
				{testimonial.authorName}
			</h6>
			<p class="text-xs text-gray-500 dark:text-neutral-400">
				{testimonial.authorTitle}
			</p>
		</div>
		{#if testimonial.companyLogoUrl}
			<div class={`${testimonial.isFeatured ? 'mt-3' : ''}`}>
				<img
					src={testimonial.companyLogoUrl}
					class={`h-6 w-auto max-w-[6rem] object-contain ${testimonial.isFeatured ? 'mx-auto opacity-70 grayscale dark:opacity-50 dark:invert-[0.8]' : 'dark:hidden'}`}
					alt={testimonial.companyName ?? `${testimonial.authorName}'s company`}
				/>
				{#if testimonial.companyLogoUrlDark}
					<img
						src={testimonial.companyLogoUrlDark}
						class={`h-6 w-auto max-w-[6rem] object-contain ${testimonial.isFeatured ? 'mx-auto opacity-70 grayscale dark:opacity-50' : 'hidden dark:block'}`}
						alt={`${testimonial.companyName ?? testimonial.authorName}'s company (Dark)`}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>
