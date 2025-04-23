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
	class="group flex cursor-pointer items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 transition-colors duration-200 ease-in-out hover:bg-gray-200/60 dark:bg-gray-800/50 dark:hover:bg-gray-700/60"
	for={`switch-${setting.id}`}
>
	<!-- Text Content -->
	<div class="mr-4 flex flex-1 flex-col">
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
			class="peer sr-only"
			id={`switch-${setting.id}`}
			on:change={handleChange}
			type="checkbox"
		/>
		<!-- Switch Track/Background -->
		<div
			class="peer-checked:bg-primary dark:peer-checked:bg-primary dark:peer-focus:ring-primary h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-orange-300 peer-focus:ring-offset-2 peer-focus:ring-offset-gray-100 dark:bg-gray-600 dark:peer-focus:ring-offset-gray-800/50"
		></div>
		<!-- Switch Thumb/Knob -->
		<div
			class="absolute top-1 left-1 h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
		></div>
	</div>
	<!-- Add hidden elements for aria references if needed, although label connection might suffice -->
	<span class="sr-only" id={`label-${setting.id}`}>{setting.title}</span>
	<span class="sr-only" id={`desc-${setting.id}`}>{setting.description}</span>
</label>
