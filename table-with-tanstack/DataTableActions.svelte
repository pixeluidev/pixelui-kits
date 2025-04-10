<script lang="ts">
	import { MoreHorizontal, Trash2, Pencil, Eye } from 'lucide-svelte';
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
		class="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
		on:click|stopPropagation={toggleDropdown}
		type="button"
	>
		<MoreHorizontal class="w-5 h-5" />
		<span class="sr-only">Open options</span>
	</button>

	{#if isOpen}
		<div
			use:clickOutside={closeDropdown}
			class="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
		>
			<div class="py-1" role="none">
				<button
					type="button"
					class="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 text-sm w-full text-left"
					role="menuitem"
					on:click={() => handleAction('view')}
				>
					<Eye class="inline w-4 h-4 mr-2" />
					View
				</button>
				<button
					type="button"
					class="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 block px-4 py-2 text-sm w-full text-left"
					role="menuitem"
					on:click={() => handleAction('edit')}
				>
					<Pencil class="inline w-4 h-4 mr-2" />
					Edit
				</button>
				<button
					type="button"
					class="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 block px-4 py-2 text-sm w-full text-left"
					role="menuitem"
					on:click={() => handleAction('delete')}
				>
					<Trash2 class="inline w-4 h-4 mr-2" />
					Delete
				</button>
			</div>
		</div>
	{/if}
</div>