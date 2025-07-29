<!-- src/lib/components/billing/add-card-form.svelte -->
<script lang="ts">
	import { X, CreditCard } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { type BillingFormSchema, cardSchema } from './schema'; // Import skema dari file terpisah
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ close: void; success: Record<string, unknown> }>();
	const defaultValue: BillingFormSchema = {
		cardholderName: '',
		cardNumber: '',
		expiryDate: '',
		cvv: ''
	};
	// --- State ---
	let expiryMonth = $state('');
	let expiryYear = $state('');

	// --- Constants ---
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from({ length: 10 }, (_, i) => currentYear + i);
	const months: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

	// --- Form Initialization ---
	const { form, errors, enhance, message, constraints, submitting } = superForm<BillingFormSchema>(
		defaultValue, // Tidak ada data awal
		{
			validators: zod(cardSchema), // Gunakan skema yang diimpor
			SPA: true,
			invalidateAll: false,
			resetForm: true, // Jangan reset month/year select
			onResult: ({ result }) => {
				if (result.type === 'success' && result.data?.form.data) {
					// Dispatch event sukses dengan data form
					dispatch('success', result.data.form.data);
					// Dispatch event close setelah sukses
					dispatch('close');
				} else if (result.type === 'error') {
					console.error('Form submission server error:', result);
				}
			},
			onError: ({ result }) => {
				console.warn('Client-side validation errors:', result.error.message);
			}
		}
	);

	// --- Reactive Effects ---
	$effect(() => {
		if (expiryMonth && expiryYear) {
			$form.expiryDate = `${expiryMonth}/${expiryYear.slice(-2)}`;
		} else {
			$form.expiryDate = ''; // Reset jika salah satu kosong
		}
	});

	// --- Event Handlers ---
	function closeForm() {
		dispatch('close'); // Dispatch event close
	}

	function formatCardNumberInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const cleaned = input.value.replace(/\D/g, '').slice(0, 19); // Max 19 digit
		$form.cardNumber = cleaned;
		// Update visual (mungkin menyebabkan kursor melompat)
		input.value = cleaned.replace(/(.{4})/g, '$1 ').trim();
	}

	function formatCvvInput(event: Event) {
		const input = event.target as HTMLInputElement;
		input.value = input.value.replace(/\D/g, '').slice(0, 4); // Max 4 digit
		$form.cvv = input.value;
	}
</script>

<div class="border-b border-gray-100 bg-white dark:border-neutral-700 dark:bg-neutral-800/30">
	<form method="POST" use:enhance action="?/addCard">
		<main class="space-y-4 p-4 sm:p-6">
			<div class="flex items-center justify-between">
				<h3 class="text-base font-semibold text-gray-800 dark:text-neutral-100">
					Add a New Payment Card
				</h3>
				<button
					type="button"
					onclick={closeForm}
					class="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
					aria-label="Close add card form"
				>
					<X class="h-5 w-5" />
				</button>
			</div>

			<!-- Cardholder Name -->
			<div>
				<label class="sr-only" for="cardholderName">Card Holder Name</label>
				<input
					type="text"
					id="cardholderName"
					name="cardholderName"
					placeholder="Card Holder Name"
					bind:value={$form.cardholderName}
					aria-invalid={$errors.cardholderName ? 'true' : undefined}
					class:border-red-500={$errors.cardholderName}
					class:dark:border-red-600={$errors.cardholderName}
					class="focus:ring-primary block w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 {$errors.cardholderName
						? 'border-red-500'
						: 'border-gray-200'}"
					{...$constraints.cardholderName}
				/>
				{#if $errors.cardholderName}
					<p class="mt-1 text-xs text-red-600 dark:text-red-500">{$errors.cardholderName}</p>
				{/if}
			</div>

			<!-- Card Number -->
			<div>
				<label class="sr-only" for="cardNumber">Card Number</label>
				<div class="relative">
					<input
						type="text"
						id="cardNumber"
						name="cardNumber"
						placeholder="0000 0000 0000 0000"
						inputmode="numeric"
						value={$form.cardNumber?.replace(/(.{4})/g, '$1 ').trim() ?? ''}
						oninput={formatCardNumberInput}
						aria-invalid={$errors.cardNumber ? 'true' : undefined}
						class:border-red-500={$errors.cardNumber}
						class:dark:border-red-600={$errors.cardNumber}
						class="focus:ring-primary block w-full rounded-lg border bg-gray-50 px-4 py-3 pr-10 font-mono tracking-wider text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 {$errors.cardNumber
							? 'border-red-500'
							: 'border-gray-200'}"
						{...$constraints.cardNumber}
						maxlength="22"
					/>
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<CreditCard class="h-5 w-5 text-gray-400 dark:text-neutral-500" aria-hidden="true" />
					</div>
				</div>
				{#if $errors.cardNumber}
					<p class="mt-1 text-xs text-red-600 dark:text-red-500">{$errors.cardNumber}</p>
				{/if}
			</div>

			<!-- Expiry Date & CVV Grid -->
			<div class="grid grid-cols-4 gap-3">
				<label class="col-span-4 -mb-2 text-sm font-medium text-gray-600 dark:text-neutral-300"
					>Expiry Date</label
				>

				<!-- Expiry Month Select -->
				<div class="relative col-span-1">
					<select
						bind:value={expiryMonth}
						aria-label="Expiry Month"
						id="expiryMonth"
						class:border-red-500={$errors.expiryDate && !expiryMonth}
						class:dark:border-red-600={$errors.expiryDate && !expiryMonth}
						class="form-select focus:ring-primary block w-full appearance-none rounded-lg border bg-gray-50 py-3 ps-4 pe-9 text-gray-800 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white {$errors.expiryDate &&
						!expiryMonth
							? 'border-red-500'
							: 'border-gray-200'}"
					>
						<option disabled selected value="">MM</option>
						{#each months as month (month)}
							<option value={month}>{month}</option>
						{/each}
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-neutral-500"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>

				<!-- Expiry Year Select -->
				<div class="relative col-span-1">
					<select
						bind:value={expiryYear}
						aria-label="Expiry Year"
						id="expiryYear"
						class:border-red-500={$errors.expiryDate && !expiryYear}
						class:dark:border-red-600={$errors.expiryDate && !expiryYear}
						class="form-select focus:ring-primary block w-full appearance-none rounded-lg border bg-gray-50 py-3 ps-4 pe-9 text-gray-800 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white {$errors.expiryDate &&
						!expiryYear
							? 'border-red-500'
							: 'border-gray-200'}"
					>
						<option disabled selected value="">YY</option>
						{#each years as year (year)}
							<option value={String(year)}>{String(year).slice(-2)}</option>
						{/each}
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-neutral-500"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</div>

				<!-- CVV -->
				<div class="col-span-2">
					<label class="sr-only" for="cvv">Security Code (CVV)</label>
					<input
						type="text"
						id="cvv"
						name="cvv"
						placeholder="CVV"
						inputmode="numeric"
						bind:value={$form.cvv}
						oninput={formatCvvInput}
						aria-invalid={$errors.cvv ? 'true' : undefined}
						class:border-red-500={$errors.cvv}
						class:dark:border-red-600={$errors.cvv}
						class="focus:ring-primary block w-full rounded-lg border bg-gray-50 px-4 py-3 font-mono text-gray-800 placeholder-gray-400 transition duration-150 ease-in-out focus:border-transparent focus:ring-2 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 {$errors.cvv
							? 'border-red-500'
							: 'border-gray-200'}"
						{...$constraints.cvv}
						maxlength="4"
					/>
				</div>

				<!-- Error messages for expiry and cvv -->
				<div class="col-span-2">
					{#if $errors.expiryDate}
						<p class="mt-1 text-xs text-red-600 dark:text-red-500">{$errors.expiryDate}</p>
					{/if}
				</div>
				<div class="col-span-2">
					{#if $errors.cvv}
						<p class="mt-1 text-xs text-red-600 dark:text-red-500">{$errors.cvv}</p>
					{/if}
				</div>
			</div>

			<!-- Submission Message -->
			{#if $message}
				<p class="text-sm text-red-600 dark:text-red-500">{$message}</p>
			{/if}
		</main>

		<footer class="p-4 sm:p-6">
			<button
				type="submit"
				disabled={$submitting}
				class="w-full rounded-lg px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 ease-in-out focus:ring-4 focus:ring-orange-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-orange-800"
				class:bg-gray-400={$submitting}
				class:dark:bg-neutral-600={$submitting}
				class:bg-gradient-to-r={!$submitting}
				class:from-primary={!$submitting}
				class:to-red-500={!$submitting}
				class:hover:from-primary={!$submitting}
				class:hover:to-red-600={!$submitting}
				class:hover:shadow-lg={!$submitting}
			>
				{#if $submitting}
					<svg
						class="mx-auto h-5 w-5 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				{:else}
					Save Card
				{/if}
			</button>
		</footer>
	</form>
</div>

<style>
	.form-select {
		background-image: none; /* Hapus panah default jika ada */
		padding-right: 2.5rem; /* Ruang untuk panah kustom SVG */
	}
</style>
