<script>
	export let item;
	export let pricingOption;

	import { Check } from '@lucide/svelte';

	$: cardClassName = `flex flex-col rounded-lg p-4 md:p-6 rounded-large  max-w-xs w-full transition-all duration-300 ease-in-out ${
		item.heading === 'Pro' ? 'border-2 border-orange-400 shadow-2xl  scale-105' : ''
	}`;

	$: buttonClass = `w-full rounded-full mt-4 px-4 py-2 rounded-medium font-medium text-sm focus:outline-none transition-colors ${
		item.buttonVariant === 'primary'
			? 'bg-primary text-primary-foreground hover:bg-primary/90'
			: item.buttonVariant === 'bordered'
				? 'border-2 border-primary text-primary hover:bg-primary/10'
				: 'bg-default-200 text-default-800 hover:bg-default-300'
	}`;
</script>

<div class={cardClassName}>
	<div class="flex h-full flex-col justify-between gap-4">
		<div class="flex flex-col gap-2">
			<div class="flex flex-row items-center justify-between gap-2">
				<p class="text-default-900 text-lg font-semibold">{item.heading}</p>

				{#if item.badgeText}
					<span class="bg-primary/20 text-primary rounded-full px-1.5 py-0.5 text-xs font-medium">
						{item.badgeText}
					</span>
				{/if}
			</div>
			<p class="text-default-500 text-sm">{item.description}</p>
		</div>

		<hr class="border-default-200 my-2 border-t" />

		<div class="flex flex-col gap-4">
			<p class="flex items-baseline gap-1">
				<span
					class="inline text-4xl leading-7 font-semibold tracking-tight text-black dark:text-white"
				>
					${pricingOption === 'yearly' ? item.pricing : item.QuarterlyPricing}
				</span>
				<span class="text-small text-default-400 font-medium">
					{pricingOption === 'yearly' ? '/per year' : '/per quarter'}
				</span>
			</p>
			<ul class="flex flex-col gap-2">
				{#each item.list || [] as listItem (listItem)}
					<li class="flex flex-row items-center gap-2 text-sm">
						<div class="text-primary h-5 w-5 flex-shrink-0">
							<Check size={20} strokeWidth={2.5} />
						</div>
						<p class="text-default-600">{listItem}</p>
					</li>
				{/each}
			</ul>
		</div>

		<button class={buttonClass}>
			{item.buttonText || 'Get Started'}
		</button>
	</div>
</div>
