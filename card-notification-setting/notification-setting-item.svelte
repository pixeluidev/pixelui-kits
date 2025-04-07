<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Setting } from './data'; // Import the Setting type

	export let setting: Setting;
	export let checked: boolean = false;

	// Define the type for the event detail payload
	interface ChangeEventDetail {
		id: string;
		checked: boolean;
	}

	// Type the dispatcher
	const dispatch = createEventDispatcher<{ change: ChangeEventDetail }>();

	function handleChange(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const target = event.currentTarget;
		// Dispatch the 'change' event with typed detail
		dispatch('change', {
			id: setting.id,
			checked: target.checked
		});
	}
</script>

<!-- Use label for better accessibility and click area -->
<label
	class="flex items-center justify-between gap-4 rounded-lg bg-gray-100 dark:bg-gray-800/50 p-4 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-200/60 dark:hover:bg-gray-700/60 group"
	for={`switch-${setting.id}`}
>
	<!-- Text Content -->
	<div class="flex flex-col flex-1 mr-4">
		<p class="text-base font-medium text-gray-800 dark:text-gray-100">{setting.title}</p>
		<p class="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
	</div>

	<!-- Custom Switch (Hidden Checkbox + Visual Element) -->
	<div class="relative inline-flex items-center">
		<!-- Hidden Actual Checkbox (peer) -->
		<input
			aria-describedby={`desc-${setting.id}`}
			aria-labelledby={`label-${setting.id}`}
			bind:checked
			class="sr-only peer"
			id={`switch-${setting.id}`}
			on:change={handleChange}
			type="checkbox"
		/>
		<!-- Switch Track/Background -->
		<div
			class="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-100 dark:peer-focus:ring-offset-gray-800/50 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-600 peer-checked:bg-orange-500 dark:peer-checked:bg-orange-500"></div>
		<!-- Switch Thumb/Knob -->
		<div
			class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></div>
	</div>
	<!-- Add hidden elements for aria references if needed, although label connection might suffice -->
	<span class="sr-only" id={`label-${setting.id}`}>{setting.title}</span>
	<span class="sr-only" id={`desc-${setting.id}`}>{setting.description}</span>
</label>