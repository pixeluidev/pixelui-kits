<script lang="ts">
	import { Quote, ArrowRight, Star } from 'lucide-svelte'; // Import Star icon

	// --- Hardcoded Content (English) ---
	const quoteText: string = "Pixel UI has completely transformed our development speed. The components are intuitive, beautiful, and saved us countless hours. Highly recommended!";
	const authorName: string = "Sarah Chen";
	const authorTitle: string = "Lead Frontend Developer";
	const authorCompany: string = "Innovate Solutions Inc.";
	const avatarUrl: string = "https://randomuser.me/api/portraits/lego/1.jpg"; // Replace with real avatar if available
    const rating: number = 5; // Add rating (e.g., 1 to 5)
	const supportingHeadline: string = "Real Results, Real Developers";
	const primaryCtaText: string = "See More Testimonials";
	const primaryCtaHref: string = "/testimonials"; // Adjust link as needed
    const quotePosition: 'left' | 'right' = 'left'; // Options: 'left' or 'right'
	const backgroundColor: string = 'bg-gradient-to-br from-gray-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800';

    // --- Computed Classes ---
	// Determine column order based on quote position
    const quoteOrderClass = $derived(quotePosition === 'left' ? 'lg:order-first' : 'lg:order-last');
	const authorOrderClass = $derived(quotePosition === 'left' ? 'lg:order-last' : 'lg:order-first');

</script>

<section class="{backgroundColor} overflow-hidden">
	<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">

			<!-- Quote & CTA Column -->
			<div class="{quoteOrderClass} text-center lg:text-left">
                 <!-- Supporting Headline -->
                <h2 class="text-base font-semibold leading-7 text-orange-600 dark:text-orange-400">{supportingHeadline}</h2>

				<!-- Main Quote -->
                <figure class="mt-6">
                    <blockquote class="relative text-2xl font-semibold leading-snug text-gray-800 dark:text-neutral-100 sm:text-3xl sm:leading-normal">
                         <!-- Decorative Quote Icon -->
                         <Quote class="absolute -top-6 -left-6 h-16 w-16 text-gray-100 opacity-80 dark:text-neutral-700/60 transform scale-x-[-1]" aria-hidden="true"/>
                        <p class="relative">"{quoteText}"</p>
                    </blockquote>
                </figure>

                 <!-- CTA Button -->
				<div class="mt-10">
					<a
						href={primaryCtaHref}
						class="inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
					>
						<span>{primaryCtaText}</span>
                        <ArrowRight class="h-5 w-5" aria-hidden="true" />
					</a>
				</div>
			</div>

            <!-- Author/Image Column -->
			<div class="{authorOrderClass} flex justify-center lg:justify-start">
                 <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
                     <img
                        class="h-28 w-28 rounded-full object-cover shadow-lg sm:h-36 sm:w-36 bg-gray-200 dark:bg-neutral-700"
                        src={avatarUrl}
                        alt="{authorName}, {authorTitle}"
                        loading="lazy"
                    />
                    <figcaption class="mt-6">
                        <div class="font-semibold text-gray-900 dark:text-white">{authorName}</div>
                        <div class="text-gray-600 dark:text-neutral-400">{authorTitle}</div>
                        <div class="text-sm text-gray-500 dark:text-neutral-500">{authorCompany}</div>

                        <!-- Star Rating -->
                        {#if rating > 0 && rating <= 5}
                            <div class="mt-3 flex justify-center gap-0.5 lg:justify-start" aria-label="{rating} out of 5 stars">
                                {#each { length: 5 } as _, i}
                                    <Star
                                        class="h-5 w-5 flex-shrink-0 {i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-neutral-600'}"
                                        fill={i < rating ? 'currentColor' : 'none'}
                                    />
                                {/each}
                            </div>
                        {/if}

                    </figcaption>
                </div>
			</div>

		</div>
	</div>
</section>
