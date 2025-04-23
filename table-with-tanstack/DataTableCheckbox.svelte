<script lang="ts">
	// import { Check } from 'lucide-svelte'; // Atau Minus jika butuh indeterminate state visual
	import type { HTMLInputAttributes } from 'svelte/elements';

	type $$Props = {
		checked: boolean | 'indeterminate';
		onCheckedChange?: (checked: boolean) => void;
	} & Omit<HTMLInputAttributes, 'checked' | 'onchange' | 'bind:checked'>;
	export let indeterminate: boolean = false; // Prop terpisah untuk indeterminate

	export let checked: $$Props['checked'];
	export let onCheckedChange: $$Props['onCheckedChange'] = () => {};
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
		class="border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50"
		on:change={handleChange}
		type="checkbox"
	/>
</div>
