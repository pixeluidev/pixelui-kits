// src/lib/data.ts (atau di dalam script jika lebih sederhana)

import { FileText, Search, Settings, CheckCircle2, Send } from '@lucide/svelte';

// Import ikon contoh

export interface FlowchartStep {
	id: string;
	label: string;
	description?: string; // Deskripsi singkat opsional
	icon?: typeof FileText;
	status: 'complete' | 'current' | 'pending' | 'error'; // Status langkah
}

// Contoh Data Flowchart
export const exampleFlowchartSteps: FlowchartStep[] = [
	{
		id: 'step1',
		label: 'Submit Request',
		description: 'User submits the initial request form.',
		icon: FileText,
		status: 'complete'
	},
	{
		id: 'step2',
		label: 'Initial Review',
		description: 'Team reviews the submitted request details.',
		icon: Search,
		status: 'complete'
	},
	{
		id: 'step3',
		label: 'Processing',
		description: 'Request is being processed based on requirements.',
		icon: Settings,
		status: 'current' // Langkah saat ini
	},
	{
		id: 'step4',
		label: 'Approval',
		description: 'Final approval from management needed.',
		icon: CheckCircle2,
		status: 'pending'
	},
	{
		id: 'step5',
		label: 'Deployment',
		description: 'Changes are deployed to production.',
		icon: Send,
		status: 'pending'
	}
	// Contoh langkah error (jika diperlukan)
	// {
	//     id: 'stepError',
	//     label: 'Verification Failed',
	//     icon: AlertTriangle,
	//     status: 'error',
	// },
];
