<script lang="ts">
	import { fade } from 'svelte/transition';
	import { bankInstallmentOptions, type BankInstallmentOption } from './data'; // Adjust path
	import Eye from 'lucide-svelte/icons/eye';

	let selectedInstallmentPlan: string | null = bankInstallmentOptions[0]?.id ?? null; // Default selection
	let selectedOccupation: string = 'student';
	let selectedMonths: number = 24;
</script>

<div class="space-y-6" transition:fade>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300" for="installments">Number of
				Installments</label>
			<select bind:value={selectedMonths} class="appearance-none block w-full rounded-lg border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700 p-3 ps-4 pe-9 text-sm text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600/50 focus:outline-none transition duration-150"
							id="installments">
				<option value={12}>12 months</option>
				<option value={24}>24 months</option>
				<option value={48}>48 months</option>
				<option value={64}>64 months</option>
			</select>
			<!-- Custom arrow omitted for brevity, add if needed -->
		</div>
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
						 for="occupation">Occupation</label>
			<select bind:value={selectedOccupation} class="appearance-none block w-full rounded-lg border border-gray-300 dark:border-neutral-600 bg-gray-50 dark:bg-neutral-700 p-3 ps-4 pe-9 text-sm text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-600/50 focus:outline-none transition duration-150"
							id="occupation">
				<option value="student">Student</option>
				<option value="freelancer">Freelancer</option>
				<option value="owner">Business owner</option>
				<option value="retired">Retired</option>
			</select>
			<!-- Custom arrow omitted for brevity, add if needed -->
		</div>
	</div>

	<!-- Installment Options Table -->
	<div class="overflow-x-auto relative rounded-lg border border-gray-200 dark:border-neutral-700">
		<table class="w-full text-sm text-left text-gray-500 dark:text-neutral-400">
			<thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-neutral-700 dark:text-neutral-300">
			<tr>
				<th class="px-6 py-3" scope="col">Bank</th>
				<th class="px-6 py-3" scope="col">Monthly Payment</th>
				<th class="px-6 py-3" scope="col"><span class="sr-only">Actions</span></th>
			</tr>
			</thead>
			<tbody>
			{#each bankInstallmentOptions as option (option.id)}
				<tr
					class="bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
						<div class="flex items-center">
							<input id={`install-radio-${option.id}`} type="radio" value={option.id} name="installment-plan-radio"
										 bind:group={selectedInstallmentPlan}
										 class="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600">
							<label for={`install-radio-${option.id}`} class="ms-2">{option.bankName}</label>
						</div>
					</th>
					<td class="px-6 py-4">${option.monthlyPayment}/month</td>
					<td class="px-6 py-4 text-right">
						<a href={option.detailsUrl}
							 class="inline-flex items-center font-medium text-orange-600 dark:text-orange-400 hover:underline">
							<Eye class="w-4 h-4 me-1.5" />
							View details
						</a>
					</td>
				</tr>
			{/each}
			</tbody>
		</table>
	</div>

	<div class="flex items-start gap-3 mt-4">
		<div class="flex items-center h-5">
			<input class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-neutral-700 dark:border-neutral-600 dark:focus:ring-orange-600 dark:ring-offset-neutral-800" id="installment-terms" required
						 type="checkbox"
						 value="">
		</div>
		<label class="text-sm font-medium text-gray-700 dark:text-neutral-300" for="installment-terms">I accept the <a
			class="text-orange-600 dark:text-orange-400 hover:underline" href="#">Terms and Conditions</a></label>
	</div>
</div>