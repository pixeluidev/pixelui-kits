<script lang="ts">
	// Import the type definition for the saved method data
	import type { SavedPaymentMethod } from './data'; // Adjust path if needed
	import { createEventDispatcher } from 'svelte'; // Using dispatcher for edit/delete actions

	export let method: SavedPaymentMethod;
	// This prop receives the bound value from the parent (e.g., selectedPaymentMethodId or creditCardSubMethodId)
	export let selectedValue: string;
	export let groupName: string; // The 'name' attribute for the radio group

	// Define the events this component can dispatch
	const dispatch = createEventDispatcher<{ delete: string; edit: string }>();

	function handleDelete() {
		// Dispatch the 'delete' event with the method's unique ID
		dispatch('delete', method.id);
	}

	function handleEdit() {
		// Dispatch the 'edit' event with the method's unique ID
		dispatch('edit', method.id);
	}
</script>

<!-- Outer Label makes the whole area clickable for the radio -->
<label
	class="relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-neutral-700/50"
	class:border-gray-200={selectedValue !== method.id}
	class:border-primary={selectedValue === method.id}
	class:dark:border-neutral-700={selectedValue !== method.id}
	class:dark:border-orange-400={selectedValue === method.id}
	class:dark:ring-opacity-50={selectedValue === method.id}
	class:dark:ring-primary={selectedValue === method.id}
	class:ring-2={selectedValue === method.id}
	class:ring-orange-200={selectedValue === method.id}
	for={`radio-${method.id}`}
>
	<!-- Radio input and Text details -->
	<div class="flex grow items-center">
		<!-- The actual radio button -->
		<input
			bind:group={selectedValue}
			class="text-primary focus:ring-primary dark:focus:ring-primary h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800"
			id={`radio-${method.id}`}
			name={groupName}
			type="radio"
			value={method.id}
		/>

		<!-- Method details -->
		<div class="ms-4 text-sm">
			<span class="font-medium text-gray-900 dark:text-white">{method.label}</span>
			{#if method.details}
				<p class="text-xs text-gray-500 dark:text-neutral-400">{method.details}</p>
			{/if}
		</div>
	</div>

	<!-- Action Buttons (conditionally shown on larger screens) -->
	<div class="ms-4 hidden shrink-0 items-center space-x-3 sm:flex">
		<button
			aria-label={`Delete ${method.label}`}
			class="text-xs font-medium text-red-600 hover:underline focus:underline focus:outline-none dark:text-red-400"
			onclick={handleDelete}
			type="button"
		>
			Delete
		</button>
		<div class="h-4 w-px bg-gray-300 dark:bg-neutral-600"></div>
		<!-- Vertical separator -->
		<button
			aria-label={`Edit ${method.label}`}
			class="text-primary text-xs font-medium hover:underline focus:underline focus:outline-none dark:text-orange-400"
			onclick={handleEdit}
			type="button"
		>
			Edit
		</button>
	</div>

	<!-- Payment Method Icon -->
	<div class="ms-4 shrink-0">
		{#if method.iconUrlLight}
			<img class="h-6 w-auto sm:h-8 dark:hidden" src={method.iconUrlLight} alt={method.type} />
		{/if}
		{#if method.iconUrlDark}
			<img
				class="hidden h-6 w-auto sm:h-8 dark:block"
				src={method.iconUrlDark}
				alt={`${method.type} Dark`}
			/>
		{/if}
	</div>
</label>
