<!-- src/lib/components/payment-methods/payment-methods-section.svelte -->
<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import PaymentMethodItem from './payment-method-item.svelte';
	// Import form dari lokasi *tetangganya* (billing)
	import AddCardForm from '../billing-information-list/add-card-form.svelte';
	import { samplePaymentMethods } from './data';
	import type { PaymentMethodData, CardBrand } from './data';
	import type { BillingFormSchema } from '../billing-information-list/schema'; // Import tipe skema form

	// State
	let isFormVisible = $state(false);
	// Buat state reaktif untuk daftar metode pembayaran
	let paymentMethods = $state<PaymentMethodData[]>([...samplePaymentMethods]);

	// --- Event Handlers ---
	function handleFormClose() {
		isFormVisible = false;
	}

	function handleFormSuccess(event: CustomEvent<BillingFormSchema>) {
		const formData = event.detail;
		console.log('Form submitted successfully:', formData);

		// **Logika untuk menambahkan kartu baru ke list (Contoh)**
		const newMethod: PaymentMethodData = {
			id: `pm_${Date.now()}`, // ID sementara, idealnya dari backend
			last4: formData.cardNumber.slice(-4),
			brand: detectBrand(formData.cardNumber), // Fungsi deteksi brand sederhana
			expiryMonth: formData.expiryDate.split('/')[0],
			expiryYear: `20${formData.expiryDate.split('/')[1]}`,
			// Logika default: kartu pertama jadi default, atau kartu baru tidak default
			isDefault: paymentMethods.length === 0
		};

		// Tambahkan ke awal atau akhir list
		paymentMethods = [newMethod, ...paymentMethods];

		// Tutup form
		isFormVisible = false;

		// Tampilkan notifikasi (opsional, alert bawaan sudah di form)
		// alert('New payment method added!');
	}

	function handleEditMethod(event: CustomEvent<string>) {
		const methodId = event.detail;
		console.log('Edit method:', methodId);
		// TODO: Implement logic to open an edit form/modal for this method
		alert(`Edit functionality for card ID ${methodId} not implemented yet.`);
	}

	function handleDeleteMethod(event: CustomEvent<string>) {
		const methodId = event.detail;
		console.log('Delete method:', methodId);
		// Konfirmasi sebelum menghapus
		if (window.confirm('Are you sure you want to delete this payment method?')) {
			const methodToDelete = paymentMethods.find((m) => m.id === methodId);
			// Cegah penghapusan default jika hanya ada 1 kartu (atau tambahkan logika lain)
			if (methodToDelete?.isDefault && paymentMethods.length <= 1) {
				alert('You cannot delete your only default payment method.');
				return;
			}

			paymentMethods = paymentMethods.filter((method) => method.id !== methodId);

			// Jika yang dihapus adalah default & masih ada kartu lain, jadikan yg pertama sbg default
			if (methodToDelete?.isDefault && paymentMethods.length > 0) {
				paymentMethods = paymentMethods.map((m, index) => ({
					...m,
					isDefault: index === 0 // Jadikan yg pertama baru sbg default
				}));
			}
			alert('Payment method deleted.');
		}
	}

	function handleSetDefaultMethod(event: CustomEvent<string>) {
		const methodId = event.detail;
		console.log('Set default method:', methodId);
		paymentMethods = paymentMethods.map((method) => ({
			...method,
			isDefault: method.id === methodId
		}));
		// Feedback visual akan otomatis update karena state berubah
	}

	// --- Helper Functions ---
	function detectBrand(cardNumber: string): CardBrand {
		// Logika deteksi brand SANGAT sederhana berdasarkan digit pertama
		// Ini TIDAK akurat dan hanya untuk contoh UI
		const firstDigit = cardNumber.charAt(0);
		if (firstDigit === '4') return 'visa';
		if (firstDigit === '5') return 'mastercard';
		if (firstDigit === '3') return 'amex'; // Bisa 34 atau 37
		if (firstDigit === '6') return 'discover';
		return 'other';
	}
</script>

<section class="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
	<div class="rounded-xl bg-white p-6 shadow-sm sm:p-8 dark:bg-neutral-800/50">
		<!-- Header -->
		<div
			class="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-100 pb-6 md:flex-row md:items-center md:gap-6 dark:border-neutral-700/50"
		>
			<div class="flex-1">
				<h2 class="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h2>
				<p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
					Manage your preferred payment methods securely and conveniently.
				</p>
			</div>
			<button
				type="button"
				class="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 transition-colors hover:bg-orange-500/10 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none active:opacity-85 md:w-auto dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-400/10 dark:focus:ring-orange-600 dark:focus:ring-offset-neutral-800"
				onclick={() => (isFormVisible = true)}
				aria-expanded={isFormVisible}
				aria-controls="add-payment-method-form"
			>
				<Plus class="h-4 w-4" stroke-width="2.5" />
				Add New Card
			</button>
		</div>

		<!-- Form Tambah Kartu (conditional) -->
		<div id="add-payment-method-form" class="mb-6 {isFormVisible ? '' : 'hidden'}">
			<!-- Beri border atau background berbeda saat form muncul -->
			<div class="rounded-lg border border-gray-200 dark:border-neutral-700">
				<AddCardForm on:close={handleFormClose} />
			</div>
		</div>

		<!-- Daftar Metode Pembayaran -->
		<div class="space-y-4">
			<h3 class="text-base font-medium text-gray-700 dark:text-neutral-300">Saved Cards</h3>
			{#if paymentMethods.length > 0}
				{#each paymentMethods as method (method.id)}
					<PaymentMethodItem
						{method}
						on:edit={handleEditMethod}
						on:delete={handleDeleteMethod}
						on:setDefault={handleSetDefaultMethod}
					/>
				{/each}
			{:else}
				<p
					class="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500 dark:border-neutral-600 dark:text-neutral-400"
				>
					You haven't added any payment methods yet.
				</p>
			{/if}
		</div>
	</div>
</section>
