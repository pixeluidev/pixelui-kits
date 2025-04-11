// src/lib/data.ts
import type { ComponentType } from 'svelte';
import type { SvelteComponent } from 'svelte';
import type { Icon } from 'lucide-svelte';

// --- Ikon ---
import Building2 from 'lucide-svelte/icons/building-2'; // Untuk Perusahaan
import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Verified/Premium
import Globe from 'lucide-svelte/icons/globe'; // Publik ikon
import Ellipsis from 'lucide-svelte/icons/ellipsis'; // More
import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
import MessageSquare from 'lucide-svelte/icons/message-square';
import Repeat from 'lucide-svelte/icons/repeat'; // Repost
import Send from 'lucide-svelte/icons/send';
import UserPlus from 'lucide-svelte/icons/user-plus'; // Follow
import Link from 'lucide-svelte/icons/link'; // Untuk tautan di teks

// --- Tipe Data ---
export interface LinkedinPostData {
	id: string;
	authorType: 'user' | 'company';
	authorName: string;
	authorHeadline: string; // Jabatan atau Pengikut/Industri
	avatarUrl: string; // URL Avatar atau Logo Perusahaan
	isPremium?: boolean; // Tanda Premium/Verified (opsional)
	timestamp: string; // e.g., "1d • Edited", "5h"
	isEdited?: boolean;
	privacy: 'public' | 'connections'; // Siapa yang bisa melihat
	contentText: string;
	tags?: string[]; // Hashtag
	linkPreview?: {
		// Pratinjau tautan opsional
		url: string;
		title: string;
		domain: string;
		imageUrl?: string;
	};
	mediaUrl?: string; // URL Gambar/Video utama
	mediaType?: 'image' | 'video' | 'document';
	likeCount: number;
	commentCount: number;
	repostCount: number;
	isLiked?: boolean; // Untuk interaksi UI
}

// --- Contoh Data ---
export const exampleLinkedinPost: LinkedinPostData = {
	id: 'li-post-1',
	authorType: 'company',
	authorName: 'Svelte Society',
	authorHeadline: '150,321 followers', // Example for company
	avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', // Ganti path
	isPremium: true,
	timestamp: '3h •', // Tambahkan titik jika tidak diedit
	isEdited: false,
	privacy: 'public',
	contentText: `🚀 Big news from the Svelte ecosystem! We're released  responsive components and blocks designed and built for Tailwind and Svelte community. All components are free forever for everyone.`,
	// tags: ['Svelte', 'SvelteKit', 'JavaScript', 'WebDev', 'Performance', 'DX'], // Hashtag bisa diparsing dari text
	linkPreview: {
		url: 'https://pixelui.dev/',
		title: 'Pixel UI Beautiful, responsive components  Svelte ',
		domain: 'pixelui.dev',
		imageUrl: 'https://pixelui.dev/og-image.png' // Ganti dengan gambar relevan
	},
	// mediaUrl: '...', // Bisa juga ada media lain
	likeCount: 2458,
	commentCount: 192,
	repostCount: 315,
	isLiked: false
};

export const exampleUserLinkedinPost: LinkedinPostData = {
	id: 'li-post-2',
	authorType: 'user',
	authorName: 'Alex Rivera',
	authorHeadline: 'Lead Frontend Engineer | Building with Svelte & TS', // Example for user
	avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
	isPremium: false,
	timestamp: '1d • Edited',
	isEdited: true,
	privacy: 'public',
	contentText: `Just pushed a major refactor using SvelteKit's new features. The developer experience keeps getting better! Less boilerplate, more focus on logic. Highly recommend checking out the latest updates if you haven't already.\n\nSharing the repo soon! #SvelteKit #TypeScript #DeveloperExperience`,
	likeCount: 98,
	commentCount: 15,
	repostCount: 7,
	isLiked: true // Contoh sudah di-like
};
