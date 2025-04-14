<script lang="ts">
	import type { SavedPaymentMethod } from './data'; // Adjust path
	import { createEventDispatcher } from 'svelte'; // Use for delete/edit actions

	export let method: SavedPaymentMethod;
	export let selectedValue: string; // Bound group value from parent
	export let groupName: string; // Name for the radio group

	const dispatch = createEventDispatcher<{ delete: string; edit: string }>();

	function handleDelete() {
		dispatch('delete', method.id);
	}

	function handleEdit() {
		dispatch('edit', method.id);
	}
</script>

<!-- Outer Label for clickability -->
<label
	class="relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-neutral-700/50"
	class:border-gray-200={selectedValue !== method.id}
	class:border-primary={selectedValue === method.id}
	class:dark:border-neutral-700={selectedValue !== method.id}
	class:dark:border-orange-400={selectedValue === method.id}
	class:dark:ring-orange-300={selectedValue === method.id}
	class:ring-2={selectedValue === method.id}
	class:ring-orange-200={selectedValue === method.id}
	for={`radio-${method.id}`}
>
	<div class="flex grow items-center">
		<!-- Radio Input -->
		<input
			bind:group={selectedValue}
			class="h-4 w-4 border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-primary"
			id={`radio-${method.id}`}
			name={groupName}
			type="radio"
			value={method.id}
		/>

		<!-- Details -->
		<div class="ms-4 text-sm">
			<span class="font-medium text-gray-900 dark:text-white">{method.label}</span>
			{#if method.details}
				<p class="text-xs text-gray-500 dark:text-neutral-400">{method.details}</p>
			{/if}
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="ms-4 hidden shrink-0 items-center space-x-3 sm:flex">
		<button
			class="text-xs font-medium text-gray-600 hover:underline focus:underline focus:outline-none dark:text-gray-400"
			onclick={handleDelete}
			type="button"
		>Delete
		</button>
		<div class="h-4 w-px bg-gray-300 dark:bg-neutral-600"></div>
		<button
			class="text-xs font-medium text-gray-600 hover:underline focus:underline focus:outline-none dark:text-gray-400"
			onclick={handleEdit}
			type="button"
		>Edit
		</button>
	</div>

	<!-- Icon -->
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
