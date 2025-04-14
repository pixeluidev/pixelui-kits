<div class="container">
	<div class="flex items-center gap-6">
		<!-- Circular Progress -->
		<div class="relative size-40">
			<svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-gray-200 dark:text-neutral-700"
					stroke-width="2"
				></circle>
				<!-- Progress Circle -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-blue-600 dark:text-blue-500"
					stroke-width="2"
					stroke-dasharray="100"
					stroke-dashoffset="75"
					stroke-linecap="round"
				></circle>
			</svg>
		</div>
		<!-- End Circular Progress -->

		<!-- Circular Progress -->
		<div class="relative size-40">
			<svg class="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-gray-200 dark:text-neutral-700"
					stroke-width="2"
				></circle>
				<!-- Progress Circle -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-blue-600 dark:text-blue-500"
					stroke-width="2"
					stroke-dasharray="100"
					stroke-dashoffset="65"
					stroke-linecap="round"
				></circle>
			</svg>

			<!-- Percentage Text -->
			<div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
				<span class="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">35%</span>
			</div>
		</div>

		<!-- End Circular Progress -->
		<!-- Gauge Component -->
		<div class="relative size-40">
			<svg class="size-full rotate-[135deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle (Gauge) -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-gray-200 dark:text-neutral-700"
					stroke-width="1.5"
					stroke-dasharray="75 100"
					stroke-linecap="round"
				></circle>

				<!-- Gauge Progress -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-blue-600 dark:text-blue-500"
					stroke-width="1.5"
					stroke-dasharray="37.5 100"
					stroke-linecap="round"
				></circle>
			</svg>

			<!-- Value Text -->
			<div
				class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
			>
				<span class="text-4xl font-bold text-blue-600 dark:text-blue-500">50</span>
				<span class="block text-blue-600 dark:text-blue-500">Score</span>
			</div>
		</div>
		<!-- End Gauge Component -->

		<!-- Gauge Component -->
		<div class="relative size-40">
			<svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle (Gauge) -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-gray-200 dark:text-neutral-700"
					stroke-width="1"
					stroke-dasharray="50 100"
					stroke-linecap="round"
				></circle>

				<!-- Gauge Progress -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-blue-600 dark:text-blue-500"
					stroke-width="1.5"
					stroke-dasharray="37.5 100"
					stroke-linecap="round"
				></circle>
			</svg>

			<!-- Value Text -->
			<div class="absolute start-1/2 top-9 -translate-x-1/2 transform text-center">
				<span class="text-3xl font-bold text-blue-600 dark:text-blue-500">75</span>
				<span class="block text-sm text-blue-600 dark:text-blue-500">Score</span>
			</div>
		</div>
		<!-- End Gauge Component -->

		<!-- Gauge Component -->
		<div class="relative size-40">
			<svg class="size-full rotate-[135deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle (Gauge) -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-purple-200 dark:text-neutral-700"
					stroke-width="1"
					stroke-dasharray="75 100"
				></circle>

				<!-- Gauge Progress -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-purple-600 dark:text-purple-500"
					stroke-width="2"
					stroke-dasharray="18.75 100"
				></circle>
			</svg>

			<!-- Value Text -->
			<div
				class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
			>
				<span class="text-4xl font-bold text-purple-600 dark:text-purple-500">25</span>
				<span class="block text-purple-600 dark:text-purple-500">mph</span>
			</div>
		</div>
		<!-- End Gauge Component -->

		<!-- Gauge Component -->
		<div class="relative size-40">
			<svg class="size-full rotate-[135deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle (Gauge) -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-green-200 dark:text-neutral-700"
					stroke-width="1"
					stroke-dasharray="75 100"
					stroke-linecap="round"
				></circle>

				<!-- Gauge Progress -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-green-500 dark:text-green-500"
					stroke-width="2"
					stroke-dasharray="56.25 100"
					stroke-linecap="round"
				></circle>
			</svg>

			<!-- Value Text -->
			<div
				class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
			>
				<span class="text-4xl font-bold text-green-600 dark:text-green-500">75</span>
				<span class="block text-green-600 dark:text-green-500">Score</span>
			</div>
		</div>
		<!-- End Gauge Component -->

		<!-- Gauge Component -->
		<div class="relative size-40">
			<svg class="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
				<!-- Background Circle (Gauge) -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-orange-100 dark:text-neutral-700"
					stroke-width="3"
					stroke-dasharray="50 100"
					stroke-linecap="round"
				></circle>

				<!-- Gauge Progress -->
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					class="stroke-current text-primary dark:text-primary"
					stroke-width="1"
					stroke-dasharray="25 100"
					stroke-linecap="round"
				></circle>
			</svg>

			<!-- Value Text -->
			<div class="absolute start-1/2 top-9 -translate-x-1/2 transform text-center">
				<span class="text-2xl font-bold text-primary dark:text-primary">50</span>
				<span class="block text-xs text-primary dark:text-primary">Average</span>
			</div>
		</div>
		<!-- End Gauge Component -->
	</div>
</div>
