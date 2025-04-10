// src/lib/data.ts
import type { SvelteComponent } from 'svelte';

// Import corresponding Lucide icons
import Gift from 'lucide-svelte/icons/gift'; // Replaces IconReceiptOff (for free/open source)
import CodeXml from 'lucide-svelte/icons/code-xml'; // Replaces IconFileCode (or use Terminal)
import MousePointerSquare from 'lucide-svelte/icons/mouse-pointer-square-dashed'; // Replaces IconCircleDotted (for focus) - more abstract
import Settings2 from 'lucide-svelte/icons/settings-2'; // Replaces IconFlame (for flexible/customize)
type IconType = typeof SvelteComponent;

export interface TitledFeatureData {
	id: string; // Unique ID for keys
	icon: IconType;
	title: string;
	description: string;
}

export const titledFeaturesData: TitledFeatureData[] = [
	{
		id: 'opensource',
		icon: Gift as IconType,
		title: 'Free & Open Source',
		description:
			'Published under the MIT license, usable in any project without restrictions. Community-driven.'
	},
	{
		id: 'typescript',
		icon: CodeXml as IconType,
		title: 'TypeScript First',
		description:
			'Build robust, type-safe applications. All components and utilities provide comprehensive type definitions.'
	},
	{
		id: 'focus',
		icon: MousePointerSquare as IconType,
		title: 'Accessible Focus',
		description:
			'Smart focus management ensures outlines appear only for keyboard navigation, enhancing accessibility.'
	},
	{
		id: 'flexible',
		icon: Settings2 as IconType,
		title: 'Highly Flexible',
		description:
			'Easily customize colors, spacing, fonts, shadows, and more via a global theme or individual overrides.'
	}
	// Add more features if needed
];
