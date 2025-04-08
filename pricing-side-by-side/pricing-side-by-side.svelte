<script>
	// Jika Anda menggunakan Svelte, Anda perlu mengimpor ikon di sini
	// Contoh:
	// import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
	// import ArrowRight from 'lucide-svelte/icons/arrow-right';
	// import XCircle from 'lucide-svelte/icons/x-circle'; // Untuk fitur yang tidak termasuk
</script>

<div class="container mx-auto px-6 py-16 lg:py-20">
	<div class="xl:flex xl:items-center">
		<div class="mx-auto mb-12 max-w-xl text-center lg:mb-16">
			<h2 class="text-3xl font-bold text-gray-900 capitalize lg:text-4xl dark:text-white">
				Choose Your Plan
			</h2>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				Simple, transparent pricing. Select the plan that fits your needs.
			</p>

			<div class="mt-6 flex justify-center">
				<span class="inline-block h-1 w-24 rounded-full bg-blue-500"></span>
			</div>
		</div>

		<div class="grid flex-1 items-stretch gap-8 lg:grid-cols-2 xl:mx-8 xl:gap-12">
			<div
				class="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
			>
				<div>
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Essential</h3>
					<p class="mt-3 min-h-[3em] text-gray-500 dark:text-gray-400">
						Perfect for individuals starting out. Get the core features you need.
					</p>

					<div class="my-6">
						<span class="text-4xl font-bold text-gray-900 dark:text-white">$3.00</span>
						<span class="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">/Month</span>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Billed Yearly</p>
					</div>

					<h4 class="mb-4 text-lg font-medium text-gray-800 dark:text-white">What’s included:</h4>
					<ul class="space-y-3 text-gray-600 dark:text-gray-300">
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>All limited links</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Own analytics platform</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Chat support</span>
						</li>

						<li class="flex items-center gap-3 text-gray-400 line-through dark:text-gray-500">
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-400"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Mobile app access</span>
						</li>
						<li class="flex items-center gap-3 text-gray-400 line-through dark:text-gray-500">
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-400"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Unlimited users</span>
						</li>
					</ul>
				</div>

				<a
					class="focus:ring-opacity-80 mt-8 block w-full transform rounded-lg border-2 border-blue-600 px-6 py-3 text-center font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 hover:bg-blue-50 focus:ring focus:ring-blue-300 focus:outline-none dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700"
					href="/components"
				>
					Choose Plan
				</a>
			</div>

			<div
				class="relative flex scale-100 transform flex-col justify-between rounded-2xl border-2 border-blue-500 bg-white p-6 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02] dark:border-blue-500 dark:bg-gray-800"
			>
				<div class="absolute top-0 right-0 -mt-4 mr-4">
					<span
						class="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold tracking-wide text-white shadow-md"
					>
						Most Popular
					</span>
				</div>

				<div>
					<h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Premium</h3>
					<p class="mt-3 min-h-[3em] text-gray-500 dark:text-gray-400">
						Unlock everything with our lifetime premium access. Best value.
					</p>

					<div class="my-6">
						<span class="text-4xl font-bold text-gray-900 dark:text-white">$50.00</span>
						<span class="ml-1 text-lg font-medium text-gray-500 dark:text-gray-400">/Lifetime</span>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">One-time payment</p>
					</div>

					<h4 class="mb-4 text-lg font-medium text-gray-800 dark:text-white">
						Everything included:
					</h4>
					<ul class="space-y-3 text-gray-600 dark:text-gray-300">
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>All limited links</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Own analytics platform</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Priority chat support</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Optimize hashtags</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Mobile app access</span>
						</li>
						<li class="flex items-center gap-3">
							<svg
								aria-hidden="true"
								class="h-5 w-5 flex-shrink-0 text-blue-500"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clip-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									fill-rule="evenodd"
								/>
							</svg>
							<span>Unlimited users</span>
						</li>
					</ul>
				</div>

				<a
					class="focus:ring-opacity-80 mt-8 block w-full transform rounded-lg bg-blue-600 px-6 py-3 text-center font-medium tracking-wide text-white capitalize transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
					href="/components"
				>
					Get Lifetime Access
				</a>
			</div>
		</div>
	</div>
</div>
