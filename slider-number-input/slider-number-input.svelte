<script lang="ts">
	export let value = 50;
	export let min = 0;
	export let max = 100;
	export let step = 1;

	function handleSliderInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = parseInt(target.value);
	}

	function handleNumberInput(event: Event) {
		const target = event.target as HTMLInputElement;
		let newValue = parseInt(target.value);

		if (isNaN(newValue)) {
			newValue = min;
		} else {
			newValue = Math.max(min, Math.min(max, newValue));
		}

		value = newValue;
	}

	$: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="container">
	<div class="flex items-center gap-4">
		<div class="relative flex h-12 flex-1 items-center">
			<div class="absolute h-2 w-full rounded-full bg-gray-200">
				<div class="h-full rounded-full bg-green-500" style="width: {percentage}%"></div>
			</div>

			<input
				type="range"
				{min}
				{max}
				{step}
				{value}
				on:input={handleSliderInput}
				class="absolute z-10 h-2 w-full cursor-pointer appearance-none bg-transparent"
			/>

			<div
				class="pointer-events-none absolute size-5 transform rounded-full border-2 border-green-500 bg-white shadow-lg"
				style="left: calc({percentage}% - 0.5rem)"
				class:border-gray-500={percentage >= 50}
			></div>
		</div>
		<input
			type="number"
			{min}
			{max}
			{step}
			{value}
			on:input={handleNumberInput}
			class="w-20 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
		/>
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
