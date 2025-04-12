<script lang="ts">
	export let value = 50;
	export let min = 0;
	export let max = 100;
	export let step = 1;
	export let icon = '🎵'; // Default icon

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = parseInt(target.value);
	}

	$: percentage = ((value - min) / (max - min)) * 100;
</script>

<div class="container">
	<div class="relative flex h-12 w-full items-center">
		<div class="absolute h-2 w-full rounded-full bg-gray-200">
			<div class="h-full rounded-full bg-purple-500" style="width: {percentage}%"></div>
		</div>

		<input
			type="range"
			{min}
			{max}
			{step}
			{value}
			oninput={handleInput}
			class="absolute z-10 h-2 w-full cursor-pointer appearance-none bg-transparent"
		/>

		<div
			class="pointer-events-none absolute flex size-8 -translate-y-0.5 transform items-center justify-center rounded-full border-2 border-purple-500 bg-white shadow-lg"
			style="left: calc({percentage}% - 1rem)"
		>
			<span class="text-sm">{icon}</span>
		</div>
	</div>
</div>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 32px;
		height: 32px;
		background: transparent;
	}

	input[type='range']::-moz-range-thumb {
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
	}
</style>
