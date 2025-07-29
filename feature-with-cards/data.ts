// src/lib/data.ts
import type { SvelteComponent } from 'svelte';
import type { Icon } from '@lucide/svelte';

type IconType = typeof SvelteComponent;

// Import corresponding Lucide icons
import Gauge from 'lucide-svelte/icons/gauge'; // Replaces IconGauge
import ShieldCheck from 'lucide-svelte/icons/shield-check'; // Replaces IconUser (for privacy focus)
import Puzzle from 'lucide-svelte/icons/puzzle'; // Replaces IconCookie (for 'no third parties'/integration)

export interface FeatureCardData {
	id: string; // Unique ID for keys
	icon: IconType;
	title: string;
	description: string;
}

export const featureCardsData: FeatureCardData[] = [
	{
		id: 'performance',
		icon: Gauge as IconType,
		title: 'Optimized Performance', // Reworded
		description:
			'Experience lightning-fast load times and smooth interactions, built on a highly optimized architecture.'
	},
	{
		id: 'privacy',
		icon: ShieldCheck as IconType,
		title: 'Privacy Focused',
		description:
			'Your data is yours. We prioritize privacy with robust security measures and transparent data handling policies.'
	},
	{
		id: 'integration',
		icon: Puzzle as IconType,
		title: 'Seamless Integration', // Reworded
		description:
			'Easily connect with your existing tools and workflows through flexible APIs and extensive integration options.'
	}
	// Add more features if needed
];
