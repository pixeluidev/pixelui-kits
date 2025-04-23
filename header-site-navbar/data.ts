// src/lib/components/site-navbar/types.ts
export interface NavLink {
	label: string;
	href: string;
	// Add other properties if needed, e.g., isExternal, subLinks
}

export const mainNavLinks: NavLink[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Components', href: '/components' },
	{ label: 'Pricing', href: '/pricing' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Docs', href: '/docs' }
];
