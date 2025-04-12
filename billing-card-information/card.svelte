<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { CardData } from './types';

	// const {card} : {card:CardData} = {
	// 	number: '4562112245947852',
	// 	holder: 'Jack Peterson',
	// 	expiry: '11/22',
	// 	brand: 'mastercard',
	// 	cvv: '123' // Contoh CVV untuk bagian belakang
	// };

	const { card, isBack }: { card: CardData; isBack: boolean } = $props();

	const cardNumberFormatted = card.number
		.replace(/\D/g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim()
		.slice(0, 19);
</script>

<header
	class="perspective relative flex h-56 flex-col items-center justify-center p-4 sm:h-64 sm:p-6"
>
	<div class="card-flipper relative h-full w-full max-w-sm">
		{#if !isBack}
			<div
				class="card-face card-front absolute inset-0 flex h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-5 text-white shadow-lg sm:p-6 dark:from-neutral-700 dark:to-neutral-800"
				transition:fly={{ y: -20, duration: 400, easing: (t) => 1 - Math.pow(1 - t, 3) }}
			>
				<div class="flex items-start justify-between">
					<span class="text-xs font-semibold uppercase opacity-80">Credit Card</span>

					<div
						class="h-8 w-12 rounded-md bg-gradient-to-b from-yellow-300 to-yellow-500 opacity-80"
					></div>
				</div>
				<div class="mb-4">
					<div class="mb-2 font-mono text-lg tracking-widest sm:text-xl" aria-label="Card Number">
						{cardNumberFormatted || '#### #### #### ####'}
					</div>
					<div class="flex justify-between text-xs uppercase sm:text-sm">
						<span class="max-w-[60%] truncate" aria-label="Card Holder">
							{card.holder.toUpperCase() || 'CARD HOLDER'}
						</span>
						<span aria-label="Expiry Date">
							{card.expiry}
						</span>
					</div>
				</div>
			</div>
		{/if}

		{#if isBack}
			<div
				class="card-face card-back absolute inset-0 flex h-full w-full flex-col rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 p-5 text-white shadow-lg sm:p-6 dark:from-neutral-600 dark:to-neutral-700"
				transition:fly={{ y: 20, duration: 400, easing: (t) => 1 - Math.pow(1 - t, 3) }}
			>
				<div class="mt-4 h-10 w-full bg-black opacity-80 sm:h-12"></div>
				<div class="mt-4 flex items-center gap-4">
					<div
						class="flex h-8 flex-1 items-center justify-end rounded bg-gray-100 px-2 font-mono text-sm text-gray-700"
					>
						<span class="italic"> {card.cvv || '###'}</span>
					</div>
					<span class="text-xs text-gray-300 uppercase">CVV</span>
				</div>
				<div class="mt-auto text-center text-xs text-gray-400 opacity-70">
					Issuer information and hologram placeholder
				</div>
			</div>
		{/if}
	</div>
</header>
