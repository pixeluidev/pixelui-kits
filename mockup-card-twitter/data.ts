// Contoh Tipe Data Tweet
export interface TweetData {
	id: string;
	authorName: string;
	authorHandle: string; // e.g., @sveltejs
	avatarUrl: string;
	isVerified?: boolean;
	timestamp: string; // e.g., "1h", "Mar 25", "Feb 10, 2023"
	contentText: string; // Teks tweet mentah
	mediaUrl?: string; // URL gambar/video opsional
	replyCount: number;
	retweetCount: number;
	likeCount: number;
	viewCount: string; // Bisa string seperti "10.5K", "1.2M"
}

// Contoh Data Tweet (Ganti dengan data Anda)
export const exampleTweet: TweetData = {
	id: 'tweet123',
	authorName: 'PixelUI',
	authorHandle: '@pixelui',
	avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', // Ganti path logo svelte
	isVerified: true,
	timestamp: '2h',
	contentText:
		'Blog Updates! 🎉 CSS Grid is a total game changer when it comes to layout design—but what if I told you that a single line of CSS can make your entire layout responsive  without writing a single media query? Yup, it’s that easy. https://pixelui.dev/blog/css-grid-layout-auto-responsive #CSS #WebDev',
	mediaUrl: 'https://pixelui.dev/og-image.png', // Contoh gambar background Svelte
	replyCount: 153,
	retweetCount: 875,
	likeCount: 4200,
	viewCount: '157K'
};
