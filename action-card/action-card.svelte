<script lang="ts">
	import {
		ArrowLeftRightIcon, BadgePercentIcon,
		LandmarkIcon,
		ReceiptIcon,
		TicketSlashIcon,
		WalletIcon
	} from 'lucide-svelte';

	const actions = [
		{
			label:"Credit Cards",
			icon:WalletIcon
		},
		{
			label:"Bank Nearby",
			icon:LandmarkIcon
		},
		{
			label:"Transfer",
			icon:ArrowLeftRightIcon
		},
		{
			label:"Refunds",
			icon:TicketSlashIcon
		},
		{
			label:"Receipt",
			icon:ReceiptIcon
		},	{
			label:"Taxes",
			icon:BadgePercentIcon
		}
	]
</script>

<div class="container">
	<div class="flex mx-auto flex-col relative overflow-hidden h-auto text-foreground box-border bg-background outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-md  transition-transform-background motion-reduce:transition-none w-full max-w-[500px] border rounded-md p-6">
		<header class="flex items-center justify-between mb-6">
			<h3 class="font-bold">Services</h3>
			<a href="/" class="text-xs hover:underline">21 Other services</a>
		</header>
		<div class="grid grid-cols-3 gap-6">
			{#each actions as {label,icon:Icon} (label)}
	<button class="rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-50 flex flex-col gap-4 items-center justify-center p-4 hover:bg-gray-200 dark:hover:bg-gray-800">
		<Icon class="size-10"/>
		<span>{label}</span>
	</button>
				{/each}
		</div>
	</div>
</div>