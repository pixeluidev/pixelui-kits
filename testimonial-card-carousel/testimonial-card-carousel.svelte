<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { testimonialListData, type TestimonialListItemData } from './data'; // Adjust path
	import TestimonialCardItem from './testimonial-card-item.svelte'; // Adjust path
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	// --- Props ---
	export let testimonials: TestimonialListItemData[] = testimonialListData;
	export let autoPlayInterval: number | null = 3000; // Default autoplay interval

	// --- State ---
	let currentSlideIndex: number = 0;
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let carouselElement: HTMLDivElement | null = null; // Reference to the main carousel element for hover detection

	// --- Reactive Computations ---
	$: totalSlides = testimonials.length;
	$: canGoPrev = totalSlides > 1;
	$: canGoNext = totalSlides > 1;

	// --- Navigation ---
	function nextSlide() {
		currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
		resetInterval();
	}

	function prevSlide() {
		currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
		resetInterval();
	}

	function goToSlide(index: number) {
		currentSlideIndex = index;
		resetInterval();
	}

	// --- Autoplay ---
	function startInterval() {
		if (autoPlayInterval && totalSlides > 1 && typeof window !== 'undefined') {
			// Check for window
			stopInterval(); // Clear existing interval first
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
		// No need to check for window here, stopInterval does
		stopInterval();
		startInterval();
	}

	onMount(() => {
		startInterval();
		// Add hover listeners if element exists
		if (carouselElement) {
			carouselElement.addEventListener('mouseenter', stopInterval);
			carouselElement.addEventListener('mouseleave', startInterval);
			// Basic Touch/Swipe (Optional - Consider a library for robustness)
			let touchStartX = 0;
			carouselElement.addEventListener(
				'touchstart',
				(e) => {
					touchStartX = e.targetTouches[0].clientX;
					stopInterval(); // Pause on touch
				},
				{ passive: true }
			);
			carouselElement.addEventListener(
				'touchend',
				(e) => {
					if (touchStartX === 0) return;
					const touchEndX = e.changedTouches[0].clientX;
					const distance = touchStartX - touchEndX;
					const minSwipeDistance = 50;
					if (Math.abs(distance) > minSwipeDistance) {
						if (distance > 0) nextSlide();
						else prevSlide();
					} else {
						startInterval(); // Resume if not a swipe
					}
					touchStartX = 0; // Reset
				},
				{ passive: true }
			);
		}
	});

	onDestroy(() => {
		stopInterval(); // Clean up on destroy
		// Remove hover listeners
		if (carouselElement) {
			carouselElement.removeEventListener('mouseenter', stopInterval);
			carouselElement.removeEventListener('mouseleave', startInterval);
			// Consider removing touch listeners if added dynamically
		}
	});
</script>

<section
	class="bg-gradient-to-b from-white via-orange-50 to-white py-16 md:py-24 lg:py-28 dark:from-neutral-900 dark:via-neutral-800/30 dark:to-neutral-900"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Section Header -->
		<div class="mx-auto mb-12 max-w-3xl text-center md:mb-16">
			<p
				class="text-primary mb-2 text-base leading-relaxed font-semibold tracking-wider uppercase dark:text-orange-400"
			>
				Testimonials
			</p>
			<h2
				class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-[2.75rem] dark:text-white"
			>
				Voices of Our Community
			</h2>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-neutral-400">
				Discover how others are succeeding with our platform through their own words.
			</p>
		</div>

		<!-- Carousel Wrapper -->
		<div
			aria-label="Testimonials"
			aria-roledescription="carousel"
			bind:this={carouselElement}
			class="relative mx-auto max-w-xl md:max-w-4xl"
		>
			<!-- Slides Viewport -->
			<div
				class="overflow-hidden rounded-xl border border-gray-100 shadow-xl dark:border-neutral-700/50"
			>
				<!-- Flex Container for Sliding -->
				<div
					class="flex transition-transform duration-500 ease-in-out"
					style={`transform: translateX(-${currentSlideIndex * 100}%)`}
				>
					{#each testimonials as testimonial (testimonial.id)}
						<div class="w-full flex-shrink-0">
							<!-- Render the card component for each slide -->
							<TestimonialCardItem {testimonial} />
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation Buttons -->
			{#if totalSlides > 1}
				<button
					onclick={prevSlide}
					class="hover:text-primary focus:ring-primary absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:-left-5 lg:-left-6 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-orange-400 dark:focus:ring-offset-neutral-900"
					aria-label="Previous testimonial"
					disabled={!canGoPrev}
				>
					<ChevronLeft class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
				</button>
				<button
					onclick={nextSlide}
					class="hover:text-primary focus:ring-primary absolute top-1/2 -right-3 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-700 shadow-md backdrop-blur-sm transition hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:-right-5 lg:-right-6 dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-orange-400 dark:focus:ring-offset-neutral-900"
					aria-label="Next testimonial"
					disabled={!canGoNext}
				>
					<ChevronRight class="h-5 w-5 md:h-6 md:w-6" strokeWidth={2.5} />
				</button>
			{/if}

			<!-- Dot Indicators -->
			{#if totalSlides > 1}
				<div
					class="mt-8 flex items-center justify-center space-x-2.5"
					role="tablist"
					aria-label="Testimonials Navigation"
				>
					{#each testimonials as _, i (i)}
						<button
							onclick={() => goToSlide(i)}
							class="block h-2 rounded-full transition-all duration-300 ease-in-out focus:ring-1 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none dark:focus:ring-offset-neutral-900"
							class:w-5={currentSlideIndex === i}
							class:bg-primary={currentSlideIndex === i}
							class:w-2={currentSlideIndex !== i}
							class:bg-gray-300={currentSlideIndex !== i}
							class:dark:bg-neutral-600={currentSlideIndex !== i}
							class:hover:bg-gray-400={currentSlideIndex !== i}
							class:dark:hover:bg-neutral-500={currentSlideIndex !== i}
							aria-label={`Go to testimonial ${i + 1}`}
							aria-selected={currentSlideIndex === i}
							role="tab"
						>
						</button>
					{/each}
				</div>
			{/if}
		</div>
		<!-- End Carousel Wrapper -->
	</div>
</section>
