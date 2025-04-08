<script lang="ts">
	// Data
	import {
		checkoutStepsData,
		savedPaymentMethodsData,
		orderSummaryData,
		orderCurrency,
		promoData
	} from './data'; // Adjust path

	// Components
	import CheckoutStepper from './checkout-stepper.svelte';
	import SavedPaymentMethod from './saved-payment-method.svelte';
	import AddNewCardForm from './add-new-card-form.svelte';
	import OrderSummaryDisplay from './order-summary-display.svelte';
	import PromoSection from './promo-section.svelte';

	import RadioGroup from 'lucide-svelte/icons/radio-tower';
	import { formatCurrency } from './helper'; // Just using an icon for "Add New" radio

	// --- Component State ---
	let currentStepId: string = 'payment';
	let selectedPaymentMethodId: string = savedPaymentMethodsData[0]?.id ?? 'new'; // Default to first saved or 'new'

	// State for the "Add New Card" form fields (passed down)
	let newCardDetails = {
		fullName: '',
		cardNumberRaw: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: ''
	};

	// --- Derived State ---
	$: isAddingNewCard = selectedPaymentMethodId === 'new';
	$: console.log(
		'Parent - selectedPaymentMethodId changed to:',
		selectedPaymentMethodId,
		'isAddingNewCard:',
		isAddingNewCard
	);
	// Validation depends on whether adding new card or using saved
	$: isNewCardFormValid =
		newCardDetails.fullName.trim().length > 3 &&
		newCardDetails.cardNumberRaw.length === 16 &&
		newCardDetails.expiryMonth !== '' &&
		newCardDetails.expiryYear !== '' &&
		newCardDetails.cvv.length === 3;

	$: isFormReadyToSubmit =
		selectedPaymentMethodId !== 'new' || (selectedPaymentMethodId === 'new' && isNewCardFormValid);

	const totalAmount = orderSummaryData.reduce((sum, item) => sum + item.amount, 0);

	// --- Handlers ---
	function handleSavedMethodDelete(event: CustomEvent<string>) {
		const idToDelete = event.detail;
		console.log('Request delete for:', idToDelete);
		// Implement actual deletion logic here (e.g., update data array, API call)
		// savedPaymentMethodsData = savedPaymentMethodsData.filter(m => m.id !== idToDelete);
		// If the deleted one was selected, select 'new'
		if (selectedPaymentMethodId === idToDelete) {
			selectedPaymentMethodId = 'new';
		}
		alert(`Deletion requested for method ID: ${idToDelete} (Demo)`);
	}

	function handleSavedMethodEdit(event: CustomEvent<string>) {
		const idToEdit = event.detail;
		console.log('Request edit for:', idToEdit);
		alert(`Edit requested for method ID: ${idToEdit} (Demo)`);
		// Implement logic to show an edit form/modal
	}

	function handleSubmit() {
		if (!isFormReadyToSubmit) return;

		let paymentData;
		if (isAddingNewCard) {
			paymentData = {
				method: 'new',
				details: { ...newCardDetails, cardNumber: newCardDetails.cardNumberRaw }
			};
		} else {
			paymentData = { method: 'saved', id: selectedPaymentMethodId };
		}

		console.log('Submitting Order with Payment:', paymentData);
		alert(`Processing payment via ${paymentData.method}... (Demo)`);

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

			<form onsubmit={handleSubmit}>
				<div class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
					<!-- Payment Selection & Form Column -->
					<div class="w-full space-y-8 lg:col-span-7 xl:col-span-8">
						<!-- Payment Method Selection -->
						<fieldset
							class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8 dark:border-neutral-700 dark:bg-neutral-800"
						>
							<legend class="sr-only">Select Payment Method</legend>
							<div class="space-y-4">
								{#each savedPaymentMethodsData as method (method.id)}
									<SavedPaymentMethod
										{method}
										bind:selectedValue={selectedPaymentMethodId}
										groupName="payment-method"
										on:delete={handleSavedMethodDelete}
										on:edit={handleSavedMethodEdit}
									/>
								{/each}

								<!-- Add New Card Radio Option -->
								<label
									class="relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-neutral-700/50"
									class:border-gray-200={!isAddingNewCard}
									class:border-orange-500={isAddingNewCard}
									class:dark:border-neutral-700={!isAddingNewCard}
									class:dark:border-orange-400={isAddingNewCard}
									class:dark:ring-orange-300={isAddingNewCard}
									class:ring-2={isAddingNewCard}
									class:ring-orange-200={isAddingNewCard}
									for="radio-new"
								>
									<div class="flex grow items-center">
										<input
											bind:group={selectedPaymentMethodId}
											class="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-orange-600"
											id="radio-new"
											name="payment-method"
											type="radio"
											value="new"
										/>
										<div class="ms-4 text-sm">
											<span class="font-medium text-gray-900 dark:text-white">Add a New Card</span>
										</div>
									</div>
									<div class="ms-4 shrink-0 text-gray-400 dark:text-neutral-500">
										<RadioGroup class="h-6 w-6" />
										<!-- Generic icon for new card -->
									</div>
								</label>
							</div>

							<!-- Conditionally Rendered Add New Card Form -->
							<AddNewCardForm
								bind:cardNumberRaw={newCardDetails.cardNumberRaw}
								bind:cvv={newCardDetails.cvv}
								bind:expiryMonth={newCardDetails.expiryMonth}
								bind:expiryYear={newCardDetails.expiryYear}
								bind:fullName={newCardDetails.fullName}
								isVisible={isAddingNewCard}
							/>
						</fieldset>

						<!-- Alternative Payment Buttons (Optional) -->
						<div class="relative my-4 flex items-center justify-center">
							<div aria-hidden="true" class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gray-200 dark:border-neutral-700"></div>
							</div>
							<div
								class="relative bg-gradient-to-br from-gray-100 to-blue-50 px-3 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-800"
							>
								<span class="text-sm font-medium text-gray-500 dark:text-neutral-400">or use</span>
							</div>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<button
								class="flex w-full items-center justify-center gap-x-2.5 rounded-lg border border-gray-600 bg-gray-800 px-5 py-3 text-sm font-medium text-gray-100 transition-colors duration-150 hover:bg-gray-600 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-900"
								type="button"
							>
								<img
									alt="Google"
									class=" size-5 w-auto"
									src="/components-images/google-symbol.svg"
								/> Google Pay
							</button>
							<button
								class="flex w-full items-center justify-center gap-x-2.5 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-offset-neutral-900"
								type="button"
							>
								<img
									alt="PayPal Dark"
									class="hidden size-5 w-auto dark:block"
									src="/components-images/paypal-dark.svg"
								/>
								<img
									alt="PayPal"
									class="h-7 w-auto dark:hidden"
									src="/components-images/paypal.svg"
								/> Paypal
							</button>
						</div>
					</div>
					<!-- End Payment Selection Column -->

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
							class:from-orange-500={isFormReadyToSubmit}
							class:hover:from-orange-600={isFormReadyToSubmit}
							class:hover:shadow-orange-100={isFormReadyToSubmit}
							class:hover:to-red-600={isFormReadyToSubmit}
							class:shadow-lg={isFormReadyToSubmit}
							class:text-gray-500={!isFormReadyToSubmit}
							class:to-red-500={isFormReadyToSubmit}
							disabled={!isFormReadyToSubmit}
							type="submit"
						>
							Pay {formatCurrency(totalAmount, 'USD')}
						</button>
					</div>
					<!-- End Order Summary Column -->
				</div>
				<!-- End Main Grid -->
			</form>

			<!-- Footer Text -->
			<p class="mt-8 text-center text-sm text-gray-500 lg:mt-10 lg:text-left dark:text-neutral-400">
				Payment processed securely by <a
				class="font-medium text-orange-600 underline hover:no-underline dark:text-orange-400"
				href="#"
				title="Payment Processor"
			>SecurePay Inc.</a
			>
			</p>
		</div>
	</div>
</section>
