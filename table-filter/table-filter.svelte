<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import {
		Search,
		Plus,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		Trash2,
		Edit,
		X,
		Funnel as FilterIcon
	} from 'lucide-svelte';

	import { tablesData } from '../assets/data/tables-data';

	type Item = {
		id: number | string;
		product_name: string;
		brand: string;
		category: string;
		price: number | string;
		[key: string]: string | number;
	};

	let searchTerm = '';
	let items: Item[] = [...tablesData];
	let filteredAndSortedItems: Item[] = [];
	let displayedItems: Item[] = [];

	const itemsPerPage = 10;
	const pageRangeDisplayed = 5;
	let totalItems = 0;
	let totalPages = 0;
	const currentPageTweened = tweened(1, { easing: cubicOut });
	let currentPage = 1;
	$: currentPage = Math.round($currentPageTweened);
	let pagesToShow: number[] = [];

	let actionsDropdownOpen = false;
	let filterDropdownOpen = false;

	let selectedBrands: Set<string> = new Set();
	let selectedCategories: Set<string> = new Set();
	let uniqueBrands: string[] = [];
	let uniqueCategories: string[] = [];

	let brandCounts: Map<string, number> = new Map();
	let categoryCounts: Map<string, number> = new Map();

	function clickOutside(node: HTMLElement, handler: () => void) {
		const handleClick = (event: MouseEvent) => {
			if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
				handler();
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	function closeActionsDropdown() {
		actionsDropdownOpen = false;
	}

	function closeFilterDropdown() {
		filterDropdownOpen = false;
	}

	function toggleActionsDropdown() {
		actionsDropdownOpen = !actionsDropdownOpen;
		if (actionsDropdownOpen) filterDropdownOpen = false;
	}

	function toggleFilterDropdown() {
		filterDropdownOpen = !filterDropdownOpen;
		if (filterDropdownOpen) actionsDropdownOpen = false;
	}

	function calculateFilterCounts() {
		brandCounts.clear();
		categoryCounts.clear();
		items.forEach((item) => {
			brandCounts.set(item.brand, (brandCounts.get(item.brand) || 0) + 1);
			categoryCounts.set(item.category, (categoryCounts.get(item.category) || 0) + 1);
		});
		uniqueBrands = [...brandCounts.keys()].sort();
		uniqueCategories = [...categoryCounts.keys()].sort();
	}

	function applyFiltersAndSorting() {
		let result = items.filter((item) =>
			item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (selectedBrands.size > 0) {
			result = result.filter((item) => selectedBrands.has(item.brand));
		}

		if (selectedCategories.size > 0) {
			result = result.filter((item) => selectedCategories.has(item.category));
		}

		filteredAndSortedItems = result;
		totalItems = filteredAndSortedItems.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);

		if (currentPage > totalPages && totalPages > 0) {
			goToPage(totalPages);
		} else if (totalPages === 0 && totalItems === 0) {
			goToPage(1);
			updateDisplayedItems();
			updatePaginationButtons();
		} else {
			updateDisplayedItems();
			updatePaginationButtons();
		}
	}

	function updateDisplayedItems() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		displayedItems = filteredAndSortedItems.slice(start, end);
	}

	function updatePaginationButtons() {
		let startPage: number, endPage: number;
		if (totalPages <= pageRangeDisplayed) {
			startPage = 1;
			endPage = totalPages;
		} else {
			const maxPagesBeforeCurrent = Math.floor(pageRangeDisplayed / 2);
			const maxPagesAfterCurrent = Math.ceil(pageRangeDisplayed / 2) - 1;
			if (currentPage <= maxPagesBeforeCurrent) {
				startPage = 1;
				endPage = pageRangeDisplayed;
			} else if (currentPage + maxPagesAfterCurrent >= totalPages) {
				startPage = totalPages - pageRangeDisplayed + 1;
				endPage = totalPages;
			} else {
				startPage = currentPage - maxPagesBeforeCurrent;
				endPage = currentPage + maxPagesAfterCurrent;
			}
		}

		pagesToShow =
			totalPages > 0
				? Array.from({ length: Math.max(0, endPage - startPage + 1) }, (_, i) => startPage + i)
				: [];
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPageTweened.set(currentPage + 1);
		}
	}

	function previousPage() {
		if (currentPage > 1) {
			currentPageTweened.set(currentPage - 1);
		}
	}

	async function goToPage(pageNumber: number) {
		const targetPage = Math.max(1, Math.min(pageNumber, totalPages > 0 ? totalPages : 1));
		await currentPageTweened.set(targetPage);
	}

	function handleBrandToggle(brand: string, checked: boolean) {
		if (checked) {
			selectedBrands.add(brand);
		} else {
			selectedBrands.delete(brand);
		}
		selectedBrands = selectedBrands;
	}

	function handleCategoryToggle(category: string, checked: boolean) {
		if (checked) {
			selectedCategories.add(category);
		} else {
			selectedCategories.delete(category);
		}
		selectedCategories = selectedCategories;
	}

	function removeBrandFilter(brand: string) {
		selectedBrands.delete(brand);
		selectedBrands = selectedBrands;
		closeFilterDropdown();
	}

	function removeCategoryFilter(category: string) {
		selectedCategories.delete(category);
		selectedCategories = selectedCategories;
		closeFilterDropdown();
	}

	function resetFilters() {
		selectedBrands.clear();
		selectedCategories.clear();

		selectedBrands = selectedBrands;
		selectedCategories = selectedCategories;
		searchTerm = '';
		closeFilterDropdown();
	}

	onMount(() => {
		calculateFilterCounts();
		applyFiltersAndSorting();
	});

	$: if (searchTerm !== undefined || selectedBrands || selectedCategories) {
		applyFiltersAndSorting();
	}

	$: if (currentPage || totalPages !== undefined) {
		updateDisplayedItems();
		updatePaginationButtons();
	}

	$: startRange = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
	$: endRange = Math.min(currentPage * itemsPerPage, totalItems);
	$: hasActiveFilters = selectedBrands.size > 0 || selectedCategories.size > 0;
</script>

<section class="bg-gray-50 py-20 dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 lg:px-12">
		<div class="relative overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
			<div
				class="flex flex-col items-start justify-between space-y-3 border-b p-4 md:flex-row md:items-center md:space-y-0 md:space-x-4 dark:border-gray-700"
			>
				<div class="w-full md:w-2/3 lg:w-1/2">
					<form class="mb-2 flex items-center">
						<label class="sr-only" for="simple-search">Search</label>
						<div class="relative w-full">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<Search class="h-5 w-5 text-gray-500 dark:text-gray-400" />
							</div>
							<input
								bind:value={searchTerm}
								class="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
								id="simple-search"
								placeholder="Search product name..."
								type="text"
							/>
						</div>

						{#if hasActiveFilters}
							<button
								type="button"
								onclick={resetFilters}
								class="ml-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-white"
								title="Reset all filters"
							>
								<X class="h-5 w-5" />
							</button>
						{/if}
					</form>

					{#if hasActiveFilters}
						<div class="flex flex-wrap gap-1">
							{#each [...selectedBrands] as brand (brand)}
								<span
									class="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
								>
									Brand: {brand}
									<button
										type="button"
										onclick={() => removeBrandFilter(brand)}
										class="-mr-0.5 ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:outline-none dark:hover:bg-blue-800 dark:hover:text-blue-200"
										aria-label="Remove filter: {brand}"
									>
										<X class="h-3 w-3" />
									</button>
								</span>
							{/each}
							{#each [...selectedCategories] as category (category)}
								<span
									class="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
								>
									Cat: {category}
									<button
										type="button"
										onclick={() => removeCategoryFilter(category)}
										class="-mr-0.5 ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-green-400 hover:bg-green-200 hover:text-green-500 focus:bg-green-500 focus:text-white focus:outline-none dark:hover:bg-green-800 dark:hover:text-green-200"
										aria-label="Remove filter: {category}"
									>
										<X class="h-3 w-3" />
									</button>
								</span>
							{/each}
						</div>
					{/if}
				</div>

				<div
					class="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3"
				>
					<button
						class="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:outline-none"
						type="button"
					>
						<Plus class="mr-2 h-3.5 w-3.5" />
						Add product
					</button>

					<div class="relative">
						<button
							class="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none md:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
							onclick={toggleActionsDropdown}
							type="button"
						>
							<ChevronDown class="mr-2 h-3 w-3" />
							Actions
						</button>
						{#if actionsDropdownOpen}
							<div
								use:clickOutside={closeActionsDropdown}
								class="absolute top-full right-0 z-10 mt-2 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
							>
								<div class="flex flex-col items-start text-left text-sm">
									<button
										onclick={() => console.log('Mass Edit')}
										class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<Edit class="mr-2 inline-block h-4 w-4" />
										Mass Edit
									</button>
									<button
										onclick={() => console.log('Delete All')}
										class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<Trash2 class="mr-2 inline-block h-4 w-4" />
										Delete all
									</button>
								</div>
							</div>
						{/if}
					</div>

					<div class="relative">
						<button
							class="hover:text-primary-700 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none md:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
							onclick={toggleFilterDropdown}
							type="button"
						>
							<FilterIcon class="mr-2 h-3 w-3" />
							Filter
							{#if hasActiveFilters}({selectedBrands.size + selectedCategories.size})
							{/if}
						</button>
						{#if filterDropdownOpen}
							<div
								use:clickOutside={closeFilterDropdown}
								class="absolute top-full right-0 z-10 mt-2 max-h-96 w-64 overflow-y-auto rounded-lg bg-white p-3 shadow dark:bg-gray-700"
							>
								<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Brand</h6>
								<ul class="mb-4 space-y-2 text-sm">
									{#each uniqueBrands as brand (brand)}
										<li class="flex items-center">
											<input
												id="filter-brand-{brand}"
												type="checkbox"
												value={brand}
												checked={selectedBrands.has(brand)}
												onchange={(e) => handleBrandToggle(brand, e.currentTarget.checked)}
												class="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700"
											/>
											<label
												for="filter-brand-{brand}"
												class="ml-2 flex-grow text-sm font-medium text-gray-900 dark:text-gray-100"
											>
												{brand}
												<span class="text-xs text-gray-500 dark:text-gray-400"
												>({brandCounts.get(brand) || 0})</span
												>
											</label>
										</li>
									{:else}
										<li class="text-gray-500 dark:text-gray-400 text-xs italic">No brands</li>
									{/each}
								</ul>

								<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
								<ul class="space-y-2 text-sm">
									{#each uniqueCategories as category (category)}
										<li class="flex items-center">
											<input
												id="filter-cat-{category}"
												type="checkbox"
												value={category}
												checked={selectedCategories.has(category)}
												onchange={(e) => handleCategoryToggle(category, e.currentTarget.checked)}
												class="text-primary-600 h-4 w-4 ... ..."
											/>
											<label
												for="filter-cat-{category}"
												class="ml-2 flex-grow text-sm font-medium text-gray-900 dark:text-gray-100"
											>
												{category}
												<span class="text-xs text-gray-500 dark:text-gray-400"
												>({categoryCounts.get(category) || 0})</span
												>
											</label>
										</li>
									{:else}
										<li class="text-gray-500 dark:text-gray-400 text-xs italic">No categories</li>
									{/each}
								</ul>

								{#if hasActiveFilters}
									<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-600">
										<button
											onclick={resetFilters}
											class="focus:ring-primary-500 flex w-full items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:outline-none dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
										>
											<X class="mr-2 h-4 w-4" />
											Reset Filters
										</button>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
					<thead
						class="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
					>
					<tr>
						<th class="px-4 py-3" scope="col">Product name</th>
						<th class="px-4 py-3" scope="col">Category</th>
						<th class="px-4 py-3" scope="col">Brand</th>
						<th class="px-4 py-3" scope="col">Price</th>
					</tr>
					</thead>
					<tbody>
					{#each displayedItems as item (item.id)}
						<tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-600">
							<th
								scope="row"
								class="px-4 py-3 font-medium whitespace-nowrap text-gray-900 dark:text-white"
							>{item.product_name}</th
							>
							<td class="px-4 py-3">{item.category}</td>
							<td class="px-4 py-3">{item.brand}</td>

							<td class="px-4 py-3">{item.price}</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
								{#if totalItems === 0 && (searchTerm || hasActiveFilters)}
									No products found matching your criteria.
								{:else if items.length === 0}
									No products available.
								{:else if totalItems === 0 && !searchTerm && !hasActiveFilters}
									No data.
								{:else}
									No results for this page.
								{/if}
							</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</div>

			<nav
				aria-label="Table navigation"
				class="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
			>
				<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
					Showing
					<span class="font-semibold text-gray-900 dark:text-white"
					>{totalItems > 0 ? startRange : 0}-{endRange}</span
					>
					of
					<span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
				</span>
				{#if totalPages > 1}
					<ul class="inline-flex items-center -space-x-px">
						<li>
							<button
								onclick={previousPage}
								disabled={currentPage === 1}
								class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								aria-label="Previous page"
							>
								<span class="sr-only">Previous</span>
								<ChevronLeft class="h-5 w-5" />
							</button>
						</li>
						{#each pagesToShow as pageNumber (pageNumber)}
							<li>
								<button
									onclick={() => goToPage(pageNumber)}
									aria-current={pageNumber === currentPage ? 'page' : undefined}
									class="flex items-center justify-center border px-3 py-2 text-sm leading-tight {pageNumber ===
									currentPage
										? 'text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
										: 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}"
								>
									{pageNumber}
								</button>
							</li>
						{/each}
						<li>
							<button
								onclick={nextPage}
								disabled={currentPage === totalPages}
								class="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								aria-label="Next page"
							>
								<span class="sr-only">Next</span>
								<ChevronRight class="h-5 w-5" />
							</button>
						</li>
					</ul>
				{/if}
			</nav>
		</div>
	</div>
</section>
