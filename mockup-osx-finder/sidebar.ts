// src/lib/data.ts (Jika membuat sidebar/toolbar dinamis)
import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import Home from 'lucide-svelte/icons/home';
import HardDrive from 'lucide-svelte/icons/hard-drive';
import Download from 'lucide-svelte/icons/download';
import Clock from 'lucide-svelte/icons/clock';
import Star from 'lucide-svelte/icons/star';
import Trash2 from 'lucide-svelte/icons/trash-2';
import Cloud from 'lucide-svelte/icons/cloud';
import Tag from 'lucide-svelte/icons/tag';
// Ikon Toolbar
import List from 'lucide-svelte/icons/list';
import LayoutGrid from 'lucide-svelte/icons/layout-grid';
import Share2 from 'lucide-svelte/icons/share-2';
import Info from 'lucide-svelte/icons/info';

export interface SidebarItem {
	id: string;
	label: string;
	tagColor?: string; // Untuk tag
	icon: typeof Download;
	href?: string; // Tautan jika item bisa diklik
	isActive?: boolean; // Untuk menyorot item aktif
	isSection?: boolean; // Untuk menyorot item aktif
}

export interface ToolbarItem {
	id: string;
	label: string; // Untuk tooltip/aria-label

	icon: typeof Download;
	action?: () => void; // Fungsi yang dipanggil saat diklik
	isDisabled?: boolean;
}

// Contoh Data Sidebar
export const finderSidebarItems: SidebarItem[] = [
	{ id: 'recents', label: 'Recents', icon: Clock, isActive: false },
	{ id: 'desktop', label: 'Desktop', icon: Home, isActive: true }, // Contoh aktif
	{ id: 'documents', label: 'Documents', icon: HardDrive, isActive: false },
	{ id: 'downloads', label: 'Downloads', icon: Download, isActive: false },
	{ id: 'favorites', label: 'Favorites', icon: Star, isSection: true }, // Section header example
	{ id: 'icloud', label: 'iCloud Drive', icon: Cloud, isActive: false },
	{ id: 'important', label: 'Important', icon: Tag, tagColor: 'text-red-500', isActive: false }, // Example tag
	{ id: 'work', label: 'Work', icon: Tag, tagColor: 'text-blue-500', isActive: false }, // Example tag
	{ id: 'trash', label: 'Trash', icon: Trash2, isSection: true, isActive: false }
];

// Contoh Data Toolbar
export const finderToolbarItems: ToolbarItem[] = [
	{ id: 'view-list', label: 'List View', icon: List },
	{ id: 'view-grid', label: 'Icon View', icon: LayoutGrid },
	// Add more toolbar items like sort, share, tags, info
	{ id: 'share', label: 'Share', icon: Share2 },
	{ id: 'info', label: 'Get Info', icon: Info }
];
