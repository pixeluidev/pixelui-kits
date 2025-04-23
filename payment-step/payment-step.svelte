<script lang="ts">
	import { fade } from 'svelte/transition';
	// Import data and types
	import { checkoutSteps, orderSummaryData, orderCurrency } from './data'; // Adjust path if needed

	// Import icons
	// import GoogleIcon from './components/icons/GoogleIcon.svelte'; // Assuming you create these simple SVG components
	// import PaypalIcon from './components/icons/PaypalIcon.svelte';
	// import Calendar from 'lucide-svelte/icons/calendar-days';
	import CreditCardIcon from 'lucide-svelte/icons/credit-card';
	import HelpCircle from 'lucide-svelte/icons/help-circle';
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';

	// --- State ---
	let currentStepId: string = 'payment'; // Set the current active step

	// Form state
	let fullName: string = '';
	let cardNumberRaw: string = '';
	let expiryMonth: string = '';
	let expiryYear: string = '';
	let cvv: string = '';
	let isCvvTooltipVisible: boolean = false;

	// --- Derived State ---
	// $: cardNumberFormatted = cardNumberRaw.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);

	$: isValid =
		fullName.trim().length > 3 &&
		cardNumberRaw.length === 16 &&
		expiryMonth !== '' &&
		expiryYear !== '' &&
		cvv.length === 3;

	const totalAmount = orderSummaryData.reduce((sum, item) => sum + item.amount, 0);

	// --- Dynamic Years ---
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 10 }, (_, i) => currentYear + i);

	// --- Input Formatters ---
	function formatCardNumber() {
		cardNumberRaw = cardNumberRaw.replace(/\D/g, '').slice(0, 16);
	}

	function formatCvv() {
		cvv = cvv.replace(/\D/g, '').slice(0, 3);
	}

	// --- Tooltip ---
	function showCvvTooltip() {
		isCvvTooltipVisible = true;
	}

	function hideCvvTooltip() {
		isCvvTooltipVisible = false;
	}

	// --- Currency Formatter ---
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: orderCurrency }).format(
			amount
		);
	};

	// --- Form Submission ---
	function handleSubmit() {
		if (!isValid) return;
		console.log('Submitting Payment:', {
			fullName,
			cardNumber: cardNumberRaw,
			expiryMonth,
			expiryYear,
			cvv
		});
		alert(`Payment Processing for ${fullName}... (Demo)`);
		// Simulate moving to next step after successful fake payment
		setTimeout(() => {
			currentStepId = 'confirm';
		}, 1000);
	}

	// --- Stepper Logic ---
	const currentStepIndex = checkoutSteps.findIndex((step) => step.id === currentStepId);
</script>

<section
	class="bg-gradient-to-br from-gray-100 to-blue-50 py-12 antialiased md:py-16 dark:from-neutral-900 dark:to-neutral-800"
>
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="mx-auto max-w-5xl">
			<!-- Elegant Stepper -->
			<ol
				class="mb-8 flex w-full items-center text-center text-sm font-medium text-gray-500 sm:text-base md:mb-12 dark:text-neutral-400"
			>
				{#each checkoutSteps as step, i (step.label)}
					{@const isCompleted = i < currentStepIndex}
					{@const isCurrent = i === currentStepIndex}
					<li
						class={`flex items-center md:w-full ${isCompleted || isCurrent ? 'text-primary dark:text-orange-400' : ''} ${i < checkoutSteps.length - 1 ? "after:mx-6 after:hidden after:h-1 after:w-full after:border-1 after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] xl:after:mx-10 dark:after:border-neutral-700" : ''}`}
					>
						<span
							class={`flex items-center ${i < checkoutSteps.length - 1 ? "sm:after:content-['/']" : ''} after:mx-2 after:text-gray-200 sm:after:hidden dark:after:text-neutral-500`}
						>
							{#if isCompleted}
								<CheckCircle2 class="me-2 h-4 w-4 sm:me-2.5 sm:h-5 sm:w-5" />
							{:else}
								<span
									class={`me-2 flex h-4 w-4 items-center justify-center rounded-full border sm:me-2.5 sm:h-5 sm:w-5 ${isCurrent ? 'border-primary dark:border-orange-400' : 'border-gray-400 dark:border-neutral-600'} shrink-0`}
								>
									{#if isCurrent}<span
											class="bg-primary h-1.5 w-1.5 rounded-full dark:bg-orange-400"
										></span>{/if}
								</span>
							{/if}
							{step.label}
						</span>
					</li>
				{/each}
			</ol>

			<!-- Main Content Grid -->
			<div class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
				<!-- Payment Form Section (adjust column span as needed) -->
				<form
					class="w-full space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 lg:col-span-7 xl:col-span-8 dark:border-neutral-700 dark:bg-neutral-800"
					onclick={handleSubmit}
				>
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Pay with Credit Card</h2>

					<!-- Form Fields Grid -->
					<div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
						<!-- Full Name -->
						<div class="sm:col-span-2">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="full_name-2"
							>
								Full name (on card)<span class="text-red-500">*</span></label
							>
							<input
								bind:value={fullName}
								class="focus:border-primary dark:focus:ring-primary/50 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
								id="full_name-2"
								name="fullName"
								placeholder="BONNIE GREEN"
								required
								type="text"
							/>
						</div>

						<!-- Card Number -->
						<div class="relative sm:col-span-2">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="card-number-input-2"
							>
								Card number<span class="text-red-500">*</span>
							</label>
							<input
								bind:value={cardNumberRaw}
								class="focus:border-primary dark:focus:ring-primary/50 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pe-12 font-mono text-sm tracking-wider text-gray-900 placeholder-gray-400 transition duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
								id="card-number-input-2"
								inputmode="numeric"
								maxlength="16"
								name="cardNumber"
								oninput={formatCardNumber}
								placeholder="0000 0000 0000 0000"
								required
								type="text"
							/>
							<div
								class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-3.5"
							>
								<CreditCardIcon
									class="h-5 w-5 text-gray-400 dark:text-neutral-500"
									strokeWidth={1.5}
								/>
							</div>
						</div>

						<!-- Expiry Month -->
						<div class="relative">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="expiry-month-2">Month*</label
							>
							<select
								bind:value={expiryMonth}
								class="focus:border-primary dark:focus:ring-primary/50 block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
								id="expiry-month-2"
								name="expiryMonth"
								required
							>
								<option disabled selected value="">MM</option>
								{#each Array.from( { length: 12 }, (_, i) => String(i + 1).padStart(2, '0') ) as month (month)}
									<option value={month}>{month}</option>
								{/each}
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 8l4 4 4-4"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									/>
								</svg>
							</div>
						</div>
						<!-- Expiry Year -->
						<div class="relative">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="expiry-year-2">Year*</label
							>
							<select
								bind:value={expiryYear}
								class="focus:border-primary dark:focus:ring-primary/50 block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
								id="expiry-year-2"
								name="expiryYear"
								required
							>
								<option disabled selected value="">YY</option>
								{#each years as year (year)}
									<option value={String(year)}>{String(year).slice(-2)}</option>
								{/each}
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 8l4 4 4-4"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
									/>
								</svg>
							</div>
						</div>

						<!-- CVV -->
						<div class="relative sm:col-span-2">
							<!-- Made CVV span 2 cols for better alignment -->
							<label
								class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="cvv-input-2"
							>
								CVV <span class="text-red-500">*</span>
								<button
									aria-describedby="cvv-tooltip"
									class="text-gray-400 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300"
									onblur={hideCvvTooltip}
									onfocus={showCvvTooltip}
									onmouseenter={showCvvTooltip}
									onmouseleave={hideCvvTooltip}
									type="button"
								>
									<HelpCircle class="h-4 w-4" />
								</button>
								{#if isCvvTooltipVisible}
									<div
										id="cvv-tooltip"
										role="tooltip"
										class="absolute -top-10 left-10 z-10 inline-block rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-sm dark:bg-neutral-700"
										transition:fade={{ duration: 150 }}
									>
										3 digits on back of card
									</div>
								{/if}
							</label>
							<input
								bind:value={cvv}
								class="focus:border-primary dark:focus:ring-primary/50 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
								id="cvv-input-2"
								inputmode="numeric"
								maxlength="3"
								name="cvv"
								oninput={formatCvv}
								placeholder="•••"
								required
								type="text"
							/>
						</div>
					</div>
					<!-- End Form Fields Grid -->

					<!-- Divider and Alternative Payments -->
					<div class="relative my-6 flex items-center justify-center sm:my-8">
						<div aria-hidden="true" class="absolute inset-0 flex items-center">
							<div class="w-full border-t border-gray-200 dark:border-neutral-700"></div>
						</div>
						<div class="relative bg-white px-3 dark:bg-neutral-800">
							<span class="text-sm font-medium text-gray-500 dark:text-neutral-400"
								>or pay with</span
							>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<button
							class="flex w-full items-center justify-center gap-x-2.5 rounded-lg border border-gray-600 bg-black px-5 py-3 text-sm font-medium text-gray-100 transition-colors duration-150 hover:bg-gray-700 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-800"
							type="button"
						>
							<img alt="Google" class=" size-5 w-auto" src="/images/google-symbol.svg" />
							Google Pay
						</button>
						<button
							class="flex w-full items-center justify-center gap-x-2.5 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-800"
							type="button"
						>
							<img
								alt="PayPal Dark"
								class="hidden size-5 w-auto dark:block"
								src="/images/paypal-dark.svg"
							/>
							<img alt="PayPal" class="h-7 w-auto dark:hidden" src="/images/paypal.svg" />
							Paypal
						</button>
					</div>
				</form>

				<!-- Order Summary Section (adjust column span as needed) -->
				<div class="mt-6 w-full grow lg:col-span-5 lg:mt-0 xl:col-span-4">
					<div
						class="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60"
					>
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h3>
						<div class="space-y-4">
							{#each orderSummaryData as item (item.label)}
								<dl class="flex items-center justify-between gap-4">
									<dt class="text-sm text-gray-600 dark:text-neutral-400">{item.label}</dt>
									<dd
										class={`text-sm font-medium ${item.isSavings ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}
									>
										{formatCurrency(item.amount)}
									</dd>
								</dl>
							{/each}
						</div>

						<dl
							class="mt-4 flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-neutral-600"
						>
							<dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
							<dd class="text-base font-bold text-gray-900 dark:text-white">
								{formatCurrency(totalAmount)}
							</dd>
						</dl>
					</div>

					<!-- Submit button moved inside form, keep this area for maybe promo code? -->
					<div class="mt-6 text-center">
						<p class="text-sm text-gray-500 dark:text-neutral-400">
							Have a promo code? Apply it at checkout.
						</p>
					</div>
				</div>
				<!-- End Order Summary -->
			</div>
			<!-- End Main Grid -->

			<!-- Footer Text -->
			<p class="mt-8 text-center text-sm text-gray-500 lg:mt-10 lg:text-left dark:text-neutral-400">
				Payment processed securely by <a
					class="text-primary font-medium underline hover:no-underline dark:text-orange-400"
					href="/components"
					title="Payment Processor">SecurePay Inc.</a
				>
			</p>
		</div>
	</div>
</section>

<!-- Example placeholder components for Google/Paypal Icons -->
<!-- Create these in e.g., src/lib/components/icons/ -->
<!-- GoogleIcon.svelte -->
<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...$$props}> ... google path ... </svg> -->

<!-- PaypalIcon.svelte -->
<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...$$props}> ... paypal path ... </svg> -->
