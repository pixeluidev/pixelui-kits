<script lang="ts">
	import { fly } from 'svelte/transition';

	let cardholder: string = '';
	let cardNumberRaw: string = '';
	let expired: { month: string; year: string } = { month: '', year: '' };
	let securityCode: string = '';
	let cardSide: 'front' | 'back' = 'front';

	$: cardNumberFormatted = cardNumberRaw
		.replace(/\D/g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim()
		.slice(0, 19);

	function formatCardNumberInput() {
		cardNumberRaw = cardNumberRaw.replace(/\D/g, '').slice(0, 16);
	}

	function formatSecurityCodeInput() {
		securityCode = securityCode.replace(/\D/g, '').slice(0, 3);
	}

	$: isValid =
		cardholder.trim().length >= 3 &&
		cardNumberRaw.length === 16 &&
		expired.month !== '' &&
		expired.year !== '' &&
		securityCode.length === 3;

	function flipToBack() {
		cardSide = 'back';
	}

	function flipToFront() {
		cardSide = 'front';
	}

	function handleSubmit() {
		if (!isValid) return;

		alert(`Payment submitted for ${cardholder}! (This is a demo - no real data sent)`);
	}

	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 10 }, (_, i) => currentYear + i);
</script>

<div
	class="flex w-full items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-4 py-20 dark:from-neutral-900 dark:to-neutral-800"
>
	<div
		class="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800/50 dark:backdrop-blur-sm"
	>
		<header
			class="perspective relative flex h-56 flex-col items-center justify-center p-4 sm:h-64 sm:p-6"
		>
			<div class="card-flipper relative h-full w-full max-w-sm">
				{#if cardSide === 'front'}
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
							<div
								class="mb-2 font-mono text-lg tracking-widest sm:text-xl"
								aria-label="Card Number"
							>
								{cardNumberFormatted || '#### #### #### ####'}
							</div>
							<div class="flex justify-between text-xs uppercase sm:text-sm">
								<span class="max-w-[60%] truncate" aria-label="Card Holder">
									{cardholder.toUpperCase() || 'CARD HOLDER'}
								</span>
								<span aria-label="Expiry Date">
									{expired.month || 'MM'}/{expired.year.slice(-2) || 'YY'}
								</span>
							</div>
						</div>
					</div>
				{/if}

				{#if cardSide === 'back'}
					<div
						class="card-face card-back absolute inset-0 flex h-full w-full flex-col rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 p-5 text-white shadow-lg sm:p-6 dark:from-neutral-600 dark:to-neutral-700"
						transition:fly={{ y: 20, duration: 400, easing: (t) => 1 - Math.pow(1 - t, 3) }}
					>
						<div class="mt-4 h-10 w-full bg-black opacity-80 sm:h-12"></div>
						<div class="mt-4 flex items-center gap-4">
							<div
								class="flex h-8 flex-1 items-center justify-end rounded bg-gray-100 px-2 font-mono text-sm text-gray-700"
							>
								<span class="italic"> {securityCode || '###'}</span>
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

		<main class="p-4 sm:p-6">
			<h1 class="mb-5 text-center text-lg font-semibold text-gray-800 dark:text-white">
				Payment Details
			</h1>
			<form class="space-y-4" onclick={handleSubmit}>
				<div>
					<label class="sr-only" for="cardholder">Card Holder</label>
					<input
						bind:value={cardholder}
						class="focus:ring-primary block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
						id="cardholder"
						maxlength="30"
						name="cardholder"
						placeholder="Card Holder Name"
						required
						type="text"
					/>
				</div>

				<div>
					<label class="sr-only" for="cardNumber">Card Number</label>
					<input
						bind:value={cardNumberRaw}
						class="focus:ring-primary block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono tracking-wider text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
						id="cardNumber"
						inputmode="numeric"
						maxlength="16"
						name="cardNumber"
						oninput={formatCardNumberInput}
						placeholder="0000 0000 0000 0000"
						required
						type="text"
					/>
				</div>

				<div class="grid grid-cols-4 gap-3">
					<label
						class="col-span-4 -mb-2 text-sm font-medium text-gray-600 dark:text-neutral-300"
						for="expiryMonth">Expiry Date</label
					>

					<div class="relative col-span-1">
						<select
							bind:value={expired.month}
							class="form-select focus:ring-primary block w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-3 ps-4 pe-9 text-gray-800 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
							id="expiryMonth"
							name="expiryMonth"
							required
						>
							<option disabled selected value="">MM</option>
							{#each Array.from( { length: 12 }, (_, i) => String(i + 1).padStart(2, '0') ) as month (month)}
								<option value={month}>{month}</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-neutral-500"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 8l4 4 4-4"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
								/>
							</svg>
						</div>
					</div>

					<div class="relative col-span-1">
						<select
							bind:value={expired.year}
							class="form-select focus:ring-primary block w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-3 ps-4 pe-9 text-gray-800 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
							id="expiryYear"
							name="expiryYear"
							required
						>
							<option disabled selected value="">YY</option>
							{#each years as year (year)}
								<option value={String(year)}>{String(year).slice(-2)}</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-neutral-500"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 8l4 4 4-4"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
								/>
							</svg>
						</div>
					</div>

					<div class="col-span-2">
						<label class="sr-only" for="securityCode">Security Code (CVV)</label>
						<input
							bind:value={securityCode}
							class="focus:ring-primary block w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400"
							id="securityCode"
							inputmode="numeric"
							maxlength="3"
							name="securityCode"
							onblur={flipToFront}
							onfocus={flipToBack}
							oninput={formatSecurityCodeInput}
							placeholder="CVV"
							required
							type="text"
						/>
					</div>
				</div>
			</form>
		</main>

		<footer class="p-4 sm:p-6">
			<button
				class="w-full rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 ease-in-out focus:ring-4 focus:ring-orange-300 focus:outline-none dark:focus:ring-orange-800"
				class:bg-gradient-to-r={isValid}
				class:bg-gray-300={!isValid}
				class:cursor-not-allowed={!isValid}
				class:dark:bg-neutral-600={!isValid}
				class:dark:text-neutral-400={!isValid}
				class:from-primary={isValid}
				class:hover:from-primary={isValid}
				class:hover:shadow-xl={isValid}
				class:hover:to-red-600={isValid}
				class:shadow-lg={isValid}
				class:text-gray-500={!isValid}
				class:to-red-500={isValid}
				disabled={!isValid}
				form="payment-form"
				onclick={handleSubmit}
				type="submit"
			>
				Pay Now

				{#if isValid}
					<span class="ml-1 font-mono">({cardNumberFormatted.slice(-4)})</span>
				{/if}
			</button>
		</footer>
	</div>
</div>

<style>
	.perspective {
		perspective: 1000px;
	}

	.card-flipper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.form-select {
		background-image: none;
		padding-right: 2.5rem;
	}
</style>
