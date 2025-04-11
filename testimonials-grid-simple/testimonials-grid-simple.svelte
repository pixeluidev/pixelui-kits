<script lang="ts">
	import { testimonialsData } from './data'; // Adjust path
	import TestimonialCard from './testimonial-card.svelte';
	import { fade } from 'svelte/transition';
</script>

<section
	class="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 lg:py-28 dark:from-neutral-900 dark:to-neutral-800"
>
	<div class="container mx-auto px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16">
			<h2
				class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem] dark:text-white"
			>
				Hear From Our Community
			</h2>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-neutral-400">
				Real stories from users who've transformed their work and experiences with our platform.
			</p>
		</div>

		<!-- Testimonials Grid (2 columns + 1 featured below) -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			{#each testimonialsData as testimonial, i (testimonial.id)}
				{#if !testimonial.isFeatured}
					<!-- Apply fade-in transition -->
					<div transition:fade={{ delay: i * 100, duration: 400 }}>
						<TestimonialCard {testimonial} />
					</div>
				{/if}
			{/each}

			<!-- Render the featured testimonial separately to span columns if needed -->
			{#each testimonialsData as testimonial, i (testimonial.id)}
				{#if testimonial.isFeatured}
					<div
						class="mt-8 lg:col-span-2 lg:mt-0"
						transition:fade={{
							delay: testimonialsData.filter((t) => !t.isFeatured).length * 100,
							duration: 400
						}}
					>
						<TestimonialCard {testimonial} />
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
