<!-- src/lib/components/signup-form-simple/signup-form-simple.svelte -->
<script lang="ts">
	import { User, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-svelte'; // Import icons

	// --- Component State ---
	let name: string = $state(''); // Optional name field
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let termsAccepted: boolean = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'success' | 'error'
	let feedbackMessage = $state(''); // Can hold success or error message

	// --- Placeholder Submit Handler ---
	async function handleSignUp() {
		// 1. Reset state
		formState = 'submitting';
		feedbackMessage = '';

		// 2. Basic Frontend Validation (More robust validation should be server-side or with libraries like Zod/Superforms)
		if (!email || !password || !confirmPassword) {
			feedbackMessage = 'Please fill in all required fields.';
			formState = 'error';
			return;
		}
		if (!validateEmail(email)) {
			feedbackMessage = 'Please enter a valid email address.';
			formState = 'error';
			return;
		}
		if (password !== confirmPassword) {
			feedbackMessage = 'Passwords do not match.';
			formState = 'error';
			return;
		}
		if (password.length < 8) {
			// Example: Minimum password length
			feedbackMessage = 'Password must be at least 8 characters long.';
			formState = 'error';
			return;
		}
		if (!termsAccepted) {
			feedbackMessage = 'You must accept the Terms and Conditions.';
			formState = 'error';
			return;
		}

		console.log('Attempting sign up with:', { name, email, password }); // Log data (don't log password in real apps)

		// 3. Simulate API Call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// --- Replace with actual backend integration ---
		// Example: Simulate success/failure
		const success = Math.random() > 0.1; // 90% success chance for demo

		if (success) {
			formState = 'success';
			feedbackMessage = 'Account created successfully! You can now log in.';
			// Optionally clear fields or redirect
			// name = ''; email = ''; password = ''; confirmPassword = ''; termsAccepted = false;
			// window.location.href = '/login';
		} else {
			formState = 'error';
			feedbackMessage = 'Could not create account. Please try again later.';
		}
		// --- End of placeholder logic ---
	}

	// --- Helper Functions ---
	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
	function toggleConfirmPasswordVisibility() {
		showConfirmPassword = !showConfirmPassword;
	}
	function validateEmail(emailAddress: string): boolean {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(emailAddress);
	}
	// Reset feedback when user interacts
	function clearFeedback() {
		if (formState === 'error' || formState === 'success') {
			formState = 'idle';
			feedbackMessage = '';
		}
	}

	// Derived state for disabling form elements
	const isSubmitting = $derived(formState === 'submitting');
</script>

<div class="flex items-center justify-center">
	<div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl dark:bg-neutral-900">
		<!-- Header -->
		<div>
			<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Create your Account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
				Already have an account?{' '}
				<a
					href="/login"
					class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
				>
					Sign in
				</a>
			</p>
		</div>

		<!-- Form -->
		<form class="mt-8 space-y-5" onsubmit={handleSignUp}>
			<!-- Name Input (Optional) -->
			<div>
				<label
					for="full-name"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Full Name (Optional)</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<User class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						type="text"
						name="full-name"
						id="full-name"
						bind:value={name}
						oninput={clearFeedback}
						disabled={isSubmitting}
						class="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="John Doe"
						autocomplete="name"
					/>
				</div>
			</div>

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
						class="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			<!-- Password Input -->
			<div>
				<label
					for="password"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Password</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Lock class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autocomplete="new-password"
						required
						bind:value={password}
						oninput={clearFeedback}
						disabled={isSubmitting}
						aria-invalid={formState === 'error' &&
							feedbackMessage.toLowerCase().includes('password')}
						class="block w-full rounded-md border-0 py-2.5 pr-10 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="Min. 8 characters"
					/>
					<button
						type="button"
						onclick={togglePasswordVisibility}
						disabled={isSubmitting}
						class="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
						aria-label={showPassword ? 'Hide password' : 'Show password'}
					>
						{#if showPassword}
							<EyeOff class="h-5 w-5" aria-hidden="true" />
						{:else}
							<Eye class="h-5 w-5" aria-hidden="true" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Confirm Password Input -->
			<div>
				<label
					for="confirm-password"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Confirm Password</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Lock class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="confirm-password"
						name="confirm-password"
						type={showConfirmPassword ? 'text' : 'password'}
						autocomplete="new-password"
						required
						bind:value={confirmPassword}
						oninput={clearFeedback}
						disabled={isSubmitting}
						aria-invalid={formState === 'error' &&
							feedbackMessage.toLowerCase().includes('password')}
						class="block w-full rounded-md border-0 py-2.5 pr-10 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="Re-enter password"
					/>
					<button
						type="button"
						onclick={toggleConfirmPasswordVisibility}
						disabled={isSubmitting}
						class="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400"
						aria-label={showConfirmPassword
							? 'Hide confirmation password'
							: 'Show confirmation password'}
					>
						{#if showConfirmPassword}
							<EyeOff class="h-5 w-5" aria-hidden="true" />
						{:else}
							<Eye class="h-5 w-5" aria-hidden="true" />
						{/if}
					</button>
				</div>
			</div>

			<!-- Terms & Conditions Checkbox -->
			<div class="flex items-start">
				<div class="flex h-6 items-center">
					<input
						id="terms-conditions"
						name="terms-conditions"
						type="checkbox"
						required
						bind:checked={termsAccepted}
						onchange={clearFeedback}
						disabled={isSubmitting}
						aria-invalid={formState === 'error' && feedbackMessage.includes('Terms')}
						class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-900 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-900"
					/>
				</div>
				<div class="ml-3 text-sm leading-6">
					<label for="terms-conditions" class="text-gray-700 dark:text-neutral-300">
						I agree to the
						<a
							href="/terms"
							target="_blank"
							rel="noopener noreferrer"
							class="font-medium text-orange-600 hover:underline dark:text-orange-400"
							>Terms & Conditions</a
						>
						and
						<a
							href="/privacy"
							target="_blank"
							rel="noopener noreferrer"
							class="font-medium text-orange-600 hover:underline dark:text-orange-400"
							>Privacy Policy</a
						>.
					</label>
				</div>
			</div>

			<!-- Feedback Message Area -->
			{#if feedbackMessage}
				<div
					class="flex items-center gap-2 rounded-md p-3 text-sm {formState === 'error'
						? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
						: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'}"
					role="alert"
					aria-live="assertive"
				>
					{#if formState === 'error'}
						<AlertCircle class="h-5 w-5 flex-shrink-0" />
					{/if}
					<span>{feedbackMessage}</span>
				</div>
			{/if}

			<!-- Submit Button -->
			<div>
				<button
					type="submit"
					disabled={isSubmitting}
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
						<span>Creating account...</span>
					{:else}
						Create Account
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
