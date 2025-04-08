<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import {
		generateMiniCalendarDays,
		getMiniMonthYear,
		miniWeekdaysShort,
		type MiniCalendarDay,
		type MiniCalendarEvent
	} from './calendar-utils.ts'; // Adjust path
	import { addMonths, subMonths, startOfToday, format, isSameDay } from 'date-fns';

	// Icons
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	// --- State ---
	let displayDate = startOfToday(); // The month/year being displayed
	let selectedDate = startOfToday(); // The currently selected date
	let calendarDays: MiniCalendarDay[] = [];
	let selectedDayEvents: MiniCalendarEvent[] = [];

	// --- Reactive Computations ---
	$: monthYearDisplay = getMiniMonthYear(displayDate);

	// Generate calendar days when displayDate or selectedDate changes
	$: calendarDays = generateMiniCalendarDays(displayDate, selectedDate);

	// Update selected day's events when selectedDate changes
	$: {
		const selectedDayData = calendarDays.find((day) => day.isSelected);
		selectedDayEvents = selectedDayData?.events ?? [];
	}

	// --- Navigation ---
	function goToPreviousMonth() {
		displayDate = subMonths(displayDate, 1);
	}

	function goToNextMonth() {
		displayDate = addMonths(displayDate, 1);
	}

	// --- Selection ---
	function selectDay(day: MiniCalendarDay) {
		selectedDate = day.date;
		// Optional: Also change the displayed month if a day from prev/next month is clicked
		// if (!day.isCurrentMonth) {
		//     displayDate = day.date;
		// }
	}
</script>

<!-- Main Widget Container -->
<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4 py-8 sm:min-h-0 dark:from-neutral-900 dark:to-neutral-800"
>
	<div
		class="w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
	>
		<!-- Calendar Header -->
		<div class="border-b border-gray-200 p-4 md:p-5 dark:border-neutral-700">
			<div class="flex items-center justify-between">
				<span
					class="text-base font-semibold text-gray-800 focus:outline-none dark:text-gray-100"
					tabindex="0"
				>{monthYearDisplay}</span
				>
				<div class="flex items-center">
					<button
						aria-label="calendar backward"
						class="rounded-full p-1 text-gray-400 hover:text-gray-600 focus:text-orange-600 focus:ring-1 focus:ring-orange-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-orange-400"
						on:click={goToPreviousMonth}
					>
						<ChevronLeft class="h-5 w-5" />
					</button>
					<button
						aria-label="calendar forward"
						class="ml-2 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:text-orange-600 focus:ring-1 focus:ring-orange-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-orange-400"
						on:click={goToNextMonth}
					>
						<ChevronRight class="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>

		<!-- Calendar Grid -->
		<div class="p-4 md:p-5">
			<div class="mb-3 grid grid-cols-7 gap-x-1">
				{#each miniWeekdaysShort as dayLabel (dayLabel)}
					<div class="text-center text-xs font-medium text-gray-500 dark:text-neutral-400">
						{dayLabel}
					</div>
				{/each}
			</div>
			<div class="grid grid-cols-7 gap-1">
				{#each calendarDays as day (day.isoString)}
					<div class="pt-1">
						<!-- Padding top for aspect ratio -->
						<button
							type="button"
							on:click={() => selectDay(day)}
							class="flex aspect-square h-full w-full items-center justify-center rounded-full text-sm transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-neutral-800"
							class:text-gray-700={day.isCurrentMonth && !day.isSelected && !day.isToday}
							class:dark:text-neutral-200={day.isCurrentMonth && !day.isSelected && !day.isToday}
							class:text-gray-400={!day.isCurrentMonth && !day.isSelected}
							class:dark:text-neutral-500={!day.isCurrentMonth && !day.isSelected}
							class:hover:bg-gray-100={!day.isSelected}
							class:dark:hover:bg-neutral-700={!day.isSelected}
							class:font-semibold={day.isSelected || day.isToday}
							class:bg-orange-600={day.isSelected}
							class:text-white={day.isSelected}
							class:hover:bg-orange-500={day.isSelected}
							class:ring-1={day.isToday && !day.isSelected}
							class:ring-orange-500={day.isToday && !day.isSelected}
							class:dark:ring-orange-400={day.isToday && !day.isSelected}
							aria-pressed={day.isSelected}
							aria-label={`Select date ${format(day.date, 'MMMM d, yyyy')}`}
						>
							<time datetime={day.isoString}>{day.dayOfMonth}</time>
						</button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Events List for Selected Day -->
		<div
			class="min-h-[10rem] border-t border-gray-200 bg-gray-50 px-4 py-4 md:px-6 md:py-5 dark:border-neutral-700 dark:bg-neutral-700/30"
		>
			<h3 class="mb-3 text-sm font-semibold text-gray-700 dark:text-neutral-200">
				Events on {format(selectedDate, 'MMMM d')}
			</h3>
			{#key selectedDate}
				<!-- Re-run transition when selectedDate changes -->
				<div
					class="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-600 max-h-40 space-y-3 overflow-y-auto"
					in:fly={{ y: 10, duration: 200, delay: 100 }}
					out:fade={{ duration: 100 }}
				>
					{#if selectedDayEvents.length > 0}
						{#each selectedDayEvents as event (event.id)}
							<div
								class="group flex cursor-default items-start gap-2 rounded p-1 hover:bg-white/50 dark:hover:bg-black/10"
							>
								<span
									class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full {event.color ??
										'bg-orange-500'}"
								></span>
								<div class="flex-1 text-sm">
									<p class="font-medium text-gray-800 dark:text-neutral-100">{event.title}</p>
									{#if event.description}
										<p class="text-xs text-gray-500 dark:text-neutral-400">{event.description}</p>
									{/if}
								</div>
								{#if event.time}
									<span class="pt-0.5 text-xs text-gray-500 dark:text-neutral-400"
									>{event.time}</span
									>
								{/if}
							</div>
						{/each}
					{:else}
						<p class="pt-4 text-center text-sm text-gray-400 dark:text-neutral-500">
							No events scheduled.
						</p>
					{/if}
				</div>
			{/key}
		</div>
	</div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    /* Optional: Ensure scrollbar styling works (Tailwind plugin or manual) */

    @layer utilities {
        .scrollbar-thin::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
            @apply bg-transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
            @apply rounded bg-gray-300 dark:bg-neutral-600;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            @apply bg-gray-400 dark:bg-neutral-500;
        }

        .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: theme('colors.gray.300') transparent;
        }

        .dark .scrollbar-thin {
            scrollbar-color: theme('colors.neutral.600') transparent;
        }
    }
</style>
