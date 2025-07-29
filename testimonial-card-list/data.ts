// src/lib/data.ts
// Import required icons
import { Twitter } from '@lucide/svelte'; // Source icon

export interface TestimonialListItemData {
	id: string;
	authorName: string;
	authorHandle: string; // e.g., @jessicadevis
	avatarUrl: string;
	isVerified: boolean;
	quote: string;
	sourceName: string; // e.g., "Twitter"
	sourceLogoUrl?: string; // Use if specific logo needed (like original HTML)
	sourceIcon?: typeof Twitter; // Use Lucide icon if preferred
	date: string; // e.g., "Jan 17, 2024"
	sourceUrl?: string; // Optional link to the source post
}

export const testimonialListData: TestimonialListItemData[] = [
	{
		id: 't1-lego',
		authorName: 'Alex Rivera',
		authorHandle: '@alex_innovates',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', // Lego ID 1
		isVerified: true,
		quote:
			'Switching to this framework significantly sped up our development cycle. The component structure is logical and the documentation is top-notch.',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 05, 2024',
		sourceUrl: '#'
	},
	{
		id: 't2-lego',
		authorName: 'Samantha Bee',
		authorHandle: '@sam_b_design', // Handle can be optional

		avatarUrl: 'https://randomuser.me/api/portraits/lego/7.jpg', // Lego ID 7
		isVerified: false,
		quote:
			'As a designer, I appreciate the aesthetic consistency and the ease with which I can translate mockups into functional components. Looks great out of the box!',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 08, 2024',
		sourceUrl: '#'
	},
	{
		id: 't3-lego',
		authorName: 'Kenji Tanaka',
		authorHandle: '@ktanaka_dev',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/5.jpg', // Lego ID 5
		isVerified: true,
		quote:
			'Even though I primarily work on the backend, integrating the API was straightforward. The clear structure makes collaboration much easier.',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 11, 2024'
		// sourceUrl: '#' // URL can be optional
	},
	{
		id: 't4-lego',
		authorName: 'Priya Sharma',
		authorHandle: '@priya_codes',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/2.jpg', // Lego ID 2
		isVerified: true,
		quote:
			'The performance is impressive! Our app feels much snappier, and the bundle size remained manageable despite the rich feature set.',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 14, 2024',
		sourceUrl: '#'
	},
	{
		id: 't5-lego',
		authorName: 'Carlos Rossi',
		authorHandle: '@carlos_rossi',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/3.jpg', // Lego ID 3
		isVerified: false,
		quote:
			'This tool helped us iterate faster and get our MVP to market ahead of schedule. The flexibility allowed us to adapt as requirements evolved.',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 18, 2024',
		sourceUrl: '#'
	},
	{
		id: 't6-lego',
		authorName: 'Fatima Khan',
		authorHandle: '@fatima_techlead',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/0.jpg', // Lego ID 0
		isVerified: true,
		quote:
			'Onboarding new developers onto the project has been significantly easier thanks to the consistent coding patterns and excellent documentation.',
		sourceName: 'Twitter',
		sourceIcon: Twitter,
		date: 'Mar 21, 2024',
		sourceUrl: '#'
	}
];
