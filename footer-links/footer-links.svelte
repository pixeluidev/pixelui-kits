<script lang="ts">
	import { PixelUiLogo } from '../pixel-ui-logo';
	import { GithubIcon, TwitterIcon, YoutubeIcon } from 'lucide-svelte';

	const menus = [
		{
			title: 'About',
			links: [
				{ label: 'Features', link: '#' },
				{ label: 'Pricing', link: '#' },
				{ label: 'Support', link: '#' },
				{ label: 'Forums', link: '#' }
			]
		},
		{
			title: 'Project',
			links: [
				{ label: 'Contribute', link: '#' },
				{ label: 'Media assets', link: '#' },
				{ label: 'Changelog', link: '#' },
				{ label: 'Releases', link: '#' }
			]
		},
		{
			title: 'Community',
			links: [
				{ label: 'Join Discord', link: '#' },
				{ label: 'Follow on Twitter', link: '#' },
				{ label: 'Email newsletter', link: '#' },
				{ label: 'GitHub discussions', link: '#' }
			]
		}
	];

	const socials = [
		{ href: 'https://twitter.com', label: 'Twitter', icon: TwitterIcon },
		{ href: 'https://github.com', label: 'GitHub', icon: GithubIcon },
		{ href: 'https://youtube.com', label: 'Youtube', icon: YoutubeIcon }
	];
</script>

<footer class="mt-20 bg-gray-100 py-6 dark:bg-gray-900">
	<div class="container pb-8">
		<div
			class="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between"
		>
			<div class="mr-6 flex items-center space-x-2">
				<PixelUiLogo class="size-8" />
				<span class=" text-lg font-bold">PixelUI</span>
			</div>
			<div class="mt-10 flex w-full grow flex-wrap justify-end md:mt-0 md:max-w-1/2">
				{#each menus as menu (menu.title)}
					<div class="wrapper w-1/3">
						<h3 class="mb-4 text-xl font-bold">{menu.title}</h3>
						<ul class="space-y-1">
							{#each menu.links as link (link.label)}
								<li class="text-sm">
									<a href={link.link} class="text-gray-500 hover:text-blue-600">{link.label}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="container border-t py-4">
		<div class="flex items-start justify-between text-sm">
			<div class="">© {new Date().getFullYear()} PixelUI. All rights reserved.</div>
			<div class="flex flex-nowrap justify-end gap-2">
				{#each socials as item (item.label)}
					<a
						href={item.href}
						class="flex size-8 items-center justify-center rounded-sm hover:bg-gray-100 hover:dark:bg-gray-800"
					>
						<svelte:component this={item.icon} class="size-4" />

						<span class="sr-only">{item.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
