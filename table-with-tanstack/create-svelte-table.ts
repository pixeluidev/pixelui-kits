import {
	type RowData,
	type TableOptions,
	type TableOptionsResolved,
	type TableState,
	createTable
} from '@tanstack/table-core';

/**
 * Creates a reactive TanStack table object for Svelte.
 * @param options Table options to create the table with.
 * @returns A reactive table object.
 * @example
 * ```svelte
 * <script>
 *   const table = createSvelteTable({ ... })
 * </script>
 *
 * <table>
 *   <thead>
 *     {#each table.getHeaderGroups() as headerGroup}
 *       <tr>
 *         {#each headerGroup.headers as header}
 *           <th colspan={header.colSpan}>
 *         	   <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
 *         	 </th>
 *         {/each}
 *       </tr>
 *     {/each}
 *   </thead>
 * 	 <!-- ... -->
 * </table>
 * ```
 */
export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
	const resolvedOptions: TableOptionsResolved<TData> = mergeObjects(
		{
			state: {},
			onStateChange() {},
			renderFallbackValue: null,
			mergeOptions: (
				defaultOptions: TableOptions<TData>,
				options: Partial<TableOptions<TData>>
			) => {
				return mergeObjects(defaultOptions, options);
			}
		},
		options
	);

	const table = createTable(resolvedOptions);

	// 3. Fungsi untuk mengupdate opsi tabel (termasuk state wrapper)
	// Kita hanya perlu memanggil ini sekali di awal
	function setupTableOptions() {
		// Dapatkan state awal dari tabel atau dari opsi jika disediakan
		// Penting: State yang disediakan di 'options.state' mungkin berisi getter reaktif
		const initialState = mergeObjects(table.initialState, options.state || {});

		// Panggil setOptions SEKALI untuk setup akhir
		table.setOptions((prev) => {
			// Gabungkan semua opsi (default, user options, state, onStateChange wrapper)
			const newOptions = mergeObjects(prev, options, {
				// Pastikan state yang diteruskan berisi getter reaktif jika ada
				state: initialState,
				// Wrapper untuk onStateChange
				onStateChange: (updater: unknown) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					options.onStateChange?.(updater as any);

					// Tidak perlu update 'state' lokal di sini karena TanStack akan membaca
					// getter dari 'options.state' saat dibutuhkan.
				}
			});
			return newOptions;
		});
	}

	setupTableOptions();

	return table;
}

/**
 * Merges objects together while keeping their getters alive.
 * Taken from SolidJS: {@link https://github.com/solidjs/solid/blob/24abc825c0996fd2bc8c1de1491efe9a7e743aff/packages/solid/src/server/rendering.ts#L82-L115}
 */
function mergeObjects<T>(source: T): T;
function mergeObjects<T, U>(source: T, source1: U): T & U;
function mergeObjects<T, U, V>(source: T, source1: U, source2: V): T & U & V;
function mergeObjects<T, U, V, W>(source: T, source1: U, source2: V, source3: W): T & U & V & W;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeObjects(...sources: any): any {
	const target = {};
	for (let i = 0; i < sources.length; i++) {
		let source = sources[i];
		if (typeof source === 'function') source = source();
		if (source) {
			const descriptors = Object.getOwnPropertyDescriptors(source);
			for (const key in descriptors) {
				if (key in target) continue;
				Object.defineProperty(target, key, {
					enumerable: true,
					get() {
						for (let i = sources.length - 1; i >= 0; i--) {
							let s = sources[i];
							if (typeof s === 'function') s = s();
							const v = (s || {})[key];
							if (v !== undefined) return v;
						}
					}
				});
			}
		}
	}
	return target;
}
