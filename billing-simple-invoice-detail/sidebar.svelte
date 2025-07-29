<!-- src/lib/components/invoice-detail/invoice-status-sidebar.svelte -->
<script lang="ts">
	import {
		Info,
		User,
		Calendar,
		CreditCard,
		DollarSign,
		CheckCircle,
		AlertTriangle,
		Clock
	} from '@lucide/svelte';
	import type { DetailedInvoiceData } from './types';
	import { format } from 'date-fns';

	export let invoice: DetailedInvoiceData;

	// --- Status Badge Logic ---
	interface StatusBadge {
		text: string;
		icon: typeof Info; // Default icon
		colorClasses: string;
	}

	function getStatusBadge(inv: DetailedInvoiceData): StatusBadge {
		switch (inv.status) {
			case 'Paid':
				return {
					text: 'Invoice Paid',
					icon: CheckCircle,
					colorClasses: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
				};
			case 'Overdue':
				return {
					text: 'Payment Overdue',
					icon: AlertTriangle,
					colorClasses: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
				};
			case 'Due':
				return {
					text: 'Payment Due',
					icon: Clock,
					colorClasses: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
				};
			default: // Handle status lain jika ada
				return {
					text: `Status: ${inv.status}`,
					icon: Info,
					colorClasses: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
				};
		}
	}

	const statusBadge = getStatusBadge(invoice);

	// --- Timeline Logic ---
	function getTimelineIconColor(isCompleted: boolean): string {
		return isCompleted
			? 'bg-green-500 ring-green-100 dark:bg-green-400 dark:ring-green-900'
			: 'bg-gray-300 ring-gray-100 dark:bg-neutral-600 dark:ring-neutral-700';
	}

	function getTimelineTextColor(isCompleted: boolean): string {
		return isCompleted
			? 'text-green-600 dark:text-green-300'
			: 'text-gray-500 dark:text-neutral-400';
	}
</script>

<div
	class="space-y-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-neutral-700 dark:bg-neutral-800"
>
	<!-- Alert/Status Badge -->
	<div class="flex items-center gap-3 rounded-lg p-3 {statusBadge.colorClasses}">
		<statusBadge.icon class="h-5 w-5 flex-shrink-0" />
		<span class="text-sm font-medium">{statusBadge.text}</span>
	</div>

	<!-- Total Amount -->
	<h3 class="text-center text-3xl font-bold text-gray-900 dark:text-white">
		{invoice.totalAmount.toLocaleString(undefined, {
			style: 'currency',
			currency: invoice.currency
		})}
	</h3>

	<!-- Details List -->
	<h2
		class="border-b border-gray-200 pb-2 text-base font-semibold text-gray-600 dark:border-neutral-600 dark:text-neutral-300"
	>
		Details
	</h2>
	<ul class="space-y-3 text-sm text-gray-700 dark:text-neutral-300">
		<li class="flex items-center gap-2.5">
			<User class="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-neutral-400" />
			<span class="font-medium text-gray-500 dark:text-neutral-400">Created by:</span>
			{invoice.creatorName ?? 'N/A'}
		</li>
		<li class="flex items-center gap-2.5">
			<Calendar class="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-neutral-400" />
			<span class="font-medium text-gray-500 dark:text-neutral-400">Due date:</span>
			{format(invoice.dueDate, 'MMMM dd, yyyy')}
		</li>
		{#if invoice.paymentMethod}
			<li class="flex items-center gap-2.5">
				<CreditCard class="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-neutral-400" />
				Pay by {invoice.paymentMethod}
			</li>
		{/if}
		<li class="flex items-center gap-2.5">
			<DollarSign class="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-neutral-400" />
			<span class="font-medium text-gray-500 dark:text-neutral-400">Currency:</span>
			{invoice.currency}
			<!-- Bisa dibuat lebih deskriptif, e.g., 'American Dollar' -->
		</li>
	</ul>

	<!-- Timeline (jika ada data) -->
	{#if invoice.timeline && invoice.timeline.length > 0}
		<h2
			class="border-b border-gray-200 pt-4 pb-2 text-base font-semibold text-gray-600 dark:border-neutral-600 dark:text-neutral-300"
		>
			History
		</h2>
		<ol class="relative border-s border-gray-200 dark:border-neutral-600">
			{#each invoice.timeline as event (event.id)}
				<li class="ms-6 mb-6 last:mb-0">
					<span
						class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white {getTimelineIconColor(
							event.isCompleted
						)}"
					>
						<CheckCircle class="h-2.5 w-2.5 text-white {event.isCompleted ? '' : 'hidden'}" />
						<Clock class="h-2.5 w-2.5 text-white {event.isCompleted ? 'hidden' : ''}" />
						<!-- Contoh ikon untuk belum selesai -->
					</span>
					<div class="ml-1">
						<h4 class="flex items-center text-sm font-medium text-gray-800 dark:text-neutral-100">
							{event.description}
						</h4>
						<time
							class="block text-xs leading-none font-normal text-gray-400 dark:text-neutral-500"
						>
							{format(event.dateTime, 'MMMM dd, yyyy HH:mm')}
						</time>
					</div>
				</li>
			{/each}
		</ol>
	{/if}

	<!-- Opsional: Bagian upgrade/iklan dari HTML asli bisa ditambahkan di sini jika relevan -->
</div>
