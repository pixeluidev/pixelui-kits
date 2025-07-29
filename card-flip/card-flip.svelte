<script lang="ts">
	import { WrenchIcon } from '@lucide/svelte';

	const services = [
		{
			step: '01',
			name: 'Diagnostics',
			imageUrl:
				'https://images.unsplash.com/photo-1632733711679-529326f6db12?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			description: 'State-of-the-art diagnostics to accurately identify vehicle issues.'
		},
		{
			step: '02',
			name: 'Repairs',
			imageUrl:
				'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			description:
				' Engine overhauls to brake replacements, we ensure high-quality work for your vehicle’s longevity.'
		},
		{
			step: '03',
			name: 'Maintenance',
			imageUrl:
				'https://images.unsplash.com/photo-1635437536607-b8572f443763?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			description:
				' Oil changes, tire rotations, and more to enhance performance and prevent future issues.'
		}
	];
</script>

<section class="mx-auto py-16">
	<div class="mx-auto flex justify-center object-center px-4 py-16">
		<div class="flex flex-col justify-center gap-12 object-center sm:gap-16">
			<h2 class="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
				Services
			</h2>
			<div class="mx-auto grid grid-cols-1 gap-12 space-y-10 sm:gap-16 md:space-y-0 lg:grid-cols-3">
				{#each services as service (service.name)}
					<div class="group col-span-1 h-96 w-96 [perspective:1000px]">
						<div
							class="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 ease-linear [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
						>
							<!--Front face with image-->
							<div class="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
								{#if service.imageUrl}
									<img
										class="h-full w-full cursor-pointer rounded-xl object-cover object-left"
										src={service.imageUrl}
										alt={service.name}
										width={320}
										height={320}
									/>
								{/if}
								<p class=" text-2xl transition-opacity delay-150 group-hover:opacity-0 md:my-6">
									{service.name}
								</p>
							</div>
							<!--  Back face with text-->
							<div
								class="absolute inset-0 h-full w-full [transform:rotateY(180deg)] rounded-xl bg-black/80 px-12 text-center text-slate-200 [backface-visibility:hidden]"
							>
								<div class="flex min-h-full flex-col items-center justify-center">
									<h2 class="mb-4 text-2xl font-bold">
										{service.name}
									</h2>
									<p class="mb-4 text-center text-lg text-pretty">
										{service.description}
									</p>
									<a href="tel:555-555-5555" class="inline-flex">
										<button
											class="my-2 inline-flex w-auto items-center gap-2 rounded-full bg-yellow-800 px-4 py-2 font-bold text-white hover:bg-yellow-700"
										>
											<span>Schedule Service</span>
											<WrenchIcon class="size-4" />
										</button>
									</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
