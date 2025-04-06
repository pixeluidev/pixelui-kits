<script lang="ts">
	export let minValue = 25;
	export let maxValue = 75;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let labels: string[] = ['0%', '25%', '50%', '75%', '100%'];

	function handleMinInput(event: Event) {
		const target = event.target as HTMLInputElement;
		minValue = Math.min(parseInt(target.value), maxValue - step);
	}

	function handleMaxInput(event: Event) {
		const target = event.target as HTMLInputElement;
		maxValue = Math.max(parseInt(target.value), minValue + step);
	}

	$: minPercentage = ((minValue - min) / (max - min)) * 100;
	$: maxPercentage = ((maxValue - min) / (max - min)) * 100;
</script>

<div class="container">
	<div class="relative w-full pt-6 pb-8">
		<div class="absolute h-2 w-full rounded-full bg-gray-200">
			<div
				class="absolute h-full rounded-full bg-indigo-500"
				style="left: {minPercentage}%; right: {100 - maxPercentage}%"
			></div>
		</div>

		<input
			type="range"
			{min}
			{max}
			{step}
			value={minValue}
			on:input={handleMinInput}
			class="absolute z-20 h-2 w-full cursor-pointer appearance-none bg-transparent"
		/>

		<input
			type="range"
			{min}
			{max}
			{step}
			value={maxValue}
			on:input={handleMaxInput}
			class="absolute z-10 h-2 w-full cursor-pointer appearance-none bg-transparent"
		/>

		<div
			class="pointer-events-none absolute size-5 -translate-y-1.5 transform rounded-full border-2 border-indigo-500 bg-white shadow-lg"
			style="left: calc({minPercentage}% - 0.5rem)"
		></div>

		<div
			class="pointer-events-none absolute size-5 -translate-y-1.5 transform rounded-full border-2 border-indigo-500 bg-white shadow-lg"
			style="left: calc({maxPercentage}% - 0.5rem)"
		></div>

		<div class="absolute mt-6 flex w-full justify-between">
			{#each labels as label (label)}
				<span class="text-sm text-gray-600">{label}</span>
			{/each}
		</div>
	</div>
</div>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background: transparent;
	}

	input[type='range']::-moz-range-thumb {
		width: 16px;
		height: 16px;
		background: transparent;
		border: none;
	}
</style>
