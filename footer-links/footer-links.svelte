<script lang="ts">
	import { PixelUiLogo } from '../pixel-ui-logo';

	const menus = [
		{
			title: 'About',
			links: [
				{ label: 'Features', link: '#' },
				{ label: 'Pricing', link: '#' },
				{ label: 'Support', link: '#' },
				{ label: 'Forums', link: '#' },
			],
		},
		{
			title: 'Project',
			links: [
				{ label: 'Contribute', link: '#' },
				{ label: 'Media assets', link: '#' },
				{ label: 'Changelog', link: '#' },
				{ label: 'Releases', link: '#' },
			],
		},
		{
			title: 'Community',
			links: [
				{ label: 'Join Discord', link: '#' },
				{ label: 'Follow on Twitter', link: '#' },
				{ label: 'Email newsletter', link: '#' },
				{ label: 'GitHub discussions', link: '#' },
			],
		},
	];
</script>

<footer class="mt-20 py-6 bg-gray-100">
	<div class="container">
		<div class="flex justify-between items-start">
			<div class="mr-6 flex items-center space-x-2">
				<PixelUiLogo class="size-8" />
				<span class="hidden text-lg font-bold xl:inline-block">PixelUI</span>
			</div>
			<div class="flex flex-wrap">
				{#each menus as menu (menu.title)}
					<div class="wrapper">
						<h3>{menu.title}</h3>
						{#each menu.links as link (link.label)}
							<a href={link.link}>{link.label}</a>
						{/each}
					</div>
					{/each}
			</div>
		</div>
	</div>
</footer>