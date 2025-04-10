// src/lib/data.ts
import type { SvelteComponent } from 'svelte';

// Import corresponding Lucide icons
import Truck from 'lucide-svelte/icons/truck';
import Award from 'lucide-svelte/icons/award'; // Or BadgeCheck / ShieldCheck
import CircleDollarSign from 'lucide-svelte/icons/circle-dollar-sign';

type IconType = typeof SvelteComponent;

export interface FeatureItemData {
	id: string; // Use a unique ID for keys
	icon?: IconType;
	title: string;
	description: string;
}

export const featuresData: FeatureItemData[] = [
	{
		id: 'shipping',
		icon: Truck as IconType,
		title: 'Global Shipping', // Changed title slightly
		description:
			'Reliable and efficient shipping options available worldwide, ensuring your products arrive safely and on time.'
	},
	{
		id: 'quality',
		icon: Award as IconType,
		title: 'Premium Quality Product', // Changed title slightly
		description:
			'Crafted with the finest materials and attention to detail, delivering an exceptional and long-lasting experience.'
	},
	{
		id: 'pricing',
		icon: CircleDollarSign as IconType,
		title: 'Competitive Pricing', // Changed title slightly
		description:
			'Get the best value for your investment with our fair and transparent pricing structure, suitable for all budgets.'
	}
	// Add more features if needed
];
