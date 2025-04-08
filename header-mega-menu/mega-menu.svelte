<script lang="ts">
	// Prop to notify the parent to close the menu
	export let onClose: () => void = () => {
	};

	function handleLinkClick(event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		event.stopPropagation();
		// Close menu if an actual link *inside* the menu is clicked
		if ((event.target as HTMLElement)?.closest('a[href]')) {
			onClose();
		}
		// Clicking on whitespace within the menu usually shouldn't close it
		// unless that's the desired UX.
	}
</script>

<!--
  Main wrapper for positioning and background/shadow.
  Visibility is controlled by the parent's {#if}.
-->
<div
	aria-labelledby="hs-mega-menu"
	aria-orientation="vertical"
	class="absolute top-full right-0 z-20 w-full
           min-w-[600px] py-2 sm:py-3"
	onclick={handleLinkClick}
	role="button"
	tabindex="0"
>
	<div class="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
		<div
			class="rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:p-6 dark:border-gray-700 dark:bg-gray-800"
		>
			<div class="gap-6 sm:grid sm:grid-cols-3 sm:gap-8">
				<!-- Column 1 -->
				<div class="flex flex-col space-y-1">
					<h4 class="mb-2 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
						General
					</h4>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						About
					</a>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Services
					</a>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Customer Story
					</a>
				</div>

				<!-- Column 2 -->
				<div class="mt-4 flex flex-col space-y-1 sm:mt-0">
					<h4 class="mb-2 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
						Careers
					</h4>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Careers Overview
					</a>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Current Openings
					</a>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Apply Now
					</a>
				</div>

				<!-- Column 3 -->
				<div class="mt-4 flex flex-col space-y-1 sm:mt-0">
					<h4 class="mb-2 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
						Account
					</h4>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Log In
					</a>
					<a
						class="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-orange-400 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700"
						href="/components"
					>
						Sign Up
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
