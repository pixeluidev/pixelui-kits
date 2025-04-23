<script lang="ts">
	import { Eye, EyeOff, Github, Twitter } from 'lucide-svelte'; // Import required icons
    // Import Google icon - Lucide doesn't have it, use a simple SVG or another library
    import GoogleIcon from './google-icon.svelte'; // Assume you create this simple SVG component

	// --- Form State ---
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let formState: 'idle' | 'submitting' | 'error' = $state('idle');
	let errorMessage = $state('');

	// --- Placeholder Submit Handler ---
	async function handleLogin() {
        if (!email || !password) {
            errorMessage = 'Please enter both email and password.';
            formState = 'error';
            return;
        }
		formState = 'submitting';
		errorMessage = '';
		console.log('Attempting login with:', { email, password });

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1500));

        // --- Replace with actual authentication logic ---
        // Example: Check credentials (highly insecure, for demo only!)
        if (email === 'hello@pixelui.dev' && password === 'password123') {
             alert('Login Successful! (Redirecting...)');
             // window.location.href = '/dashboard'; // Redirect on success
             formState = 'idle'; // Reset state after successful redirect simulation
        } else {
             errorMessage = 'Invalid email or password.';
             formState = 'error';
        }
        // --- End of placeholder logic ---
	}

    // --- Social Login Placeholders ---
    function handleSocialLogin(provider: 'google' | 'github' | 'twitter') {
        formState = 'submitting'; // Indicate activity
        errorMessage = '';
        console.log(`Initiating login with ${provider}...`);
         alert(`Social login with ${provider} is not implemented yet.`);
         // Simulate ending the process
         setTimeout(() => { formState = 'idle'; }, 500);
        // TODO: Implement actual OAuth flow for each provider
    }

    // --- Helper to toggle password visibility ---
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }

    // Reset error when user types
    function clearError() {
        if (formState === 'error') {
            formState = 'idle';
            errorMessage = '';
        }
    }

</script>

<div class="flex items-center justify-center px-4 py-12 ">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-800">
		<!-- Header -->
		<div>
			<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
				Sign in to Pixel UI
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-neutral-400">
				Or{' '}
				<a href="/register" class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
					start your 14-day free trial
				</a>
			</p>
		</div>

		<!-- Form -->
		<form class="mt-8 space-y-6" onsubmit={handleLogin}>
			<input type="hidden" name="remember" value="true" />
			<div class="-space-y-px rounded-md shadow-sm">
				<!-- Email Input -->
				<div>
					<label for="email-address" class="sr-only">Email address</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
                        oninput={clearError}
						class="relative block w-full rounded-t-md border-0 px-3 py-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
						placeholder="Email address"
                        aria-invalid={formState === 'error'}
                        disabled={formState === 'submitting'}
					/>
				</div>
				<!-- Password Input -->
				<div class="relative">
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autocomplete="current-password"
						required
						bind:value={password}
                        oninput={clearError}
						class="relative block w-full rounded-b-md border-0 px-3 py-2.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-500 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400 sm:text-sm sm:leading-6"
						placeholder="Password"
                        aria-invalid={formState === 'error'}
                        disabled={formState === 'submitting'}
					/>
                    <button
                        type="button"
                        onclick={togglePasswordVisibility}
                        disabled={formState === 'submitting'}
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

            <!-- Error Message -->
             <div class="min-h-[1.25rem] text-center text-sm text-red-600 dark:text-red-500" aria-live="assertive">
                {errorMessage}
             </div>

			<div class="flex items-center justify-between">
				<!-- Remember me (optional, can be uncommented) -->
				<!-- <div class="flex items-center">
					<input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800">
					<label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-neutral-300">Remember me</label>
				</div> -->

				<div class="text-sm">
					<a href="/category/authentication" class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
						Forgot your password?
					</a>
				</div>
			</div>

            <!-- Submit Button -->
			<div>
				<button
					type="submit"
					disabled={formState === 'submitting'}
					class="group relative flex w-full justify-center rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
				>
                    {#if formState === 'submitting'}
                         <svg class="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         <span>Signing in...</span>
                    {:else}
                        Sign in
                    {/if}
				</button>
			</div>
		</form>

        <!-- Divider -->
        <div class="relative my-8">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300 dark:border-neutral-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500 dark:bg-neutral-800 dark:text-neutral-400">Or continue with</span>
            </div>
        </div>

        <!-- Social Login Buttons -->
        <div class="mt-6 grid grid-cols-3 gap-3">
            <div>
                <button
                    type="button"
                    onclick={() => handleSocialLogin('google')}
                    disabled={formState === 'submitting'}
                    class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-offset-0 dark:bg-neutral-700 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Sign in with Google"
                >
                    <GoogleIcon class="h-5 w-5" />
                </button>
            </div>
            <div>
                 <button
                    type="button"
                    onclick={() => handleSocialLogin('twitter')}
                    disabled={formState === 'submitting'}
                    class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-offset-0 dark:bg-neutral-700 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Sign in with Twitter"
                >
                    <Twitter class="h-5 w-5 text-[#1DA1F2]" /> <!-- Twitter color -->
                </button>
            </div>
             <div>
                 <button
                    type="button"
                    onclick={() => handleSocialLogin('github')}
                    disabled={formState === 'submitting'}
                    class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-offset-0 dark:bg-neutral-700 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Sign in with GitHub"
                >
                    <Github class="h-5 w-5 text-gray-700 dark:text-neutral-300" />
                </button>
            </div>
        </div>

	</div>
</div>

