<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	import { fade, slide } from 'svelte/transition'; // Import slide for week/day view
	import {
		generateMonthDays,
		generateWeekDays,
		generateYearMonths,
		getMonthYearHeader,
		getWeekHeader,
		getDayHeader,
		getYearHeader,
		getDateTimeAttr,
		getDayDateTimeAttr,
		adjustedWeekdaysLong,
		adjustedWeekdayIndices, // Use adjusted weekdays
		type CalendarDay,
		type CalendarEvent
	} from './calendar-utils'; // Adjust path
	import {
		addMonths,
		subMonths,
		addWeeks,
		subWeeks,
		addDays,
		subDays,
		addYears,
		subYears,
		startOfToday,
		format,
		isToday as dateFnsIsToday,
		startOfWeek,
		getDay
	} from 'date-fns';

	// Icons
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Plus from 'lucide-svelte/icons/plus';
	import MoreVertical from 'lucide-svelte/icons/more-vertical';

	// --- Types ---
	type CalendarView = 'day' | 'week' | 'month' | 'year';

	// --- State ---
	let currentDate = startOfToday(); // The date the calendar is centered around
	let currentView: CalendarView = 'month'; // Default view

	let monthDays: CalendarDay[] = [];
	let weekDays: CalendarDay[] = [];
	let yearMonths: { date: Date; name: string; isCurrentMonth: boolean; monthIndex: number }[] = [];
	// For day view, we'll just use currentDate and filter events

	let isViewMenuOpen: boolean = false;
	let isMobileMenuOpen: boolean = false;

	// --- Reactive Computations ---

	// Update displayed data based on current view and date
	$: {
		if (currentView === 'month') {
			monthDays = generateMonthDays(currentDate);
			weekDays = [];
			yearMonths = [];
		} else if (currentView === 'week') {
			weekDays = generateWeekDays(currentDate);
			monthDays = [];
			yearMonths = [];
		} else if (currentView === 'year') {
			yearMonths = generateYearMonths(currentDate);
			monthDays = [];
			weekDays = [];
		} else {
			// Day view
			monthDays = [];
			weekDays = [];
			yearMonths = [];
			// Day view events are filtered directly in the template
		}
	}

	// Header display text based on view
	$: headerDisplay =
		currentView === 'month'
			? getMonthYearHeader(currentDate)
			: currentView === 'week'
				? getWeekHeader(currentDate)
				: currentView === 'day'
					? getDayHeader(currentDate)
					: getYearHeader(currentDate); // Year view

	// Datetime attribute for header time tag
	$: headerDateTimeAttr =
		currentView === 'month'
			? getDateTimeAttr(currentDate)
			: currentView === 'week'
				? format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd') // Start of week ISO
				: currentView === 'day'
					? getDayDateTimeAttr(currentDate)
					: format(currentDate, 'yyyy'); // Year

	// Filter events specifically for the day view
	$: dayViewEvents =
		currentView === 'day'
			? (generateMonthDays(currentDate).find((d) => dateFnsIsToday(d.date))?.events ?? [])
			: [];

	// --- Navigation Functions ---
	function navigate(direction: 'prev' | 'next' | 'today') {
		switch (currentView) {
			case 'month':
				currentDate =
					direction === 'prev'
						? subMonths(currentDate, 1)
						: direction === 'next'
							? addMonths(currentDate, 1)
							: startOfToday();
				break;
			case 'week':
				currentDate =
					direction === 'prev'
						? subWeeks(currentDate, 1)
						: direction === 'next'
							? addWeeks(currentDate, 1)
							: startOfToday();
				break;
			case 'day':
				currentDate =
					direction === 'prev'
						? subDays(currentDate, 1)
						: direction === 'next'
							? addDays(currentDate, 1)
							: startOfToday();
				break;
			case 'year':
				currentDate =
					direction === 'prev'
						? subYears(currentDate, 1)
						: direction === 'next'
							? addYears(currentDate, 1)
							: startOfToday();
				break;
		}
		closeMenus();
	}

	// --- View Setter ---
	function setView(view: CalendarView) {
		currentView = view;
		// If switching to day/week view, ensure currentDate reflects today if coming from month/year
		if ((view === 'day' || view === 'week') && currentView !== 'day' && currentView !== 'week') {
			// Optionally reset to today when changing TO day/week view
			// currentDate = startOfToday();
		}
		closeMenus();
	}

	// --- Menu Toggles & Click Outside (Same as before) ---
	function toggleViewMenu() {
		isViewMenuOpen = !isViewMenuOpen;
		if (isViewMenuOpen) isMobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		if (isMobileMenuOpen) isViewMenuOpen = false;
	}

	function closeMenus() {
		isViewMenuOpen = false;
		isMobileMenuOpen = false;
	}

	let viewMenuButtonEl: HTMLButtonElement | null = null;
	let viewMenuEl: HTMLDivElement | null = null;
	let mobileMenuButtonEl: HTMLButtonElement | null = null;
	let mobileMenuEl: HTMLDivElement | null = null;

	function handleClickOutside(event: MouseEvent) {
		event.preventDefault();
		isMobileMenuOpen = false;
		isMobileMenuOpen = false;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('click', handleClickOutside, true);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('click', handleClickOutside, true);
		}
	});

	// --- Placeholder Actions ---
	function addEvent() {
		alert('Add Event clicked!');
		closeMenus();
	}

	function viewEvent(event: CalendarEvent) {
		alert(`View event: ${event.title}`);
		closeMenus();
	}

	function selectDay(dayIso: string) {
		console.log('Day selected:', dayIso);
		setView('day');
		currentDate = new Date(dayIso + 'T00:00:00'); /* Navigate to Day view on click */
	}

	function selectMonth(monthIndex: number) {
		currentDate = new Date(currentDate.getFullYear(), monthIndex, 1);
		setView('month');
	}
</script>

<!-- Main Calendar Container -->
<div class="flex h-[calc(100vh-4rem)] flex-col bg-gray-50 dark:bg-neutral-900">
	<!-- Adjust height as needed -->
	<!-- Header -->
	<header
		class="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:flex-none dark:border-neutral-700 dark:bg-neutral-800"
	>
		<!-- Month/Year/Date Display -->
		<h1
			class="min-w-[150px] text-center text-base leading-6 font-semibold text-gray-900 sm:min-w-[200px] sm:text-left sm:text-lg dark:text-white"
		>
			<time datetime={headerDateTimeAttr}>{headerDisplay}</time>
		</h1>

		<!-- Actions Group -->
		<div class="flex items-center">
			<!-- Prev/Today/Next Buttons -->
			<div
				class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch dark:bg-neutral-700"
			>
				<button
					class="flex h-9 w-10 items-center justify-center rounded-l-md border border-e-0 border-gray-300 text-gray-400 transition-colors duration-150 hover:text-gray-600 focus:relative focus:z-10 focus:ring-1 focus:ring-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200"
					onclick={() => navigate('prev')}
					title="Previous"
					type="button"
				>
					<span class="sr-only">Previous {currentView}</span>
					<ChevronLeft class="h-5 w-5" />
				</button>
				<button
					class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-50 focus:relative focus:z-10 focus:ring-1 focus:ring-primary focus:outline-none md:block dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-600"
					onclick={() => navigate('today')}
					type="button"
				>Today
				</button>
				<span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden dark:bg-neutral-600"></span>
				<button
					class="flex h-9 w-10 items-center justify-center rounded-r-md border border-s-0 border-gray-300 text-gray-400 transition-colors duration-150 hover:text-gray-600 focus:relative focus:z-10 focus:ring-1 focus:ring-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200"
					onclick={() => navigate('next')}
					title="Next"
					type="button"
				>
					<span class="sr-only">Next {currentView}</span>
					<ChevronRight class="h-5 w-5" />
				</button>
			</div>

			<!-- View Dropdown (Desktop) -->
			<div class="hidden md:ml-4 md:flex md:items-center">
				<div class="relative">
					<button
						aria-expanded={isViewMenuOpen}
						aria-haspopup="true"
						bind:this={viewMenuButtonEl}
						class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 capitalize shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:ring-1 focus:ring-primary focus:outline-none dark:bg-neutral-700 dark:text-neutral-100 dark:ring-neutral-600 dark:hover:bg-neutral-600"
						onclick={toggleViewMenu}
						type="button"
					>
						{currentView} view
						<ChevronDown
							class={`ms-1 -mr-1 h-5 w-5 text-gray-400 transition-transform duration-200 dark:text-neutral-400 ${isViewMenuOpen ? 'rotate-180' : 'rotate-0'}`}
						/>
					</button>

					{#if isViewMenuOpen}
						<div
							bind:this={viewMenuEl}
							class="ring-opacity-5 absolute right-0 z-20 mt-2 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:bg-neutral-700"
							role="menu"
							aria-orientation="vertical"
							tabindex="-1"
							transition:fade={{ duration: 100 }}
						>
							<div class="py-1" role="none">
								<button
									onclick={() => setView('day')}
									class:bg-gray-100={currentView === 'day'}
									class:dark:bg-neutral-600={currentView === 'day'}
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
									role="menuitem"
									tabindex="-1"
								>Day view
								</button>
								<button
									onclick={() => setView('week')}
									class:bg-gray-100={currentView === 'week'}
									class:dark:bg-neutral-600={currentView === 'week'}
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
									role="menuitem"
									tabindex="-1"
								>Week view
								</button>
								<button
									onclick={() => setView('month')}
									class:bg-gray-100={currentView === 'month'}
									class:dark:bg-neutral-600={currentView === 'month'}
									class="block w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-600"
									role="menuitem"
									tabindex="-1"
								>Month view
								</button>
								<button
									onclick={() => setView('year')}
									class:bg-gray-100={currentView === 'year'}
									class:dark:bg-neutral-600={currentView === 'year'}
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
									role="menuitem"
									tabindex="-1"
								>Year view
								</button>
							</div>
						</div>
					{/if}
				</div>
				<div class="ml-6 h-6 w-px bg-gray-300 dark:bg-neutral-600"></div>
				<button
					class="ml-6 inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					onclick={addEvent}
					type="button"
				>
					<Plus class="-ml-0.5 h-4 w-4" strokeWidth={3} />
					Add event
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="relative ml-6 md:hidden">
				<button
					aria-expanded={isMobileMenuOpen}
					aria-haspopup="true"
					bind:this={mobileMenuButtonEl}
					class="-mx-2 flex items-center rounded-full border border-transparent p-1.5 text-gray-400 hover:text-gray-600 focus:ring-1 focus:ring-primary focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
					onclick={toggleMobileMenu}
					type="button"
				>
					<span class="sr-only">Open menu</span>
					<MoreVertical class="h-5 w-5" />
				</button>
				{#if isMobileMenuOpen}
					<div
						bind:this={mobileMenuEl}
						class="ring-opacity-5 absolute right-0 z-20 mt-2 w-48 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none dark:divide-neutral-700 dark:bg-neutral-700"
						role="menu"
						aria-orientation="vertical"
						tabindex="-1"
						transition:fade={{ duration: 100 }}
					>
						<div class="py-1" role="none">
							<button
								onclick={addEvent}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Create event
							</button>
						</div>
						<div class="py-1" role="none">
							<button
								onclick={() => navigate('today')}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Go to today
							</button>
						</div>
						<div class="py-1" role="none">
							<button
								onclick={() => setView('day')}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Day view
							</button>
							<button
								onclick={() => setView('week')}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Week view
							</button>
							<button
								onclick={() => setView('month')}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Month view
							</button>
							<button
								onclick={() => setView('year')}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-600"
								role="menuitem"
								tabindex="-1"
							>Year view
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</header>

	<!-- Calendar View Content -->
	<div class="flex-auto overflow-y-auto">
		<!--{# Allows calendar content to scroll if needed #}-->
		<!-- MONTH VIEW -->
		{#if currentView === 'month'}
			<div class="ring-opacity-5 shadow ring-1 ring-black lg:flex lg:flex-auto lg:flex-col">
				<!-- Day Headers -->
				<div
					class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs leading-6 font-semibold text-gray-700 lg:flex-none dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
				>
					{#each adjustedWeekdayIndices as dayIndex (dayIndex)}
						<div class="bg-white py-2 capitalize dark:bg-neutral-800">
							<span>{adjustedWeekdaysLong[dayIndex].slice(0, 1)}</span>
							<span class="sr-only sm:not-sr-only"
							>{adjustedWeekdaysLong[dayIndex].slice(1, 3)}</span
							>
						</div>
					{/each}
				</div>
				<!-- Days Grid -->
				<div
					class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto dark:bg-neutral-700 dark:text-neutral-300"
				>
					<div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
						{#each monthDays as day (day.isoString)}
							<button
								tabindex="0"
								aria-labelledby="Month view"
								aria-label="Month view"
								class="relative min-h-[7rem] px-3 py-2 transition-colors duration-100 ease-in-out"
								class:bg-white={day.isCurrentMonth}
								class:dark:bg-neutral-800={day.isCurrentMonth}
								class:bg-gray-50={!day.isCurrentMonth}
								class:dark:bg-neutral-500={!day.isCurrentMonth}
								class:text-gray-500={!day.isCurrentMonth}
								class:dark:text-neutral-500={!day.isCurrentMonth}
								class:hover:bg-gray-100={!day.isToday && day.isCurrentMonth}
								class:dark:hover:bg-neutral-700={!day.isToday && day.isCurrentMonth}
								class:hover:bg-gray-200={!day.isToday && !day.isCurrentMonth}
								class:dark:hover:bg-neutral-500={!day.isToday && !day.isCurrentMonth}
								onclick={() => selectDay(day.isoString)}
							>
								<time
									datetime={day.isoString}
									class="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full text-sm"
									class:font-semibold={day.isToday || !day.isCurrentMonth}
									class:bg-primary={day.isToday}
									class:text-white={day.isToday}
									class:hover:bg-primary={day.isToday}
									class:text-primary={day.isToday && !day.isCurrentMonth}
								>
									<!-- /* Highlight today even if not current month */-->
									{day.dayOfMonth}
								</time>
								<!-- Events List -->
								{#if day.events.length > 0}
									<ol class="mt-10 space-y-1">
										{#each day.events as event (event.id)}
											<li>
												<a
													href={event.href ?? '#'}
													onclick={() => viewEvent(event)}
													class="group flex items-center rounded-sm p-0.5 hover:bg-orange-50 dark:hover:bg-orange-900/30"
												>
													<span
														class="h-1.5 w-1.5 flex-shrink-0 rounded-full {event.color ??
															'bg-blue-500 dark:bg-blue-400'}"
													></span>
													<p
														class="ml-1.5 flex-auto truncate text-[11px] font-medium text-gray-700 group-hover:text-orange-700 dark:text-neutral-200 dark:group-hover:text-orange-300"
													>
														{event.title}
													</p>
												</a>
											</li>
										{/each}
									</ol>
								{/if}
							</button>
						{/each}
					</div>
					<!-- Mobile View for Month (Simplified) -->
					<div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
						{#each monthDays as day (day)}
							<button
								type="button"
								onclick={() => selectDay(day.isoString)}
								class="flex h-14 flex-col px-3 py-2 transition-colors duration-100 hover:bg-gray-100 focus:z-10 focus:ring-1 focus:ring-primary focus:outline-none dark:hover:bg-neutral-700"
								class:bg-white={day.isCurrentMonth}
								class:dark:bg-neutral-800={day.isCurrentMonth}
								class:bg-gray-50={!day.isCurrentMonth}
								class:dark:bg-neutral-500={!day.isCurrentMonth}
								class:text-gray-500={!day.isCurrentMonth}
								class:dark:text-neutral-500={!day.isCurrentMonth}
								class:font-semibold={day.isToday}
							>
								<time
									datetime={day.isoString}
									class="ml-auto"
									class:text-white={day.isToday}
									class:bg-primary={day.isToday}
									class:rounded-full={day.isToday}
									class:w-6={day.isToday}
									class:h-6={day.isToday}
									class:flex={day.isToday}
									class:items-center={day.isToday}
									class:justify-center={day.isToday}
									class:text-primary={day.isToday && !day.isCurrentMonth}
								>
									{day.dayOfMonth}
								</time>
								<span class="sr-only">{day.events.length} events</span>
								{#if day.events.length > 0}
									<span class="-mx-0.5 mt-auto flex flex-wrap-reverse justify-end">
										{#each day.events.slice(0, 2) as event (event.id)}
											<span
												class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full {event.color ?? 'bg-gray-400'}"
											></span>
										{/each}
									</span>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- WEEK VIEW -->
		{:else if currentView === 'week'}
			<div class="flex flex-col" transition:slide>
				<!-- Week Day Headers -->
				<div
					class="sticky top-0 z-10 grid grid-cols-7 gap-px border-b border-gray-200 bg-white text-center text-xs leading-6 font-semibold text-gray-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
				>
					{#each weekDays as day (day.isoString)}
						<div
							class="flex flex-col items-center justify-center border-r py-2 last:border-r-0 dark:border-neutral-700"
						>
							<span class="text-[10px] uppercase"
							>{adjustedWeekdaysLong[getDay(day.date)].slice(0, 3)}</span
							>
							<span
								class="mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm"
								class:font-semibold={day.isToday}
								class:bg-primary={day.isToday}
								class:text-white={day.isToday}
							>
								{day.dayOfMonth}
							</span>
						</div>
					{/each}
				</div>
				<!-- Week Content Grid -->
				<div class="grid h-[calc(100vh-10rem)] flex-auto grid-cols-7">
					<!--{# Adjust height #}-->
					{#each weekDays as day (day.isoString)}
						<div
							class="space-y-2 overflow-y-auto border-r border-gray-200 p-2 last:border-r-0 dark:border-neutral-700"
						>
							{#if day.events.length > 0}
								{#each day.events as event (event.id)}
									<a
										href={event.href ?? '#'}
										onclick={() => viewEvent(event)}
										class="block rounded-md p-1.5 transition-colors duration-150 hover:bg-orange-50 dark:hover:bg-orange-900/30"
									>
										<p class="truncate text-xs font-semibold text-gray-800 dark:text-neutral-100">
											{event.title}
										</p>
										{#if event.time}
											<p class="text-[10px] text-gray-500 dark:text-neutral-400">{event.time}</p>
										{/if}
									</a>
								{/each}
							{:else}
								<!-- Optionally show placeholder for empty days -->
								<!-- <div class="text-center text-xs text-gray-400 dark:text-neutral-600 pt-10">No events</div> -->
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- DAY VIEW -->
		{:else if currentView === 'day'}
			<div class="p-4 sm:p-6" transition:slide>
				<h2 class="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
					{format(currentDate, 'EEEE')}
				</h2>
				{#if dayViewEvents.length > 0}
					<ol class="space-y-3">
						{#each dayViewEvents as event (event.id)}
							<li>
								<a
									href={event.href ?? '#'}
									onclick={() => viewEvent(event)}
									class="group flex items-center rounded-lg p-3 transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-neutral-700"
								>
									<!-- Event Dot -->
									<span
										class="h-2 w-2 flex-shrink-0 rounded-full {event.color ??
											'bg-blue-500 dark:bg-blue-400'}"
									></span>
									<div class="ms-3 flex-auto">
										<p
											class="text-sm font-medium text-gray-800 group-hover:text-orange-700 dark:text-neutral-100 dark:group-hover:text-orange-300"
										>
											{event.title}
										</p>
									</div>
									{#if event.time}
										<time
											datetime={`${getDayDateTimeAttr(currentDate)}T${event.time}`}
											class="flex-none text-sm text-gray-500 dark:text-neutral-400"
										>
											{event.time}
										</time>
									{/if}
								</a>
							</li>
						{/each}
					</ol>
				{:else}
					<p class="mt-4 text-sm text-gray-500 dark:text-neutral-400">
						No events scheduled for this day.
					</p>
				{/if}
			</div>

			<!-- YEAR VIEW (Simplified) -->
		{:else if currentView === 'year'}
			<div class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 sm:p-6 md:grid-cols-4" transition:slide>
				{#each yearMonths as month (month.monthIndex)}
					<button
						type="button"
						onclick={() => selectMonth(month.monthIndex)}
						class="rounded-lg border p-4 transition-colors duration-150 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-neutral-900"
						class:bg-orange-50={month.isCurrentMonth}
						class:dark:bg-orange-300={month.isCurrentMonth}
						class:border-orange-300={month.isCurrentMonth}
						class:dark:border-orange-700={month.isCurrentMonth}
						class:font-semibold={month.isCurrentMonth}
						class:text-orange-700={month.isCurrentMonth}
						class:dark:text-orange-300={month.isCurrentMonth}
						class:bg-white={!month.isCurrentMonth}
						class:dark:bg-neutral-800={!month.isCurrentMonth}
						class:border-gray-200={!month.isCurrentMonth}
						class:dark:border-neutral-700={!month.isCurrentMonth}
						class:hover:bg-gray-50={!month.isCurrentMonth}
						class:dark:hover:bg-neutral-700={!month.isCurrentMonth}
						class:text-gray-700={!month.isCurrentMonth}
						class:dark:text-neutral-300={!month.isCurrentMonth}
					>
						{month.name}
					</button>
				{/each}
			</div>
		{/if}
	</div>
	<!-- End Calendar View Content -->
</div>
