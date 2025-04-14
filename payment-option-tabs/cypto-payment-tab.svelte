<script lang="ts">
	import { fade } from 'svelte/transition';
	import { cryptoOptionsData, type CryptoOption } from './data'; // Adjust path

	let selectedCrypto: string | null = cryptoOptionsData[0]?.id ?? null; // Default selection
</script>

<div class="space-y-4" transition:fade>
	<p class="text-sm font-medium text-gray-800 dark:text-neutral-200">Select cryptocurrency</p>
	<ul class="grid grid-cols-2 gap-4 sm:grid-cols-3">
		{#each cryptoOptionsData as crypto (crypto.id)}
			<li>
				<input
					type="radio"
					id={`crypto-${crypto.id}`}
					name="crypto-option"
					value={crypto.id}
					bind:group={selectedCrypto}
					class="peer hidden"
					required
				/>
				<label
					for={`crypto-${crypto.id}`}
					class="inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white p-4 text-gray-600 transition-colors duration-150 peer-checked:border-primary peer-checked:text-primary hover:bg-gray-100 hover:text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:peer-checked:border-orange-400 dark:peer-checked:text-orange-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
				>
					<span class="flex items-center gap-2">
						<span class="inline-block h-5 w-5 align-middle">{@html crypto.iconSvg}</span>
						<span class="text-sm font-medium">{crypto.name}</span>
					</span>
				</label>
			</li>
		{/each}
	</ul>
	<button
		class="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary to-red-500 px-5 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 ease-in-out hover:from-primary hover:to-red-600 hover:shadow-orange-400/40 focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-orange-800"
		type="button"
	>
		Connect Wallet
	</button>
</div>
