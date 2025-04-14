<script lang="ts">
	import { settingsData, getDefaultSettingsState, type SettingsState } from './data'; // Import data and types
	import NotificationSettingItem from './notification-setting-item.svelte';

	// Define the type for the detail property of the CustomEvent from SettingItem
	interface SettingChangeEventDetail {
		id: string;
		checked: boolean;
	}

	// Strongly typed state for settings
	let settingStates: SettingsState = getDefaultSettingsState();

	// Handle the 'change' event from SettingItem with type safety
	function handleSettingChange(event: CustomEvent<SettingChangeEventDetail>) {
		const { id, checked } = event.detail;
		// Update state immutably for Svelte reactivity
		settingStates = { ...settingStates, [id]: checked };
		console.log('Setting changed:', id, checked); // For debugging
	}

	// Reset settings to their default values
	function resetSettings() {
		settingStates = getDefaultSettingsState();
		console.log('Settings reset to default');
	}

	// Simulate saving changes
	function saveChanges() {
		// In a real app, you would send settingStates to your backend API
		console.log('Saving changes:', settingStates);
		alert('Settings (pretend) saved! Check the console.');
	}
</script>

<!-- Card Container -->
<div
	class="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
>
	<!-- Card Body -->
	<div class="flex flex-col gap-5">
		<!-- Header -->
		<div class="flex w-full flex-col border-b p-5 md:p-6">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
			<p class="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
		</div>

		<!-- Settings List with Scroll -->
		<!-- Using standard overflow-y-auto. Styling scrollbar is optional -->
		<div class="scrollbar-track-transparent flex w-full flex-col gap-3 overflow-y-auto p-5 md:p-6">
			{#each settingsData as setting (setting.id)}
				<NotificationSettingItem
					{setting}
					checked={settingStates[setting.id]}
					on:change={handleSettingChange}
				/>
			{/each}
		</div>

		<!-- Action Buttons -->
		<div
			class="flex w-full items-center justify-end gap-3 border-t border-gray-200 p-5 md:p-6 dark:border-gray-700"
		>
			<button
				class="rounded-md bg-red-100/50 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 ease-in-out hover:bg-red-100 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white focus:outline-none dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 dark:focus:ring-offset-gray-800"
				onclick={resetSettings}
				type="button"
			>
				Reset To Default
			</button>
			<button
				class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-primary focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white focus:outline-none dark:focus:ring-offset-gray-800"
				onclick={saveChanges}
				type="button"
			>
				Save Changes
			</button>
		</div>
	</div>
</div>
