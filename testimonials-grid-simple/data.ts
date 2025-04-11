// src/lib/data.ts

export interface TestimonialData {
	id: string; // Unique ID for keys
	quote: string;
	authorName: string;
	authorTitle: string;
	companyName?: string; // Optional
	companyLogoUrl?: string; // URL to company logo (light mode)
	companyLogoUrlDark?: string; // Optional URL for dark mode logo
	avatarUrl?: string; // Optional URL to author's avatar
	isFeatured?: boolean; // Flag for the third, potentially different card
}

export const testimonialsData: TestimonialData[] = [
	{
		id: 'testimonial-1',
		quote:
			"The platform's intuitive design drastically reduced our onboarding time. Support was incredibly responsive and helpful throughout the process.",
		authorName: 'Sarah Chen',
		authorTitle: 'Project Manager @ TechCorp',
		// companyName: 'TechCorp', // Optional if logo is clear
		companyLogoUrl: '/images/logo/logo-1.svg', // Replace with your paths
		avatarUrl: 'https://avatar.iran.liara.run/public/24', // Replace with your paths
		isFeatured: false
	},
	{
		id: 'testimonial-2',
		quote:
			'A game-changer for our team collaboration. Features like real-time editing and task tracking have boosted our productivity immensely.',
		authorName: 'David Lee',
		authorTitle: 'Lead Developer @ Innovate Solutions',
		// companyName: 'Innovate Solutions',
		companyLogoUrl: '/images/logo/logo-2.svg',
		avatarUrl: 'https://avatar.iran.liara.run/public/22',
		isFeatured: false
	},
	{
		id: 'testimonial-3',
		quote:
			"We were looking for a scalable and secure solution, and this platform delivered beyond expectations. It's now integral to our daily operations.",
		authorName: 'Maria Garcia',
		authorTitle: 'Operations Director @ GlobalEnterprises',
		// companyName: 'GlobalEnterprises',
		companyLogoUrl: '/images/logo/logo-4.svg',
		avatarUrl: 'https://avatar.iran.liara.run/public/33',
		isFeatured: true // Mark this as the featured one
	}
	// Add more testimonials if needed
];
