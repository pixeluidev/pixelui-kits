<script lang="ts">
	import { HeartIcon, SearchIcon, ShoppingCartIcon } from '@lucide/svelte';

	const products = [
		{
			title: 'Diaper Bag',
			price: 119,
			thumbnail: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_3.png',
			discount: 0.05
		},
		{
			title: 'Cute Bear',
			price: 48,
			thumbnail: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_4.png',
			discount: 0.25
		},
		{
			title: 'Baby Truck',
			price: 17,
			thumbnail: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_5.png',
			discount: 0.35
		},
		{
			title: 'Baby Bike',
			price: 470,
			thumbnail: 'https://cdn.easyfrontend.com/pictures/ecommerce/grid_9_6.png',
			discount: 0.35
		}
	];
</script>

<section class="relative z-10 container overflow-hidden text-zinc-900 dark:text-white">
	<div class="container mx-auto px-4">
		<h2 class="text-3xl leading-tight font-bold md:text-5xl">Trending Now</h2>
		<div class="mt-12 grid grid-cols-12 gap-6">
			{#each products as product (product.title)}
				<!-- item -->
				<div class="col-span-12 md:col-span-6 lg:col-span-3">
					<div
						class="group overflow-hidden rounded-xl border bg-white transition duration-500 dark:border-slate-700 dark:bg-slate-800"
					>
						<div
							class="relative flex min-h-[265px] w-full items-center justify-center bg-gray-100 p-12 dark:bg-slate-700"
						>
							<h6
								class="absolute top-4 left-0 rounded-r-md bg-rose-600 px-6 py-1.5 font-bold text-white"
							>
								{product.discount * 100}%
							</h6>
							<img src={product.thumbnail} alt="" class="h-auto max-w-full" />
							<div
								class="bg-opacity-50 -translate-y-full- absolute top-0 right-0 bottom-0 left-0 transform bg-black opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-35"
							></div>
							<div
								class="bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 flex h-full w-full items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100"
							>
								<div
									class="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md bg-white"
								>
									<button
										aria-label="Favorite"
										class="cursor-pointer rounded-l-lg px-3 py-1 text-center leading-normal font-normal text-black hover:bg-zinc-300"
									>
										<i class="fas fa-heart"></i>
										<HeartIcon />
									</button>
									<button
										aria-label="Shopping cart"
										class="cursor-pointer px-3 py-1 text-center leading-normal font-normal text-black hover:bg-zinc-300"
									>
										<ShoppingCartIcon />
									</button>
									<button
										aria-label="search"
										class="cursor-pointer rounded-r-lg px-3 py-1 text-center leading-normal font-normal text-black hover:bg-zinc-300"
									>
										<SearchIcon />
									</button>
								</div>
							</div>
						</div>
						<div class="p-6">
							<div class="flex items-center justify-between">
								<div>
									<a href="#!"
										><h6 class="mb-1 font-bold hover:text-blue-600">
											{product.title}
										</h6></a
									>
									<span class="text-base text-yellow-500">
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star"></i>
										<i class="fas fa-star-half-alt"></i>
									</span>
								</div>
								<div>
									<p class="text-3xl font-bold">
										{new Intl.NumberFormat('us-US', {
											style: 'currency',
											currency: 'USD',
											currencyDisplay: 'narrowSymbol'
										}).format(product.price)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- item -->
			{/each}
		</div>
	</div>
</section>
