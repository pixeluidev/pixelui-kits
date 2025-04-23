<!-- src/lib/components/login-form-social/login-form-social.svelte -->
<script lang="ts">
	import { Eye, EyeOff, Github, Mail } from 'lucide-svelte';
	import GoogleIcon from './google-icon.svelte';
	import TwitterIcon from './twitter-icon.svelte'; // Gunakan ikon SVG Twitter

	// --- Form State ---
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let formState: string = $state('idle'); //'idle' | 'submitting' | 'error'
	let errorMessage = $state('');
	let submittingProvider: 'google' | 'github' | 'twitter' | 'email' | null = $state(null);

	// --- Placeholder Submit Handlers ---
	async function handleEmailLogin() {
		if (!email || !password) {
			errorMessage = 'Please enter both email and password.';
			formState = 'error';
			return;
		}
		submittingProvider = 'email';
		formState = 'submitting';
		errorMessage = '';
		console.log('Attempting email login with:', { email, password });
		await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API

		// Replace with actual authentication logic
		if (email === 'hello@pixelui.dev' && password === 'password123') {
			alert('Email Login Successful!');
			// Redirect etc.
			formState = 'idle';
			submittingProvider = null;
		} else {
			errorMessage = 'Invalid email or password.';
			formState = 'error';
			submittingProvider = null;
		}
	}

	async function handleSocialLogin(provider: 'google' | 'github' | 'twitter') {
		submittingProvider = provider;
		formState = 'submitting';
		errorMessage = '';
		console.log(`Initiating login with ${provider}...`);
		// Simulate API / OAuth flow start
		await new Promise((resolve) => setTimeout(resolve, 1200));
		alert(`Social login flow for ${provider} started (placeholder).`);
		// In a real app, this would redirect or open a popup,
		// and the state might be handled differently upon return.
		formState = 'idle'; // Reset for demo purposes
		submittingProvider = null;
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

	// Disable all buttons during any submission
	const isSubmittingAny = $derived(formState === 'submitting');
</script>

<div class="flex items-center justify-center px-4 py-12">
	<div
		class="w-full max-w-sm space-y-6 rounded-lg bg-white p-6 shadow-xl sm:p-8 dark:bg-neutral-900"
	>
		<!-- Header -->
		<div>
			<h2
				class="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white"
			>
				Welcome Back!
			</h2>
			<p class="mt-2 text-center text-sm text-gray-500 dark:text-neutral-400">
				Sign in to continue to Pixel UI.
			</p>
		</div>

		<!-- Social Login Buttons (Prioritized) -->
		<div class="space-y-3 pt-2">
			<button
				type="button"
				disabled={isSubmittingAny}
				onclick={() => handleSocialLogin('google')}
				class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
			>
				{#if submittingProvider === 'google'}
					<svg
						class="absolute left-4 h-5 w-5 animate-spin"
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
					<GoogleIcon class="h-5 w-5" />
					<span>Continue with Google</span>
				{/if}
			</button>
			<button
				type="button"
				disabled={isSubmittingAny}
				onclick={() => handleSocialLogin('github')}
				class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
			>
				{#if submittingProvider === 'github'}
					<svg
						class="absolute left-4 h-5 w-5 animate-spin"
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
					<Github class="h-5 w-5" />
					<span>Continue with GitHub</span>
				{/if}
			</button>
			<button
				type="button"
				disabled={isSubmittingAny}
				onclick={() => handleSocialLogin('twitter')}
				class="relative flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
			>
				{#if submittingProvider === 'twitter'}
					<svg
						class="absolute left-4 h-5 w-5 animate-spin"
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
					<TwitterIcon class="h-5 w-5 text-[#1DA1F2]" />
					<!-- Use specific icon -->
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
				<span class="bg-white px-2 text-gray-500 dark:bg-neutral-900 dark:text-neutral-400"
					>Or sign in with email</span
				>
			</div>
		</div>

		<!-- Email/Password Form -->
		<form class="space-y-4" onsubmit={handleEmailLogin}>
			<!-- Email Input -->
			<div>
				<label
					for="email-address"
					class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
					>Email address</label
				>
				<div class="mt-1">
					<input
						id="email-address"
						name="email"
						type="email"
						autocomplete="email"
						required
						bind:value={email}
						oninput={clearError}
						disabled={isSubmittingAny}
						aria-invalid={formState === 'error' && !errorMessage.toLowerCase().includes('password')}
						class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="you@example.com"
					/>
				</div>
			</div>

			<!-- Password Input -->
			<div>
				<div class="flex items-center justify-between">
					<label
						for="password"
						class="block text-sm leading-6 font-medium text-gray-900 dark:text-neutral-200"
						>Password</label
					>
					<div class="text-sm">
						<a
							href="/forgot-password"
							class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
						>
							Forgot password?
						</a>
					</div>
				</div>
				<div class="relative mt-1">
					<input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autocomplete="current-password"
						required
						bind:value={password}
						oninput={clearError}
						disabled={isSubmittingAny}
						aria-invalid={formState === 'error' && errorMessage.toLowerCase().includes('password')}
						class="block w-full rounded-md border-0 px-3 py-2 pr-10 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:ring-inset sm:text-sm sm:leading-6 dark:bg-neutral-700 dark:text-white dark:ring-neutral-600 dark:placeholder:text-neutral-400 dark:focus:ring-orange-400"
						placeholder="••••••••"
					/>
					<button
						type="button"
						onclick={togglePasswordVisibility}
						disabled={isSubmittingAny}
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
			<div
				class="min-h-[1.25rem] text-center text-sm text-red-600 dark:text-red-500"
				aria-live="assertive"
			>
				{errorMessage}
			</div>

			<!-- Submit Button -->
			<div>
				<button
					type="submit"
					disabled={isSubmittingAny}
					class="group relative flex w-full justify-center rounded-md bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{#if submittingProvider === 'email'}
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
						<span>Signing in...</span>
					{:else}
						Sign in
					{/if}
				</button>
			</div>
		</form>

		<!-- Register Link -->
		<p class="mt-8 text-center text-sm text-gray-500 dark:text-neutral-400">
			Not a member?
			<a
				href="/register"
				class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
			>
				Sign up now
			</a>
		</p>
	</div>
</div>
