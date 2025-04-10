<script lang="ts">
	const products = [
		{
			title: 'Airpods',
			imageUrl: '/components-icons/airpods.png',
			description: 'This is a card with a thumbnail image on top.'
		},
		{
			title: 'Apple Watch',
			imageUrl: '/components-icons/apple-watch.png',
			description: 'This is a card with a thumbnail image on top.'
		},
		{
			title: ' AirPods Max - Midnight',
			imageUrl: '/components-icons/airpods-black.png',
			description: 'This is a card with a thumbnail image on top.'
		}
	];
</script>

<div class="container">
	<div class="grid grid-cols-1 gap-10 md:grid-cols-3">
		{#each products as product (product.title)}
			<div
				class="text-foreground bg-background data-[focus-visible=true]:outline-focus transition-transform-background relative box-border flex h-auto w-[420px] flex-col overflow-hidden rounded-lg shadow-md outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
				tabindex="-1"
			>
				<div
					class="place-content-inherit align-items-inherit relative flex h-auto w-full flex-auto flex-col overflow-y-auto p-3 px-3 pb-1 text-left break-words subpixel-antialiased"
				>
					<div
						class="relative rounded-lg shadow-none shadow-black/5"
						style="max-width: fit-content;"
					>
						<img
							alt="Card image"
							src={product.imageUrl}
							class="transition-transform-opacity relative z-10 aspect-video w-full rounded-t-lg object-cover object-top opacity-0 shadow-none shadow-black/5 !duration-300 data-[loaded=true]:opacity-100 motion-reduce:transition-none"
							aria-hidden="true"
							data-loaded="true"
						/>
					</div>
					<span
						aria-hidden="true"
						class="block h-px w-px"
						style="margin-left: 0.25rem; margin-top: 0.5rem;"
					></span>
					<div class="flex flex-col gap-2 px-2">
						<h3 class="font-md text-lg">{product.title}</h3>
						<p class="text-default-400 text-sm">{product.description}</p>
					</div>
				</div>
				<div
					class="color-inherit flex h-auto w-full items-center justify-end gap-2 overflow-hidden rounded-b-lg p-3 subpixel-antialiased"
				>
					<button
						type="button"
						class="group data-[focus-visible=true]:outline-focus transition-transform-colors-opacity data-[hover=true]:bg-default/40 [&amp;>svg]:max-w-[theme(spacing.8)] relative z-0 box-border inline-flex h-10 w-full min-w-20 appearance-none items-center justify-center gap-2 overflow-hidden rounded-md bg-transparent px-4 text-sm font-normal whitespace-nowrap subpixel-antialiased outline-none select-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[pressed=true]:scale-[0.97] motion-reduce:transition-none"
					>Cancel
					</button>
					<button
						type="button"
						class="group data-[focus-visible=true]:outline-focus transition-transform-colors-opacity [&amp;>svg]:max-w-[theme(spacing.8)] relative z-0 box-border inline-flex h-10 w-full min-w-20 appearance-none items-center justify-center gap-2 overflow-hidden rounded-md bg-gray-200 px-4 text-sm font-normal whitespace-nowrap subpixel-antialiased outline-none select-none hover:opacity-80 data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[pressed=true]:scale-[0.97] motion-reduce:transition-none dark:bg-gray-800"
					>Continue
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
