// src/lib/components/testimonial-marquee/types.ts
export interface TestimonialData {
	id: string;
	authorName: string;
	authorHandle: string; // e.g., @pixeluidev
	avatarUrl: string;
	tweetText: string;
	tweetUrl: string; // Link ke tweet asli
	sourceName?: string; // Opsional: Nama sumber (jika bukan langsung dari Twitter user)
	sourceLogoUrl?: string; // Opsional: Logo sumber
}
