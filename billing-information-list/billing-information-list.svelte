<!-- src/lib/components/billing/billing-section.svelte -->
<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import BillingItem from './billing-item.svelte';
	import AddCardForm from './add-card-form.svelte'; // Import komponen form
	import { billingItems } from './data';
	import type { BillingItemData } from './data';

	// State untuk visibilitas form
	let isFormVisible = $state(false);

	// Handler untuk event dari child component
	function handleFormClose() {
		isFormVisible = false;
	}

	function handleFormSuccess(event: CustomEvent<Record<string, unknown>>) {
		const submittedData = event.detail;
		alert('Success! Card Data (Simulated):\n' + JSON.stringify(submittedData, null, 2));
		// Logika tambahan setelah sukses (misalnya refresh data list) bisa ditambahkan di sini
		// Tidak perlu memanggil handleFormClose() lagi karena AddCardForm sudah dispatch 'close'
	}

	// Event handler list item (tidak berubah)
	function handleEditItem(event: CustomEvent<{ id: number }>) {
		console.log('Handling edit for item ID:', event.detail.id);
	}

	function handleDeleteItem(event: CustomEvent<{ id: number }>) {
		console.log('Handling delete for item ID:', event.detail.id);
	}
</script>

<section class="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
	<div
		class="rounded-xl bg-white text-gray-700 shadow-sm dark:bg-neutral-800/50 dark:text-neutral-200"
	>
		<!-- Header Section -->
		<div
			class="mx-4 mt-4 flex flex-col items-start justify-between gap-4 rounded-t-xl border-b border-gray-100 px-2 py-4 md:flex-row md:items-center md:px-6 md:py-5 dark:border-neutral-700"
		>
			<div class="w-full">
				<h2 class="text-lg font-semibold text-gray-900 dark:text-neutral-300">Billing Information</h2>
				<p class="mt-1 text-sm font-normal text-gray-600 dark:text-neutral-400">
					View, update, and manage your billing details here.
				</p>
			</div>
			<div class="w-full md:w-auto md:flex-shrink-0">
				<button
					type="button"
					class="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500 px-4 py-2 text-xs font-bold text-orange-500 uppercase transition-all hover:bg-orange-500/10 focus:ring-2 focus:ring-orange-300 focus:ring-offset-1 focus:outline-none active:opacity-85 md:w-auto dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10 dark:focus:ring-orange-600"
					onclick={() => (isFormVisible = true)}
					aria-expanded={isFormVisible}
					aria-controls="add-card-form-region"
				>
					<Plus class="h-4 w-4" stroke-width="3" />
					Add New Card
				</button>
			</div>
		</div>

		<!-- Region untuk Form Tambah Kartu (conditional rendering) -->
		<!-- Beri ID yang cocok dengan aria-controls -->
		<div id="add-card-form-region">
			{#if isFormVisible}
				<AddCardForm on:close={handleFormClose} on:success={handleFormSuccess} />
			{/if}
		</div>

		<!-- Billing Items List -->
		<div class="flex flex-col gap-4 rounded-b-xl p-4 dark:bg-neutral-800/10">
			{#each billingItems as item (item.id)}
				<BillingItem {item} on:edit={handleEditItem} on:delete={handleDeleteItem} />
			{:else}
				<p class="text-center text-sm text-gray-500 dark:text-neutral-500">
					No billing information available.
				</p>
			{/each}
		</div>
	</div>
</section>
