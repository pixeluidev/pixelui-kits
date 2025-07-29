// src/lib/data.ts

import { Truck, Award, CircleDollarSign } from '@lucide/svelte';

export interface FeatureItemData {
	id: string; // Use a unique ID for keys
	icon?: typeof CircleDollarSign;
	title: string;
	description: string;
}

export const featuresData: FeatureItemData[] = [
	{
		id: 'shipping',
		icon: Truck,
		title: 'Global Shipping', // Changed title slightly
		description:
			'Reliable and efficient shipping options available worldwide, ensuring your products arrive safely and on time.'
	},
	{
		id: 'quality',
		icon: Award,
		title: 'Premium Quality Product', // Changed title slightly
		description:
			'Crafted with the finest materials and attention to detail, delivering an exceptional and long-lasting experience.'
	},
	{
		id: 'pricing',
		icon: CircleDollarSign,
		title: 'Competitive Pricing', // Changed title slightly
		description:
			'Get the best value for your investment with our fair and transparent pricing structure, suitable for all budgets.'
	}
	// Add more features if needed
];
