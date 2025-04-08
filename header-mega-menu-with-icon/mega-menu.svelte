<script lang="ts">
	import type { MegaMenuIconLink } from './data';

	export let menuData: MegaMenuIconLink[];
	export let onClose: () => void = () => {
	};

	function handleLinkClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		// Close menu if an actual link *inside* the menu is clicked
		if ((event.target as HTMLElement)?.closest('a[href]')) {
			onClose();
		}
	}
</script>

<!-- Wrapper for positioning, background, and shadow -->
<div
	aria-labelledby="mega-menu-icons-dropdown-button"

	class="absolute start-0 top-full z-20 mt-1 w-auto min-w-[30rem]"
	onclick={handleLinkClick}
	role="button"
	tabindex="0"
>
	<div
		class="grid grid-cols-2 gap-4 rounded-lg border
           border-gray-200 bg-white p-4 shadow-xl md:grid-cols-3 dark:border-neutral-700 dark:bg-neutral-800"
	>
		{#each menuData as link (link.id)}
			<a
				href={ "/"}
				class="group flex items-center gap-3 rounded-lg p-2.5 text-sm text-gray-600
                       transition-colors duration-150 ease-in-out hover:bg-orange-50
                       hover:text-orange-700 focus:bg-orange-50 focus:text-orange-700 focus:outline-none dark:text-neutral-300
                       dark:hover:bg-orange-900/30 dark:hover:text-orange-400 dark:focus:bg-orange-900/30 dark:focus:text-orange-400"
			>
				<svelte:component
					this={link.icon}
					class="h-4 w-4 shrink-0 text-gray-400 transition-colors duration-150 ease-in-out group-hover:text-orange-500 dark:text-neutral-500 dark:group-hover:text-orange-400"
					strokeWidth={2}
				/>
				<span class="text-xs font-medium">{link.label}</span>
				{#if link.srText}<span class="sr-only">{link.srText}</span>{/if}
			</a>
		{/each}
	</div>
</div>
