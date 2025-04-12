<script lang="ts">
	import { fade } from 'svelte/transition';

	import CreditCardIcon from 'lucide-svelte/icons/credit-card';
	import HelpCircle from 'lucide-svelte/icons/help-circle';

	// Props for binding form values (two-way)
	export let fullName: string = '';
	export let cardNumberRaw: string = '';
	export let expiryMonth: string = '';
	export let expiryYear: string = '';
	export let cvv: string = '';

	// Props for visibility control
	export let isVisible: boolean = false; // Controlled by parent

	// Tooltip state
	let isCvvTooltipVisible: boolean = false;

	// Validation (could be passed down or calculated here)
	// For simplicity, let's assume parent handles overall validation for submission
	// $: isValid = ...

	// Formatting functions
	function formatCardNumber() {
		cardNumberRaw = cardNumberRaw.replace(/\D/g, '').slice(0, 16);
	}

	function formatCvv() {
		cvv = cvv.replace(/\D/g, '').slice(0, 3);
	}

	// Tooltip handlers
	function showCvvTooltip() {
		isCvvTooltipVisible = true;
	}

	function hideCvvTooltip() {
		isCvvTooltipVisible = false;
	}

	// Dynamic Years
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 10 }, (_, i) => currentYear + i);
</script>

{#if isVisible}
	<div class="mt-6 space-y-5 border-t border-gray-200 pt-6 dark:border-neutral-700" transition:fade>
		<h3 class="text-base font-semibold text-gray-800 dark:text-white">Add New Card Details</h3>

		<div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
			<!-- Full Name -->
			<div class="sm:col-span-2">
				<label
					for="new-full_name"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
				>
					Full name (on card)<span class="text-red-500">*</span></label
				>
				<input
					type="text"
					id="new-full_name"
					name="newFullName"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
					placeholder="BONNIE GREEN"
					required
					bind:value={fullName}
				/>
			</div>

			<!-- Card Number -->
			<div class="relative sm:col-span-2">
				<label
					for="new-card-number"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
				>
					Card number<span class="text-red-500">*</span>
				</label>
				<input
					type="text"
					id="new-card-number"
					name="newCardNumber"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pe-12 font-mono text-sm tracking-wider text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
					placeholder="0000 0000 0000 0000"
					required
					inputmode="numeric"
					maxlength="16"
					bind:value={cardNumberRaw}
					oninput={formatCardNumber}
				/>
				<div class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-3.5">
					<CreditCardIcon class="h-5 w-5 text-gray-400 dark:text-neutral-500" strokeWidth={1.5} />
				</div>
			</div>

			<!-- Expiry Month -->
			<div class="relative">
				<label
					for="new-expiry-month"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300">Month*</label
				>
				<select
					id="new-expiry-month"
					name="newExpiryMonth"
					class="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:ring-orange-600/50"
					required
					bind:value={expiryMonth}
				>
					<option value="" selected disabled>MM</option>
					{#each Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')) as month}
						<option value={month}>{month}</option>
					{/each}
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
				>
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 8l4 4 4-4"
						/>
					</svg>
				</div>
			</div>

			<!-- Expiry Year -->
			<div class="relative">
				<label
					for="new-expiry-year"
					class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300">Year*</label
				>
				<select
					id="new-expiry-year"
					name="newExpiryYear"
					class="block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-3 ps-4 pe-9 text-sm text-gray-900 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:ring-orange-600/50"
					required
					bind:value={expiryYear}
				>
					<option value="" selected disabled>YY</option>
					{#each years as year}
						<option value={String(year)}>{String(year).slice(-2)}</option>
					{/each}
				</select>
				<div
					class="pointer-events-none absolute inset-y-0 end-0 top-9 flex items-center pe-2.5 text-gray-400 dark:text-neutral-500"
				>
					<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 8l4 4 4-4"
						/>
					</svg>
				</div>
			</div>

			<!-- CVV -->
			<div class="relative sm:col-span-2">
				<label
					for="new-cvv"
					class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-neutral-300"
				>
					CVV <span class="text-red-500">*</span>
					<button
						type="button"
						class="text-gray-400 hover:text-gray-700 dark:text-neutral-500 dark:hover:text-neutral-300"
						onmouseenter={showCvvTooltip}
						onmouseleave={hideCvvTooltip}
						onfocus={showCvvTooltip}
						onblur={hideCvvTooltip}
						aria-describedby="new-cvv-tooltip"
					>
						<HelpCircle class="h-4 w-4" />
					</button>
					{#if isCvvTooltipVisible}
						<div
							id="new-cvv-tooltip"
							role="tooltip"
							class="absolute -top-10 left-10 z-10 inline-block rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-sm dark:bg-neutral-700"
							transition:fade={{ duration: 150 }}
						>
							3 digits on back of card
						</div>
					{/if}
				</label>
				<input
					type="text"
					id="new-cvv"
					name="newCvv"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-900 placeholder-gray-400 transition duration-150 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:ring-orange-600/50"
					placeholder="•••"
					required
					inputmode="numeric"
					maxlength="3"
					bind:value={cvv}
					oninput={formatCvv}
				/>
			</div>
		</div>
	</div>
{/if}
