<script lang="ts">
	import { PixelUiLogo } from '../pixel-ui-logo';

	const data = [
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
		</div>
	</div>
</footer>