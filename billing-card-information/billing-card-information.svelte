<script lang="ts">
	import CreditCard from './card.svelte';
	import type { CardData } from './types';

	// Contoh data kartu (bisa dijadikan props jika perlu)
	const sampleCard: CardData = {
		number: '4562112245947852',
		holder: 'Jack Peterson',
		expiry: '11/22',
		brand: 'mastercard',
		cvv: '123' // Contoh CVV untuk bagian belakang
	};
</script>

<section class="w-full bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20 dark:bg-neutral-900">
	<div class="grid w-full grid-cols-2 gap-10">
		<CreditCard card={sampleCard} isBack={false} />
		<CreditCard card={sampleCard} isBack={true} />
	</div>
</section>
