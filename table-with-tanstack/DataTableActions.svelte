<script lang="ts">
	import { MoreHorizontal, Trash2, Pencil, Eye } from '@lucide/svelte';
	import { clickOutside } from './helpers';
	import { createEventDispatcher } from 'svelte'; // Impor action clickOutside

	// Terima data produk (atau setidaknya ID)
	export let product: { id: string | number; [key: string]: any };

	let isOpen = false;
	const dispatch = createEventDispatcher();

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleAction(actionType: 'view' | 'edit' | 'delete') {
		console.log(`Action: ${actionType} on product ID: ${product.id}`);
		dispatch(actionType, { productId: product.id }); // Kirim event jika perlu
		closeDropdown();
	}
</script>

<div class="relative">
	<button
		aria-expanded={isOpen}
		aria-haspopup="true"
		class="inline-flex items-center rounded-lg p-1.5 text-center text-sm font-medium text-gray-500 hover:text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-gray-600"
		onclick={toggleDropdown}
		type="button"
	>
		<MoreHorizontal class="h-5 w-5" />
		<span class="sr-only">Open options</span>
	</button>

	{#if isOpen}
		<div
			use:clickOutside={closeDropdown}
			class="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-700"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div class="py-1" role="none">
				<button
					type="button"
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
					role="menuitem"
					onclick={() => handleAction('view')}
				>
					<Eye class="mr-2 inline h-4 w-4" />
					View
				</button>
				<button
					type="button"
					class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
					role="menuitem"
					onclick={() => handleAction('edit')}
				>
					<Pencil class="mr-2 inline h-4 w-4" />
					Edit
				</button>
				<button
					type="button"
					class="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
					role="menuitem"
					onclick={() => handleAction('delete')}
				>
					<Trash2 class="mr-2 inline h-4 w-4" />
					Delete
				</button>
			</div>
		</div>
	{/if}
</div>
