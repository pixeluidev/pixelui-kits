<script lang="ts">
	import { savedPaymentMethodsData } from './data';
	import SavedPaymentMethodComponent from './saved-payment-method.svelte';
	import AddNewCardForm from './add-new-card-form.svelte';
	import { RadioIcon } from '@lucide/svelte'; // Corrected Icon name likely
	import { fade } from 'svelte/transition';

	// State specific to this tab
	export let selectedSubMethodId: string = savedPaymentMethodsData[0]?.id ?? 'new';
	export let newCardDetails: {
		// Prop from parent for binding
		fullName: string;
		cardNumberRaw: string;
		expiryMonth: string;
		expiryYear: string;
		cvv: string;
	};

	$: isAddingNewCard = selectedSubMethodId === 'new';

	// Event handlers (can dispatch up further if needed)
	function handleDelete(event: CustomEvent<string>) {
		console.log('Delete', event.detail); /* Implement */
	}

	function handleEdit(event: CustomEvent<string>) {
		console.log('Edit', event.detail); /* Implement */
	}
</script>

<div class="space-y-5" transition:fade>
	<!-- Saved Methods -->
	<div class="space-y-4">
		{#each savedPaymentMethodsData as method (method.id)}
			<SavedPaymentMethodComponent
				{method}
				bind:selectedValue={selectedSubMethodId}
				groupName="credit-card-payment-method"
				on:delete={handleDelete}
				on:edit={handleEdit}
			/>
		{/each}
	</div>

	<!-- Divider / Or -->
	<div class="relative my-6 flex items-center justify-center">
		<div aria-hidden="true" class="absolute inset-0 flex items-center">
			<div class="w-full border-t border-gray-200 dark:border-neutral-700"></div>
		</div>
		<div class="relative bg-white px-3 dark:bg-neutral-800">
			<span class="text-sm font-medium text-gray-500 dark:text-neutral-400">or</span>
		</div>
	</div>

	<!-- Add New Card Option + Form -->
	<div>
		<label
			class="relative mb-4 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-neutral-700/50"
			class:border-gray-200={!isAddingNewCard}
			class:border-primary={isAddingNewCard}
			class:dark:border-neutral-700={!isAddingNewCard}
			class:dark:border-orange-400={isAddingNewCard}
			class:dark:ring-opacity-50={isAddingNewCard}
			class:dark:ring-primary={isAddingNewCard}
			class:ring-2={isAddingNewCard}
			class:ring-orange-200={isAddingNewCard}
			for="radio-new-card"
		>
			<div class="flex grow items-center">
				<input
					bind:group={selectedSubMethodId}
					class="text-primary focus:ring-primary dark:focus:ring-primary h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800"
					id="radio-new-card"
					name="credit-card-payment-method"
					type="radio"
					value="new"
				/>
				<div class="ms-4 text-sm">
					<span class="font-medium text-gray-900 dark:text-white">Add a new payment method</span>
				</div>
			</div>
			<div class="mCreditCardPaymentTabs-4 shrink-0 text-gray-400 dark:text-neutral-500">
				<RadioIcon class="h-6 w-6" />
			</div>
		</label>

		<AddNewCardForm
			bind:cardNumberRaw={newCardDetails.cardNumberRaw}
			bind:cvv={newCardDetails.cvv}
			bind:expiryMonth={newCardDetails.expiryMonth}
			bind:expiryYear={newCardDetails.expiryYear}
			bind:fullName={newCardDetails.fullName}
			isVisible={isAddingNewCard}
		/>
	</div>
</div>
