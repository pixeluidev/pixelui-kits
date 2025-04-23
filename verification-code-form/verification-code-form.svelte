<!-- src/lib/components/verification-code-form/verification-code-form.svelte -->
<script lang="ts">
	import { Mail, Smartphone, Send, RefreshCw, AlertCircle, CheckCircle } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	// --- Component Props ---
	/** The number of digits expected in the code. */
	const codeLength: number = 6;
	/** The destination where the code was sent (e.g., masked email or phone number). */
	const destination: string = 'your******@example.com'; // Example destination
	/** The type of destination (email or phone) for icon display. */
	const destinationType: 'email' | 'phone' = 'email';

	// --- Component State ---
	let digits = $state<string[]>(Array(codeLength).fill('')); // Array to hold each digit
	let inputRefs: HTMLInputElement[] = []; // To hold references to the input elements
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'success' | 'error' | 'resending'
	let feedbackMessage = $state('');
	let resendCooldown = $state(0); // Cooldown timer in seconds
	let resendInterval: ReturnType<typeof setInterval> | null = null;

	// --- Computed State ---
	const isSubmitting = $derived(formState === 'submitting');
	const canResend = $derived(resendCooldown === 0 && formState !== 'resending');
	// Combine all digits into the final code
	const fullCode = $derived(digits.join(''));

	function clearFeedback() {
		feedbackMessage = '';
		formState = 'idle';
	}

	// --- Logic for Input Interaction ---
	function handleInput(event: Event, index: number) {
		clearFeedback(); // Clear feedback on input
		const inputElement = event.target as HTMLInputElement;
		let value = inputElement.value;

		// Allow only single digit number
		value = value.replace(/[^0-9]/g, ''); // Remove non-digits
		digits[index] = value.slice(-1); // Keep only the last entered digit

		// Auto-focus next input if a digit is entered
		if (value && index < codeLength - 1) {
			inputRefs[index + 1]?.focus();
		}
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		const inputElement = event.target as HTMLInputElement;

		// Backspace: Move focus to previous input if current is empty
		if (event.key === 'Backspace' && !inputElement.value && index > 0) {
			inputRefs[index - 1]?.focus();
		}
		// Arrow Left: Move focus left
		else if (event.key === 'ArrowLeft' && index > 0) {
			inputRefs[index - 1]?.focus();
		}
		// Arrow Right: Move focus right
		else if (event.key === 'ArrowRight' && index < codeLength - 1) {
			inputRefs[index + 1]?.focus();
		}
	}

	function handlePaste(event: ClipboardEvent, startIndex: number) {
		event.preventDefault();
		const pastedData = event.clipboardData?.getData('text').replace(/[^0-9]/g, '') || '';
		if (!pastedData) return;

		const chars = pastedData.split('');
		for (let i = 0; i < chars.length && startIndex + i < codeLength; i++) {
			digits[startIndex + i] = chars[i];
		}

		// Focus the next empty input or the last input
		const nextIndex = Math.min(startIndex + pastedData.length, codeLength - 1);
		inputRefs[nextIndex]?.focus();
		clearFeedback();
	}

	// Store input references
	function storeRef(el: HTMLInputElement, index: number) {
		if (el) {
			inputRefs[index] = el;
		}
	}

	// --- Submit Handler ---
	async function handleSubmit() {
		// 1. Check if all digits are filled
		const code = digits.join('');
		if (code.length !== codeLength) {
			feedbackMessage = `Please enter all ${codeLength} digits.`;
			formState = 'error';
			return;
		}

		// 2. Reset state
		formState = 'submitting';
		feedbackMessage = '';
		console.log('Verifying code:', code);

		// 3. Simulate API Call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// --- Replace with actual backend verification ---
		// Example: Simulate success/failure
		const success = code === '123456'; // Example: Correct code for demo

		if (success) {
			formState = 'success';
			feedbackMessage = 'Verification successful!';
			// Optionally redirect or trigger next step
		} else {
			formState = 'error';
			feedbackMessage = 'Incorrect verification code. Please try again.';
			// Optionally clear digits on error
			// digits = Array(codeLength).fill('');
			// inputRefs[0]?.focus();
		}
		// --- End of placeholder logic ---
	}

	// --- Resend Code Handler ---
	async function handleResendCode() {
		if (!canResend) return;

		formState = 'resending';
		feedbackMessage = '';
		console.log('Requesting resend code to:', destination);

		// Simulate API Call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// --- Replace with actual backend integration ---
		const resendSuccess = Math.random() > 0.1; // Demo

		if (resendSuccess) {
			feedbackMessage = `A new code has been sent to ${destination}.`;
			startResendCooldown(60); // Start 60-second cooldown
			formState = 'idle'; // Return to idle after showing message briefly or keep success state? Let's keep idle
		} else {
			feedbackMessage = 'Failed to resend code. Please try again later.';
			formState = 'error';
		}
	}

	// --- Cooldown Timer Logic ---
	function startResendCooldown(seconds: number) {
		resendCooldown = seconds;
		if (resendInterval) clearInterval(resendInterval); // Clear existing interval if any

		resendInterval = setInterval(() => {
			resendCooldown = Math.max(0, resendCooldown - 1);
			if (resendCooldown === 0 && resendInterval) {
				clearInterval(resendInterval);
				resendInterval = null;
				// Reset state if it was stuck in resending (though unlikely with current logic)
				if (formState === 'resending') formState = 'idle';
			}
		}, 1000);
	}

	// Clear interval on component destroy
	onDestroy(() => {
		if (resendInterval) {
			clearInterval(resendInterval);
		}
	});

	// Initialize cooldown on mount if needed (e.g., if coming back to page)
	// onMount(() => { startResendCooldown(60); }); // Example: Start cooldown immediately
</script>

<div class="flex items-center justify-center">
	<div class="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-xl dark:bg-neutral-900">
		<!-- Header -->
		<div class="text-center">
			<!-- Icon based on destination type -->
			{#if destinationType === 'email'}
				<Mail class="mx-auto h-12 w-12 text-orange-500" />
			{:else}
				<Smartphone class="mx-auto h-12 w-12 text-orange-500" />
			{/if}
			<h2 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
				Enter Verification Code
			</h2>
			<p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
				A {codeLength}-digit code was sent to
				<span class="font-medium text-gray-800 dark:text-neutral-200">{destination}</span>. Please
				enter it below.
			</p>
		</div>

		<!-- Form -->
		<form class="mt-8 space-y-6" onsubmit={handleSubmit}>
			<!-- Code Input Boxes -->
			<fieldset class="disabled:opacity-70" disabled={isSubmitting || formState === 'success'}>
				<legend class="sr-only">Verification Code</legend>
				<div class="flex justify-center gap-2 sm:gap-3">
					{#each { length: codeLength } as _, i (i)}
						<label for="code-{i}" class="sr-only">Digit {i + 1}</label>
						<input
							type="tel"
							inputmode="numeric"
							pattern="[0-9]"
							maxlength="1"
							id="code-{i}"
							name="code-{i}"
							bind:this={inputRefs[i]}
							use:storeRef={i}
							bind:value={digits[i]}
							oninput={(e) => handleInput(e, i)}
							onkeydown={(e) => handleKeyDown(e, i)}
							onpaste={(e) => handlePaste(e, i)}
							required
							autocomplete="off"
							class="block h-12 w-12 rounded-md border-0 text-center text-lg font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:h-14 sm:w-14 sm:text-xl dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
							aria-label="Digit {i + 1}"
						/>
					{/each}
				</div>
			</fieldset>

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
					<span>{feedbackMessage}</span>
				</div>
			{/if}

			<!-- Submit Button -->
			<div class="pt-2">
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
						<span>Verifying...</span>
					{:else}
						<Send class="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
						<span>Verify Code</span>
					{/if}
				</button>
			</div>
		</form>

		<!-- Resend Code Link/Button -->
		<div class="mt-6 text-center text-sm">
			<button
				type="button"
				onclick={handleResendCode}
				disabled={!canResend}
				class="font-medium text-orange-600 hover:text-orange-500 focus:underline focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 dark:text-orange-400 dark:hover:text-orange-300 dark:disabled:text-neutral-500"
			>
				{#if formState === 'resending'}
					<RefreshCw class="inline-block h-4 w-4 animate-spin" /> Sending...
				{:else if resendCooldown > 0}
					Resend code in {resendCooldown}s
				{:else}
					Resend Code
				{/if}
			</button>
		</div>
	</div>
</div>
