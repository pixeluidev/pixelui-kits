<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { testimonialListData, type TestimonialListItemData } from './data'; // Adjust path
	import TestimonialCardItem from './testimonial-card-item.svelte'; // Adjust path
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	// --- Props ---
	export let testimonials: TestimonialListItemData[] = testimonialListData;
	export let autoPlayInterval: number | null = 2000; // Interval autoplay (ms)
	export let visibleCards: number = 5; // Number of cards to influence (center + neighbors)

	// --- State ---
	let currentCenterIndex: number = 0; // Index of the card currently in the center
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let carouselElement: HTMLDivElement | null = null; // For hover detection

	// --- Reactive Computations ---
	$: totalSlides = testimonials.length;
	$: halfVisible = Math.floor(visibleCards / 2); // Cards on each side of center

	// --- Navigation ---
	function nextSlide() {
		currentCenterIndex = (currentCenterIndex + 1) % totalSlides;
		resetInterval();
	}

	function prevSlide() {
		currentCenterIndex = (currentCenterIndex - 1 + totalSlides) % totalSlides;
		resetInterval();
	}

	function goToSlide(index: number) {
		currentCenterIndex = index;
		resetInterval();
	}

	// --- Autoplay ---
	function startInterval() {
		if (autoPlayInterval && totalSlides > 1 && typeof window !== 'undefined') {
			stopInterval(); // Clear existing
			intervalId = setInterval(nextSlide, autoPlayInterval);
		}
	}

	function stopInterval() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	function resetInterval() {
		stopInterval();
		startInterval();
	}

	onMount(() => {
		startInterval();
		if (carouselElement) {
			carouselElement.addEventListener('mouseenter', stopInterval);
			carouselElement.addEventListener('mouseleave', startInterval);
		}
	});
	onDestroy(() => {
		stopInterval();
		if (carouselElement) {
			carouselElement.removeEventListener('mouseenter', stopInterval);
			carouselElement.removeEventListener('mouseleave', startInterval);
		}
	});

	// --- Dynamic Styling Function ---
	function getSlideStyle(index: number): string {
		const offset = index - currentCenterIndex;
		const total = totalSlides;

		// Calculate the effective offset considering wrapping around
		let effectiveOffset = offset;
		if (Math.abs(offset) > total / 2) {
			effectiveOffset = offset < 0 ? offset + total : offset - total;
		}

		let translateX = 0;
		let scale = 0.8;
		let rotate = 0;
		let zIndex = 0;
		let opacity = 0.4;
		let blur = 'blur(4px)';
		let pointerEvents: 'auto' | 'none' = 'none'; // Prevent interaction with background cards

		// Define styles for center and adjacent cards
		switch (effectiveOffset) {
			case 0: // Center
				scale = 1;
				zIndex = 10;
				opacity = 1;
				blur = 'blur(0px)';
				pointerEvents = 'auto';
				break;
			case 1: // Right neighbor
				translateX = 50; // Adjust percentage for overlap
				scale = 0.9;
				rotate = 5;
				zIndex = 9;
				opacity = 0.7;
				blur = 'blur(2px)';
				pointerEvents = 'auto'; // Allow clicking next? Maybe not.
				break;
			case -1: // Left neighbor
				translateX = -50;
				scale = 0.9;
				rotate = -5;
				zIndex = 9;
				opacity = 0.7;
				blur = 'blur(2px)';
				pointerEvents = 'auto'; // Allow clicking prev? Maybe not.
				break;
			case 2: // Far right neighbor
				translateX = 90;
				scale = 0.8;
				rotate = 10;
				zIndex = 8;
				opacity = 0.4;
				blur = 'blur(4px)';
				break;
			case -2: // Far left neighbor
				translateX = -90;
				scale = 0.8;
				rotate = -10;
				zIndex = 8;
				opacity = 0.4;
				blur = 'blur(4px)';
				break;
			default: // Hidden cards far away
				// Position them further out based on direction for smoother transition
				translateX = effectiveOffset > 0 ? 150 : -150;
				opacity = 0;
				scale = 0.7;
				blur = 'blur(8px)';
				zIndex = 1; // Ensure they are behind everything
				break;
		}

		// Hide cards beyond the visible range completely
		if (Math.abs(effectiveOffset) > halfVisible) {
			opacity = 0;
			pointerEvents = 'none';
			// Keep translate slightly further out based on sign
			translateX = effectiveOffset > 0 ? 150 : -150;
			scale = 0.7;
		}

		return `
            transform: translateX(${translateX}%) scale(${scale}) rotate(${rotate}deg);
            opacity: ${opacity};
            z-index: ${zIndex};
            filter: ${blur};
            pointer-events: ${pointerEvents};
        `;
	}
</script>

<section
	class="overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white py-16 md:py-24 lg:py-28 dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-16 max-w-3xl text-center md:mb-20">
			<p
				class="mb-2 text-base leading-relaxed font-semibold tracking-wider text-primary uppercase dark:text-orange-400"
			>
				Testimonials
			</p>
			<h2
				class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem] dark:text-white"
			>
				Trusted by Innovators
			</h2>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-neutral-400">
				See how leading professionals leverage our platform to achieve their goals.
			</p>
		</div>

		<!-- Carousel Container -->
		<div
			aria-label="Testimonials"
			aria-roledescription="carousel"
			bind:this={carouselElement}
			class="perspective relative flex h-[28rem] items-center justify-center sm:h-[30rem] md:h-[32rem]"
		>
			<!-- Slides Wrapper - Positions slides absolutely -->
			<div class="preserve-3d relative h-full w-full">
				{#each testimonials as testimonial, i (testimonial.id)}
					<!-- Individual Slide Wrapper for Positioning & Transition -->
					<div
						class="absolute inset-0 flex items-center justify-center px-8 transition-all duration-700 ease-in-out sm:px-4 md:px-0"
						style={getSlideStyle(i)}
					>
						<!-- Max width for the card itself -->
						<div class="w-full max-w-md">
							<TestimonialCardItem {testimonial} />
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation Buttons (Positioned relative to the main wrapper) -->
			{#if totalSlides > 1}
				<button
					onclick={prevSlide}
					class="absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-white/60 p-2 text-gray-700 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 md:-left-4 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-orange-400 dark:focus:ring-offset-neutral-900"
					aria-label="Previous testimonial"
					disabled={totalSlides <= 1}
				>
					<ChevronLeft class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
				</button>
				<button
					onclick={nextSlide}
					class="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-white/60 p-2 text-gray-700 shadow-lg backdrop-blur-sm transition hover:bg-white hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 md:-right-4 dark:bg-neutral-800/60 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-orange-400 dark:focus:ring-offset-neutral-900"
					aria-label="Next testimonial"
					disabled={totalSlides <= 1}
				>
					<ChevronRight class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
				</button>
			{/if}
		</div>

		<!-- Dot Indicators -->
		{#if totalSlides > 1}
			<div
				class="mt-10 flex items-center justify-center space-x-2.5 md:mt-12"
				role="tablist"
				aria-label="Testimonials Navigation"
			>
				{#each testimonials as a, i (i)}
					<button
						onclick={() => goToSlide(i)}
						class="block h-2 rounded-full transition-all duration-300 ease-in-out focus:ring-1 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none dark:focus:ring-offset-neutral-900"
						class:w-6={currentCenterIndex === i}
						class:bg-primary={currentCenterIndex === i}
						class:w-2={currentCenterIndex !== i}
						class:bg-gray-300={currentCenterIndex !== i}
						class:dark:bg-neutral-600={currentCenterIndex !== i}
						class:hover:bg-gray-400={currentCenterIndex !== i}
						class:dark:hover:bg-neutral-500={currentCenterIndex !== i}
						aria-label={`Go to testimonial ${i + 1}`}
						aria-selected={currentCenterIndex === i}
						role="tab"
					>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
    /* Add perspective and preserve-3d for the 3D effect */
    .perspective {
        perspective: 1500px;
    }

    .preserve-3d {
        transform-style: preserve-3d;
    }
</style>
