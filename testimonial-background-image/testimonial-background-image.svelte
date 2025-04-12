<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { backgroundTestimonialsData, type BackgroundTestimonialData } from './data'; // Sesuaikan path
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	// --- Props ---
	export let testimonials: BackgroundTestimonialData[] = backgroundTestimonialsData;
	export let backgroundImageUrl: string =
		'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80'; // Gambar background default yang lebih gelap
	export let autoPlayInterval: number | null = 6000; // Interval autoplay (ms)

	// --- State ---
	let currentSlideIndex: number = 0;
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let direction: 'next' | 'prev' = 'next'; // Untuk arah transisi fly

	// --- Reactive Computations ---
	$: currentTestimonial = testimonials[currentSlideIndex];
	$: totalSlides = testimonials.length;

	// --- Navigation ---
	function nextSlide() {
		direction = 'next';
		currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
		resetInterval();
	}

	function prevSlide() {
		direction = 'prev';
		currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
		resetInterval();
	}

	function goToSlide(index: number) {
		direction = index > currentSlideIndex ? 'next' : 'prev';
		currentSlideIndex = index;
		resetInterval();
	}

	// --- Autoplay ---
	function startInterval() {
		if (autoPlayInterval && totalSlides > 1 && !intervalId) {
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

	onMount(startInterval);
	onDestroy(stopInterval);
</script>

<section
	aria-label="Customer Testimonials"
	aria-roledescription="carousel"
	class="relative mx-4 my-8 overflow-hidden rounded-xl border border-black/10 bg-cover bg-center bg-no-repeat py-20 text-white shadow-2xl sm:mx-6 md:py-28 lg:mx-8 lg:py-36"
	style="background-image: linear-gradient(rgba(17, 24, 39, 0.75), rgba(17, 24, 39, 0.75)), url('{backgroundImageUrl}');"
>
	<!-- Kontainer Konten dengan Padding -->
	<div class="relative z-10 container mx-auto px-6 lg:px-16">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Kontainer Slide dengan Transisi -->
			<div class="relative flex min-h-[18rem] flex-col items-center justify-center overflow-hidden">
				{#key currentSlideIndex}
					<!-- Kunci agar transisi berjalan -->
					<div
						class="w-full"
						in:fly={{ x: direction === 'next' ? 100 : -100, duration: 500, delay: 100, opacity: 0 }}
						out:fly={{ x: direction === 'next' ? -100 : 100, duration: 300, opacity: 0 }}
					>
						<p
							class="mb-8 text-xl leading-relaxed font-light italic opacity-90 md:text-2xl lg:text-3xl"
						>
							"{currentTestimonial.quote}"
						</p>
						<div class="flex flex-col items-center space-y-2">
							{#if currentTestimonial.companyLogoUrl}
								<div class="mb-2 flex h-8 items-center">
									<!-- Fixed height container -->
									<img
										src={currentTestimonial.companyLogoUrl}
										class="max-h-full w-auto object-contain opacity-70 brightness-0 invert-[0.9]"
										alt={currentTestimonial.companyName}
									/>
								</div>
							{/if}
							<h6 class="text-base font-semibold tracking-wide">
								{currentTestimonial.authorName}
							</h6>
							<p class="text-sm font-normal opacity-70">
								{currentTestimonial.authorTitle}
							</p>
						</div>
					</div>
				{/key}
			</div>
		</div>
	</div>

	<!-- Kontrol Navigasi -->
	<div class="absolute inset-x-0 bottom-0 z-20 pb-6 md:pb-8">
		<!-- Tombol Prev/Next -->
		{#if totalSlides > 1}
			<button
				onclick={prevSlide}
				class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2.5 text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none disabled:pointer-events-none disabled:opacity-40 md:left-4 lg:left-6"
				aria-label="Previous testimonial"
				disabled={totalSlides <= 1}
			>
				<ChevronLeft class="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
			</button>
			<button
				onclick={nextSlide}
				class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2.5 text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none disabled:pointer-events-none disabled:opacity-40 md:right-4 lg:right-6"
				aria-label="Next testimonial"
				disabled={totalSlides <= 1}
			>
				<ChevronRight class="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
			</button>
		{/if}

		<!-- Indikator Titik -->
		{#if totalSlides > 1}
			<div
				class="mt-8 flex items-center justify-center space-x-2.5"
				role="tablist"
				aria-label="Testimonials Navigation"
			>
				{#each testimonials as _, i (i)}
					<button
						onclick={() => goToSlide(i)}
						class={`block h-2 w-2 rounded-full transition-all duration-300 ease-in-out focus:ring-1 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-neutral-900/50 focus:outline-none

					${currentSlideIndex === 1 ? 'w-4 bg-white opacity-100' : 'bg-white/40 hover:bg-white/60'}
					`}
						aria-label={`Go to testimonial ${i + 1}`}
						aria-selected={currentSlideIndex === i}
						role="tab"
					>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</section>
