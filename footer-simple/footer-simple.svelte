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

<footer class="mt-30 border-t border-t-gray-100 dark:border-t-gray-500">
	<div class="flex flex-col items-center justify-between p-6 md:flex-row">
		<PixelUiLogo class="size-20" />
		<div class="flex items-center gap-2">
			{#each links as item (item.label)}
				<a href={item.href} class="text-sm">
					{item.label}
				</a>
			{/each}
		</div>
		<div class="flex flex-nowrap justify-end">
			{#each socials as item (item.label)}
				<a href={item.href} class="flex size-10 items-center justify-center rounded-full border">
					<svelte:component this={item.icon} class="size-4" />

					<span class="sr-only">{item.label}</span>
				</a>
			{/each}
		</div>
	</div>
</footer>
