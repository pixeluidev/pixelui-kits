<script lang="ts">
	import type { OrderSummaryItem } from './data'; // Adjust path

	import { formatCurrency } from '$uikits/payment-option/helper';

	export let summaryData: OrderSummaryItem[];
	export let currency: string;
	export let totalAmount: number;
</script>

<div
	class="w-full space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60"
>
	<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h3>
	<div class="space-y-3">
		{#each summaryData as item (item.label)}
			<dl
				class="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 dark:border-neutral-700"
			>
				<dt class="text-sm text-gray-600 dark:text-neutral-400">{item.label}</dt>
				<dd
					class={`text-sm font-medium ${item.isSavings ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}
				>
					{formatCurrency(item.amount, currency ?? 'USD')}
				</dd>
			</dl>
		{/each}
	</div>

	<dl
		class="mt-4 flex items-center justify-between gap-4 border-t border-gray-300 pt-4 dark:border-neutral-600"
	>
		<dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
		<dd class="text-base font-bold text-gray-900 dark:text-white">{formatCurrency(totalAmount)}</dd>
	</dl>
</div>
