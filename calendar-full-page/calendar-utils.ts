import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
	format,
	isSameMonth,
	isToday,
	getDay,
	startOfYear,
	endOfYear,
	eachMonthOfInterval
} from 'date-fns';

export interface CalendarEvent {
	id: string | number;
	title: string;
	time?: string; // Optional time string e.g., "10AM"
	href?: string;
	color?: string; // Optional color for the event dot/text e.g. 'bg-blue-500' or 'blue'
}

export interface CalendarDay {
	date: Date;
	dayOfMonth: string;
	isCurrentMonth: boolean; // Only relevant for month view
	isToday: boolean;
	isWeekend: boolean;
	isoString: string; // YYYY-MM-DD format for keys/attributes
	events: CalendarEvent[]; // Add events specific to this day
}

// Example Event Data Structure (Replace with your actual data source/fetching)
const MOCK_EVENTS: Record<string, CalendarEvent[]> = {
	// ... (Keep MOCK_EVENTS data from previous example) ...
	'2024-07-03': [
		// Assuming July 2024 for example
		{ id: 1, title: 'Design review', time: '10AM', href: '#', color: 'bg-blue-500' },
		{ id: 2, title: 'Sales meeting', time: '2PM', href: '#', color: 'bg-green-500' }
	],
	'2024-07-07': [{ id: 3, title: 'Date night', time: '6PM', href: '#', color: 'bg-pink-500' }],
	'2024-07-12': [
		{ id: 4, title: "Sam's birthday party", time: '2PM', href: '#', color: 'bg-purple-500' }
	],
	'2024-07-22': [
		{ id: 5, title: 'Maple syrup museum', time: '3PM', href: '#', color: 'bg-yellow-600' },
		{ id: 6, title: 'Hockey game', time: '7PM', href: '#', color: 'bg-red-500' }
	]
};

// --- Configuration ---
const WEEK_STARTS_ON: 0 | 1 = 1; // 0 = Sunday, 1 = Monday

// --- Helper Function ---
function getEventsForDay(date: Date): CalendarEvent[] {
	const isoString = format(date, 'yyyy-MM-dd');
	return MOCK_EVENTS[isoString] || [];
}

// --- Calendar Generation Functions ---

export function generateMonthDays(date: Date): CalendarDay[] {
	const monthStart = startOfMonth(date);
	const monthEnd = endOfMonth(date);
	const startDate = startOfWeek(monthStart, { weekStartsOn: WEEK_STARTS_ON });
	const endDate = endOfWeek(monthEnd, { weekStartsOn: WEEK_STARTS_ON });

	return eachDayOfInterval({ start: startDate, end: endDate }).map((dayDate) => {
		const dayOfWeek = getDay(dayDate);
		return {
			date: dayDate,
			dayOfMonth: format(dayDate, 'd'),
			isCurrentMonth: isSameMonth(dayDate, monthStart),
			isToday: isToday(dayDate),
			isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
			isoString: format(dayDate, 'yyyy-MM-dd'),
			events: getEventsForDay(dayDate)
		};
	});
}

export function generateWeekDays(date: Date): CalendarDay[] {
	const weekStart = startOfWeek(date, { weekStartsOn: WEEK_STARTS_ON });
	const weekEnd = endOfWeek(date, { weekStartsOn: WEEK_STARTS_ON });

	return eachDayOfInterval({ start: weekStart, end: weekEnd }).map((dayDate) => {
		const dayOfWeek = getDay(dayDate);
		return {
			date: dayDate,
			dayOfMonth: format(dayDate, 'd'),
			isCurrentMonth: true, // All days in week view are treated as "current" for styling
			isToday: isToday(dayDate),
			isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
			isoString: format(dayDate, 'yyyy-MM-dd'),
			events: getEventsForDay(dayDate)
		};
	});
}

// For Year view - generates basic month info
export function generateYearMonths(date: Date) {
	const yearStart = startOfYear(date);
	const yearEnd = endOfYear(date);
	const today = new Date();

	return eachMonthOfInterval({ start: yearStart, end: yearEnd }).map((monthDate) => ({
		date: monthDate,
		name: format(monthDate, 'MMMM'),
		isCurrentMonth: isSameMonth(monthDate, today),
		monthIndex: monthDate.getMonth() // 0-11
	}));
}

// --- Formatting Functions ---

export function getMonthYearHeader(date: Date): string {
	return format(date, 'MMMM yyyy');
}

export function getWeekHeader(date: Date): string {
	const weekStart = startOfWeek(date, { weekStartsOn: WEEK_STARTS_ON });
	const weekEnd = endOfWeek(date, { weekStartsOn: WEEK_STARTS_ON });
	const startFormat = format(weekStart, 'MMM d');
	const endFormat = format(weekEnd, 'MMM d, yyyy');
	return `${startFormat} - ${endFormat}`;
}

export function getDayHeader(date: Date): string {
	return format(date, 'MMMM d, yyyy');
}

export function getYearHeader(date: Date): string {
	return format(date, 'yyyy');
}

export function getDateTimeAttr(date: Date): string {
	return format(date, 'yyyy-MM'); // For month view mainly
}

export function getDayDateTimeAttr(date: Date): string {
	return format(date, 'yyyy-MM-dd'); // For day view
}

// --- Constants ---
export const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Standard order
export const weekdaysLong = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]; // Standard order

// Get weekdays starting from Monday if WEEK_STARTS_ON = 1
export const adjustedWeekdaysShort = [
	...weekdaysShort.slice(WEEK_STARTS_ON),
	...weekdaysShort.slice(0, WEEK_STARTS_ON)
];
export const adjustedWeekdaysLong = [
	...weekdaysLong.slice(WEEK_STARTS_ON),
	...weekdaysLong.slice(0, WEEK_STARTS_ON)
];
export const adjustedWeekdayIndices = [...Array(7).keys()].map((i) => (i + WEEK_STARTS_ON) % 7); // [1, 2, 3, 4, 5, 6, 0] if starts on Mon
