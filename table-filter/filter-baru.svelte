<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Import Lucide Icons
	import {
		Search,
		Plus,
		ChevronDown,
		Filter,
		ChevronLeft,
		ChevronRight,
		Trash2,
		Edit,
		X // Icon untuk hapus badge/reset
	} from 'lucide-svelte';

	// Import Data
	import { tablesData } from '../assets/data/tables-data';

	// Tipe data
	type Item = {
		id: number | string;
		product_name: string;
		brand: string;
		category: string;
		price: number | string;
		[key: string]: string | number;
	};

	// === State ===
	let searchTerm = '';
	let items: Item[] = [...tablesData];
	let filteredAndSortedItems: Item[] = [];
	let displayedItems: Item[] = [];

	// Pagination State
	const itemsPerPage = 10;
	const pageRangeDisplayed = 5;
	let totalItems = 0;
	let totalPages = 0;
	const currentPageTweened = tweened(1, { duration: 300, easing: cubicOut });
	let currentPage = 1;
	$: currentPage = Math.round($currentPageTweened);
	let pagesToShow: number[] = [];

	// Dropdown State
	let actionsDropdownOpen = false;
	let filterDropdownOpen = false;

	// --- Filter State ---
	let selectedBrands: Set<string> = new Set();
	let selectedCategories: Set<string> = new Set();
	let uniqueBrands: string[] = [];
	let uniqueCategories: string[] = [];
	// Maps untuk menyimpan jumlah item per brand/kategori dari data *asli*
	let brandCounts: Map<string, number> = new Map();
	let categoryCounts: Map<string, number> = new Map();

	// === Functions ===

	// Click Outside Detector
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

	// Pre-calculate counts for filters
	function calculateFilterCounts() {
		brandCounts.clear();
		categoryCounts.clear();
		items.forEach(item => {
			brandCounts.set(item.brand, (brandCounts.get(item.brand) || 0) + 1);
			categoryCounts.set(item.category, (categoryCounts.get(item.category) || 0) + 1);
		});
		uniqueBrands = [...brandCounts.keys()].sort();
		uniqueCategories = [...categoryCounts.keys()].sort();
	}

	// Apply filters and sorting
	function applyFiltersAndSorting() {
		let result = items.filter((item) =>
			item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Apply brand filter
		if (selectedBrands.size > 0) {
			result = result.filter(item => selectedBrands.has(item.brand));
		}

		// Apply category filter
		if (selectedCategories.size > 0) {
			result = result.filter(item => selectedCategories.has(item.category));
		}

		// Add sorting logic here if needed

		filteredAndSortedItems = result;
		totalItems = filteredAndSortedItems.length;
		totalPages = Math.ceil(totalItems / itemsPerPage);

		if (currentPage > totalPages && totalPages > 0) {
			goToPage(totalPages); // Go to last valid page
		} else if (totalPages === 0 && totalItems === 0) {
			goToPage(1); // Go to page 1 if no results
			updateDisplayedItems(); // Ensure displayedItems becomes empty
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
		// ... (logika pagination tetap sama)
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
		// Hanya tampilkan nomor halaman jika totalPages > 0
		pagesToShow = totalPages > 0 ? Array.from({ length: Math.max(0, endPage - startPage + 1) }, (_, i) => startPage + i) : [];
	}

	// Navigation
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
		// await tick(); // Jarang diperlukan setelah tweened.set
	}

	// --- Filter Handling ---
	function handleBrandToggle(brand: string, checked: boolean) {
		if (checked) {
			selectedBrands.add(brand);
		} else {
			selectedBrands.delete(brand);
		}
		selectedBrands = selectedBrands; // Trigger reactivity
	}

	function handleCategoryToggle(category: string, checked: boolean) {
		if (checked) {
			selectedCategories.add(category);
		} else {
			selectedCategories.delete(category);
		}
		selectedCategories = selectedCategories; // Trigger reactivity
	}

	function removeBrandFilter(brand: string) {
		selectedBrands.delete(brand);
		selectedBrands = selectedBrands;
		closeFilterDropdown(); // Optional: tutup dropdown setelah hapus filter
	}

	function removeCategoryFilter(category: string) {
		selectedCategories.delete(category);
		selectedCategories = selectedCategories;
		closeFilterDropdown(); // Optional
	}

	function resetFilters() {
		selectedBrands.clear();
		selectedCategories.clear();
		// Reassign untuk memastikan Svelte mendeteksi perubahan
		selectedBrands = selectedBrands;
		selectedCategories = selectedCategories;
		searchTerm = ''; // Juga reset search term? Opsional
		closeFilterDropdown();
	}

	// === Lifecycle & Reactive Statements ===
	onMount(() => {
		calculateFilterCounts(); // Hitung jumlah saat mount
		applyFiltersAndSorting(); // Kalkulasi awal
	});

	// Recalculate when search term or filters change
	$: if (searchTerm !== undefined || selectedBrands || selectedCategories) {
		applyFiltersAndSorting();
	}

	// Update displayed items and pagination buttons when current page changes
	$: if (currentPage || totalPages !== undefined) { // Pastikan totalPages juga trigger update
		updateDisplayedItems();
		updatePaginationButtons();
	}

	// Calculated values for display
	$: startRange = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
	$: endRange = Math.min(currentPage * itemsPerPage, totalItems);
	$: hasActiveFilters = selectedBrands.size > 0 || selectedCategories.size > 0;

</script>

<section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
	<div class="mx-auto max-w-screen-xl px-4 lg:px-12">
		<div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
			<!-- Header: Search, Badges, Actions -->
			<div
				class="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b dark:border-gray-700">
				<!-- Search and Active Filters -->
				<div class="w-full md:w-2/3 lg:w-1/2">
					<form class="flex items-center mb-2">
						<label class="sr-only" for="simple-search">Search</label>
						<div class="relative w-full">
							<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<Search class="w-5 h-5 text-gray-500 dark:text-gray-400" />
							</div>
							<input
								bind:value={searchTerm} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" id="simple-search"
								placeholder="Search product name..."
								type="text" />
						</div>
						<!-- Tombol Reset Filter (dekat search) -->
						{#if hasActiveFilters}
							<button
								type="button"
								on:click={resetFilters}
								class="p-2 ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
								title="Reset all filters"
							>
								<X class="w-5 h-5" />
							</button>
						{/if}
					</form>
					<!-- Active Filter Badges -->
					{#if hasActiveFilters}
						<div class="flex flex-wrap gap-1">
							{#each [...selectedBrands] as brand (brand)}
                <span
									class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Brand: {brand}
									<button
										type="button"
										on:click={() => removeBrandFilter(brand)}
										class="flex-shrink-0 ml-1 -mr-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white dark:hover:bg-blue-800 dark:hover:text-blue-200"
										aria-label="Remove filter: {brand}"
									>
                    <X class="h-3 w-3" />
                  </button>
                </span>
							{/each}
							{#each [...selectedCategories] as category (category)}
                <span
									class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Cat: {category}
									<button
										type="button"
										on:click={() => removeCategoryFilter(category)}
										class="flex-shrink-0 ml-1 -mr-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white dark:hover:bg-green-800 dark:hover:text-green-200"
										aria-label="Remove filter: {category}"
									>
                    <X class="h-3 w-3" />
                  </button>
                </span>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Action Buttons & Filters -->
				<div
					class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
					<button class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
									type="button">
						<Plus class="h-3.5 w-3.5 mr-2" />
						Add product
					</button>

					<!-- Actions Dropdown -->
					<div class="relative">
						<button class="..." on:click={toggleActionsDropdown} type="button">
							<ChevronDown class="w-3 h-3 mr-2" />
							Actions
						</button>
						{#if actionsDropdownOpen}
							<div use:clickOutside={closeActionsDropdown} class="absolute z-10 ...">
								<!-- Items Actions -->
								<ul class="py-1 ...">
									<li><a href="#" on:click|preventDefault class="...">
										<Edit class="..." />
										Mass Edit</a></li>
								</ul>
								<div class="py-1">
									<li><a href="#" on:click|preventDefault class="...">
										<Trash2 class="..." />
										Delete all</a></li>
								</div>
							</div>
						{/if}
					</div>

					<!-- Filter Dropdown -->
					<div class="relative">
						<button class="..." on:click={toggleFilterDropdown} type="button">
							<Filter class="w-3 h-3 mr-2" />
							Filter
							{#if hasActiveFilters}({selectedBrands.size + selectedCategories.size}){/if}
						</button>
						{#if filterDropdownOpen}
							<div use:clickOutside={closeFilterDropdown}
									 class="absolute z-10 w-64 p-3 bg-white rounded-lg shadow dark:bg-gray-700 top-full right-0 mt-2 max-h-96 overflow-y-auto">
								<!-- Brand Filter -->
								<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Brand</h6>
								<ul class="space-y-2 text-sm mb-4">
									{#each uniqueBrands as brand (brand)}
										<li class="flex items-center">
											<input id="filter-brand-{brand}" type="checkbox" value={brand}
														 checked={selectedBrands.has(brand)}
														 on:change={(e) => handleBrandToggle(brand, e.currentTarget.checked)}
														 class="w-4 h-4 ... text-primary-600 ...">
											<label for="filter-brand-{brand}"
														 class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 flex-grow">
												{brand} <span class="text-xs text-gray-500 dark:text-gray-400">({brandCounts.get(brand) || 0}
												)</span>
											</label>
										</li>
									{:else}
										<li class="text-gray-500 dark:text-gray-400 text-xs italic">No brands</li>
									{/each}
								</ul>
								<!-- Category Filter -->
								<h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
								<ul class="space-y-2 text-sm">
									{#each uniqueCategories as category (category)}
										<li class="flex items-center">
											<input id="filter-cat-{category}" type="checkbox" value={category}
														 checked={selectedCategories.has(category)}
														 on:change={(e) => handleCategoryToggle(category, e.currentTarget.checked)}
														 class="w-4 h-4 ... text-primary-600 ...">
											<label for="filter-cat-{category}"
														 class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 flex-grow">
												{category} <span
												class="text-xs text-gray-500 dark:text-gray-400">({categoryCounts.get(category) || 0})</span>
											</label>
										</li>
									{:else}
										<li class="text-gray-500 dark:text-gray-400 text-xs italic">No categories</li>
									{/each}
								</ul>
								<!-- Reset Button inside Dropdown (optional) -->
								{#if hasActiveFilters}
									<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
										<button
											on:click={resetFilters}
											class="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
										>
											<X class="w-4 h-4 mr-2" />
											Reset Filters
										</button>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Table -->
			<div class="overflow-x-auto">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th class="px-4 py-3" scope="col">Product name</th>
						<th class="px-4 py-3" scope="col">Brand</th>
						<th class="px-4 py-3" scope="col">Category</th>
						<th class="px-4 py-3" scope="col">Price</th>
					</tr>
					</thead>
					<tbody>
					{#each displayedItems as item (item.id)}
						<tr class="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
							<th scope="row" class="px-4 py-3 ...">{item.product_name}</th>
							<td class="px-4 py-3">{item.brand}</td>
							<td class="px-4 py-3">{item.category}</td>
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
									<!-- Should not happen if items has data, maybe loading state? -->
									No data.
								{:else}
									No results for this page. <!-- Jika halaman > totalPages -->
								{/if}
							</td>
						</tr>
					{/each}
					</tbody>
				</table>
			</div>

			<!-- Pagination -->
			<nav aria-label="Table navigation"
					 class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-900 dark:text-white">{startRange}-{endRange}</span>
          of <span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
        </span>
				{#if totalPages > 1}
					<ul class="inline-flex items-center -space-x-px">
						<li>
							<button on:click={previousPage} disabled={currentPage === 1} class="..." aria-label="Previous page">...
							</button>
						</li>
						{#each pagesToShow as pageNumber (pageNumber)}
							<li>
								<button on:click={() => goToPage(pageNumber)}
												aria-current={pageNumber === currentPage ? 'page' : undefined}
												class="..."> {pageNumber} </button>
							</li>
						{/each}
						<li>
							<button on:click={nextPage} disabled={currentPage === totalPages} class="..." aria-label="Next page">...
							</button>
						</li>
					</ul>
				{/if}
			</nav>
		</div>
	</div>
</section>
