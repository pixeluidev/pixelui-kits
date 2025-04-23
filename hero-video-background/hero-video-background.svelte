<!-- src/lib/components/hero-video-background/hero-video-background.svelte -->
<script lang="ts">
	import { PlayCircle, ChevronRight } from 'lucide-svelte'; // Contoh ikon

	// --- Konten Hardcoded (Bahasa Inggris) ---
	// GANTI DENGAN PATH VIDEO ANDA (MP4 dan/atau WebM untuk kompatibilitas)
	const videoMp4Url: string =
		'https://videos.pexels.com/video-files/13422106/13422106-hd_1920_1080_24fps.mp4'; // Contoh Path
	const videoWebmUrl: string | undefined = '/videos/hero-background.webm'; // Contoh Path (Opsional)
	const posterImageUrl: string =
		'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Gambar fallback/placeholder
	const headline: string = 'Experience Innovation in Motion';
	const description: string =
		'See how Pixel UI brings your interfaces to life. Dynamic, responsive, and built for the modern web.';
	const primaryCtaText: string = 'Watch Demo';
	const primaryCtaHref: string = '#'; // Ganti dengan link video demo atau halaman relevan
	const primaryCtaIcon = PlayCircle;
	const secondaryCtaText: string = 'Explore Features';
	const secondaryCtaHref: string = '/features'; // Ganti dengan link relevan

	// --- Styling ---
	// Tingkat kegelapan overlay (Tailwind opacity scale: 50=50%, 60=60%, etc.)
	const overlayOpacityClass: string = 'bg-neutral-900/70'; // Cukup gelap untuk kontras
</script>

<section class="relative h-screen w-full overflow-hidden">
	<!-- Video Background -->
	<div class="absolute inset-0 z-[-1]">
		<video
			class="h-full w-full object-cover"
			poster={posterImageUrl}
			autoplay
			loop
			muted
			playsinline
			preload="metadata"
			aria-hidden="true"
		>
			<!-- {#if videoWebmUrl}
				<source src={videoWebmUrl} type="video/webm" />
			{/if} -->
			<source src={videoMp4Url} type="video/mp4" />
			Your browser does not support the video tag. (Fallback text)
		</video>
	</div>

	<!-- Overlay -->
	<div class="absolute inset-0 {overlayOpacityClass}" aria-hidden="true"></div>

	<!-- Konten Teks & CTA (Centered) -->
	<div
		class="relative z-10 flex h-full items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8"
	>
		<div class="max-w-2xl">
			<h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
				{headline}
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-200 dark:text-neutral-300">
				{description}
			</p>

			<!-- Tombol CTA -->
			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
				<a
					href={primaryCtaHref}
					class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:w-auto"
				>
					{#if primaryCtaIcon}
						<svelte:component this={primaryCtaIcon} class="h-5 w-5" aria-hidden="true" />
					{/if}
					<span>{primaryCtaText}</span>
				</a>
				<a
					href={secondaryCtaHref}
					class="group inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-white/40 bg-white/5 px-5 py-[11px] text-base leading-6 font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
				>
					<!-- Gaya sekunder sedikit berbeda untuk kontras di video -->
					<span>{secondaryCtaText}</span>
					<ChevronRight
						class="h-5 w-5 transition-transform group-hover:translate-x-1"
						aria-hidden="true"
					/>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* Pastikan video tidak punya margin/padding aneh */
	video {
		display: block;
	}
</style>
