<script lang="ts">
	// import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import HelpCircle from 'lucide-svelte/icons/help-circle';

	// --- Order Summary Data (Static example) ---
	const orderSummary = {
		originalPrice: 6122.0,
		savings: -239.0,
		storePickup: 99.0,
		tax: 719.0,
		currency: 'USD' // Example currency
	};
	// Calculate total reactively
	const totalAmount =
		orderSummary.originalPrice + orderSummary.savings + orderSummary.storePickup + orderSummary.tax; // Format currency helper
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: orderSummary.currency
		}).format(amount);
	};

	// --- Form State ---
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

	// --- Dynamic Years ---
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 10 }, (_, i) => currentYear + i);

	// --- Input Handlers ---
	function formatCardNumber() {
		cardNumberRaw = cardNumberRaw.replace(/\D/g, '').slice(0, 16);
	}

	function formatCvv() {
		cvv = cvv.replace(/\D/g, '').slice(0, 3);
	}

	// --- Tooltip Handlers ---
	function showCvvTooltip() {
		isCvvTooltipVisible = true;
	}

	function hideCvvTooltip() {
		isCvvTooltipVisible = false;
	}

	// --- Form Submission ---
	function handleSubmit() {
		if (!isValid) return;
		console.log('Form Data:', {
			fullName,
			cardNumber: cardNumberRaw,
			expiryMonth,
			expiryYear,
			cvv
		});
		alert(`Processing payment for ${fullName}... (Demo)`);
		// Reset or navigate after successful submission simulation
	}
</script>

<section class="mx-auto w-full max-w-5xl py-12 md:py-20 dark:from-neutral-900 dark:to-neutral-800">
	<div class="mx-auto w-full px-4 2xl:px-0">
		<div>
			<!-- Section Title -->
			<h2
				class="mb-6 text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:mb-8 lg:text-left dark:text-white"
			>
				Secure Payment
			</h2>

			<!-- Main Layout: Form + Summary -->
			<div class="lg:flex lg:items-start lg:gap-12">
				<!-- Payment Form -->
				<form
					class="w-full space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 lg:max-w-xl dark:border-neutral-700 dark:bg-neutral-800"
					onclick={handleSubmit}
				>
					<!-- Full Name -->
					<div>
						<label
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
							for="full_name"
						>
							Full name <span class="text-red-500">*</span></label
						>
						<input
							bind:value={fullName}
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
							id="full_name"
							name="fullName"
							placeholder="Full Name on Card"
							required
							type="text"
						/>
					</div>

					<!-- Card Number -->
					<div class="relative">
						<label
							class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
							for="card-number-input"
						>
							Card number <span class="text-red-500">*</span></label
						>
						<input
							bind:value={cardNumberRaw}
							class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pe-12 font-mono text-sm tracking-wider text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
							id="card-number-input"
							inputmode="numeric"
							maxlength="16"
							name="cardNumber"
							oninput={formatCardNumber}
							placeholder="0000 0000 0000 0000"
							required
							type="text"
						/>
						<div
							class="pointer-events-none absolute inset-y-0 end-0 top-8 flex items-center pe-3.5"
						>
							<!-- Adjusted top spacing -->
							<CreditCard class="h-5 w-5 text-gray-400 dark:text-neutral-500" strokeWidth={1.5} />
						</div>
					</div>

					<!-- Expiry and CVV Row -->
					<div class="grid grid-cols-4 gap-4">
						<!-- Expiry Month -->
						<div class="relative col-span-2 sm:col-span-1">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="expiry-month">Month*</label
							>
							<select
								bind:value={expiryMonth}
								class="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:ring-orange-600/50"
								id="expiry-month"
								name="expiryMonth"
								required
							>
								<option disabled selected value="">MM</option>
								{#each Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')) as month}
									<option value={month}>{month}</option>
								{/each}
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 end-0 top-8 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
							>
								<!-- Adjusted top spacing -->
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
						<div class="relative col-span-2 sm:col-span-1">
							<label
								class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="expiry-year">Year*</label
							>
							<select
								bind:value={expiryYear}
								class="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:ring-orange-600/50"
								id="expiry-year"
								name="expiryYear"
								required
							>
								<option disabled selected value="">YY</option>
								{#each years as year}
									<option value={String(year)}>{String(year).slice(-2)}</option>
								{/each}
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 end-0 top-8 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
							>
								<!-- Adjusted top spacing -->
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
						<div class="relative col-span-4 sm:col-span-2">
							<label
								class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-neutral-300"
								for="cvv-input"
							>
								CVV <span class="text-red-500">*</span>
								<!-- Tooltip Trigger -->
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
								<!-- Tooltip Content (conditionally rendered) -->
								{#if isCvvTooltipVisible}
									<div
										id="cvv-tooltip"
										role="tooltip"
										class="absolute -top-10 left-1/2 z-10 inline-block -translate-x-1/2 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-sm dark:bg-neutral-700"
										transition:fade={{ duration: 150 }}
									>
										3 digits on back of card
									</div>
								{/if}
							</label>
							<input
								bind:value={cvv}
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
								id="cvv-input"
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

					<!-- Submit Button -->
					<div class="pt-4">
						<button
							class={`flex w-full items-center justify-center rounded-lg px-5 py-3 text-base font-medium text-white transition-all duration-200 ease-in-out focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-orange-800 ${isValid ?? 'hover:shadow-orange-400/40'}`}
							class:bg-gradient-to-r={isValid}
							class:bg-gray-300={!isValid}
							class:cursor-not-allowed={!isValid}
							class:dark:bg-neutral-600={!isValid}
							class:dark:text-neutral-400={!isValid}
							class:from-orange-500={isValid}
							class:hover:from-orange-600={isValid}
							class:hover:to-red-600={isValid}
							class:shadow-lg={isValid}
							class:text-gray-500={!isValid}
							class:to-red-500={isValid}
							disabled={!isValid}
							type="submit"
						>
							Pay {formatCurrency(totalAmount)}
						</button>
					</div>
				</form>

				<!-- Order Summary -->
				<div class="mt-6 w-full grow sm:mt-8 lg:mt-0 lg:max-w-sm xl:max-w-md">
					<div
						class="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/50"
					>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h3>
						<div class="space-y-3">
							<dl class="flex items-center justify-between gap-4">
								<dt class="text-sm font-normal text-gray-500 dark:text-neutral-400">
									Original price
								</dt>
								<dd class="text-sm font-medium text-gray-900 dark:text-white">
									{formatCurrency(orderSummary.originalPrice)}
								</dd>
							</dl>

							<dl class="flex items-center justify-between gap-4">
								<dt class="text-sm font-normal text-gray-500 dark:text-neutral-400">Savings</dt>
								<dd class="text-sm font-medium text-green-600 dark:text-green-400">
									{formatCurrency(orderSummary.savings)}
								</dd>
							</dl>

							<dl class="flex items-center justify-between gap-4">
								<dt class="text-sm font-normal text-gray-500 dark:text-neutral-400">
									Store Pickup
								</dt>
								<dd class="text-sm font-medium text-gray-900 dark:text-white">
									{formatCurrency(orderSummary.storePickup)}
								</dd>
							</dl>

							<dl class="flex items-center justify-between gap-4">
								<dt class="text-sm font-normal text-gray-500 dark:text-neutral-400">Tax</dt>
								<dd class="text-sm font-medium text-gray-900 dark:text-white">
									{formatCurrency(orderSummary.tax)}
								</dd>
							</dl>
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

					<!-- Payment Method Icons -->
					<div class="mt-6 flex items-center justify-center gap-6 px-4">
						<img alt="PayPal" class="h-7 w-auto dark:hidden" src="/images/paypal.svg" />
						<img
							alt="PayPal Dark"
							class="hidden h-7 w-auto dark:block"
							src="/images/paypal-dark.svg"
						/>
						<img alt="Visa" class="h-7 w-auto dark:hidden" src="/images/visa.svg" />
						<img alt="Visa Dark" class="hidden h-7 w-auto dark:block" src="/images/visa-dark.svg" />
						<img alt="MasterCard" class="h-7 w-auto dark:hidden" src="/images/mastercard.svg" />
						<img
							alt="MasterCard Dark"
							class="hidden h-7 w-auto dark:block"
							src="/images/mastercard-dark.svg"
						/>
					</div>
				</div>
			</div>

			<!-- Footer Text -->
			<p class="mt-8 text-center text-sm text-gray-500 lg:text-left dark:text-neutral-400">
				Payment processed securely by <a
				class="font-medium text-orange-600 underline hover:no-underline dark:text-orange-400"
				href="/components"
				title="Payment Processor">SecurePay Inc.</a
			>
			</p>
		</div>
	</div>
</section>
