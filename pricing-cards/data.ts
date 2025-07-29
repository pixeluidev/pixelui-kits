import { Check, BarChart, PhoneCall, Cloud, Users, MessageCircle } from '@lucide/svelte';
export interface PricingFeature {
	text: string; // Allows simple text
	highlight?: string; // Optional highlighted text part
	icon: typeof MessageCircle;
}

export interface PricingPlan {
	id: string;
	name: string;
	price: number;
	priceSuffix: string;
	isRecommended: boolean;
	features: PricingFeature[];
	ctaText: string;
}

export const pricingPlansData: PricingPlan[] = [
	{
		id: 'basic',
		name: 'Essential',
		price: 10,
		priceSuffix: '/ user',
		isRecommended: false,
		features: [
			{ text: 'Get started with messaging', icon: MessageCircle },
			{ text: 'Flexible team meetings', icon: Users },
			{ text: 'cloud storage', highlight: '5 TB', icon: Cloud }
		],
		ctaText: 'Choose Essential'
	},
	{
		id: 'startup',
		name: 'Growth',
		price: 24,
		priceSuffix: '/ user',
		isRecommended: true,
		features: [
			{ text: 'All features in Essential', icon: Check },
			{ text: 'Flexible call scheduling', icon: PhoneCall },
			{ text: 'cloud storage', highlight: '15 TB', icon: Cloud }
		],
		ctaText: 'Choose Growth'
	},
	{
		id: 'enterprise',
		name: 'Scale',
		price: 35,
		priceSuffix: '/ user',
		isRecommended: false,
		features: [
			{ text: 'All features in Growth', icon: Check },
			{ text: 'Growth oriented features', icon: BarChart },
			{ text: 'cloud storage', highlight: 'Unlimited', icon: Cloud }
		],
		ctaText: 'Choose Scale'
	}
];
