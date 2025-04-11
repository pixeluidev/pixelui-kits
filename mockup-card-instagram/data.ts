// src/lib/data.ts (atau langsung di script)

export interface InstagramPostData {
	id: string;
	authorUsername: string;
	authorAvatarUrl: string;
	location?: string; // Lokasi opsional
	mediaUrl: string; // URL Gambar/Video utama
	mediaType: 'image' | 'video';
	isLiked?: boolean; // Status like awal (untuk UI interaktif)
	likeCount: number;
	caption: string; // Teks caption (bisa mengandung hashtag/mention)
	commentCount: number;
	timestamp: string; // Waktu posting (e.g., "1 HOUR AGO", "MARCH 25")
	// Contoh komentar sederhana
	commentsPreview?: { username: string; text: string }[];
	isVerified?: boolean;
}

// Contoh Data Postingan
export const exampleInstaPost: InstagramPostData = {
	id: 'insta123',
	isVerified: true,
	authorUsername: 'sveltejs.updates',
	authorAvatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', // Ganti path logo svelte
	location: 'Zurich, Switzerland',
	mediaUrl: '/images/ss-component.png', // Contoh gambar kode
	mediaType: 'image',
	isLiked: false,
	likeCount: 10532,
	caption:
		'Diving deep into the new Svelte 5 Runes! ✨ The reactivity model feels incredibly intuitive. What are your favorite new features? #Svelte #SvelteKit #WebDev #JavaScript #Frontend',
	commentCount: 184,
	timestamp: '2 HOURS AGO',
	commentsPreview: [
		{ username: 'reactDev_', text: 'Looks interesting! 🤔' },
		{ username: 'vueFan', text: 'Wow, need to try this out!' }
	]
};
