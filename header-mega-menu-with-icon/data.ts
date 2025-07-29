// src/lib/data.ts
import type { ComponentType } from 'svelte';
import type { Icon } from '@lucide/svelte';

// Import desired Lucide icons
import Info from 'lucide-svelte/icons/info';
import Library from 'lucide-svelte/icons/library';
import Archive from 'lucide-svelte/icons/archive';
import Award from 'lucide-svelte/icons/award';
import FileText from 'lucide-svelte/icons/file-text';
import Mailbox from 'lucide-svelte/icons/mailbox';
import Puzzle from 'lucide-svelte/icons/puzzle';
import List from 'lucide-svelte/icons/list';
import Phone from 'lucide-svelte/icons/phone';
import HelpCircle from 'lucide-svelte/icons/help-circle';
import BookOpen from 'lucide-svelte/icons/book-open';
import FileCheck from 'lucide-svelte/icons/file-check-2';

// Interface for a single link in the mega menu
export interface MegaMenuIconLink {
	id: string; // Unique identifier for {#each} key
	label: string;
	href: string;
	icon: ComponentType<Icon>; // Lucide icon component
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
