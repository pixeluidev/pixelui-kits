<!-- src/lib/components/hero-animated-illustration/hero-animated-illustration.svelte -->
<script lang="ts">
	import { ArrowRight, BarChart } from 'lucide-svelte'; // Example icons
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
	// --- Hardcoded Content (English) ---
	// IMPORTANT: Replace with your actual Lottie animation URL (JSON file)
	// You can find free animations on LottieFiles: https://lottiefiles.com/
	const lottieAnimationUrl: string = 'https://assets2.lottiefiles.com/packages/lf20_wxUJzo.json'; // Example: Data/Collaboration animation
	const headline: string = 'Visualize Your Success';
	const description: string =
		"Bring your data and ideas to life with dynamic visualizations and seamless collaboration, powered by Pixel UI's intuitive components.";
	const primaryCtaText: string = 'Explore Features';
	const primaryCtaHref: string = '/features'; // Adjust link
	const primaryCtaIcon = BarChart;
	const secondaryCtaText: string = 'Sign Up Free';
	const secondaryCtaHref: string = '/signup'; // Adjust link
	const animationPosition: 'left' | 'right' = 'right'; // Animation placement: 'left' or 'right'
	const backgroundColor: string = 'bg-white dark:bg-neutral-900'; // Background color

	// --- Lottie Player Options ---
	// Refer to svelte-lottie and lottie-web documentation for more options
	const lottieOptions = {
		path: lottieAnimationUrl,
		loop: true,
		autoplay: true,
		height: 500,
		width: 500,
		renderer: 'svg',
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice' // How animation fits its container
		}
	};

	// CTA Styles
	const primaryCtaBaseClass: string =
		'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-colors duration-150';
	const primaryCtaComputedClass: string = `${primaryCtaBaseClass} bg-orange-500 text-white hover:bg-orange-600`;
	const secondaryCtaComputedClass: string = `group ${primaryCtaBaseClass} border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800 shadow-none`; // Outline style for secondary
</script>

<section class="{backgroundColor} overflow-hidden">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<div class="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
			<!-- Text & CTA Column -->
			<div class="lg:order-first">
				<div class="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:text-left">
					<h1
						class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
					>
						{headline}
					</h1>
					<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-300">
						{description}
					</p>
					<div
						class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
					>
						<a href={primaryCtaHref} class="{primaryCtaComputedClass} w-full sm:w-auto">
							{#if primaryCtaIcon}
								<svelte:component this={primaryCtaIcon} class="h-5 w-5" aria-hidden="true" />
							{/if}
							<span>{primaryCtaText}</span>
						</a>
						<a href={secondaryCtaHref} class="{secondaryCtaComputedClass} w-full sm:w-auto">
							<span>{secondaryCtaText}</span>
							<ArrowRight
								class="h-5 w-5 transition-transform group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</a>
					</div>
				</div>
			</div>

			<!-- Animation Column -->
			<div class="mt-12 sm:mt-16 lg:order-last lg:mt-0">
				<div class="mx-auto max-w-sm sm:max-w-md lg:max-w-none lg:flex-none">
					{#key lottieOptions.path}
						<!-- Re-render if path changes -->
						<DotLottieSvelte {...lottieOptions} />
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>
