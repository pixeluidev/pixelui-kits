<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex flex-col items-center justify-center p-6 min-h-[10rem]" transition:fade>
	<p class="text-center text-gray-600 dark:text-neutral-400 mb-6">Proceed with PayPal to complete your payment
		securely.</p>
	<button class="inline-flex items-center justify-center gap-x-2.5 rounded-lg border border-transparent bg-[#00457C] hover:bg-[#003057] px-8 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#0079C1] focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors duration-150"
					type="button">
		<img alt="PayPal" class="h-5 w-auto dark:hidden" src="/components-images/paypal.svg" />
		<img
			alt="PayPal Dark"
			class="hidden h-5 w-auto dark:block"
			src="/components-images/paypal-dark.svg"
		/>
		Pay now with Paypal
	</button>
</div>