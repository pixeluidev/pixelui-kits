<script lang="ts">
	import {
		ArrowLeftRightIcon,
		BadgePercentIcon,
		LandmarkIcon,
		ReceiptIcon,
		TicketSlashIcon,
		WalletIcon
	} from 'lucide-svelte';

	const actions = [
		{
			label: 'Credit Cards',
			icon: WalletIcon
		},
		{
			label: 'Bank Nearby',
			icon: LandmarkIcon
		},
		{
			label: 'Transfer',
			icon: ArrowLeftRightIcon
		},
		{
			label: 'Refunds',
			icon: TicketSlashIcon
		},
		{
			label: 'Receipt',
			icon: ReceiptIcon
		},
		{
			label: 'Taxes',
			icon: BadgePercentIcon
		}
	];
</script>

<div class="container">
	<div
		class="text-foreground bg-background data-[focus-visible=true]:outline-focus transition-transform-background relative mx-auto box-border flex h-auto w-full max-w-[500px] flex-col overflow-hidden rounded-md border p-6 shadow-md outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
	>
		<header class="mb-6 flex items-center justify-between">
			<h3 class="font-bold">Services</h3>
			<a href="/" class="text-xs hover:underline">21 Other services</a>
		</header>
		<div class="grid grid-cols-3 gap-6">
			{#each actions as { label, icon: Icon } (label)}
				<button
					class="flex flex-col items-center justify-center gap-4 rounded-md bg-gray-100 p-4 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800"
				>
					<Icon class="size-10" />
					<span>{label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
