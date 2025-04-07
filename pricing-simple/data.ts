// data.js (Versi yang Disesuaikan untuk Svelte)

export const PricingList = [
	{
		heading: 'Free',
		// headingEndContent: null, // Bisa dihapus atau gunakan flag
		badgeText: null, // Atau isPopular: false
		description: 'Basic features for individuals.',
		pricing: 0,
		QuarterlyPricing: 0,
		list: ['Feature A', 'Feature B'],
		// Button: <Button variant="bordered">Current Plan</Button>,
		buttonText: 'Current Plan',
		buttonVariant: 'bordered' // 'bordered' atau 'solid'/'primary'
	},
	{
		heading: 'Pro',
		// headingEndContent: <Chip size="sm" color="primary">Popular</Chip>,
		badgeText: 'Popular', // Atau isPopular: true
		description: 'Advanced features for professionals.',
		pricing: 99,
		QuarterlyPricing: 30,
		list: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
		// Button: <Button color="primary">Upgrade Now</Button>,
		buttonText: 'Upgrade Now',
		buttonVariant: 'primary'
	},
	{
		heading: 'Team',
		// headingEndContent: <Chip size="sm" color="primary">Popular</Chip>,
		badgeText: null, // Atau isPopular: true
		description: 'For large teams that have more than 10 members.',
		pricing: 360,
		QuarterlyPricing: 30,
		list: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
		// Button: <Button color="primary">Upgrade Now</Button>,
		buttonText: 'Contact Us',
		buttonVariant: 'bordered'
	}
	// ... other plans
];

// Opsi Tab juga disederhanakan (JSX dihilangkan)
export const PricingTabsOptions = [
	{
		title: 'yearly',
		label: 'Yearly', // Teks yang ditampilkan
		chipText: 'Save 25%', // Teks untuk chip
		TabItemclassName: 'pe-1' // Kelas ini mungkin tidak relevan lagi
	},
	{
		title: 'quarterly',
		label: 'Quarterly', // Teks yang ditampilkan
		chipText: null,
		TabItemclassName: null
	}
];
