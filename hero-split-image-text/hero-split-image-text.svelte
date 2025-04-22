<!-- src/lib/components/hero-split-image-text/hero-split-image-text.svelte -->
<script lang="ts">
	import { ArrowRight } from 'lucide-svelte'; // Impor ikon yang akan digunakan

	// --- Konten Hardcoded (Bahasa Inggris) ---
	const imageUrl: string =
		'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80';
	const imageAlt: string = 'Team collaborating with modern UI components';
	const headline: string = 'Build Stunning UIs Faster Than Ever';
	const description: string =
		'Pixel UI provides beautiful, ready-to-use Svelte + Tailwind components to accelerate your development workflow and create consistent user experiences.';
</script>

<section
	class="bg-gradient-to-br from-orange-50 via-white to-gray-50 dark:from-neutral-900 dark:via-neutral-800/80 dark:to-neutral-900"
>
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- Kolom Teks -->
			<div class="text-center lg:order-first lg:text-left">
				<h1
					class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
				>
					{headline}
				</h1>
				<p class="mt-4 text-lg leading-relaxed text-gray-600 dark:text-neutral-300">
					{description}
				</p>

				<!-- Tombol CTA -->
				<div
					class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
				>
					<a
						href="/category/heroes"
						class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none sm:w-auto dark:focus:ring-offset-neutral-900"
					>
						<span>Get Started Now</span>
						<ArrowRight class="ml-2 h-5 w-5" aria-hidden="true" />
					</a>
					<a
						href="/components"
						class="inline-flex w-full items-center justify-center rounded-md border border-orange-500 bg-transparent px-6 py-3 text-base font-medium text-orange-600 shadow-sm transition-colors duration-150 hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none sm:w-auto dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10 dark:focus:ring-offset-neutral-900"
					>
						View Components
					</a>
				</div>

				<!-- Social Proof -->
				<p class="mt-8 text-sm text-gray-500 sm:mt-10 dark:text-neutral-500">
					Trusted by over 1,000+ developers worldwide
				</p>
			</div>

			<!-- Kolom Gambar -->
			<div class="mt-10 lg:order-last lg:mt-0">
				<img
					src={imageUrl}
					alt={imageAlt}
					class="w-full rounded-lg object-cover shadow-xl"
					loading="lazy"
					fetchpriority="high"
				/>
			</div>
		</div>
	</div>
</section>
