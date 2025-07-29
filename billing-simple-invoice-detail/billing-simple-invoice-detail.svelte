<!-- src/lib/components/invoice-detail/invoice-detail-page.svelte -->
<script lang="ts">
	import { Printer, DownloadIcon } from '@lucide/svelte';
	import { sampleDetailedInvoice } from './data'; // Impor data contoh
	import InvoiceItemsTable from './invoice-item.svelte';
	import InvoiceSummary from './summary.svelte';
	import InvoiceStatusSidebar from './sidebar.svelte'; // Impor sidebar
	import { PixelUiLogo } from '../pixel-ui-logo'; // Impor logo Anda
	import { format } from 'date-fns';

	// Anda bisa menerima data invoice sebagai prop dari luar
	// export let invoiceData: DetailedInvoiceData = sampleDetailedInvoice;
	// Atau gunakan data sample langsung
	const invoiceData = sampleDetailedInvoice; // Menggunakan data sample

	function handlePrint() {
		window.print();
	}

	function handleDownload() {
		// Implementasi download PDF jika diperlukan (misal: panggil API atau library jsPDF)
		alert('Download PDF functionality needs implementation.');
	}
</script>

<div class="bg-gray-50 py-8 sm:py-12 dark:bg-neutral-900">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
			<!-- Kolom Utama (Invoice Content) -->
			<div
				class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:col-span-2 dark:border-neutral-700 dark:bg-neutral-800"
			>
				<div class="p-6 sm:p-8">
					<!-- Header -->
					<div
						class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
					>
						<a href="/" class="flex items-center text-gray-800 dark:text-white">
							<PixelUiLogo class="text-primary mr-3 h-8" />
							<!-- Gunakan logo Anda -->
							<span class="self-center text-2xl font-semibold whitespace-nowrap">Pixel UI</span>
						</a>
						<div class="text-right">
							<h1 class="text-xl font-bold text-gray-900 dark:text-white">
								Invoice {invoiceData.invoiceNumber}
							</h1>
							<time
								datetime={format(invoiceData.issueDate, 'yyyy-MM-dd')}
								class="text-sm text-gray-500 dark:text-neutral-400"
							>
								Issued: {format(invoiceData.issueDate, 'MMMM dd, yyyy')}
							</time>
						</div>
					</div>

					<!-- Pay To / Bill To -->
					<div
						class="mb-8 grid grid-cols-1 gap-6 border-b border-gray-100 pb-8 sm:grid-cols-2 dark:border-neutral-700/50"
					>
						<div>
							<h2 class="mb-1.5 text-base font-semibold text-gray-500 dark:text-neutral-400">
								Pay to:
							</h2>
							<address class="text-sm text-gray-700 not-italic dark:text-neutral-300">
								{#if invoiceData.payTo.name}<strong
										class="block font-medium text-gray-900 dark:text-white"
										>{invoiceData.payTo.name}</strong
									>{/if}
								{invoiceData.payTo.line1}<br />
								{#if invoiceData.payTo.line2}{invoiceData.payTo.line2}<br />{/if}
								{invoiceData.payTo.city}, {invoiceData.payTo.state}
								{invoiceData.payTo.postalCode}<br />
								{invoiceData.payTo.country}<br />
								{#if invoiceData.payTo.vatCode}VAT Code: {invoiceData.payTo.vatCode}{/if}
							</address>
						</div>
						<div class="text-left sm:text-right">
							<h2 class="mb-1.5 text-base font-semibold text-gray-500 dark:text-neutral-400">
								Invoice to:
							</h2>
							<address class="text-sm text-gray-700 not-italic dark:text-neutral-300">
								{#if invoiceData.billTo.name}<strong
										class="block font-medium text-gray-900 dark:text-white"
										>{invoiceData.billTo.name}</strong
									>{/if}
								{invoiceData.billTo.line1}<br />
								{#if invoiceData.billTo.line2}{invoiceData.billTo.line2}<br />{/if}
								{invoiceData.billTo.city}, {invoiceData.billTo.state}
								{invoiceData.billTo.postalCode}<br />
								{invoiceData.billTo.country}<br />
								{#if invoiceData.billTo.email}<a
										href="mailto:{invoiceData.billTo.email}"
										class="text-primary font-medium hover:underline dark:text-orange-400"
										>{invoiceData.billTo.email}</a
									>{/if}
							</address>
						</div>
					</div>

					<!-- Invoice Items Table -->
					<div class="mb-6">
						<h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Items</h3>
						<InvoiceItemsTable items={invoiceData.items} currency={invoiceData.currency} />
					</div>

					<!-- Summary -->
					<InvoiceSummary
						subtotal={invoiceData.subtotal}
						taxAmount={invoiceData.taxAmount}
						shippingAmount={invoiceData.shippingAmount}
						totalAmount={invoiceData.totalAmount}
						currency={invoiceData.currency}
					/>
				</div>
			</div>

			<!-- Kolom Kanan (Sidebar Status & Info) -->
			<div class="lg:col-span-1">
				<InvoiceStatusSidebar invoice={invoiceData} />

				<!-- Action Buttons -->
				<div class="mt-6 flex justify-end gap-3">
					<button
						type="button"
						on:click={handleDownload}
						class="focus:ring-primary inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-900"
					>
						<DownloadIcon class="h-4 w-4" />
						Download
					</button>
					<button
						type="button"
						on:click={handlePrint}
						class="bg-primary hover:bg-primary focus:ring-primary dark:bg-primary inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none dark:hover:bg-orange-700 dark:focus:ring-offset-neutral-900"
					>
						<Printer class="h-4 w-4" />
						Print
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Styles khusus untuk print jika diperlukan */
	@media print {
		body {
			-webkit-print-color-adjust: exact; /* Memastikan warna background tercetak */
			print-color-adjust: exact;
		}

		/* Sembunyikan elemen yang tidak perlu saat print */
		.lg\:col-span-1, /* Sembunyikan sidebar */
        .gap-3 /* Sembunyikan tombol */ {
			display: none !important;
		}

		/* Atur layout kolom utama agar full width saat print */
		.lg\:col-span-2 {
			grid-column: span 3 / span 3 !important; /* Atau sesuaikan */
		}

		/* Hapus background dan shadow halaman */
		.bg-gray-50,
		.dark\:bg-neutral-900 {
			background-color: transparent !important;
		}

		.shadow-sm {
			box-shadow: none !important;
		}

		.border {
			border: none !important;
		}
	}
</style>
