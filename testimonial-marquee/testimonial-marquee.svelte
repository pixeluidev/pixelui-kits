<!-- src/lib/components/testimonial-marquee/testimonial-marquee-section.svelte -->
<script lang="ts">
	import TestimonialCard from './testimonial-card.svelte';
	import { sampleTestimonials } from './data'; // Gunakan data contoh yang sudah ada
	import type { TestimonialData } from './types';

	// Props
	/** Daftar testimoni yang akan ditampilkan. */
	const testimonials: TestimonialData[] = sampleTestimonials;
	/** Arah animasi: 'ltr' (Left to Right) atau 'rtl' (Right to Left). */
	/** Kecepatan animasi: 'slow', 'normal', atau 'fast'. */
	/** Aktifkan jeda saat hover mouse. */
	const pauseOnHover: boolean = true;
	/** Tambahkan efek gradien fade di tepi. */
	const fadeEdges: boolean = true;

	// Duplikasi data untuk loop yang mulus
</script>

<div class="marquee-container relative w-full overflow-hidden py-8" class:group={pauseOnHover}>
	<!-- Kontainer untuk konten yang bergerak -->
	<div class="relative flex overflow-x-hidden">
		<!-- Konten Asli -->
		<div class="animate-marqueertl py-py-6 inline-flex whitespace-nowrap">
			{#each testimonials as testimonial (`dup-${testimonial.id}`)}
				<TestimonialCard {testimonial} />
			{/each}
		</div>

		<div class="animate-marqueertl2 absolute top-0 inline-flex py-12 whitespace-nowrap">
			{#each testimonials as testimonial (testimonial.id)}
				<TestimonialCard {testimonial} />
			{/each}
		</div>
	</div>

	<div class="relative flex overflow-x-hidden">
		<!-- Konten Asli -->
		<div class="animate-marquee inline-flex whitespace-nowrap">
			{#each testimonials as testimonial (`dup-al-${testimonial.id}`)}
				<TestimonialCard {testimonial} />
			{/each}
		</div>

		<div class="animate-marquee2 absolute top-0 inline-flex whitespace-nowrap">
			{#each testimonials as testimonial, i (`al-${i}-${testimonial.id}`)}
				<TestimonialCard {testimonial} />
			{/each}
		</div>
	</div>

	<!-- Gradient Overlays (Opsional) -->
	{#if fadeEdges}
		<div
			class:group-hover:paused={pauseOnHover}
			aria-hidden="true"
			class="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/80"
		></div>
		<div
			class:group-hover:paused={pauseOnHover}
			aria-hidden="true"
			class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/80"
		></div>
	{/if}
</div>

<style>
	/* Keyframes Animasi Marquee */
	@keyframes marquee-rtl {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	@keyframes marquee-ltr {
		/* Mulai dari posisi duplikat dan berakhir di posisi asli */
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0%);
		}
	}

	/* Jeda animasi saat container utama dihover (jika pauseOnHover=true) */
	/* .group:hover .marquee-content { */
	/* Menggunakan class utility Tailwind 'paused' yang ditoggle dari script */
	/* } */

	.paused {
		animation-play-state: paused !important; /* Gunakan !important untuk override jika perlu */
	}

	/* Optimasi performa */
	.marquee-content {
		will-change: transform;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}
	.animate-marquee {
		animation: marquee 75s linear infinite;
	}
	@keyframes marquee2 {
		0% {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}
	.animate-marquee2 {
		animation: marquee2 75s linear infinite;
	}
	@keyframes marqueertl {
		0% {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}
	.animate-marqueertl {
		animation: marqueertl 75s linear infinite;
	}
	@keyframes marqueertl2 {
		0% {
			transform: translateX(0);
		}
		to {
			transform: translateX(100%);
		}
	}
	.animate-marqueertl2 {
		animation: marqueertl2 75s linear infinite;
	}
</style>
