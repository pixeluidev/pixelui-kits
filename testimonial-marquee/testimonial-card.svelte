<!-- src/lib/components/testimonial-marquee/testimonial-card.svelte -->
<script lang="ts">
	import type { TestimonialData } from './types';
	import { MessageSquareQuote, Twitter } from 'lucide-svelte';

	export let testimonial: TestimonialData;

	function handleAvatarError(event: Event & { currentTarget: EventTarget & HTMLImageElement }) {
		event.currentTarget.src = '/images/avatar-placeholder.svg';
		event.currentTarget.classList.add('opacity-50');
	}
</script>

<div
	class="mx-4 flex h-full w-[320px] flex-shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-shadow duration-200 hover:shadow-lg sm:w-[350px] sm:p-6 dark:border-neutral-700 dark:bg-neutral-800"
>
	<div>
		<!-- Header -->
		<div class="mb-4 flex items-center gap-3">
			<img
				src={testimonial.avatarUrl}
				alt="{testimonial.authorName}'s avatar"
				class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 object-cover dark:bg-neutral-700"
				loading="lazy"
			/>
			<div class="flex-1 overflow-hidden">
				<a
					href={testimonial.tweetUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="group block truncate rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-800"
				>
					<p
						class="truncate font-semibold text-gray-800 group-hover:text-orange-600 dark:text-neutral-100 dark:group-hover:text-orange-400"
					>
						{testimonial.authorName}
					</p>
					<p
						class="truncate text-sm text-gray-500 group-hover:text-gray-600 dark:text-neutral-400 dark:group-hover:text-neutral-300"
					>
						{testimonial.authorHandle.startsWith('@') ? '' : '@'}{testimonial.authorHandle}
					</p>
				</a>
			</div>
			<a
				href={testimonial.tweetUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="ml-auto flex-shrink-0 rounded-full p-1 text-blue-500 transition-colors hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-blue-400 dark:hover:bg-blue-900/50"
				aria-label="View on Twitter"
				title="View on Twitter"
			>
				<Twitter class="h-5 w-5" />
			</a>
		</div>

		<!-- Body -->
		<p
			class="relative z-10 mb-5 text-base leading-relaxed whitespace-normal text-gray-700 dark:text-neutral-300"
		>
			<MessageSquareQuote
				class="absolute -top-2 -left-2 z-0 h-16 w-16 scale-75 text-gray-100 opacity-70 dark:text-neutral-700/60"
				aria-hidden="true"
			/>
			<span class="relative">{testimonial.tweetText}</span>
		</p>
	</div>

	<!-- Footer -->
	{#if testimonial.sourceLogoUrl && testimonial.sourceLogoUrl !== testimonial.avatarUrl}
		<div class="mt-auto flex items-center border-t border-gray-100 pt-4 dark:border-neutral-700">
			<img
				src={testimonial.sourceLogoUrl}
				alt="{testimonial.sourceName ?? testimonial.authorName} logo"
				class="max-h-8 w-auto"
				loading="lazy"
			/>
		</div>
	{:else if testimonial.sourceName && testimonial.sourceName !== testimonial.authorName}
		<div class="mt-auto border-t border-gray-100 pt-4 dark:border-neutral-700">
			<p class="text-xs text-gray-400 dark:text-neutral-500">Source: {testimonial.sourceName}</p>
		</div>
	{/if}
</div>
