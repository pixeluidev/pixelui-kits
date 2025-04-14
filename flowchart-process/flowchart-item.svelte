<script lang="ts">
	import { fade } from 'svelte/transition';
	// Data & Tipe
	import type { FlowchartStep } from './data'; // Adjust path
	import { exampleFlowchartSteps as defaultSteps } from './data'; // Default data
	// Ikon default jika tidak ada di data
	import CircleDot from 'lucide-svelte/icons/circle-dot'; // Default/Pending
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Complete
	import AlertCircle from 'lucide-svelte/icons/alert-circle'; // Current/Error
	import type { SvelteComponent } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	// --- Props ---
	export let steps: FlowchartStep[] = defaultSteps;
	export let theme: 'light' | 'dark' = 'light';
	// export let flowDirection: 'horizontal' | 'vertical' = 'horizontal'; // Belum diimplementasikan penuh di CSS, fokus horizontal dulu
	export let className: string = ''; // Kelas tambahan

	// --- Styling Dinamis ---
	let stepTextColor: string;
	let stepMutedTextColor: string;
	let connectorColor: string;
	let completeColor: string; // Warna untuk status 'complete'
	let currentColor: string; // Warna untuk status 'current'
	let pendingColor: string; // Warna untuk status 'pending'
	let errorColor: string; // Warna untuk status 'error'
	let baseIconColor: string;
	let baseConnectorBorderStyle: string; // e.g., 'border-gray-300 dark:border-neutral-600'

	$: {
		if (theme === 'dark') {
			stepTextColor = 'text-neutral-100';
			stepMutedTextColor = 'text-neutral-400';
			connectorColor = 'text-neutral-600'; // Warna ikon konektor/panah
			completeColor = 'text-green-400';
			currentColor = 'text-orange-400';
			pendingColor = 'text-neutral-500'; // Abu-abu untuk pending
			errorColor = 'text-red-400';
			baseIconColor = 'text-neutral-500';
			baseConnectorBorderStyle = 'border-neutral-700';
		} else {
			// light theme
			stepTextColor = 'text-gray-900';
			stepMutedTextColor = 'text-gray-500';
			connectorColor = 'text-gray-400';
			completeColor = 'text-green-600';
			currentColor = 'text-primary';
			pendingColor = 'text-gray-400';
			errorColor = 'text-red-600';
			baseIconColor = 'text-gray-400';
			baseConnectorBorderStyle = 'border-gray-300';
		}
	}

	// Fungsi untuk mendapatkan kelas warna berdasarkan status
	function getStatusColorClass(status: FlowchartStep['status']): string {
		switch (status) {
			case 'complete':
				return completeColor;
			case 'current':
				return currentColor;
			case 'error':
				return errorColor;
			case 'pending':
			default:
				return pendingColor;
		}
	}

	// Fungsi untuk mendapatkan ikon berdasarkan status (atau ikon dari data step)
	function getStatusIcon(step: FlowchartStep): typeof SvelteComponent<Icon> {
		if (step.icon) return step.icon; // Prioritaskan ikon dari data
		switch (step.status) {
			case 'complete':
				return CheckCircle2;
			case 'current':
				return AlertCircle; // Icon untuk menandakan 'saat ini'
			case 'error':
				return AlertCircle; // Icon error
			case 'pending':
			default:
				return CircleDot; // Icon default/pending
		}
	}
</script>

<div class={`w-full overflow-x-auto py-4 ${className}`}>
	<ol class="flex min-w-max items-start space-x-4 px-4 sm:space-x-6">
		{#each steps as step, i (step.id)}
			<!-- Step Item -->
			<li class={`relative flex flex-col items-center ${i === steps.length - 1 ? '' : 'flex-1'}`}>
				<!-- flex-1 pada semua kecuali yg terakhir -->

				<!-- Connector Line (Before) - Tidak ada untuk item pertama -->
				{#if i > 0}
					<div
						class={`absolute top-[14px] left-[-50%] -z-10 h-0.5 w-full ${baseConnectorBorderStyle} rtl:right-[-50%] rtl:left-auto`}
						aria-hidden="true"
					>
						<!-- Garis solid jika langkah sebelumnya complete -->
						<div
							class={`h-0.5 w-full ${steps[i - 1].status === 'complete' ? (theme === 'dark' ? 'bg-green-400' : 'bg-green-600') : 'bg-transparent'}`}
						></div>
					</div>
				{/if}

				<!-- Icon Container -->
				<div
					class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8"
					class:bg-green-100={step.status === 'complete'}
					class:dark:bg-green-900={step.status === 'complete'}
					class:bg-orange-100={step.status === 'current'}
					class:dark:bg-orange-900={step.status === 'current'}
					class:bg-red-100={step.status === 'error'}
					class:dark:bg-red-900={step.status === 'error'}
					class:bg-gray-100={step.status === 'pending'}
					class:dark:bg-neutral-700={step.status === 'pending'}
					class:ring-2={step.status === 'current'}
					class:ring-orange-400={step.status === 'current'}
					class:dark:ring-primary={step.status === 'current'}
					class:ring-offset-2={step.status === 'current'}
					class:dark:ring-offset-neutral-900={step.status === 'current'}
					title={step.status}
				>
					<svelte:component
						this={getStatusIcon(step)}
						class={`h-4 w-4 sm:h-5 sm:w-5 ${getStatusColorClass(step.status)}`}
						strokeWidth={step.status === 'pending' ? 1.5 : 2}
					/>
				</div>

				<!-- Step Label & Description -->
				<div class="mt-2 w-28 text-center sm:w-32">
					<h3
						class={`text-xs font-medium sm:text-sm ${stepTextColor} ${step.status === 'current' ? 'font-semibold' : ''}`}
					>
						{step.label}
					</h3>
					{#if step.description}
						<p class={`text-[11px] sm:text-xs ${stepMutedTextColor} mt-0.5`}>{step.description}</p>
					{/if}
				</div>
			</li>
		{/each}
	</ol>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    /* Optional: hide scrollbar if needed */
    @layer utilities {
        .scrollbar-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    }
</style>
