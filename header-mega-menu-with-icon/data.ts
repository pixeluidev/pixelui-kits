// src/lib/data.ts

import {
	Archive,
	Award,
	BookOpen,
	FileCheck,
	FileText,
	HelpCircle,
	Info,
	Library,
	List,
	Mailbox,
	Phone,
	Puzzle
} from '@lucide/svelte';

// Import desired Lucide icons

// Interface for a single link in the mega menu
export interface MegaMenuIconLink {
	id: string; // Unique identifier for {#each} key
	label: string;
	href: string;
	icon: typeof Info; // Lucide icon component
	srText?: string; // Optional screen reader text if label isn't descriptive enough
}

// Data for the mega menu dropdown (can be structured by column if needed)
export const megaMenuIconLinksData: MegaMenuIconLink[] = [
	// Column 1 (Example)
	{ id: 'about', label: 'About Us', href: '#', icon: Info },
	{ id: 'library', label: 'Library', href: '#', icon: Library },
	{ id: 'resources', label: 'Resources', href: '#', icon: Archive },
	{ id: 'pro', label: 'Pro Version', href: '#', icon: Award },
	// Column 2 (Example)
	{ id: 'blog', label: 'Blog', href: '#', icon: FileText },
	{ id: 'newsletter', label: 'Newsletter', href: '#', icon: Mailbox },
	{ id: 'playground', label: 'Playground', href: '#', icon: Puzzle },
	{ id: 'license', label: 'License', href: '#', icon: List },
	// Column 3 (Example)
	{ id: 'contact', label: 'Contact Us', href: '#', icon: Phone },
	{ id: 'support', label: 'Support Center', href: '#', icon: HelpCircle },
	{ id: 'guides', label: 'Guides', href: '#', icon: BookOpen },
	{ id: 'terms', label: 'Terms', href: '#', icon: FileCheck }
];
