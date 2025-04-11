<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="flex min-h-[10rem] flex-col items-center justify-center p-6" transition:fade>
	<p class="mb-6 text-center text-gray-600 dark:text-neutral-400">
		Proceed with PayPal to complete your payment securely.
	</p>
	<button
		class="inline-flex items-center justify-center gap-x-2.5 rounded-lg border border-transparent bg-[#00457C] px-8 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#003057] focus:ring-2 focus:ring-[#0079C1] focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-neutral-800"
		type="button"
	>
		<img alt="PayPal" class="h-5 w-auto dark:hidden" src="/images/paypal.svg" />
		<img alt="PayPal Dark" class="hidden h-5 w-auto dark:block" src="/images/paypal-dark.svg" />
		Pay now with Paypal
	</button>
</div>
