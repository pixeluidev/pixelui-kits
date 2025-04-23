// Or define it here if kept separate
export interface FooterLink {
	label: string;
	href: string;
}

export interface FooterLinkGroup {
	title: string;
	links: FooterLink[];
}

export interface SocialLink {
	label: string; // For accessibility (e.g., "GitHub")
	href: string;
	icon: string; // Identifier for the icon (e.g., 'github', 'twitter')
}

export const footerLinkGroups: FooterLinkGroup[] = [
	{
		title: 'Product',
		links: [
			{ label: 'Overview', href: '/features' },
			{ label: 'Components', href: '/components' },
			{ label: 'Pricing', href: '/pricing' },
			{ label: 'Changelog', href: '/changelog' }
		]
	},
	{
		title: 'Company',
		links: [
			{ label: 'About Us', href: '/about' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Careers', href: '#' }, // Example non-page link
			{ label: 'Contact', href: '/contact' }
		]
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Documentation', href: '/docs' },
			{ label: 'Support Center', href: '/support' },
			{ label: 'Community', href: '/community' },
			{ label: 'API Reference', href: '#' }
		]
	},
	{
		title: 'Legal',
		links: [
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Cookie Policy', href: '/cookies' }
		]
	}
];

export const socialLinks: SocialLink[] = [
	{ label: 'Twitter', href: 'https://twitter.com/hadiedanker', icon: 'twitter' }, // Use a string key for icon
	{ label: 'GitHub', href: 'https://github.com/pixeluidev/pixelui-kits', icon: 'github' },
	{ label: 'Discord', href: '#', icon: 'discord' }, // Placeholder link
	{ label: 'Dribbble', href: '#', icon: 'dribbble' } // Placeholder link
];
