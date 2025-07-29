<!-- src/lib/components/invoice-list/invoice-item.svelte -->
<script lang="ts">
	import { DownloadIcon, CheckCheck } from '@lucide/svelte';
	import type { InvoiceData } from './data';
	import { format, differenceInDays, isPast, formatDistanceToNowStrict } from 'date-fns';

	export let invoice: InvoiceData;

	// --- Kalkulasi Status & Tampilan ---
	// Kita hitung status dan teksnya secara dinamis
	interface StatusInfo {
		text: string;
		colorClasses: string; // Tailwind classes for bg and text
		isPaid: boolean;
	}

	// Gunakan fungsi helper biasa untuk menghindari masalah tipe $derived
	function getStatusInfo(inv: InvoiceData): StatusInfo {
		const now = new Date();
		const dueDate = inv.dueDate;

		if (inv.status === 'Paid') {
			return {
				text: 'Paid',
				colorClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
				isPaid: true
			};
		}

		// Jika belum lunas, cek jatuh tempo
		if (isPast(dueDate)) {
			const daysOverdue = differenceInDays(now, dueDate);
			// Tampilkan 'Overdue' jika sudah lewat hari H nya
			const overdueText =
				daysOverdue === 0
					? 'Due Today'
					: `${daysOverdue} ${daysOverdue === 1 ? 'day' : 'days'} overdue`;
			return {
				text: overdueText,
				colorClasses: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
				isPaid: false
			};
		} else {
			const daysRemainingText = formatDistanceToNowStrict(dueDate, { addSuffix: true }); // e.g., "in 5 days"
			// Tampilkan 'Due' jika belum lewat
			return {
				text: `Due ${daysRemainingText}`,
				colorClasses: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
				isPaid: false
			};
		}
	}

	const statusInfo = getStatusInfo(invoice); // Panggil fungsi helper

	const formattedIssueDate = format(invoice.issueDate, 'MMMM dd, yyyy');
	const formattedAmount = invoice.amount.toLocaleString(undefined, {
		style: 'currency',
		currency: invoice.currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	function handleDownload() {
		if (invoice.downloadUrl) {
			// Cara paling sederhana: buka di tab baru
			window.open(invoice.downloadUrl, '_blank');
			// Atau dispatch event jika perlu logic lebih kompleks
			// dispatch('download', invoice.id);
		} else {
			alert('Download link is not available for this invoice.');
		}
	}
</script>

<div
	class="flex flex-col items-start gap-3 border-b border-gray-100 py-5 sm:flex-row sm:items-center sm:gap-4 dark:border-neutral-700/50"
>
	<!-- Left: Invoice Info -->
	<div class="flex-1">
		<h4 class="font-semibold text-gray-800 dark:text-neutral-100">{invoice.invoiceNumber}</h4>
		<p class="mt-0.5 text-sm text-gray-500 dark:text-neutral-400">Issued: {formattedIssueDate}</p>
	</div>

	<!-- Right: Status, Amount, Download -->
	<div
		class="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end md:gap-8 lg:gap-12"
	>
		<!-- Status Badge -->
		<div class="flex-shrink-0">
			{#if statusInfo.isPaid}
				<span
					class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold {statusInfo.colorClasses}"
				>
					<CheckCheck class="h-3.5 w-3.5" />
					{statusInfo.text}
				</span>
			{:else}
				<span
					class="inline-block rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap {statusInfo.colorClasses}"
				>
					{statusInfo.text}
				</span>
			{/if}
		</div>

		<!-- Amount -->
		<p
			class="w-24 flex-shrink-0 text-right font-medium text-gray-700 sm:w-auto dark:text-neutral-200"
		>
			{formattedAmount}
		</p>

		<!-- Download Button -->
		<button
			type="button"
			class="focus:ring-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800"
			on:click={handleDownload}
			aria-label="Download invoice {invoice.invoiceNumber}"
			disabled={!invoice.downloadUrl}
			title={invoice.downloadUrl ? 'Download Invoice' : 'Download not available'}
		>
			<DownloadIcon class="h-5 w-5" />
		</button>
	</div>
</div>
