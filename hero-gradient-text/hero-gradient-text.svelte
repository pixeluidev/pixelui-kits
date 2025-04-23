<!-- src/lib/components/hero-gradient-text/hero-gradient-text.svelte -->
<script lang="ts">
	import { MoveRight, Sparkles } from 'lucide-svelte';

	// --- Konten Hardcoded (Bahasa Inggris) ---
	const headlinePart1: string = 'Build Stunning UIs';
	const headlineGradientText: string = 'Effortlessly';
	const headlinePart2: string = 'with Pixel UI';
	const description: string =
		'Elevate your Svelte & Tailwind projects with beautifully crafted components that just work. Focus on innovation, not boilerplate.';
	const primaryCtaText: string = 'Explore Components';
	const primaryCtaHref: string = '/components';
	const secondaryCtaText: string = 'Read Docs';
	const secondaryCtaHref: string = '/docs';

	// --- Styling & Warna ---
	const backgroundColor: string = 'bg-white dark:bg-neutral-900';
	// Gradien untuk teks headline
	const textGradientClass: string = 'from-orange-500 via-red-500 to-pink-500';
	// Gradien untuk tombol (selalu digunakan)
	const buttonGradientClass: string = 'from-orange-500 via-orange-500 to-red-500';

	// Kelas dasar tombol (tetap berguna untuk styling umum)
	const buttonBaseClass: string =
		'inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-all duration-150';

	// Kelas tombol sekunder (gaya teks/link - tidak berubah)
	const secondaryCtaComputedClass: string =
		'group inline-flex items-center gap-1.5 px-1 py-1 text-base font-semibold leading-6 text-gray-700 transition-colors hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400';

	// Hapus computed class untuk tombol primer, akan diterapkan langsung
</script>

<section class="{backgroundColor} relative isolate overflow-hidden">
	<!-- Opsional: Elemen dekoratif background -->
	<div
		class="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80"
		aria-hidden="true"
	>
		<div
			class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-orange-300 via-transparent to-blue-300 opacity-20 dark:opacity-10"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>

	<div class="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:px-8 lg:py-40">
		<!-- Konten Teks Utama -->
		<h1
			class="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white"
		>
			{#if headlinePart1}<span>{headlinePart1}</span>{/if}
			<span class="bg-gradient-to-r {textGradientClass} bg-clip-text text-transparent">
				{headlineGradientText}
			</span>
			{#if headlinePart2}<span> {headlinePart2}</span>{/if}
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-neutral-300">
			{description}
		</p>

		<!-- Tombol CTA -->
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href={primaryCtaHref}
				class="{buttonBaseClass} bg-gradient-to-r {buttonGradientClass} text-white hover:opacity-90 hover:shadow-lg"
			>
				<Sparkles class="h-5 w-5" aria-hidden="true" />
				<span>{primaryCtaText}</span>
			</a>
			<a href={secondaryCtaHref} class={secondaryCtaComputedClass}>
				<span>{secondaryCtaText}</span>
				<MoveRight
					class="h-5 w-5 transition-transform group-hover:translate-x-1"
					aria-hidden="true"
				/>
			</a>
		</div>
	</div>
</section>
