<script lang="ts">
	import { PixelUiLogo } from '../pixel-ui-logo';
	import { GithubIcon, TwitterIcon, YoutubeIcon } from '@lucide/svelte';

	const links = [
		{ href: '#', label: 'Contact' },
		{ href: '#', label: 'Privacy' },
		{ href: '#', label: 'Blog' },
		{ href: '#', label: 'Store' },
		{ href: '#', label: 'Careers' }
	];

	const socials = [
		{ href: 'https://twitter.com', label: 'Twitter', icon: TwitterIcon },
		{ href: 'https://github.com', label: 'GitHub', icon: GithubIcon },
		{ href: 'https://youtube.com', label: 'Youtube', icon: YoutubeIcon }
	];
</script>

<footer class="mt-30 border-t border-t-gray-100 bg-white dark:border-t-gray-500 dark:bg-zinc-950">
	<div class="flex flex-col items-center justify-between p-6 md:flex-row">
		<div class="mr-6 flex items-center space-x-2">
			<PixelUiLogo class="size-8" />
			<span class=" text-lg font-bold">PixelUI</span>
		</div>
		<div class="flex items-center gap-2">
			{#each links as item (item.label)}
				<a href={item.href} class="text-sm text-gray-500">
					{item.label}
				</a>
			{/each}
		</div>
		<div class="flex flex-nowrap justify-end gap-2">
			{#each socials as item (item.label)}
				<a
					href={item.href}
					class="flex size-8 items-center justify-center rounded-full border hover:bg-gray-100 hover:dark:bg-gray-800"
				>
					<svelte:component this={item.icon} class="size-4" />

					<span class="sr-only">{item.label}</span>
				</a>
			{/each}
		</div>
	</div>
</footer>
