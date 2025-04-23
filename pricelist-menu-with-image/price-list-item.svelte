<!-- src/lib/components/price-list/price-list-item.svelte -->
<script lang="ts">
	import type { PriceListItemData } from './data';

	export let item: PriceListItemData;

	// Fungsi helper format mata uang
	function formatCurrency(amount: number, currencyCode: string): string {
		return amount.toLocaleString(undefined, {
			style: 'currency',
			currency: currencyCode,
			minimumFractionDigits: item.price % 1 === 0 ? 0 : 2, // Tampilkan desimal hanya jika ada
			maximumFractionDigits: 2
		});
	}

	// Fallback image
	function handleImageError(event: Event & { currentTarget: EventTarget & HTMLImageElement }) {
		// Ganti dengan path ke placeholder Anda atau sembunyikan gambar
		event.currentTarget.style.display = 'none';
		// Opsional: tampilkan elemen placeholder
		const placeholder = event.currentTarget.nextElementSibling; // Asumsi ada elemen setelah img
		if (placeholder instanceof HTMLElement) {
			placeholder.style.display = 'flex';
		}
	}
</script>

{#if item.href}
	<a
		href={item.href}
		class="group flex items-start gap-4 rounded-lg p-4 transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:hover:bg-neutral-700/30 dark:focus-visible:bg-neutral-700/30 dark:focus-visible:ring-orange-400 dark:focus-visible:ring-offset-neutral-800"
	>
		<!-- Konten Item -->
		{#if item.imageUrl}
			<div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md p-2 sm:h-20 sm:w-20">
				<img
					src={item.imageUrl}
					alt={item.imageAlt}
					class="h-full w-full object-cover"
					loading="lazy"
					onerror={handleImageError}
				/>
				<!-- Fallback Placeholder (jika gambar gagal) -->
				<div
					style="display: none;"
					class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-neutral-700 dark:text-neutral-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>
			</div>
		{/if}
		<div class="flex-1">
			<div class="flex items-baseline justify-between gap-2">
				<span
					class="font-semibold text-gray-800 group-hover:text-orange-600 dark:text-neutral-100 dark:group-hover:text-orange-400"
					>{item.title}</span
				>
				<!-- Separator -->
				<span class="mx-2 flex-grow border-b border-dashed border-gray-300 dark:border-neutral-600"
				></span>
				<span class="flex-shrink-0 font-medium text-gray-700 dark:text-neutral-200"
					>{formatCurrency(item.price, item.currency)}</span
				>
			</div>
			<p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">{item.description}</p>
		</div>
	</a>
{:else}
	<!-- Versi non-link jika href tidak ada -->
	<div class="flex items-start gap-4 p-4">
		{#if item.imageUrl}
			<div class="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-20">
				<img
					src={item.imageUrl}
					alt={item.imageAlt}
					class="h-full w-full object-cover"
					loading="lazy"
					onerror={handleImageError}
				/>
				<div
					style="display: none;"
					class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-neutral-700 dark:text-neutral-500"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
						/>
					</svg>
				</div>
			</div>
		{/if}
		<div class="flex-1">
			<div class="flex items-baseline justify-between gap-2">
				<span class="font-semibold text-gray-800 dark:text-neutral-100">{item.title}</span>
				<span class="mx-2 flex-grow border-b border-dashed border-gray-300 dark:border-neutral-600"
				></span>
				<span class="flex-shrink-0 font-medium text-gray-700 dark:text-neutral-200"
					>{formatCurrency(item.price, item.currency)}</span
				>
			</div>
			<p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">{item.description}</p>
		</div>
	</div>
{/if}
