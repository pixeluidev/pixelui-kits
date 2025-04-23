<!-- src/lib/components/invoice-detail/invoice-items-table.svelte -->
<script lang="ts">
	import type { DetailedInvoiceData } from './types';

	export let items: DetailedInvoiceData['items'];
	export let currency: string;

	// Fungsi helper untuk format mata uang
	function formatCurrency(amount: number, currencyCode: string): string {
		return amount.toLocaleString(undefined, {
			style: 'currency',
			currency: currencyCode,
			// Sesuaikan desimal jika perlu
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
</script>

<div class="relative overflow-x-auto border border-gray-200 sm:rounded-lg dark:border-neutral-700">
	<table class="w-full text-left text-sm text-gray-600 dark:text-neutral-300">
		<thead
			class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-neutral-700/50 dark:text-neutral-300"
		>
			<tr>
				<th scope="col" class="px-4 py-3 sm:px-6">Product name</th>
				<th scope="col" class="px-4 py-3 text-center sm:px-6">Qty</th>
				<th scope="col" class="px-4 py-3 text-right sm:px-6">Price</th>
				<th scope="col" class="hidden px-4 py-3 text-center sm:table-cell sm:px-6">Discount</th>
				<th scope="col" class="px-4 py-3 text-right sm:px-6">Total</th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.id)}
				<tr
					class="border-b bg-white hover:bg-gray-50/50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700/50"
				>
					<th
						scope="row"
						class="px-4 py-4 font-medium whitespace-nowrap text-gray-900 sm:px-6 dark:text-white"
					>
						<div class="font-semibold">{item.productName}</div>
						{#if item.description}
							<div class="mt-0.5 text-xs font-normal text-gray-500 dark:text-neutral-400">
								{item.description}
							</div>
						{/if}
					</th>
					<td class="px-4 py-4 text-center sm:px-6">{item.quantity}</td>
					<td class="px-4 py-4 text-right sm:px-6">{formatCurrency(item.unitPrice, currency)}</td>
					<td class="hidden px-4 py-4 text-center sm:table-cell sm:px-6"
						>{item.discountPercentage}%
					</td>
					<td class="px-4 py-4 text-right font-semibold sm:px-6"
						>{formatCurrency(item.totalPrice, currency)}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
