<!-- src/lib/components/signup-form-social/signup-form-social.svelte -->
<script lang="ts">
	import { Eye, EyeOff, Github, AlertCircle } from 'lucide-svelte';
	import GoogleIcon from './google-icon.svelte'; // Reuse Google icon
	import TwitterIcon from './twitter-icon.svelte'; // Reuse or create Twitter icon

	// --- Form State ---
	let name: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let termsAccepted: boolean = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'success' | 'error'
	let feedbackMessage = $state('');
    let submittingProvider: 'google' | 'github' | 'twitter' | 'email' | null = $state(null);


	// --- Placeholder Submit Handlers ---
	async function handleEmailSignUp() {
        // Reset state
		formState = 'submitting';
        submittingProvider = 'email';
		feedbackMessage = '';

        // Basic Validation
        if (!email || !password || !confirmPassword) { feedbackMessage = 'Please fill in all required fields.'; formState = 'error'; submittingProvider = null; return; }
        if (!validateEmail(email)) { feedbackMessage = 'Please enter a valid email address.'; formState = 'error'; submittingProvider = null; return; }
		if (password !== confirmPassword) { feedbackMessage = 'Passwords do not match.'; formState = 'error'; submittingProvider = null; return; }
        if (password.length < 8) { feedbackMessage = 'Password must be at least 8 characters long.'; formState = 'error'; submittingProvider = null; return; }
		if (!termsAccepted) { feedbackMessage = 'You must accept the Terms and Conditions.'; formState = 'error'; submittingProvider = null; return; }

		console.log('Attempting email sign up with:', { name, email }); // Avoid logging password

		// Simulate API Call
		await new Promise(resolve => setTimeout(resolve, 1500));

        // Replace with actual backend integration
        const success = Math.random() > 0.1; // Demo success chance

        if (success) {
            formState = 'success';
            feedbackMessage = "Account created successfully via email! You can now log in.";
        } else {
            formState = 'error';
            feedbackMessage = 'Could not create account with email. Please try again later.';
        }
        submittingProvider = null; // Reset submitting provider
	}

    async function handleSocialSignUp(provider: 'google' | 'github' | 'twitter') {
        submittingProvider = provider;
        formState = 'submitting';
        feedbackMessage = '';
        console.log(`Initiating sign up with ${provider}...`);
        // Simulate API / OAuth flow start
        await new Promise(resolve => setTimeout(resolve, 1200));
        alert(`Social sign up flow for ${provider} started (placeholder). You might be redirected.`);
        // In a real app, handle redirect/popup response
        formState = 'success'; // Assume success for demo after simulation
        feedbackMessage = `Successfully started sign up with ${provider}! Check your email or follow provider instructions.`
        submittingProvider = null;
    }

	// --- Helper Functions ---
    function togglePasswordVisibility() { showPassword = !showPassword; }
    function toggleConfirmPasswordVisibility() { showConfirmPassword = !showConfirmPassword; }
    function validateEmail(emailAddress: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailAddress);
    }
    function clearFeedback() {
        if (formState === 'error' || formState === 'success') {
            formState = 'idle';
            feedbackMessage = '';
        }
    }
    const isSubmittingAny = $derived(formState === 'submitting');

</script>

<div class="flex  items-center justify-center ">
	<div class="w-full max-w-sm space-y-6 rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900 sm:p-8">
		<!-- Header -->
		<div>
			<h2 class="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
				Create Your Account
			</h2>
			<p class="mt-2 text-center text-sm text-gray-500 dark:text-neutral-400">
				Get started with Pixel UI today.
			</p>
		</div>

        <!-- Social Sign Up Buttons (Prioritized) -->
        <div class="space-y-3 pt-4">
            <p class="text-center text-sm font-medium text-gray-600 dark:text-neutral-400">Sign up quickly with</p>
            <button
                type="button"
                disabled={isSubmittingAny}
                onclick={() => handleSocialSignUp('google')}
                class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
                {#if submittingProvider === 'google'}
                    <svg class="absolute left-4 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Processing...</span>
                {:else}
                    <GoogleIcon class="h-5 w-5" />
                    <span>Continue with Google</span>
                {/if}
            </button>
             <button
                type="button"
                disabled={isSubmittingAny}
                onclick={() => handleSocialSignUp('github')}
                class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
                 {#if submittingProvider === 'github'}
                     <svg class="absolute left-4 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     <span>Processing...</span>
                {:else}
                    <Github class="h-5 w-5" />
                    <span>Continue with GitHub</span>
                 {/if}
            </button>
             <button
                type="button"
                disabled={isSubmittingAny}
                onclick={() => handleSocialSignUp('twitter')}
                class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
            >
                 {#if submittingProvider === 'twitter'}
                     <svg class="absolute left-4 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     <span>Processing...</span>
                {:else}
                    <TwitterIcon class="h-5 w-5 text-[#1DA1F2]" />
                    <span>Continue with Twitter</span>
                 {/if}
            </button>
        </div>

         <!-- Divider -->
        <div class="relative my-6">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200 dark:border-neutral-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500 dark:bg-neutral-900 dark:text-neutral-400">Or sign up with email</span>
            </div>
        </div>

		<!-- Email/Password Sign Up Form -->
		<form class="space-y-4" onsubmit={handleEmailSignUp}>
            <!-- Name Input (Optional) -->
            <div>
                <label for="full-name" class="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-200">Full Name (Optional)</label>
                <div class="mt-1 relative">
                     <!-- Icon removed for simpler look, can be added back -->
                    <input type="text" name="full-name" id="full-name" bind:value={name} oninput={clearFeedback} disabled={isSubmittingAny}
                        class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
                        placeholder="John Doe" autocomplete="name" />
                </div>
            </div>

			<!-- Email Input -->
			<div>
                <label for="email-address" class="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-200">Email address</label>
                 <div class="mt-1 relative">
                    <input id="email-address" name="email" type="email" autocomplete="email" required bind:value={email} oninput={clearFeedback} disabled={isSubmittingAny} aria-invalid={formState === 'error'}
                        class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
                        placeholder="you@example.com" />
                </div>
            </div>

			<!-- Password Input -->
			<div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-200">Password</label>
                <div class="mt-1 relative">
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} autocomplete="new-password" required bind:value={password} oninput={clearFeedback} disabled={isSubmittingAny} aria-invalid={formState === 'error' && feedbackMessage.toLowerCase().includes('password')}
                        class="block w-full rounded-md border-0 px-3 py-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
                        placeholder="Min. 8 characters" />
                     <button type="button" onclick={togglePasswordVisibility} disabled={isSubmittingAny} class="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                        {#if showPassword} <EyeOff class="h-5 w-5" aria-hidden="true" /> {:else} <Eye class="h-5 w-5" aria-hidden="true" /> {/if}
                    </button>
                </div>
            </div>

            <!-- Confirm Password Input -->
			<div>
                <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-900 dark:text-neutral-200">Confirm Password</label>
                <div class="mt-1 relative">
                    <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? 'text' : 'password'} autocomplete="new-password" required bind:value={confirmPassword} oninput={clearFeedback} disabled={isSubmittingAny} aria-invalid={formState === 'error' && feedbackMessage.toLowerCase().includes('password')}
                        class="block w-full rounded-md border-0 px-3 py-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
                        placeholder="Re-enter password" />
                    <button type="button" onclick={toggleConfirmPasswordVisibility} disabled={isSubmittingAny} class="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none dark:text-neutral-500 dark:hover:text-neutral-400" aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}>
                        {#if showConfirmPassword} <EyeOff class="h-5 w-5" aria-hidden="true" /> {:else} <Eye class="h-5 w-5" aria-hidden="true" /> {/if}
                    </button>
                </div>
            </div>

            <!-- Terms & Conditions Checkbox -->
            <div class="flex items-start pt-2">
                <div class="flex h-6 items-center">
                    <input id="terms-conditions" name="terms-conditions" type="checkbox" required bind:checked={termsAccepted} onchange={clearFeedback} disabled={isSubmittingAny} aria-invalid={formState === 'error' && feedbackMessage.includes('Terms')}
                        class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-900 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-900" />
                </div>
                <div class="ml-3 text-sm leading-6">
                    <label for="terms-conditions" class="text-gray-700 dark:text-neutral-300"> I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" class="font-medium text-orange-600 hover:underline dark:text-orange-400">Terms</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" class="font-medium text-orange-600 hover:underline dark:text-orange-400">Privacy Policy</a>. </label>
                </div>
            </div>

            <!-- Feedback Message Area -->
            {#if feedbackMessage && submittingProvider === 'email'} <!-- Only show email feedback here -->
                 <div class="flex items-center gap-2 rounded-md p-3 text-sm {formState === 'error' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'}" role="alert" aria-live="assertive">
                    {#if formState === 'error'} <AlertCircle class="h-5 w-5 flex-shrink-0" /> {/if}
                    <span>{feedbackMessage}</span>
                 </div>
            {/if}
            {#if feedbackMessage && submittingProvider !== 'email' && submittingProvider !== null} <!-- Show social feedback maybe above buttons? Or rely on alerts -->
                 <!-- Optional: Display social feedback near social buttons if desired -->
            {/if}


            <!-- Submit Button -->
			<div class="pt-2">
				<button
					type="submit"
					disabled={isSubmittingAny}
					class="group relative flex w-full justify-center rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
				>
                     {#if submittingProvider === 'email'}
                         <svg class="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         <span>Creating account...</span>
                    {:else}
                        Create Email Account
                    {/if}
				</button>
			</div>
		</form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-sm text-gray-500 dark:text-neutral-400">
            Already have an account?
            <a href="/login" class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
                Sign in here
            </a>
        </p>

	</div>
</div>