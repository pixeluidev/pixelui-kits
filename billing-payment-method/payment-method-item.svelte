<script lang="ts">
	import { Pencil, Trash2, CheckCircle } from '@lucide/svelte';
	import type { PaymentMethodData } from './types';
	import { createEventDispatcher } from 'svelte';

	export let method: PaymentMethodData;

	const dispatch = createEventDispatcher<{ edit: string; delete: string; setDefault: string }>();

	// Helper untuk mendapatkan path logo
	// Menggunakan dua gambar terpisah yang di-toggle oleh class `dark:` dari Tailwind
	function getLogoPath(brand: string, variant: 'light' | 'dark'): string {
		const suffix = variant === 'dark' ? '-dark' : '';
		// Asumsi path: /images/icons/visa.svg, /images/icons/visa-dark.svg, dst.
		// Sesuaikan dengan struktur path Anda
		return `/images/icons/${brand.toLowerCase()}${suffix}.svg`;
	}

	function handleEdit() {
		dispatch('edit', method.id);
	}

	function handleDelete() {
		dispatch('delete', method.id);
	}

	function handleSetDefault() {
		if (!method.isDefault) {
			dispatch('setDefault', method.id);
		}
	}
</script>

<div
	class="group flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-neutral-700 dark:bg-neutral-800"
	class:border-primary={method.isDefault}
	class:dark:border-orange-400={method.isDefault}
	class:shadow-orange-100={method.isDefault}
	class:dark:shadow-orange-50={method.isDefault}
>
	<div class="flex flex-1 items-center gap-4">
		<!-- Logo (Light/Dark Version Handling) -->
		<div class="flex h-8 w-12 flex-shrink-0 items-center justify-center">
			<!-- Light Logo -->

			<img alt="Visa Dark" class="h-7 w-auto dark:hidden" src={`/images/${method.brand}.svg`} />
			<img
				alt="Visa Dark"
				class="hidden h-7 w-auto dark:block"
				src={`/images/${method.brand}-dark.svg`}
			/>
		</div>

		<!-- Card Info -->
		<div class="flex-1">
			<p class="flex items-center font-semibold text-gray-800 dark:text-neutral-100">
				<span class="font-mono tracking-wider">**** **** **** {method.last4}</span>
				{#if method.isDefault}
					<span
						class="ml-2 inline-flex items-center gap-1 rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
					>
						<CheckCircle class="h-3 w-3" />
						Default
					</span>
				{/if}
			</p>
			<p class="text-sm text-gray-500 dark:text-neutral-400">
				Expires {method.expiryMonth}/{method.expiryYear.slice(-2)}
			</p>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex items-center justify-end gap-2 sm:justify-start">
		{#if !method.isDefault}
			<button
				type="button"
				class="focus:ring-primary rounded px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:ring-2 focus:ring-offset-1 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800"
				onclick={handleSetDefault}
				aria-label="Set as default"
			>
				Set Default
			</button>
		{/if}
		<button
			type="button"
			class="focus:ring-primary flex h-8 w-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-offset-1 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-orange-400 dark:focus:ring-offset-neutral-800"
			onclick={handleEdit}
			aria-label="Edit payment method"
		>
			<Pencil class="h-4 w-4" />
		</button>
		<button
			type="button"
			class="flex h-8 w-8 items-center justify-center rounded text-red-500 transition-colors hover:bg-red-100 hover:text-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:outline-none dark:text-red-500/90 dark:hover:bg-red-900/30 dark:hover:text-red-500 dark:focus:ring-red-600 dark:focus:ring-offset-neutral-800"
			onclick={handleDelete}
			aria-label="Delete payment method"
		>
			<Trash2 class="h-4 w-4" />
		</button>
	</div>
</div>

<style>
	/* Optional: Tambahkan style jika perlu */
</style>
