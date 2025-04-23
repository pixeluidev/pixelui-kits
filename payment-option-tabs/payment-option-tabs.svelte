<script lang="ts">
	// import { onMount } from 'svelte';
	// import { fade } from 'svelte/transition';
	// Data & Types
	import {
		checkoutStepsData,
		orderSummaryData,
		orderCurrency,
		promoData,
		paymentTabsData,
		type PaymentTab,
		savedPaymentMethodsData
	} from './data'; // Adjust path

	// Components

	// Tab Content Components
	import OrderSummaryDisplay from './order-summary-display.svelte';
	import PromoSection from './promo-section.svelte';
	import CheckoutStepper from './checkout-stepper.svelte';
	import CreditCardPaymentTab from './credit-card-payment-tab.svelte';
	import InstallmentPaymentTab from './installment-payment-tab.svelte';
	import CyptoPaymentTab from './cypto-payment-tab.svelte';
	import PaypalPaymentTab from './paypal-payment-tab.svelte';
	import { formatCurrency } from './helper';

	// --- Component State ---
	let currentStepId: string = 'payment';
	let activePaymentTabId: PaymentTab['id'] = paymentTabsData[0]?.id ?? 'credit-card'; // Default active tab

	// State for the Credit Card Tab's internal selection & new card form
	let creditCardSubMethodId: string = savedPaymentMethodsData[0]?.id ?? 'new'; // Default within CC tab
	let newCardDetails = {
		fullName: '',
		cardNumberRaw: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: ''
	};

	// --- Derived State ---
	const totalAmount = orderSummaryData.reduce((sum, item) => sum + item.amount, 0);

	// Simplified overall validation - can be made more specific per tab if needed
	const isFormReadyToSubmit = true; // Placeholder - implement real validation based on active tab's needs

	// --- Handlers ---
	function setActiveTab(tabId: PaymentTab['id']) {
		activePaymentTabId = tabId;
	}

	function handleSubmit() {
		if (!isFormReadyToSubmit) return;

		let paymentDetails;
		switch (activePaymentTabId) {
			case 'credit-card':
				if (creditCardSubMethodId === 'new') {
					// Validate newCardDetails here
					if (
						!(
							newCardDetails.fullName &&
							newCardDetails.cardNumberRaw.length === 16 &&
							newCardDetails.expiryMonth &&
							newCardDetails.expiryYear &&
							newCardDetails.cvv.length === 3
						)
					) {
						alert('Please fill in all new card details.');
						return;
					}
					paymentDetails = { method: 'new_credit_card', ...newCardDetails };
				} else {
					paymentDetails = { method: 'saved_card', id: creditCardSubMethodId };
				}
				break;
			case 'monthly-fees':
				// Get selected installment plan, occupation etc. from InstallmentPaymentTab state (would need binding)
				paymentDetails = { method: 'installments', planId: '...' }; // Placeholder
				alert('Installment payment selected (Demo)');
				break;
			case 'crypto':
				// Get selected crypto from CyptoPaymentTab state (would need binding)
				paymentDetails = { method: 'crypto', coinId: '...' }; // Placeholder
				alert('Crypto payment selected (Demo)');
				// Trigger wallet connection etc.
				break;
			case 'paypal':
				paymentDetails = { method: 'paypal' };
				alert('Proceeding to PayPal (Demo)');
				// Redirect to PayPal etc.
				return; // Often handled differently than form submit
			default:
				console.error('Unknown payment tab:', activePaymentTabId);
				return;
		}

		console.log('Submitting Order with Payment:', paymentDetails);
		alert(`Processing payment via ${activePaymentTabId}... (Demo)`);

		// Simulate moving to next step
		setTimeout(() => {
			currentStepId = 'confirm';
		}, 1000);
	}
</script>

<section
	class="bg-gradient-to-br from-gray-100 to-blue-50 py-12 antialiased md:py-16 dark:from-neutral-900 dark:to-neutral-800"
>
	<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
		<div class="mx-auto max-w-5xl">
			<CheckoutStepper {currentStepId} steps={checkoutStepsData} />

			<form onclick={handleSubmit}>
				<div class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
					<!-- Payment Tabs & Content Column -->
					<div class="w-full space-y-8 lg:col-span-7 xl:col-span-8">
						<div
							class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
						>
							<!-- Tabs -->
							<div class="border-b border-gray-200 dark:border-neutral-700">
								<ul
									class="-mb-px flex items-center overflow-x-auto text-center text-sm font-medium text-gray-500 dark:text-neutral-400"
									role="tablist"
								>
									{#each paymentTabsData as tab (tab.id)}
										<li class="me-2 shrink-0" role="presentation">
											<button
												id={`tab-btn-${tab.id}`}
												class="group inline-flex items-center justify-center rounded-t-lg border-b-2 p-4 transition-colors duration-150 ease-in-out focus:ring-1 focus:ring-orange-300 focus:outline-none"
												class:border-primary={activePaymentTabId === tab.id}
												class:dark:border-orange-400={activePaymentTabId === tab.id}
												class:text-primary={activePaymentTabId === tab.id}
												class:dark:text-orange-400={activePaymentTabId === tab.id}
												class:border-transparent={activePaymentTabId !== tab.id}
												class:hover:text-gray-700={activePaymentTabId !== tab.id}
												class:dark:hover:text-neutral-200={activePaymentTabId !== tab.id}
												class:hover:border-gray-300={activePaymentTabId !== tab.id}
												class:dark:hover:border-neutral-600={activePaymentTabId !== tab.id}
												type="button"
												role="tab"
												aria-controls={`tab-panel-${tab.id}`}
												aria-selected={activePaymentTabId === tab.id}
												onclick={() => setActiveTab(tab.id)}
											>
												<svelte:component
													this={tab.icon}
													class={`me-2 h-4 w-4 ${activePaymentTabId === tab.id ? 'text-primary dark:text-orange-400' : 'text-gray-400 group-hover:text-gray-600 dark:text-neutral-500 dark:group-hover:text-neutral-300'}`}
													strokeWidth={2}
												/>
												{tab.label}
											</button>
										</li>
									{/each}
								</ul>
							</div>

							<!-- Tab Content -->
							<div class="p-6 sm:p-8">
								{#if activePaymentTabId === 'credit-card'}
									<CreditCardPaymentTab
										bind:selectedSubMethodId={creditCardSubMethodId}
										bind:newCardDetails
									/>
								{:else if activePaymentTabId === 'monthly-fees'}
									<InstallmentPaymentTab />
								{:else if activePaymentTabId === 'crypto'}
									<CyptoPaymentTab />
								{:else if activePaymentTabId === 'paypal'}
									<PaypalPaymentTab />
								{/if}
							</div>
						</div>

						<!-- Alternative Payment Buttons (can be removed if redundant now) -->
						<!-- ... -->
					</div>
					<!-- End Tabs & Content Column -->

					<!-- Order Summary & Promo Column -->
					<div class="mt-6 w-full grow space-y-6 lg:col-span-5 lg:mt-0 xl:col-span-4">
						<OrderSummaryDisplay
							currency={orderCurrency}
							summaryData={orderSummaryData}
							{totalAmount}
						/>

						{#each promoData as promo (promo.title)}
							<PromoSection {promo} />
						{/each}

						<!-- Final Submit Button -->
						<button
							class="flex w-full items-center justify-center rounded-lg px-5 py-3 text-base font-medium text-white transition-all duration-200 ease-in-out focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-orange-800"
							class:bg-gradient-to-r={isFormReadyToSubmit}
							class:bg-gray-300={!isFormReadyToSubmit}
							class:cursor-not-allowed={!isFormReadyToSubmit}
							class:dark:bg-neutral-600={!isFormReadyToSubmit}
							class:dark:text-neutral-400={!isFormReadyToSubmit}
							class:from-primary={isFormReadyToSubmit}
							class:hover:from-primary={isFormReadyToSubmit}
							class:hover:shadow-orange-200={isFormReadyToSubmit}
							class:hover:to-red-600={isFormReadyToSubmit}
							class:shadow-lg={isFormReadyToSubmit}
							class:text-gray-500={!isFormReadyToSubmit}
							class:to-red-500={isFormReadyToSubmit}
							disabled={!isFormReadyToSubmit}
							type="submit"
						>
							Confirm and Pay {formatCurrency(totalAmount)}
						</button>
					</div>
					<!-- End Order Summary Column -->
				</div>
				<!-- End Main Grid -->
			</form>

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

<!-- Don't forget to create GoogleIcon.svelte and PaypalIcon.svelte if using them -->
