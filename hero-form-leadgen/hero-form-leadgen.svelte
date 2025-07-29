<!-- src/lib/components/hero-form-leadgen/hero-form-leadgen.svelte -->
<script lang="ts">
	import { Mail, Send } from '@lucide/svelte'; // Contoh ikon

	// --- State untuk Form Sederhana ---
	let email: string = $state('');
	let formState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let feedbackMessage: string = $state('idle');

	// --- Konten Hardcoded (Bahasa Inggris) ---
	// Ganti dengan konten penawaran Anda
	const imageUrl: string =
		'https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
	const imageAlt: string = 'Person receiving a notification on their phone';
	const headline: string = 'Be the First to Know!';
	const description: string =
		'Join our waitlist and get exclusive early access to Pixel UI Pro features, plus a special launch discount.';
	const inputPlaceholder: string = 'Enter your email address';
	const submitButtonText: string = 'Notify Me';
	const privacyPolicyText: string = 'We respect your privacy. No spam.';
	const privacyPolicyHref: string = '/page/privacy-policy'; // Ganti link

	// --- Fungsi Submit Form Sederhana ---
	async function handleSubmit() {
		if (!email || !validateEmail(email)) {
			formState = 'error';
			feedbackMessage = 'Please enter a valid email address.';
			return;
		}

		formState = 'submitting';
		feedbackMessage = ''; // Clear previous messages

		// --- Simulasi Pengiriman ke Backend ---
		// Ganti ini dengan fetch() ke API Anda
		await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasi delay network

		// Contoh hasil (ganti dengan respons asli)
		const success = Math.random() > 0.1; // 90% chance of success for demo

		if (success) {
			formState = 'success';
			feedbackMessage = "Thanks for joining! We'll notify you soon.";
			email = ''; // Kosongkan email setelah sukses
		} else {
			formState = 'error';
			feedbackMessage = 'Something went wrong. Please try again later.';
		}
	}

	// Fungsi validasi email sederhana
	function validateEmail(emailAddress: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(emailAddress);
	}

	// Reset state jika user mulai mengetik lagi setelah error/success
	function handleInput() {
		if (formState === 'error' || formState === 'success') {
			formState = 'idle';
			feedbackMessage = '';
		}
	}
</script>

<section class="relative overflow-hidden bg-white dark:bg-neutral-900">
	<div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
		<!-- Kolom Teks -->
		<div class="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-48 lg:pb-56 xl:col-span-6">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<!-- Opsional: Badge/Kicker -->
				<!-- <p class="text-base font-semibold leading-7 text-orange-600 dark:text-orange-400">Get ahead</p> -->
				<h1
					class="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:mt-6 sm:text-5xl lg:text-6xl dark:text-white"
				>
					{headline}
				</h1>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-neutral-300">
					{description}
				</p>

				<!-- Form Lead Gen -->
				<form class="mt-8" onsubmit={handleSubmit}>
					<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
						<label for="email-address" class="sr-only">Email address</label>
						<div class="relative flex-grow rounded-md shadow-sm">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<Mail class="h-5 w-5 text-gray-400" aria-hidden="true" />
							</div>
							<input
								type="email"
								name="email-address"
								id="email-address"
								bind:value={email}
								oninput={handleInput}
								required
								class="block w-full rounded-md border-0 py-3 pr-4 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-800 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
								placeholder={inputPlaceholder}
								aria-describedby="email-feedback"
								disabled={formState === 'submitting'}
							/>
						</div>
						<button
							type="submit"
							disabled={formState === 'submitting'}
							class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
						>
							{#if formState === 'submitting'}
								<svg
									class="h-5 w-5 animate-spin"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									><circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle><path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path></svg
								>
								<span>Processing...</span>
							{:else}
								<Send class="-ml-0.5 h-5 w-5" aria-hidden="true" />
								<span>{submitButtonText}</span>
							{/if}
						</button>
					</div>
					<!-- Feedback Message -->
					<div id="email-feedback" class="mt-2 min-h-[1.25rem] text-sm" aria-live="polite">
						{#if formState === 'success'}
							<p class="text-green-600 dark:text-green-400">{feedbackMessage}</p>
						{:else if formState === 'error'}
							<p class="text-red-600 dark:text-red-500">{feedbackMessage}</p>
						{/if}
					</div>
				</form>
				<!-- Privacy Policy Link -->
				<p class="mt-6 text-xs leading-5 text-gray-500 dark:text-neutral-400">
					{privacyPolicyText}
					<a
						href={privacyPolicyHref}
						class="font-medium text-gray-700 hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
						>Privacy Policy</a
					>.
				</p>
			</div>
		</div>

		<!-- Kolom Gambar -->
		<div class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
			<div
				class="aspect-[3/2] w-full bg-gray-50 lg:absolute lg:inset-0 lg:aspect-auto lg:h-full dark:bg-neutral-800"
			>
				<img class="h-full w-full object-cover" src={imageUrl} alt={imageAlt} loading="lazy" />
				<!-- Opsional: Overlay halus di atas gambar jika perlu -->
				<!-- <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900" aria-hidden="true"></div> -->
			</div>
		</div>
	</div>
</section>
