<script>
	// Import data dan komponen anak
	import { PricingList, PricingTabsOptions } from './data'; // Sesuaikan path
	import PricingItem from './pricing-item.svelte';

	// State Svelte (gunakan let untuk reaktivitas)
	let pricingOption = 'yearly'; // Default value

	// Fungsi untuk mengubah state (bisa langsung di event handler)
	// function handleSelectionChange(event) {
	//   pricingOption = event.detail; // Jika menggunakan komponen Tabs kustom
	// }
</script>

<div
	class="bg-background text-foreground flex w-full flex-col items-center gap-6 p-4 md:gap-8 md:p-8"
>
	<div class="flex max-w-xl flex-col gap-2 text-center">
		<h2 class="text-primary font-medium">Pricing</h2>
		<h1 class="text-3xl font-medium tracking-tight md:text-4xl">Get unlimited access.</h1>
		<h2 class="text-default-500 text-lg md:text-xl">
			Discover the ideal plan, beginning at under $2 per week.
		</h2>
	</div>

	<div class="bg-default-100 flex rounded-full p-1 shadow-sm">
		{#each PricingTabsOptions as option (option.title)}
			<button
				class="focus-visible:ring-primary focus-visible:ring-offset-background rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
				class:bg-primary={pricingOption === option.title}
				class:text-primary-foreground={pricingOption === option.title}
				class:text-default-600={pricingOption !== option.title}
				class:hover:text-default-800={pricingOption !== option.title}
				class:shadow-md={pricingOption === option.title}
				aria-pressed={pricingOption === option.title}
				on:click={() => {
					pricingOption = option.title;
				}}
			>
				<div class="flex items-center gap-1.5">
					<span>{option.label}</span>

					{#if option.chipText}
						<span
							class:bg-white={pricingOption === option.title}
							class:dark:bg-background={pricingOption === option.title}
							class="bg-primary/20 text-primary rounded-full px-1.5 py-0.5 text-xs font-medium whitespace-nowrap"
						>
							{option.chipText}
						</span>
					{/if}
				</div>
			</button>
		{/each}
	</div>

	<div
		class="mt-4 flex w-full max-w-5xl flex-col flex-wrap items-center justify-center gap-4 sm:flex-row md:mt-6 md:items-stretch md:gap-6"
	>
		{#each PricingList as item (item.heading)}
			<PricingItem {item} {pricingOption} />
		{/each}
	</div>
</div>
