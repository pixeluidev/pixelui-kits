// src/lib/data.ts
import { CodeXml, Gift, MousePointer, Settings2 } from '@lucide/svelte';

// Import corresponding Lucide icons

type IconType = typeof Gift;

export interface TitledFeatureData {
	id: string; // Unique ID for keys
	icon: IconType;
	title: string;
	description: string;
}

export const titledFeaturesData: TitledFeatureData[] = [
	{
		id: 'opensource',
		icon: Gift,
		title: 'Free & Open Source',
		description:
			'Published under the MIT license, usable in any project without restrictions. Community-driven.'
	},
	{
		id: 'typescript',
		icon: CodeXml,
		title: 'TypeScript First',
		description:
			'Build robust, type-safe applications. All components and utilities provide comprehensive type definitions.'
	},
	{
		id: 'focus',
		icon: MousePointer,
		title: 'Accessible Focus',
		description:
			'Smart focus management ensures outlines appear only for keyboard navigation, enhancing accessibility.'
	},
	{
		id: 'flexible',
		icon: Settings2,
		title: 'Highly Flexible',
		description:
			'Easily customize colors, spacing, fonts, shadows, and more via a global theme or individual overrides.'
	}
	// Add more features if needed
];
