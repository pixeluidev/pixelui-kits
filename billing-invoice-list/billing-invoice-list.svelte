<!-- src/lib/components/invoice-list/invoice-list-section.svelte -->
<script lang="ts">
	import { Upload } from '@lucide/svelte'; // Atau Share, FileDown
	import InvoiceItem from './invoice-list-item.svelte';
	import { sampleInvoices } from './data';
	import type { InvoiceData } from './data';

	// State
	let invoices = $state<InvoiceData[]>(
		[...sampleInvoices].sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime())
	); // Sort by issue date desc

	// --- Event Handlers ---
	function handleExport() {
		// TODO: Implement export functionality
		// Ini bisa men-generate CSV, JSON, atau memanggil API endpoint
		const dataToExport = JSON.stringify(invoices, null, 2);
		console.log('Exporting data:', dataToExport);
		alert(
			'Export functionality needs full implementation (e.g., generate CSV/JSON). Check console for data.'
		);
		// Contoh sederhana download JSON
		// const blob = new Blob([dataToExport], { type: 'application/json' });
		// const url = URL.createObjectURL(blob);
		// const a = document.createElement('a');
		// a.href = url;
		// a.download = 'invoices.json';
		// a.click();
		// URL.revokeObjectURL(url);
	}

	// Handler jika diperlukan event dari item
	// function handleDownloadInvoice(event: CustomEvent<string>) {
	//     const invoiceId = event.detail;
	//     console.log("Request download for:", invoiceId);
	//     // Panggil API atau lakukan aksi download
	// }
</script>

<section class="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="rounded-xl bg-white p-5 shadow-sm sm:p-6 dark:bg-neutral-800/50">
		<!-- Header -->
		<div
			class="mb-4 flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center dark:border-neutral-700/50"
		>
			<div class="flex-1">
				<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Invoices</h2>
				<p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
					Manage and download your invoices.
				</p>
			</div>
			<button
				type="button"
				class="border-primary text-primary hover:bg-primary/10 focus:ring-primary dark:focus:ring-primary flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none active:opacity-85 sm:w-auto dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10 dark:focus:ring-offset-neutral-800"
				on:click={handleExport}
			>
				<Upload class="h-4 w-4" />
				<span>Export</span>
			</button>
		</div>

		<!-- Invoice List -->
		<div class="flow-root">
			{#if invoices.length > 0}
				<div class="-my-5 divide-y divide-gray-100 dark:divide-neutral-700/50">
					{#each invoices as invoice (invoice.id)}
						<InvoiceItem {invoice} />
						<!-- on:download={handleDownloadInvoice} -->
					{/each}
				</div>
			{:else}
				<p
					class="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-neutral-600 dark:text-neutral-400"
				>
					No invoices found.
				</p>
			{/if}
		</div>
	</div>
</section>
