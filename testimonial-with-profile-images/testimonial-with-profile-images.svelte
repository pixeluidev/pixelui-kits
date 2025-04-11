<script lang="ts">
	import type { SimpleTestimonialData } from './data'; // Adjust path
	import { simpleTestimonialData as defaultData } from './data'; // Use imported data as default
	import Quote from 'lucide-svelte/icons/quote';
	import { viewport } from './viewport'; // Import the action

	export let data: SimpleTestimonialData = defaultData;

	// State for viewport animation trigger
	let isInView = false;
	const animationDelay = 150; // Base delay in ms for staggered effect
</script>

<!-- Apply viewport action to the section -->
<section
	class="overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white py-16 md:py-24 lg:py-32 dark:from-neutral-900 dark:via-neutral-800/50 dark:to-neutral-900"
	on:enterViewport={() => (isInView = true)}
	use:viewport={{ once: true, threshold: 0.2 }}
>
	<div class="container mx-auto px-6 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-20">
			<!-- Kolom Kiri: Teks Testimonial -->
			<!-- Apply conditional classes/transitions based on isInView -->
			<div class="relative text-center lg:col-span-3 lg:text-left">
				<!-- Ikon Kutipan Latar dengan Animasi -->
				<Quote
					class={`absolute -top-8 -left-6 -z-0 h-20 w-20 rotate-180 transform text-orange-100 opacity-0 transition-all duration-1000 ease-out md:h-28 md:w-28 lg:-left-8 dark:text-orange-900/20
					${isInView ? 'translate-y-0 opacity-70' : '-translate-y-2'}
					`}
					strokeWidth={1}
					style={`transition-delay: ${animationDelay * 2}ms;`}
				/>

				<!-- Judul dengan Animasi -->
				<h2
					class="mb-6 text-3xl font-bold tracking-tight text-gray-900 opacity-0 transition-all duration-700 ease-out md:text-4xl dark:text-white"
					class:-translate-y-3={!isInView}
					class:opacity-100={isInView}
					class:translate-y-0={isInView}
					style={`transition-delay: ${animationDelay}ms;`}
				>
					{data.title}
				</h2>

				<!-- Kutipan dengan Animasi -->
				<p
					class="relative z-10 mb-8 text-lg leading-relaxed text-gray-700 italic opacity-0 transition-all duration-700 ease-out md:text-xl dark:text-neutral-300"
					class:-translate-y-3={!isInView}
					class:opacity-100={isInView}
					class:translate-y-0={isInView}
					style={`transition-delay: ${animationDelay * 2}ms;`}
				>
					"{data.quote}"
				</p>

				<!-- Info Penulis dengan Animasi -->
				<div
					class="mb-8 opacity-0 transition-all duration-700 ease-out"
					class:-translate-y-3={!isInView}
					class:opacity-100={isInView}
					class:translate-y-0={isInView}
					style={`transition-delay: ${animationDelay * 3}ms;`}
				>
					<h6 class="text-base font-semibold text-gray-800 dark:text-white">
						{data.authorName}
					</h6>
					<p class="text-sm font-medium text-gray-500 dark:text-neutral-400">
						{data.authorTitleAndCompany}
					</p>
				</div>

				<!-- Grup Avatar dengan Animasi & Hover -->
				<div
					aria-label="Team members or happy clients"
					class="relative z-10 flex items-center justify-center -space-x-3 opacity-0 transition-opacity duration-700 ease-out lg:justify-start"
					class:opacity-100={isInView}
					style={`transition-delay: ${animationDelay * 4}ms;`}
				>
					{#each data.groupAvatarUrls.slice(0, 4) as avatarUrl, i (avatarUrl)}
						<img
							src={avatarUrl}
							alt={`Avatar ${i + 1}`}
							class="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-110 hover:border-orange-300 hover:shadow-lg md:h-12 md:w-12 dark:border-neutral-800 dark:hover:border-orange-500"
							loading="lazy"
							style={`z-index: ${4 - i}; transition-delay: ${i * 50}ms;`}
							class:opacity-0={!isInView}
							class:translate-y-2={!isInView}
							class:opacity-100={isInView}
							class:translate-y-0={isInView}
						/>
					{/each}
					{#if data.groupAvatarUrls.length > 4}
						<div
							class="z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600 shadow-sm transition-opacity duration-500 ease-out md:h-12 md:w-12 dark:border-neutral-800 dark:bg-neutral-700 dark:text-neutral-300"
							class:opacity-0={!isInView}
							class:opacity-100={isInView}
							style={`transition-delay: ${4 * 50 + animationDelay * 4}ms;`}
						>
							+{data.groupAvatarUrls.length - 4}
						</div>
					{/if}
				</div>
			</div>

			<!-- Kolom Kanan: Gambar Profil Utama dengan Animasi & Hover -->
			<div class="flex justify-center lg:col-span-2 lg:justify-end">
				<div
					class="aspect-square h-64 w-64 transform-gpu opacity-0 transition-all duration-1000 ease-out md:h-80 md:w-80 lg:h-auto lg:w-full lg:max-w-md"
					class:opacity-100={isInView}
					class:scale-100={isInView}
					class:scale-95={!isInView}
					style={`transition-delay: ${animationDelay}ms;`}
				>
					<img
						alt={data.mainImageAlt}
						class="h-full w-full rounded-3xl border-4 border-white object-cover shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-orange-200 hover:shadow-2xl dark:border-neutral-700 dark:hover:border-orange-600/50"
						loading="lazy"
						src={data.mainImageUrl}
					/>
				</div>
			</div>
		</div>
	</div>
</section>
