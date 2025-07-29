<script lang="ts">
	import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, RefreshCw, ArrowLeft } from '@lucide/svelte';

	// --- Component Props (Essential for Functionality) ---
	/**
	 * The password reset token obtained from the URL or other secure means.
	 * THIS IS CRUCIAL for the backend to validate the request.
	 * In a real SvelteKit app, you'd likely get this from `page.data`
	 * after extracting it server-side in a `+page.server.ts` load function.
	 * Never expose the raw token directly in the client-side URL if possible.
	 */
	let token: string | null = null; // Example: Get this securely

	// --- Component State ---
	let newPassword: string = $state('');
	let confirmPassword: string = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'success' | 'error' | 'invalid_token'
	let feedbackMessage: string = $state('');
	// Optional: Password strength indicator state (could be a number 0-4 or a string)
	let passwordStrength: number = $state(0); // 0: too short, 1: weak, 2: medium, 3: strong, 4: very strong

	// --- Placeholder Submit Handler ---
	async function handleSetNewPassword() {
		// 1. Reset state
		formState = 'submitting';
		feedbackMessage = '';

		// 2. Basic Frontend Validation
		if (!newPassword || !confirmPassword) {
			feedbackMessage = 'Please enter and confirm your new password.';
			formState = 'error';
			return;
		}
		if (newPassword.length < 8) {
			// Match signup validation if any
			feedbackMessage = 'Password must be at least 8 characters long.';
			formState = 'error';
			return;
		}
		if (newPassword !== confirmPassword) {
			feedbackMessage = 'Passwords do not match.';
			formState = 'error';
			return;
		}
		if (!token) {
			// Check if token is present (should ideally be validated server-side earlier)
			feedbackMessage = 'Invalid or missing reset token.';
			formState = 'invalid_token'; // Specific error state
			return;
		}

		console.log('Attempting to set new password with token:', token); // Don't log password

		// 3. Simulate API Call to Backend
		// Your backend MUST validate the token *and* the new password here
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// --- Replace with actual backend integration ---
		// Example: Simulate success/failure/invalid token
		const apiResponse = Math.random();
		let success = false;
		let invalidToken = false;

		if (apiResponse > 0.2) {
			// 80% success chance
			success = true;
		} else if (apiResponse > 0.05) {
			// 15% invalid token chance
			invalidToken = true;
		} // 5% generic error chance

		if (success) {
			formState = 'success';
			feedbackMessage =
				'Your password has been successfully reset. You can now log in with your new password.';
		} else if (invalidToken) {
			formState = 'invalid_token';
			feedbackMessage =
				'This password reset link is invalid or has expired. Please request a new one.';
		} else {
			formState = 'error';
			feedbackMessage = 'Could not reset password. Please try again later.';
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
	// Reset feedback when user types
	function clearFeedback() {
		// Only reset if it was previously in a final state
		if (formState === 'error' || formState === 'success' || formState === 'invalid_token') {
			formState = 'idle';
			feedbackMessage = '';
		}
	}

	// Optional: Basic Password Strength Calculation
	function calculateStrength(pw: string): number {
		let score = 0;
		if (!pw || pw.length < 8) return 0; // Too short is score 0
		if (pw.length >= 8) score++; // Min length
		if (pw.length >= 12) score++; // Longer is better
		if (/\d/.test(pw)) score++; // Contains number
		if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++; // Contains lower & upper
		if (/[^A-Za-z0-9]/.test(pw)) score++; // Contains symbol
		return Math.min(score, 4); // Cap score at 4 (very strong) - adjust levels as needed
	}

	// Update strength as password changes
	$effect(() => {
		passwordStrength = calculateStrength(newPassword);
	});

	// Derived state for disabling form elements
	const isSubmitting = $derived(formState === 'submitting');
	// Disable form completely on success or invalid token
	const formDisabled = $derived(
		isSubmitting || formState === 'success' || formState === 'invalid_token'
	);

	// Password strength styles
	const strengthColors = [
		'bg-gray-300 dark:bg-neutral-600', // 0 (or too short)
		'bg-red-500', // 1 Weak
		'bg-yellow-500', // 2 Medium
		'bg-lime-500', // 3 Strong
		'bg-green-500' // 4 Very Strong
	];
	const strengthText = ['', 'Weak', 'Medium', 'Strong', 'Very Strong'];
</script>

<div class="flex items-center justify-center">
	<div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl dark:bg-neutral-900">
		<!-- Header -->
		<div>
			<h2
				class="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
			>
				Set New Password
			</h2>
			{#if formState !== 'success' && formState !== 'invalid_token'}
				<p class="mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
					Please enter and confirm your new secure password below.
				</p>
			{/if}
		</div>

		<!-- Form -->
		<form class="mt-8 space-y-5" onsubmit={handleSetNewPassword}>
			<!-- New Password Input -->
			<div>
				<label
					for="new-password"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>New Password</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Lock class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="new-password"
						name="new-password"
						type={showPassword ? 'text' : 'password'}
						autocomplete="new-password"
						required
						bind:value={newPassword}
						oninput={clearFeedback}
						disabled={formDisabled}
						aria-invalid={formState === 'error' &&
							feedbackMessage.toLowerCase().includes('password')}
						class="block w-full rounded-md border-0 py-2.5 pr-10 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="Min. 8 characters"
					/>
					<button
						type="button"
						onclick={togglePasswordVisibility}
						disabled={formDisabled}
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
				<!-- Password Strength Indicator -->
				{#if newPassword.length > 0 && formState !== 'success' && formState !== 'invalid_token'}
					<div class="mt-2 flex items-center gap-2">
						<div
							class="h-1.5 flex-grow overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"
						>
							<div
								class="h-full rounded-full {strengthColors[
									passwordStrength
								]} transition-all duration-300"
								style:width={`${(passwordStrength / 4) * 100}%`}
							></div>
						</div>
						<span
							class="text-xs font-medium {passwordStrength > 0
								? strengthColors[passwordStrength].replace('bg-', 'text-')
								: 'text-gray-500 dark:text-neutral-400'}"
						>
							{strengthText[passwordStrength] || 'Too short'}
						</span>
					</div>
				{/if}
			</div>

			<!-- Confirm New Password Input -->
			<div>
				<label
					for="confirm-new-password"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Confirm New Password</label
				>
				<div class="relative mt-1 rounded-md shadow-sm">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Lock class="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						id="confirm-new-password"
						name="confirm-new-password"
						type={showConfirmPassword ? 'text' : 'password'}
						autocomplete="new-password"
						required
						bind:value={confirmPassword}
						oninput={clearFeedback}
						disabled={formDisabled}
						aria-invalid={formState === 'error' && feedbackMessage.toLowerCase().includes('match')}
						class="block w-full rounded-md border-0 py-2.5 pr-10 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="Re-enter new password"
					/>
					<button
						type="button"
						onclick={toggleConfirmPasswordVisibility}
						disabled={formDisabled}
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

			<!-- Feedback Message Area -->
			{#if feedbackMessage}
				<div
					class="flex items-start gap-2.5 rounded-md p-3 text-sm {formState === 'error' ||
					formState === 'invalid_token'
						? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
						: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'}"
					role="alert"
					aria-live="assertive"
				>
					{#if formState === 'error'}
						<AlertCircle class="h-5 w-5 flex-shrink-0" />
					{:else if formState === 'invalid_token'}
						<AlertCircle class="h-5 w-5 flex-shrink-0" />
					{:else if formState === 'success'}
						<CheckCircle class="h-5 w-5 flex-shrink-0" />
					{/if}
					<span>{feedbackMessage}</span>
				</div>
			{/if}

			<!-- Submit Button -->
			<div>
				{#if formState !== 'success' && formState !== 'invalid_token'}
					<button
						type="submit"
						disabled={isSubmitting}
						class="group relative mt-2 flex w-full justify-center rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
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
							<span>Setting Password...</span>
						{:else}
							<RefreshCw class="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
							<span>Set New Password</span>
						{/if}
					</button>
				{/if}
			</div>
		</form>

		<!-- Back to Login Link (shown on success/invalid token) -->
		{#if formState === 'success' || formState === 'invalid_token'}
			<div class="mt-6 text-center">
				<a
					href="/login"
					class="group inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400"
				>
					<ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
					<span>Back to Sign In</span>
				</a>
			</div>
		{/if}
	</div>
</div>
