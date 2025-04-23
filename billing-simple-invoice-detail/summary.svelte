<!-- src/lib/components/invoice-detail/invoice-summary.svelte -->
<script lang="ts">
	export let subtotal: number;
	export let taxAmount: number;
	export let shippingAmount: number;
	export let totalAmount: number;
	export let currency: string;

	// Fungsi helper format mata uang (bisa di-share atau didefinisikan ulang)
	function formatCurrency(amount: number, currencyCode: string): string {
		return amount.toLocaleString(undefined, {
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
</script>

<div class="mt-6 space-y-3 border-t border-gray-200 pt-6 sm:mt-8 sm:pt-8 dark:border-neutral-700">
	<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Order summary</h3>
	<ul class="space-y-2 text-sm">
		<li class="flex justify-between">
			<span class="text-gray-600 dark:text-neutral-400">Subtotal</span>
			<span class="font-medium text-gray-800 dark:text-neutral-200"
				>{formatCurrency(subtotal, currency)}</span
			>
		</li>
		<li class="flex justify-between">
			<span class="text-gray-600 dark:text-neutral-400">Tax</span>
			<span class="font-medium text-gray-800 dark:text-neutral-200"
				>{formatCurrency(taxAmount, currency)}</span
			>
		</li>
		<li class="flex justify-between pb-2">
			<span class="text-gray-600 dark:text-neutral-400">Shipping</span>
			<span class="font-medium text-gray-800 dark:text-neutral-200"
				>{formatCurrency(shippingAmount, currency)}</span
			>
		</li>
		<li
			class="flex justify-between border-t border-gray-200 pt-3 font-semibold dark:border-neutral-600"
		>
			<span class="text-base text-gray-900 dark:text-white">Order total</span>
			<span class="text-base text-gray-900 dark:text-white"
				>{formatCurrency(totalAmount, currency)}</span
			>
		</li>
	</ul>
</div>
