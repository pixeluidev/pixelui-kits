// --- Ikon ---

import { Globe, Users, Lock } from '@lucide/svelte';
// --- Tipe Data Postingan Facebook ---
export interface FacebookPostData {
	id: string;
	authorName: string;
	authorAvatarUrl: string;
	timestamp: string; // e.g., "1 hr", "Yesterday at 10:30 PM", "March 25"
	privacy: 'public' | 'friends' | 'only_me';
	contentText: string;
	mediaUrl?: string;
	mediaType?: 'image' | 'video';
	// Info reaksi disederhanakan
	reactionCount: number; // Total reaksi (likes, loves, etc.)
	commentCount: number;
	shareCount: number;
	isEdited?: boolean;
	isLiked?: boolean; // Status like pengguna saat ini
	linkPreview?: {
		url: string;
		title: string;
		domain: string;
		description?: string;
		imageUrl?: string;
	};
}

// --- Contoh Data ---
export const exampleFacebookPost: FacebookPostData = {
	id: 'fb-post-1',
	authorName: 'Svelte Developers Group',
	authorAvatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', // Ganti path logo svelte persegi
	timestamp: '4 hrs',
	privacy: 'public',
	contentText: `Great discussion happening in the group about state management strategies in SvelteKit! 🚀 Remember to check out the official docs for the latest on Stores and Runes.\n\nWhat's your preferred method? Let us know below! 👇 \n\n#Svelte #SvelteKit #StateManagement #WebDev`,
	mediaUrl: 'https://pixelui.dev/og-image.png', // Contoh gambar laptop/kode
	mediaType: 'image',
	reactionCount: 1256,
	commentCount: 88,
	shareCount: 45,
	isLiked: false
};

export const exampleUserFacebookPost: FacebookPostData = {
	id: 'fb-post-2',
	authorName: 'Alex Rivera',
	authorAvatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
	timestamp: 'Yesterday at 9:15 PM',
	privacy: 'friends',
	contentText: `Weekend project complete! Built a small RSS reader app with SvelteKit and Tailwind. Super smooth development process. Loving the simplicity! #Svelte #WeekendProject`,
	// No media or link preview in this example
	reactionCount: 72,
	commentCount: 9,
	shareCount: 3,
	isLiked: true
};

// --- Ikon Privasi ---
export const privacyIcons: Record<FacebookPostData['privacy'], typeof Globe> = {
	public: Globe,
	friends: Users,
	only_me: Lock
};
