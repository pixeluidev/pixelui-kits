<!-- src/lib/components/transaction-history/transaction-history-section.svelte -->
<script lang="ts">
	import { CalendarDays } from 'lucide-svelte';
	import TransactionItem from './transaction-item.svelte';
	import TransactionGroupHeader from './transaction-group-header.svelte';
	import { sampleTransactions } from './data';
	import type { TransactionData, GroupedTransactions } from './data';
	import { format } from 'date-fns'; // Import date-fns

	// --- State ---
	let allTransactions = $state<TransactionData[]>(
		[...sampleTransactions].sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())
	); // Sort descending by date
	let startDate = $state<Date | null>(null); // Atau default ke tanggal awal tertentu
	let endDate = $state<Date | null>(null); // Atau default ke tanggal akhir tertentu

	// --- Computed Values ---

	const groupedTransactions = allTransactions?.reduce((acc, tx) => {
		const groupKey = format(tx.dateTime, 'MMMM yyyy'); // e.g., "March 2023"
		if (!acc[groupKey]) {
			acc[groupKey] = [];
		}
		acc[groupKey].push(tx);
		return acc;
	}, {} as GroupedTransactions);

	// Teks untuk tombol filter tanggal
	const dateFilterText =
		startDate && endDate
			? `${format(startDate, 'dd MMM, yyyy')} - ${format(endDate, 'dd MMM, yyyy')}`
			: 'Select Date Range';

	// --- Event Handlers ---
	function handleDateFilterClick() {
		// TODO: Implementasi date range picker
		// Ini bisa menggunakan library eksternal (seperti `svelte-flatpickr`, `flowbite-svelte-datepicker`)
		// atau implementasi custom dengan modal/popover.
		// Untuk saat ini, kita set tanggal contoh saat tombol diklik.
		if (startDate && endDate) {
			// Jika sudah ada, reset
			startDate = null;
			endDate = null;
		} else {
			// Set contoh rentang
			startDate = new Date('2023-01-01');
			endDate = new Date('2023-12-31');
		}
		alert('Date range picker functionality needs to be implemented. Setting example range.');
	}
</script>

<div class="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
	<div class="rounded-xl bg-white p-5 shadow-sm sm:p-6 dark:bg-neutral-800/50">
		<!-- Header & Filter -->
		<div
			class="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center dark:border-neutral-700/50"
		>
			<div class="flex-1">
				<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Transaction History</h2>
				<p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
					Track and monitor your financial activity.
				</p>
			</div>
			<button
				type="button"
				class="focus:ring-primary flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none md:w-auto dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800"
				onclick={handleDateFilterClick}
			>
				<CalendarDays class="h-4 w-4 text-gray-500 dark:text-neutral-400" />
				<span>{dateFilterText}</span>
			</button>
		</div>

		<!-- Transaction List -->
		<div class="flow-root">
			{#if Object.keys(groupedTransactions).length > 0}
				{#each Object.entries(groupedTransactions) as [groupTitle, transactions] (groupTitle)}
					<TransactionGroupHeader {groupTitle} />
					<div class="space-y-1">
						{#each transactions as tx (tx.id)}
							<TransactionItem transaction={tx} />
						{/each}
					</div>
				{/each}
			{:else}
				<p
					class="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-neutral-600 dark:text-neutral-400"
				>
					No transactions found{startDate && endDate ? ' for the selected date range' : ''}.
				</p>
			{/if}
		</div>
	</div>
</div>
