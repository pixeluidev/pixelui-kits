<script lang="ts">
	import { AppleIcon, ArrowRight, CandyIcon, PizzaIcon, UtensilsIcon } from '@lucide/svelte';

	const items = [
		{
			label: 'Courses',
			title: 'Table manners Lessons',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima perferendis quibusdam unde provident veniam possimus earum.',
			icon: UtensilsIcon
		},
		{
			label: 'Courses',
			title: 'Food waste prevention Lessons',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima perferendis quibusdam unde provident veniam possimus earum.',
			icon: CandyIcon
		},
		{
			label: 'Courses',
			title: 'Healthy eating Lessons',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima perferendis quibusdam unde provident veniam possimus earum.',
			icon: AppleIcon
		},
		{
			label: 'Courses',
			title: 'Mindful eating Lessons',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima perferendis quibusdam unde provident veniam possimus earum.',
			icon: PizzaIcon
		}
	];
</script>

<div class="  flex items-center justify-center px-10 py-8">
	<div
		class="min-w-screen-md md-min-w-screen-md lg:min-w-screen-lg md:grid-cols-auto space-y-10 text-black md:grid md:grid-cols-2 md:gap-16 md:space-y-0"
	>
		{#each items as item (item.title)}
			<div
				class="shadow-retro dark\:shadow-retro max-w-sm transform bg-yellow-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-110 md:translate-x-0"
			>
				<svelte:component this={item.icon} class="mb-4 size-16" />

				<p class="mb-1 uppercase">{item.label}</p>
				<p class="title-font mb-3 text-xl font-bold tracking-widest">{item.title}</p>
				<p class="mb-2 text-sm leading-relaxed">
					{item.description}
				</p>

				<div class="flex">
					<button class="ml-auto" aria-label="button">
						<ArrowRight />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.shadow-retro {
		box-shadow: 8px 8px rgb(31, 8, 0);
	}

	@media screen and (prefers-color-scheme: light) {
		.shadow-retro {
			box-shadow: 8px 8px #2e2d2d;
		}
	}
</style>
