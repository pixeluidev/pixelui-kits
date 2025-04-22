// src/lib/components/testimonial-marquee/data.ts
import type { TestimonialData } from './types';

// Gunakan avatar dari randomuser.me/api/portraits/lego/
const legoAvatar = (id: number) => `https://randomuser.me/api/portraits/lego/${id}.jpg`;

export const sampleTestimonials: TestimonialData[] = [
	// Contoh dari HTML (dengan adaptasi)
	{
		id: 't1',
		authorName: 'Republika', // Gunakan nama media sebagai author
		authorHandle: '@republikaonline', // Contoh handle
		avatarUrl: 'https://tokpee.co/assets/dist/images/media/republika.png?1741767886', // Atau pakai logo dari HTML
		tweetText: 'Pixel UI: Tools untuk riset produk yang cocok untuk pemula.',
		tweetUrl: '#', // Ganti dengan URL artikel/sumber asli
		sourceName: 'Republika' // Bisa dihilangkan jika avatar sudah logo
	},
	{
		id: 't2',
		authorName: 'Disway',
		authorHandle: '@diswaydotid',
		avatarUrl: 'https://tokpee.co/assets/dist/images/media/disway.jpeg?1741767884',
		tweetText: 'Fiturnya lengkap, tampilannya sederhana, mudah digunakan oleh siapa saja.',
		tweetUrl: '#',
		sourceName: 'Disway'
	},
	{
		id: 't3',
		authorName: 'Suara Karya',
		authorHandle: '@suarakarya',
		avatarUrl: 'https://tokpee.co/assets/dist/images/media/suarakarya.webp?1741767887',
		tweetText: 'Komponen Pixel UI membantu mengoptimalkan tampilan dan penjualan online.',
		tweetUrl: '#'
	},
	// Contoh Twitter-style baru
	{
		id: 't4',
		authorName: 'Svelte Dev',
		authorHandle: '@sveltefan',
		avatarUrl: legoAvatar(5),
		tweetText: 'Baru mencoba Pixel UI untuk proyek SvelteKit saya, komponennya sangat mudah digunakan dan terlihat bagus dengan Tailwind! Hemat banyak waktu. Recommended! 👍 #svelte #tailwindcss #webdev',
		tweetUrl: '#' // Link ke tweet asli
	},
	{
		id: 't5',
		authorName: 'UI Designer Pro',
		authorHandle: '@designerpro',
		avatarUrl: legoAvatar(2),
		tweetText: 'Suka dengan konsistensi desain dan fleksibilitas komponen Pixel UI. Warna orange-500 sebagai aksen utama juga pilihan yang menarik. #uikits #designsystem',
		tweetUrl: '#'
	},
	{
		id: 't6',
		authorName: 'Frontend Joe',
		authorHandle: '@frontendjoe',
		avatarUrl: legoAvatar(8),
		tweetText: 'Integrasi dengan TypeScript di Pixel UI sangat mulus. Kudos untuk tim @pixeluidev! Membuat pengembangan lebih cepat dan aman. 🔥',
		tweetUrl: '#'
	},
	{
		id: 't7',
		authorName: 'Marketeers',
		authorHandle: '@marketeers',
		avatarUrl: 'https://tokpee.co/assets/dist/images/media/marketeers.webp?1741767885',
		tweetText: 'Pixel UI adalah software yang wajib dimiliki oleh pengembang web modern.',
		tweetUrl: '#'
	},
	{
		id: 't8',
		authorName: 'Startup Sally',
		authorHandle: '@startupsally',
		avatarUrl: legoAvatar(1),
		tweetText: 'Menggunakan Pixel UI untuk landing page startup kami. Prosesnya cepat dan hasilnya profesional. Komponen testimoninya juga keren!',
		tweetUrl: '#'
	},
];