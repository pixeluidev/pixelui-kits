<script lang="ts">
	export let value = 50;
	export let min = 0;
	export let max = 100;
	export let step = 1;

	let isHovered = false;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = parseInt(target.value);
	}

	$: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="container">
	<div class="group relative flex h-12 w-full items-center">
		<div class="absolute h-2 w-full rounded-full bg-gray-200">
			<div class="h-full rounded-full bg-blue-500" style="width: {percentage}%"></div>
		</div>

		<input
			class="absolute z-10 h-2 w-full cursor-pointer appearance-none bg-transparent"
			{max}
			{min}
			oninput={handleInput}
			{step}
			type="range"
			{value}
		/>
		<div
			class="pointer-events-none absolute size-5 scale-0 transform rounded-full border-2 border-blue-500 bg-white shadow-lg transition-transform group-hover:scale-100"
			style="left: calc({percentage}% - 0.5rem)"
		></div>
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
