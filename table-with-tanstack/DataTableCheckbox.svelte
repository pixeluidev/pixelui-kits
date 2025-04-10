<script lang="ts">
	// import { Check } from 'lucide-svelte'; // Atau Minus jika butuh indeterminate state visual
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = {
		checked: boolean | 'indeterminate';
		onCheckedChange?: (checked: boolean) => void;
	} & Omit<HTMLInputAttributes, 'checked' | 'onchange' | 'bind:checked'>;
	export let indeterminate: boolean = false; // Prop terpisah untuk indeterminate

	export let checked: $$Props['checked'];
	export let onCheckedChange: $$Props['onCheckedChange'] = () => {
	};
	$: indeterminate = checked === 'indeterminate';
	// Propagate other attributes like aria-label
	let restProps: Omit<$$Props, 'checked' | 'onCheckedChange'>;
	$: restProps = $$restProps;

	function handleChange(event: Event & { currentTarget: HTMLInputElement }) {
		const isChecked = event.currentTarget.checked;
		if (typeof onCheckedChange === 'function') {
			onCheckedChange(isChecked);
		}

		// Update local state if not directly bound externally (though onCheckedChange is preferred)
		// checked = isChecked; // Usually handled by TanStack state update triggering re-render
	}
</script>

<div class="px-4">
	<input
		{...restProps}
		bind:indeterminate
		checked={checked === true}
		class="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:border-indigo-600 dark:checked:bg-indigo-600 dark:focus:ring-indigo-600"
		on:change={handleChange}
		type="checkbox"
	/>
</div>
