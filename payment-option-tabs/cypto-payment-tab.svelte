<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cryptoOptionsData, type CryptoOption } from './data'; // Adjust path

	let selectedCrypto: string | null = cryptoOptionsData[0]?.id ?? null; // Default selection
</script>

<div class="space-y-4" transition:fade>
	<p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Select cryptocurrency</p>
	<ul class="grid grid-cols-2 sm:grid-cols-3 gap-4">
		{#each cryptoOptionsData as crypto (crypto.id)}
			<li>
				<input type="radio" id={`crypto-${crypto.id}`} name="crypto-option" value={crypto.id}
							 bind:group={selectedCrypto} class="hidden peer" required>
				<label for={`crypto-${crypto.id}`}
							 class="inline-flex items-center justify-center w-full p-4 text-gray-600 bg-white border border-gray-200 rounded-lg cursor-pointer dark:text-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:peer-checked:border-orange-400 peer-checked:border-orange-500 peer-checked:text-orange-600 dark:peer-checked:text-orange-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:text-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-150">
                    <span class="flex items-center gap-2">
                         <span class="w-5 h-5 inline-block align-middle">{@html crypto.iconSvg}</span>
                         <span class="text-sm font-medium">{crypto.name}</span>
                    </span>
				</label>
			</li>
		{/each}
	</ul>
	<button class="flex w-full items-center justify-center rounded-lg px-5 py-3 text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800 transition-all duration-200 ease-in-out bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-400/40"
					type="button">
		Connect Wallet
	</button>
</div>