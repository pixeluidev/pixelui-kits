<script lang="ts">
	import type { FaqCategory } from './data';

	export let category: FaqCategory;

	// Optional callback for interaction
	export let onClick: (label: string) => void = () => {
	};
</script>

<a
	aria-label={category.label}
	class="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-cover bg-center shadow-md transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:aspect-[3/2] dark:focus-visible:ring-offset-gray-900"
	href="/component/faq-page-header"
	on:click={() => onClick(category.label)}
	style="background-image: url('{category.image}');"
	type="button"
>
	<!-- Overlay -->
	<div
		class="absolute inset-0 z-10 bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-60"
	></div>

	<!-- Label Text -->
	<div class="relative z-20 flex h-full items-center justify-center p-4">
		<span class="text-center text-lg font-semibold text-white drop-shadow-md md:text-xl">
			{category.label}
		</span>
	</div>
</a>
