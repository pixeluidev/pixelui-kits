<script>
	// Impor data dan ikon yang mungkin digunakan di luar loop (jika ada)

	// State untuk menyimpan value radio yang dipilih
	import { radioOptions } from './data.ts';

	let selectedPlan = 'team'; // Nilai default (sesuaikan dengan value di data.js)

	// Reactive variable untuk mendapatkan detail plan yang dipilih (opsional, tapi berguna)
	$: selectedPlanDetails = radioOptions.find((option) => option.value === selectedPlan);
</script>

<!-- Card Container -->
<div
	class="w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
>
	<!-- Card Body -->
	<div class="flex flex-col gap-4 p-5 md:p-6">
		<!-- Header -->
		<div class="flex w-full flex-col">
			<h4 class="text-xl font-semibold text-gray-900 dark:text-white">Select your plan</h4>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				Find a plan that's right for you and your team.
			</p>
		</div>

		<!-- Radio Group Simulation -->
		<fieldset aria-labelledby="plan-heading" role="radiogroup">
			<legend class="sr-only" id="plan-heading">Select your plan</legend>
			<div class="w-full space-y-3">
				{#each radioOptions as option (option.value)}
					{@const isSelected = selectedPlan === option.value}
					<label
						for={`radio-${option.value}`}
						class="group focus-within:ring-secondary relative flex w-full cursor-pointer items-center justify-between rounded-lg border-2 p-3 transition-all duration-200 ease-in-out focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white md:p-4 dark:focus-within:ring-offset-gray-800"
						class:border-orange-500={isSelected}
						class:bg-slate-50={isSelected}
						class:dark:bg-slate-800={isSelected}
						class:border-gray-200={!isSelected}
						class:dark:border-gray-700={!isSelected}
						class:hover:bg-gray-50={!isSelected}
						class:dark:hover:bg-gray-700={!isSelected}
					>
						<!-- Hidden Actual Radio Input -->
						<input
							type="radio"
							id={`radio-${option.value}`}
							name="plan-selection"
							bind:group={selectedPlan}
							value={option.value}
							class="sr-only"
							aria-labelledby={`label-text-${option.value}`}
							aria-describedby={`description-${option.value}`}
						/>

						<!-- Content Wrapper -->
						<div class="flex w-full flex-row items-center gap-3 md:gap-4">
							<!-- Icon -->
							{#if option.icon}
								<div
									class="flex items-center justify-center rounded-full p-2 transition-colors duration-200 ease-in-out"
									class:bg-orange-100={isSelected}
									class:dark:bg-slate-500={isSelected}
									class:bg-gray-100={!isSelected}
									class:dark:bg-gray-700={!isSelected}
								>
									<svelte:component
										this={option.icon}
										size={20}
										strokeWidth={2}
										class={`transition-colors duration-200 ease-in-out ${isSelected ? ':text-red-500 dark:text-orange-300' : ':text-gray-500 dark:text-gray-400'}`}
										aria-hidden="true"
									/>
								</div>
							{/if}

							<!-- Text Content -->
							<div class="flex-1">
								<p
									id={`label-text-${option.value}`}
									class="text-sm font-medium text-gray-800 dark:text-gray-100"
								>
									{option.title}
									{#if option.helperText}
										<span class="ml-1 text-xs text-gray-500 dark:text-gray-400">
											{option.helperText}
										</span>
									{/if}
								</p>
								{#if option.description}
									<p
										id={`description-${option.value}`}
										class="text-xs text-gray-500 dark:text-gray-400"
									>
										{option.description}
									</p>
								{/if}
							</div>
						</div>

						<!-- Custom Check Indicator (Optional but looks good) -->
						<span
							class="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200 ease-in-out"
							class:border-orange-500={isSelected}
							class:bg-orange-500={isSelected}
							class:border-gray-300={!isSelected}
							class:dark:border-gray-600={!isSelected}
							aria-hidden="true"
						>
							{#if isSelected}
								<span class="h-1.5 w-1.5 rounded-full bg-white dark:bg-gray-900"></span>
							{/if}
						</span>
					</label>
				{/each}
			</div>
			<!-- Description for the group -->
			<p class="mt-4 text-xs text-gray-500 dark:text-gray-400">
				Selected plan method can be changed at any time.
			</p>
		</fieldset>

		<!-- Display selected value (for debugging or confirmation) -->
		<div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
			Selected: <span class="font-semibold">{selectedPlanDetails?.title ?? 'None'}</span>
		</div>
	</div>
</div>
