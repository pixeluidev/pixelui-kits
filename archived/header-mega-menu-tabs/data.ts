// src/lib/data.ts
import { BarChart, Briefcase, Info, LifeBuoy, Settings, ShoppingCart, Users } from '@lucide/svelte';
import { SvelteComponent } from 'svelte';

export interface MegaMenuTabContent {
	type: 'text' | 'component' | 'links'; // Type of content
	value: string | typeof SvelteComponent | MegaMenuLink[]; // Content value
	title?: string; // Optional title for link lists
	icon?: typeof Settings; // Optional icon for link lists
}

export interface MegaMenuLink {
	href: string;
	label: string;
	description?: string;
}

export interface MegaMenuTab {
	id: string; // Unique ID for the tab
	label: string; // Text displayed on the tab button
	icon?: typeof Settings; // Optional icon for the tab
	content: MegaMenuTabContent[]; // Array of content blocks for the panel
}

// Example Data
export const megaMenuTabsData: MegaMenuTab[] = [
	{
		id: 'overview',
		label: 'Overview',
		icon: Info,
		content: [
			{
				type: 'text',
				value:
					'Get a quick glance at our main offerings and company values. Explore how we can help you achieve your goals.'
			},
			{
				type: 'links',
				title: 'Key Sections',
				icon: Settings,
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
		icon: Settings,
		content: [
			{
				type: 'text',
				value:
					'Discover the powerful features designed to streamline your workflow and boost productivity.'
			},
			{
				type: 'links',
				title: 'Feature Categories',
				icon: Briefcase,
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
		icon: Users,
		content: [
			{
				type: 'text',
				value:
					'Tailored solutions for different industries and team sizes. Find the perfect fit for your specific requirements.'
			},
			{
				type: 'links',
				title: 'By Industry',
				icon: BarChart,
				value: [
					{ href: '#', label: 'E-commerce' },
					{ href: '#', label: 'Healthcare' },
					{ href: '#', label: 'Fintech' }
				]
			},
			{
				type: 'links',
				title: 'By Team Size',
				icon: Users,
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
		icon: LifeBuoy,
		content: [
			{
				type: 'text',
				value:
					'Access comprehensive support resources, including documentation, tutorials, and direct contact options.'
			},
			{
				type: 'links',
				title: 'Get Help',
				icon: ShoppingCart,
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
		icon: ShoppingCart,
		content: [
			{
				type: 'text',
				value:
					"Simple, transparent pricing plans to match your budget and needs. Choose the plan that's right for you."
			},
			{
				type: 'links',
				title: 'Plans',
				icon: Briefcase,
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
