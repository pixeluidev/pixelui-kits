<script lang="ts">
	import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import {
		getCoreRowModel,
		getPaginationRowModel,
		getSortedRowModel,
		getFilteredRowModel,
		type ColumnDef,
		type SortingState,
		type VisibilityState,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState
	} from '@tanstack/table-core';

	// Impor Data dan Komponen Helper
	import { tablesData } from '../assets/data/tables-data'; // Sesuaikan path
	import DataTableCheckbox from './DataTableCheckbox.svelte';
	import DataTableActions from './DataTableActions.svelte';
	import { clickOutside, renderComponent } from './helpers';
	import FlexRender from './FlexRender.svelte';
	import SortableHeader from './SortableHeader.svelte';
	import type { ProductProps } from './type';
	import { createSvelteTable } from './create-svelte-table';

	// === Kolom Definisi ===
	const columns: ColumnDef<ProductProps>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(DataTableCheckbox, {
					// Gunakan renderComponent
					checked: table.getIsAllPageRowsSelected() // Semua di halaman ini terpilih?
						? true
						: table.getIsSomePageRowsSelected() // Sebagian di halaman ini terpilih?
							? 'indeterminate' // Jika ya, indeterminate
							: false, // Jika tidak, tidak tercentang
					// Handler saat header dicentang/tidak:
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(DataTableCheckbox, {
					// Gunakan renderComponent
					checked: row.getIsSelected(),
					disabled: !row.getCanSelect(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false,
			size: 40 // Example size
		},
		{
			accessorKey: 'product_name',
			header: (context) => renderComponent(SortableHeader, { context, label: 'Product Name' }),
			cell: ({ getValue }) => getValue<string>(),
			size: 250
		},
		{
			accessorKey: 'brand',
			header: (context) => renderComponent(SortableHeader, { context, label: 'Brand' }),
			cell: ({ getValue }) => getValue<string>(),
			size: 150
		},
		{
			accessorKey: 'category',
			header: (context) => renderComponent(SortableHeader, { context, label: 'Category' }),
			cell: ({ getValue }) => getValue<string>(),
			size: 150
		},
		{
			accessorKey: 'price',
			header: (context) => renderComponent(SortableHeader, { context, label: 'Price' }),
			cell: ({ getValue }) => {
				const amount = parseFloat(String(getValue<string | number>()).replace(/[^0-9.-]+/g, ''));
				return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
					isNaN(amount) ? 0 : amount
				);
			},
			size: 100
		},
		{
			id: 'actions',
			header: () => 'Actions', // Header bisa string sederhana jika tidak sortable
			enableHiding: false,
			enableSorting: false,
			// Gunakan renderComponent untuk komponen Action
			cell: ({ row }) => renderComponent(DataTableActions, { product: row.original }), // Kirim data original
			size: 60
		}
	];

	// === State TanStack Table (Svelte 5 Runes Style) ===

	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let columnVisibility = $state<VisibilityState>({});
	let rowSelection = $state<RowSelectionState>({});
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });

	// === TanStack Table Instance ===
	const table = createSvelteTable({
		// Sediakan data sebagai fungsi getter untuk reaktivitas (atau $derived)
		get data() {
			return tablesData as ProductProps[];
		},
		columns,
		// State management
		state: {
			// Gunakan getter untuk state reaktif
			get sorting() {
				return sorting;
			},
			get columnFilters() {
				return columnFilters;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get pagination() {
				return pagination;
			}
		},
		// Pipeline Functions
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		// Handler Perubahan State
		onSortingChange: (updater) =>
			(sorting = typeof updater === 'function' ? updater(sorting) : updater),
		onColumnFiltersChange: (updater) =>
			(columnFilters = typeof updater === 'function' ? updater(columnFilters) : updater),
		onColumnVisibilityChange: (updater) =>
			(columnVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater),
		onRowSelectionChange: (updater) => {
			rowSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
		},
		onPaginationChange: (updater) =>
			(pagination = typeof updater === 'function' ? updater(pagination) : updater),
		// Fitur Tambahan
		enableRowSelection: true // Aktifkan row selection
		// debugTable: true, // Uncomment untuk debugging
	});

	// === State Tambahan untuk UI ===
	let columnsDropdownOpen: boolean = $state(false);

	function toggleColumnsDropdown() {
		columnsDropdownOpen = !columnsDropdownOpen;
	}

	function closeColumnsDropdown() {
		columnsDropdownOpen = false;
	}

	// Helper untuk mendapatkan filter value
	function getFilterValue(columnId: string): string {
		const filter = columnFilters.find((f) => f.id === columnId);
		return (filter?.value as string) ?? '';
	}

	// Helper untuk set filter value
	function setFilterValue(columnId: string, value: string) {
		const currentFilters = columnFilters.filter((f) => f.id !== columnId);
		if (value) {
			columnFilters = [...currentFilters, { id: columnId, value }];
		} else {
			columnFilters = currentFilters;
		}
	}
</script>

<div class="w-full p-4">
	<div class="flex items-center justify-between space-x-4 py-4">
		<div class="relative w-full max-w-sm">
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<Search class="h-5 w-5 text-gray-500 dark:text-gray-400" />
			</div>
			<input
				class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				oninput={(e) => setFilterValue('product_name', e.currentTarget.value)}
				placeholder="Filter product names..."
				type="text"
				value={getFilterValue('product_name')}
			/>
		</div>

		<div class="relative">
			<button
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				onclick={toggleColumnsDropdown}
				type="button"
			>
				Columns
				<ChevronDown class="-mr-1 ml-2 h-5 w-5" />
			</button>

			{#if columnsDropdownOpen}
				<div
					use:clickOutside={closeColumnsDropdown}
					class="ring-opacity-5 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-gray-700 dark:ring-gray-600"
					role="menu"
					aria-orientation="vertical"
				>
					<div class="px-2 py-1" role="none">
						<div
							class="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase dark:text-gray-400"
						>
							Toggle Columns
						</div>
						{#each table.getAllColumns() as column (column.columnDef)}
							{#if column.getCanHide()}
								<label
									class="flex cursor-pointer items-center rounded-md px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600"
								>
									<input
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:checked:border-indigo-600 dark:checked:bg-indigo-600 dark:focus:ring-indigo-600"
										checked={column.getIsVisible()}
										onchange={column.getToggleVisibilityHandler()}
									/>
									<span class="ml-3 text-sm text-gray-700 capitalize dark:text-gray-200"
									>{column.id}</span
									>
								</label>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="overflow-hidden rounded-md border dark:border-gray-700">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<tr class="border-b dark:border-gray-600">
					{#each headerGroup.headers as header (header.id)}
						<th scope="col" class="group relative" style:width="{header.getSize()}px">
							{#if !header.isPlaceholder}
								{#if !header.isPlaceholder}
									<FlexRender
										content={header.column.columnDef.header}
										context={header.getContext()}
									/>
								{/if}
							{/if}
						</th>
					{/each}
				</tr>
			{/each}
			</thead>
			<tbody>
			{#each table.getRowModel().rows as row (row.id)}
				<tr
					class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 [data-state='selected']:bg-blue-50 [data-state='selected']:hover:bg-blue-100 [data-state='selected']:dark:bg-blue-900/30 [data-state='selected']:dark:dark:bg-blue-900/40"
					class:selected={row.getIsSelected()}
					class:opacity-50={!row.getCanSelect()}
					data-state={row.getIsSelected() ? 'selected' : undefined}
				>
					{#each row.getVisibleCells() as cell (cell.id)}
						<td class="" style:width="{cell.column.getSize()}px">
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</td>
					{/each}
				</tr>
			{:else}
				<tr>
					<td colspan={columns.length} class="h-24 text-center text-gray-500 dark:text-gray-400">
						No results found.
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div class="flex items-center justify-between space-x-4 pt-4">
		<div class="flex-1 text-sm text-gray-500 dark:text-gray-400">
			{table.getFilteredSelectedRowModel().rows.length} of
			{table.getFilteredRowModel().rows.length} row(s) selected.
		</div>
		<div class="flex items-center space-x-2">
			<span class="text-sm text-gray-500 dark:text-gray-400">
				Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</span>
			<button
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				disabled={!table.getCanPreviousPage()}
				onclick={() => table.previousPage()}
				type="button"
			>
				<ChevronLeft class="mr-1 h-4 w-4" />
				Previous
			</button>
			<button
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
				disabled={!table.getCanNextPage()}
				onclick={() => table.nextPage()}
				type="button"
			>
				Next
				<ChevronRight class="ml-1 h-4 w-4" />
			</button>

			<select
				class="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
				onchange={(e) => {
					table.setPageSize(Number(e.currentTarget.value));
				}}
				value={table.getState().pagination.pageSize}
			>
				{#each [10, 20, 30, 40, 50] as pageSize}
					<option key={pageSize} value={pageSize}>
						Show {pageSize}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>
