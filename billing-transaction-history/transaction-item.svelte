<!-- src/lib/components/transaction-history/transaction-item.svelte -->
<script lang="ts">
	import { ArrowDownCircle, ArrowUpCircle, Clock, AlertCircle, RotateCcw } from 'lucide-svelte';
	import type { TransactionData } from './data';
	import { format } from 'date-fns';

	// Props
	const { transaction }: { transaction: TransactionData } = $props();

	function getIconComponent(tx: TransactionData): typeof Clock {
		if (tx.status === 'pending') return Clock;
		if (tx.status === 'failed') return AlertCircle;
		if (tx.type === 'refund') return RotateCcw;
		if (tx.amount >= 0) return ArrowUpCircle;
		return ArrowDownCircle;
	}

	function getIconColor(tx: TransactionData): string {
		if (tx.status === 'pending') return 'text-blue-500 dark:text-blue-400';
		if (tx.status === 'failed') return 'text-yellow-600 dark:text-yellow-400';
		if (tx.type === 'refund') return 'text-purple-600 dark:text-purple-400';
		if (tx.amount >= 0) return 'text-green-600 dark:text-green-400';
		return 'text-red-600 dark:text-red-400';
	}

	function getIconBg(tx: TransactionData): string {
		if (tx.status === 'pending') return 'bg-blue-100 dark:bg-blue-900/30';
		if (tx.status === 'failed') return 'bg-yellow-100 dark:bg-yellow-900/30';
		if (tx.type === 'refund') return 'bg-purple-100 dark:bg-purple-900/30';
		if (tx.amount >= 0) return 'bg-green-100 dark:bg-green-900/30';
		return 'bg-red-100 dark:bg-red-900/30';
	}

	function getAmountColor(transaction: TransactionData) {
		if (transaction.status === 'pending') return 'text-blue-600 dark:text-blue-400';
		if (transaction.status === 'failed') return 'text-yellow-700 dark:text-yellow-500';
		if (transaction.type === 'refund') return 'text-purple-700 dark:text-purple-400';
		return transaction.amount >= 0
			? 'text-green-600 dark:text-green-400'
			: 'text-red-600 dark:text-red-400';
	}

	// --- GANTI $derived DENGAN FUNGSI BIASA ---

	function getFormattedAmount(tx: TransactionData): string {
		const absAmount = Math.abs(tx.amount);
		let prefix = '';
		// Tentukan prefix hanya jika status completed & bukan refund
		if (tx.status === 'completed' && tx.type !== 'refund') {
			prefix = tx.amount >= 0 ? '+ ' : '- ';
		} else if (tx.type === 'refund') {
			prefix = '+ '; // Atau simbol lain untuk refund jika perlu
		}

		const formatted = absAmount.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
		const currencySymbol = tx.currency === 'USD' ? '$' : ''; // Tambahkan currency lain jika perlu
		return `${prefix}${currencySymbol}${formatted}`;
	}

	function getFormattedDateTime(tx: TransactionData): string {
		try {
			// Contoh format: 27 March 2023, at 12:30 PM
			return format(tx.dateTime, "dd MMMM yyyy, 'at' hh:mm a");
		} catch (error) {
			console.error('Error formatting date:', tx.dateTime, error);
			return 'Invalid Date'; // Fallback jika date tidak valid
		}
	}
</script>

<button
	type="button"
	role="button"
	tabindex="0"
	class="focus:ring-primary flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:outline-none dark:hover:bg-neutral-700/50 dark:focus:bg-neutral-700/50 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800"
	aria-label="View details for transaction {transaction.description}"
	onclick={() => alert(`Details for ${transaction.description}`)}
>
	<!-- Icon -->
	<div class="flex-shrink-0">
		<div class={`flex h-9 w-9 items-center justify-center rounded-full ${getIconBg(transaction)}`}>
			<svelte:component
				this={getIconComponent(transaction)}
				class="h-5 w-5 {getIconColor(transaction)}"
			/>
		</div>
	</div>

	<!-- Description & Date -->
	<div class="flex-1 overflow-hidden">
		<h4 class="truncate font-medium text-gray-800 dark:text-neutral-100">
			{transaction.description}
		</h4>
		<!-- Panggil fungsi getFormattedDateTime -->
		<p class="mt-0.5 text-xs text-gray-500 dark:text-neutral-400">
			{getFormattedDateTime(transaction)}
		</p>
	</div>

	<!-- Amount / Status -->
	<div class="ml-auto flex-shrink-0 text-right">
		{#if transaction.status === 'pending'}
			<span class="text-xs font-semibold {getAmountColor(transaction)}">Pending</span>
		{:else if transaction.status === 'failed'}
			<span class="text-xs font-semibold {getAmountColor(transaction)}">Failed</span>
		{:else if transaction.type === 'refund'}
			<span class="text-xs font-semibold {getAmountColor(transaction)}">Refunded</span>
			<!-- Panggil fungsi getFormattedAmount -->
			<p class="text-xs font-medium {getAmountColor(transaction)}">
				{getFormattedAmount(transaction)}
			</p>
		{:else}
			<!-- Panggil fungsi getFormattedAmount -->
			<p class="text-sm font-semibold {getAmountColor(transaction)}">
				{getFormattedAmount(transaction)}
			</p>
		{/if}
	</div>
</button>
