// src/lib/data.ts
import { SvelteComponent } from 'svelte';
import type { Icon } from '@lucide/svelte';
import Info from 'lucide-svelte/icons/info';
import Settings from 'lucide-svelte/icons/settings';
import Users from 'lucide-svelte/icons/users';
import LifeBuoy from 'lucide-svelte/icons/life-buoy';
import Briefcase from 'lucide-svelte/icons/briefcase';
import BarChart from 'lucide-svelte/icons/bar-chart-2';
import ShoppingCart from 'lucide-svelte/icons/shopping-cart';

export interface MegaMenuTabContent {
	type: 'text' | 'component' | 'links'; // Type of content
	value: string | typeof SvelteComponent | MegaMenuLink[]; // Content value
	title?: string; // Optional title for link lists
	icon?: typeof SvelteComponent<Icon>; // Optional icon for link lists
}

export interface MegaMenuLink {
	href: string;
	label: string;
	description?: string;
}

export interface MegaMenuTab {
	id: string; // Unique ID for the tab
	label: string; // Text displayed on the tab button
	icon?: typeof SvelteComponent<Icon>; // Optional icon for the tab
	content: MegaMenuTabContent[]; // Array of content blocks for the panel
}

// Example Data
export const megaMenuTabsData: MegaMenuTab[] = [
	{
		id: 'overview',
		label: 'Overview',
		icon: Info as typeof SvelteComponent<Icon>,
		content: [
			{
				type: 'text',
				value:
					'Get a quick glance at our main offerings and company values. Explore how we can help you achieve your goals.'
			},
			{
				type: 'links',
				title: 'Key Sections',
				icon: Settings as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'Core Features' },
					{ href: '#', label: 'Pricing Plans' },
					{ href: '#', label: 'About Us' }
				]
			}
		]
	},
	{
		id: 'features',
		label: 'Features',
		icon: Settings as typeof SvelteComponent<Icon>,
		content: [
			{
				type: 'text',
				value:
					'Discover the powerful features designed to streamline your workflow and boost productivity.'
			},
			{
				type: 'links',
				title: 'Feature Categories',
				icon: Briefcase as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'Automation Tools', description: 'Save time on repetitive tasks.' },
					{ href: '#', label: 'Collaboration Suite', description: 'Work better together.' },
					{ href: '#', label: 'Analytics Dashboard', description: 'Gain actionable insights.' },
					{
						href: '#',
						label: 'Customization Options',
						description: 'Tailor the platform to your needs.'
					}
				]
			}
		]
	},
	{
		id: 'solutions',
		label: 'Solutions',
		icon: Users as typeof SvelteComponent<Icon>,
		content: [
			{
				type: 'text',
				value:
					'Tailored solutions for different industries and team sizes. Find the perfect fit for your specific requirements.'
			},
			{
				type: 'links',
				title: 'By Industry',
				icon: BarChart as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'E-commerce' },
					{ href: '#', label: 'Healthcare' },
					{ href: '#', label: 'Fintech' }
				]
			},
			{
				type: 'links',
				title: 'By Team Size',
				icon: Users as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'Startups' },
					{ href: '#', label: 'SMBs' },
					{ href: '#', label: 'Enterprise' }
				]
			}
		]
	},
	{
		id: 'support',
		label: 'Support',
		icon: LifeBuoy as typeof SvelteComponent<Icon>,
		content: [
			{
				type: 'text',
				value:
					'Access comprehensive support resources, including documentation, tutorials, and direct contact options.'
			},
			{
				type: 'links',
				title: 'Get Help',
				icon: ShoppingCart as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'Knowledge Base' },
					{ href: '#', label: 'Community Forum' },
					{ href: '#', label: 'Contact Support' }
				]
			}
		]
	},
	{
		id: 'pricing',
		label: 'Pricing',
		icon: ShoppingCart as typeof SvelteComponent<Icon>,
		content: [
			{
				type: 'text',
				value:
					"Simple, transparent pricing plans to match your budget and needs. Choose the plan that's right for you."
			},
			{
				type: 'links',
				title: 'Plans',
				icon: Briefcase as typeof SvelteComponent<Icon>,
				value: [
					{ href: '#', label: 'Free Tier' },
					{ href: '#', label: 'Pro Plan' },
					{ href: '#', label: 'Enterprise Custom' }
				]
			}
		]
	}
	// Add more tabs as needed
];
