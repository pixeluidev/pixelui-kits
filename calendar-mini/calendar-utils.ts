import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	format,
	isSameMonth,
	isToday,
	isSameDay,
	getDay
} from 'date-fns';

// --- Config ---
const WEEK_STARTS_ON: 0 | 1 = 1; // 0 = Sunday, 1 = Monday

// --- Types ---
export interface MiniCalendarEvent {
	id: string | number;
	title: string;
	time?: string;
	description?: string;
	color?: string; // e.g., 'bg-blue-500' or 'blue'
}

export interface MiniCalendarDay {
	date: Date;
	dayOfMonth: string;
	isCurrentMonth: boolean;
	isToday: boolean;
	isSelected: boolean; // To highlight the selected day
	isWeekend: boolean;
	isoString: string; // YYYY-MM-DD
	events: MiniCalendarEvent[];
}

// --- Mock Data --- (Replace with your actual data source)
const MOCK_MINI_EVENTS: Record<string, MiniCalendarEvent[]> = {
	// Example using July 2024
	'2024-07-08': [
		{
			id: 101,
			time: '9:00 AM',
			title: 'Zoom call with design team',
			description: 'Discussion on UX sprint and Wireframe review',
			color: 'bg-sky-500'
		}
	],
	'2024-07-10': [
		{ id: 102, time: '10:00 AM', title: 'Orientation session', color: 'bg-green-500' }
	],
	'2024-07-15': [{ id: 103, time: '1:00 PM', title: 'Project Kickoff', color: 'bg-purple-500' }],
	'2024-07-22': [{ id: 104, time: 'All Day', title: 'Team Outing', color: 'bg-yellow-500' }]
	// Add more events keyed by YYYY-MM-DD
};

// --- Utility Functions ---

function getMiniEventsForDay(date: Date): MiniCalendarEvent[] {
	const isoString = format(date, 'yyyy-MM-dd');
	return MOCK_MINI_EVENTS[isoString] || [];
}

export function generateMiniCalendarDays(displayDate: Date, selectedDate: Date): MiniCalendarDay[] {
	const monthStart = startOfMonth(displayDate);
	const monthEnd = endOfMonth(displayDate);
	const startDate = startOfWeek(monthStart, { weekStartsOn: WEEK_STARTS_ON });
	const endDate = endOfWeek(monthEnd, { weekStartsOn: WEEK_STARTS_ON });

	return eachDayOfInterval({ start: startDate, end: endDate }).map((dayDate) => {
		const dayOfWeek = getDay(dayDate);
		return {
			date: dayDate,
			dayOfMonth: format(dayDate, 'd'),
			isCurrentMonth: isSameMonth(dayDate, monthStart),
			isToday: isToday(dayDate),
			isSelected: isSameDay(dayDate, selectedDate), // Check against selectedDate
			isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
			isoString: format(dayDate, 'yyyy-MM-dd'),
			events: getMiniEventsForDay(dayDate)
		};
	});
}

export function getMiniMonthYear(date: Date): string {
	return format(date, 'MMMM yyyy');
}

// Adjusted weekdays for Monday start
export const miniWeekdaysShort = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']; // Assuming Monday start
