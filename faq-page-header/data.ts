// src/lib/data.ts

import { Mail, Phone, MapPin } from '@lucide/svelte';

// --- FAQ Categories ---
export interface FaqCategory {
	label: string;
	image: string;
}

export const faqCategoriesData: FaqCategory[] = [
	{
		label: 'Customer Support',
		image:
			'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
	},
	{
		label: 'User Guides',
		image:
			'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
	},
	{
		label: 'Sales Questions',
		image:
			'https://images.unsplash.com/photo-1543286386-713bdd548da4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
	}
	// Add more categories if needed
];

// --- Contact Icons ---
export interface ContactIconInfo {
	id: string;
	title: string;
	description: string;
	icon: typeof Mail; // Use typeof for @lucide/svelte icon components
	href?: string; // Optional link
}

export const contactIconsData: ContactIconInfo[] = [
	{
		id: 'email',
		title: 'Email',
		description: 'support@example.com',
		icon: Mail,
		href: 'mailto:support@example.com'
	},
	{
		id: 'phone',
		title: 'Phone',
		description: '+1 (555) 123-4567',
		icon: Phone,
		href: 'tel:+15551234567'
	},
	{
		id: 'address',
		title: 'Address',
		description: '123 Innovation Drive, Tech City',
		icon: MapPin
	}
	// Add more contact methods if needed
];
