<!-- src/lib/components/billing/billing-item.svelte -->
<script lang="ts">
	import type { BillingItemData } from './data';
	import { Building2, Pencil, Trash2 } from '@lucide/svelte';
	import { createEventDispatcher } from 'svelte';

	// Definisikan props yang diterima dari parent component
	export let item: BillingItemData;

	const dispatch = createEventDispatcher();

	// Fungsi placeholder untuk event handling
	function handleEdit() {
		console.log('Edit item:', item.id);
		dispatch('edit', { id: item.id }); // Kirim event 'edit' dengan id item
	}

	function handleDelete() {
		console.log('Delete item:', item.id);
		dispatch('delete', { id: item.id }); // Kirim event 'delete' dengan id item
	}
</script>

<div
	class="rounded-lg border border-gray-200 p-4 transition-shadow duration-200 hover:shadow-md dark:border-neutral-700"
>
	<div class="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
		<!-- Bagian Kiri: Info Perusahaan -->
		<div class="flex items-center gap-3">
			<div
				class="rounded-lg border border-gray-200 bg-gray-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-800"
			>
				<Building2 class="h-6 w-6 text-gray-600 dark:text-neutral-500" />
			</div>
			<div>
				<p class="mb-0.5 font-semibold text-gray-800">{item.name}</p>
				<p class="text-xs font-normal text-gray-500">{item.type}</p>
			</div>
		</div>

		<!-- Bagian Kanan: Tombol Aksi -->
		<div class="flex w-full items-center justify-end gap-2 sm:w-auto">
			<button
				type="button"
				class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 active:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-950"
				onclick={handleEdit}
				aria-label="Edit {item.name}"
			>
				<Pencil class="h-4 w-4" />
				<span class="hidden sm:inline">Edit</span>
			</button>
			<button
				type="button"
				class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/10 active:bg-red-500/20"
				onclick={handleDelete}
				aria-label="Delete {item.name}"
			>
				<Trash2 class="h-4 w-4" />
				<span class="hidden sm:inline">Delete</span>
			</button>
		</div>
	</div>

	<!-- Detail Kontak -->
	<div class="space-y-1 border-t border-gray-100 pt-3 dark:border-neutral-700">
		<div class="flex items-center gap-1.5 text-xs">
			<p class="w-24 shrink-0 font-medium text-gray-500">Contact:</p>
			<p class="font-semibold text-gray-800">{item.contactName}</p>
		</div>
		<div class="flex items-center gap-1.5 text-xs">
			<p class="w-24 shrink-0 font-medium text-gray-500">Email:</p>
			<p class="font-semibold text-gray-800">{item.email}</p>
		</div>
		<div class="flex items-center gap-1.5 text-xs">
			<p class="w-24 shrink-0 font-medium text-gray-500">VAT Number:</p>
			<p class="font-semibold text-gray-800">{item.vatNumber}</p>
		</div>
	</div>
</div>
