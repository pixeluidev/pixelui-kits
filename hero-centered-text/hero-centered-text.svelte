<script lang="ts">
	import { Rocket } from '@lucide/svelte'; // Contoh ikon

	// --- Konten Hardcoded (Bahasa Inggris) ---
	const headline: string = 'Build Your Next Idea Faster';
	const description: string =
		"Pixel UI provides production-ready Svelte components, styled with Tailwind CSS, designed for efficiency and beauty. Focus on your logic, we'll handle the UI.";
	const primaryCtaText: string = 'Get Started';
	const primaryCtaHref: string = '/docs/introduction'; // Ganti dengan link relevan
	const primaryCtaIcon = Rocket;
	const secondaryCtaText: string = 'Browse Components';
	const secondaryCtaHref: string = '/components'; // Ganti dengan link relevan
	// Background: Gradien halus
	const backgroundColor: string =
		'bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-800/90 dark:to-neutral-800';
</script>

<section class="{backgroundColor} relative isolate overflow-hidden">
	<div class="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32 lg:px-8 lg:py-40">
		<!-- Opsional: Elemen dekoratif background (contoh: radial gradient) -->
		<div
			class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
			aria-hidden="true"
		>
			<div
				class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-300 to-orange-500 opacity-20 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem] dark:opacity-10"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>

		<!-- Konten Teks Utama -->
		<h1
			class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
		>
			{headline}
		</h1>
		<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-300">
			{description}
		</p>

		<!-- Tombol CTA -->
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href={primaryCtaHref}
				class="inline-flex items-center gap-2 rounded-md bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
			>
				{#if primaryCtaIcon}
					<svelte:component this={primaryCtaIcon} class="h-5 w-5" aria-hidden="true" />
				{/if}
				<span>{primaryCtaText}</span>
			</a>
			<a
				href={secondaryCtaHref}
				class="group inline-flex items-center gap-1.5 px-1 py-1 text-base leading-6 font-semibold text-gray-700 transition-colors hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
			>
				<span>{secondaryCtaText}</span>
				<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
			</a>
		</div>
	</div>
</section>
