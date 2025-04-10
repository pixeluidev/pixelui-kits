<script lang="ts">
	import type { HeaderContext } from '@tanstack/table-core';
	import { ArrowUpDown } from 'lucide-svelte';
	import type { ProductProps } from './/table-with-tanstack/type';

	// Konteks yang diterima dari flexRender
	export let context: HeaderContext<ProductProps, unknown>;
	export let label: string; // Teks label untuk header

	const { column } = context;
</script>

<button
	class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 rounded w-full"
	class:dark:text-indigo-400={column.getIsSorted()}
	class:text-indigo-600={column.getIsSorted()}
	on:click={() => column.toggleSorting(column.getIsSorted() === 'asc')}
	title={column.getIsSorted() ? (column.getIsSorted() === 'asc' ? 'Sorted ascending' : 'Sorted descending') : 'Sort'}
	type="button"
>
	{label}
	<ArrowUpDown
		class={`ml-2 h-4 w-4 text-gray-400 shrink-0 ${column.getCanSort() ===false ? "opacity-50":""} ${column.getIsSorted() ?? "text-inherit"}`}

	/>
</button>