// src/lib/data.ts

export interface BackgroundTestimonialData {
	id: string; // Unique ID
	quote: string;
	authorName: string;
	authorTitle: string;
	companyName: string;
	companyLogoUrl: string; // URL logo (putih/transparan direkomendasikan)
	// Tambahkan URL logo gelap jika diperlukan untuk tema terang
	companyLogoUrlLight?: string;
}

export const backgroundTestimonialsData: BackgroundTestimonialData[] = [
	{
		id: 'bt1',
		quote:
			"The platform's intuitive design drastically reduced our onboarding time. Support was incredibly responsive and helpful throughout the process.",
		authorName: 'Anya Petrova',
		authorTitle: 'Product Lead @ Innovatech',
		companyName: 'Innovatech Solutions',
		companyLogoUrl: '/logos/innovatech-logo-white.svg' // Ganti dengan path Anda
	},
	{
		id: 'bt2',
		quote:
			'A game-changer for our team collaboration. Features like real-time editing and task tracking have boosted our productivity immensely.',
		authorName: 'Ben Carter',
		authorTitle: 'Operations Manager @ Summit Global',
		companyName: 'Summit Global',
		companyLogoUrl: '/logos/summit-global-logo-white.svg' // Ganti dengan path Anda
	},
	{
		id: 'bt3',
		quote:
			"We were looking for a scalable and secure solution, and this platform delivered beyond expectations. It's now integral to our daily operations.",
		authorName: 'Chloe Dubois',
		authorTitle: 'Marketing Director @ Horizon Digital',
		companyName: 'Horizon Digital',
		companyLogoUrl: '/logos/horizon-digital-logo-white.svg' // Ganti dengan path Anda
	},
	{
		id: 'bt4',
		quote:
			'Onboarding new developers onto the project has been significantly easier thanks to the consistent coding patterns and excellent documentation.',
		authorName: 'Kenji Tanaka',
		authorTitle: 'Senior Engineer @ Nexus Systems',
		companyName: 'Nexus Systems',
		companyLogoUrl: '/logos/nexus-systems-logo-white.svg' // Ganti dengan path Anda
	}
	// Tambahkan lebih banyak testimonial
];
