<script lang="ts">
	import { AppleIcon, ArrowRight, CandyIcon, PizzaIcon, UtensilsIcon } from 'lucide-svelte';
</script>

<div class="  flex items-center justify-center px-10 py-8">
	<div
		class="min-w-screen-md md-min-w-screen-md lg:min-w-screen-lg md:grid-cols-auto space-y-10 text-black md:grid md:grid-cols-2 md:gap-16 md:space-y-0"
	>
		<div
			class="shadow-retro max-w-sm translate-x-6 transform bg-yellow-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-110 md:translate-x-0"
		>
			<UtensilsIcon class="mb-4 size-16" />
			<p class="mb-1 uppercase">courses</p>
			<p class="title-font mb-3 text-xl font-bold tracking-widest">Table manners Lessons</p>
			<p class="mb-2 text-sm leading-relaxed">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima
				perferendis quibusdam unde provident veniam possimus earum.
			</p>

			<div class="flex"><button class="ml-auto" aria-label="button"> <ArrowRight /></button></div>
		</div>

		<div
			class="shadow-retro max-w-sm -translate-x-6 transform bg-yellow-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-110 md:translate-x-0"
		>
			<CandyIcon class="mb-4 size-16" />
			<p class="mb-1 uppercase">courses</p>
			<p class="title-font mb-3 text-xl font-bold tracking-widest">Food waste prevention Lessons</p>
			<p class="mb-2 text-sm leading-relaxed">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima
				perferendis quibusdam unde provident veniam possimus earum.
			</p>
			<div class="flex">
				<button class="ml-auto" aria-label="button arrow-right"> <ArrowRight /></button>
			</div>
		</div>

		<div
			class="shadow-retro max-w-sm translate-x-6 transform bg-yellow-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-110 md:translate-x-0"
		>
			<AppleIcon class="mb-4 size-16" />
			<p class="mb-1 uppercase">courses</p>
			<p class="title-font mb-3 text-xl font-bold tracking-widest">Healthy eating Lessons</p>
			<p class="mb-2 text-sm leading-relaxed">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima
				perferendis quibusdam unde provident veniam possimus earum.
			</p>
			<div class="flex"><button class="ml-auto" aria-label="button"> <ArrowRight /></button></div>
		</div>

		<div
			class="shadow-retro max-w-sm -translate-x-6 transform bg-yellow-400 px-6 py-4 transition duration-500 ease-in-out hover:scale-110 md:translate-x-0"
		>
			<PizzaIcon class="mb-4 size-16" />
			<p class="mb-1 uppercase">courses</p>
			<p class="title-font mb-3 text-xl font-bold tracking-widest">Mindful eating Lessons</p>
			<p class="mb-2 text-sm leading-relaxed">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure error, saepe deserunt minima
				perferendis quibusdam unde provident veniam possimus earum.
			</p>
			<div class="flex"><button class="ml-auto" aria-label="button"> <ArrowRight /></button></div>
		</div>
	</div>
</div>

<style>
	.shadow-retro {
		box-shadow: 8px 8px rgb(31, 8, 0);
	}
</style>
