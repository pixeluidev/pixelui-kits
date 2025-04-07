// src/lib/data.ts

// Define the structure of a single setting
export interface Setting {
	id: string; // Unique identifier
	title: string;
	description: string;
	enabled: boolean; // Initial state
}

// Define the structure for the settings state object
export type SettingsState = Record<string, boolean>;

// Array of settings conforming to the Setting interface
export const settingsData: Setting[] = [
	{
		id: 'email-marketing',
		title: 'Marketing Emails',
		description: 'Receive emails about new products & features.',
		enabled: true
	},
	{
		id: 'push-promotions',
		title: 'Promotional Push Notifications',
		description: 'Get push notifications for promotions & offers.',
		enabled: false
	},
	{
		id: 'inapp-updates',
		title: 'In-App Updates',
		description: 'Show important update notifications within the app.',
		enabled: true
	},
	{
		id: 'activity-summary',
		title: 'Weekly Activity Summary',
		description: 'Get a summary of your account activity each week.',
		enabled: true
	},
	{
		id: 'security-alerts',
		title: 'Security Alerts',
		description: 'Instant notifications for suspicious login activity.',
		enabled: true
	}
	// Add more settings if needed
];

// Function to get the initial state based on the SettingsData
export const getDefaultSettingsState = (): SettingsState => {
	const defaultState: SettingsState = {};
	settingsData.forEach((setting) => {
		defaultState[setting.id] = setting.enabled;
	});
	return defaultState;
};
