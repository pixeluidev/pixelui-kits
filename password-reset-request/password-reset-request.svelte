<script lang="ts">
	import { Mail, Send, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-svelte'; // Import icons

	// --- Component State ---
	let email: string = $state('');
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'success' | 'error'
	let feedbackMessage: string = $state('');

	// --- Placeholder Submit Handler ---
	async function handleSubmit() {
		// 1. Reset state
		formState = 'submitting';
		feedbackMessage = '';

		// 2. Basic Frontend Validation
		if (!email || !validateEmail(email)) {
			feedbackMessage = 'Please enter a valid email address.';
			formState = 'error';
			return;
		}

		console.log('Requesting password reset for:', email);

		// 3. Simulate API Call
		await new Promise((resolve) => setTimeout(resolve, 1200));

		// --- Replace with actual backend integration ---
		// Example: Simulate success/failure (e.g., check if email exists)
		const success = Math.random() > 0.15; // 85% success chance for demo

		if (success) {
			formState = 'success';
			feedbackMessage =
				"If an account exists for this email, you'll receive reset instructions shortly.";
			// Don't clear email here, user might want to see what they submitted
		} else {
			formState = 'error';
			// Avoid confirming if email exists or not for security
			feedbackMessage = 'Could not process request. Please try again later.';
		}
		// --- End of placeholder logic ---
	}

	// --- Helper Functions ---
	function validateEmail(emailAddress: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(emailAddress);
	}
	// Reset feedback when user types
	function clearFeedback() {
		// Only reset if it was previously in a final state
		if (formState === 'error' || formState === 'success') {
			formState = 'idle';
			feedbackMessage = '';
		}
	}

	// Derived state for disabling form elements
	const isSubmitting = $derived(formState === 'submitting');
</script>

<div class="flex items-center justify-center px-4 py-12">
	<div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl dark:bg-neutral-900">
		<!-- Header -->
		<div>
			<h2
				class="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
			>
				Forgot Your Password?
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
				No problem! Enter your email address below and we'll send you a link to reset it.
			</p>
		</div>

		<!-- Form -->
		<form class="mt-8 space-y-6" onsubmit={handleSubmit}>
			<!-- Email Input -->
			<div>
				<label
					for="email-address"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Email address</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Mail class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
						oninput={clearFeedback}
						disabled={isSubmitting}
						aria-invalid={formState === 'error'}
						aria-describedby="email-feedback"
						class="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			<!-- Feedback Message Area -->
			{#if feedbackMessage}
				<div
					class="flex items-start gap-2.5 rounded-md p-3 text-sm {formState === 'error'
						? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
						: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'}"
					role="alert"
					aria-live="assertive"
				>
					{#if formState === 'error'}
						<AlertCircle class="h-5 w-5 flex-shrink-0" />
					{:else if formState === 'success'}
						<CheckCircle class="h-5 w-5 flex-shrink-0" />
					{/if}
					<span id="email-feedback">{feedbackMessage}</span>
				</div>
			{/if}

			<!-- Submit Button -->
			<div>
				<button
					type="submit"
					disabled={isSubmitting || formState === 'success'}
					class="group relative flex w-full justify-center rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{#if isSubmitting}
						<svg
							class="mr-2 h-5 w-5 animate-spin"
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
						<span>Sending Link...</span>
					{:else}
						<Send class="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
						<span>Send Reset Link</span>
					{/if}
				</button>
			</div>
		</form>

		<!-- Back to Login Link -->
		<div class="mt-6 text-center">
			<a
				href="/login"
				class="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400"
			>
				<ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
				<span>Back to Sign In</span>
			</a>
		</div>
	</div>
</div>
