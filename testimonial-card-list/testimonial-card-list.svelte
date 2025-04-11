<script lang="ts">
	import { testimonialListData } from './data'; // Adjust path
	import TestimonialCardItem from './testimonial-card.svelte';
	import { fade } from 'svelte/transition';
</script>

<section
	class="bg-gradient-to-b from-white via-orange-50 to-white py-16 md:py-24 lg:py-28 dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900"
>
	<div class="container mx-auto px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16">
			<p
				class="mb-2 text-base leading-relaxed font-semibold tracking-wider text-orange-600 uppercase dark:text-orange-400"
			>
				Testimonials
			</p>
			<h2
				class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem] dark:text-white"
			>
				What Our Users Say
			</h2>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-neutral-400">
				Insights and experiences shared by our valued community members worldwide.
			</p>
		</div>

		<!-- Testimonials Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonialListData as testimonial, i (testimonial.id)}
				<!-- Apply fade-in transition with delay -->
				<div transition:fade={{ delay: i * 100, duration: 400 }}>
					<TestimonialCardItem {testimonial} />
				</div>
			{/each}
		</div>
	</div>
</section>
