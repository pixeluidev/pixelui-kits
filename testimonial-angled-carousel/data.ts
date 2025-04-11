// src/lib/data.ts
import type { SvelteComponent } from 'svelte'; // Gunakan SvelteComponent modern
import type { Icon } from 'lucide-svelte';

// --- Ikon untuk Testimonial & Sumber ---
import Twitter from 'lucide-svelte/icons/twitter';
import Linkedin from 'lucide-svelte/icons/linkedin';
import Globe from 'lucide-svelte/icons/globe';
// --- (Tambahkan ikon lain jika perlu) ---
type IconType = typeof SvelteComponent<Icon>;

// --- Interface untuk Testimonial ---
export interface TestimonialListItemData {
	id: string;
	authorName: string;
	authorHandle?: string; // Handle @ opsional
	authorTitle?: string; // Title opsional, mungkin hanya handle yang ditampilkan
	avatarUrl: string; // URL Avatar wajib
	isVerified?: boolean; // Verifikasi opsional
	quote: string; // Kutipan wajib
	sourceName?: string; // Nama sumber opsional (mis. "Twitter")
	sourceIcon?: IconType; // Tipe ikon sumber (opsional)
	date: string; // Tanggal testimonial
	sourceUrl?: string; // URL ke sumber (opsional)
}

// --- Data Testimonial Contoh ---
// (Gunakan data yang sudah diperbarui dengan avatar Lego dari respons sebelumnya)
export const testimonialListData: TestimonialListItemData[] = [
	{
		id: 't1-lego',
		authorName: 'Alex Rivera',
		authorHandle: '@alex_innovates',
		authorTitle: 'Lead Frontend Developer', // Pastikan ada jika diperlukan
		avatarUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
		isVerified: true,
		quote:
			'Switching to this framework significantly sped up our development cycle. The component structure is logical and the documentation is top-notch.',
		sourceName: 'Twitter',
		sourceIcon: Twitter as IconType, // Pastikan ini adalah komponen ikon Svelte
		date: 'Mar 05, 2024',
		sourceUrl: '#'
	},
	{
		id: 't2-lego',
		authorName: 'Samantha Bee',
		// authorHandle: '@sam_b_design', // Handle bisa opsional
		authorTitle: 'UX/UI Designer', // Atau handle, atau keduanya
		avatarUrl: 'https://randomuser.me/api/portraits/lego/7.jpg',
		isVerified: false,
		quote:
			'As a designer, I appreciate the aesthetic consistency and the ease with which I can translate mockups into functional components. Looks great out of the box!',
		sourceName: 'LinkedIn',
		sourceIcon: Linkedin as IconType, // Pastikan ini adalah komponen ikon Svelte
		date: 'Mar 08, 2024',
		sourceUrl: '#'
	},
	{
		id: 't3-lego',
		authorName: 'Kenji Tanaka',
		authorHandle: '@ktanaka_dev',
		authorTitle: 'Backend Engineer',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/5.jpg',
		isVerified: true,
		quote:
			'Even though I primarily work on the backend, integrating the API was straightforward. The clear structure makes collaboration much easier.',
		sourceName: 'Website',
		sourceIcon: Globe as IconType, // Pastikan ini adalah komponen ikon Svelte
		date: 'Mar 11, 2024'
		// sourceUrl: '#' // URL bisa opsional
	},
	{
		id: 't4-lego',
		authorName: 'Priya Sharma',
		authorHandle: '@priya_codes',
		authorTitle: 'Full-Stack Developer',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/2.jpg',
		isVerified: true,
		quote:
			'The performance is impressive! Our app feels much snappier, and the bundle size remained manageable despite the rich feature set.',
		sourceName: 'Twitter',
		sourceIcon: Twitter as IconType,
		date: 'Mar 14, 2024',
		sourceUrl: '#'
	},
	{
		id: 't5-lego',
		authorName: 'Carlos Rossi',
		authorTitle: 'Product Manager',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/3.jpg',
		isVerified: false,
		quote:
			'This tool helped us iterate faster and get our MVP to market ahead of schedule. The flexibility allowed us to adapt as requirements evolved.',
		sourceName: 'LinkedIn',
		sourceIcon: Linkedin as IconType,
		date: 'Mar 18, 2024',
		sourceUrl: '#'
	},
	{
		id: 't6-lego',
		authorName: 'Fatima Khan',
		authorHandle: '@fatima_techlead',
		authorTitle: 'Tech Lead',
		avatarUrl: 'https://randomuser.me/api/portraits/lego/0.jpg',
		isVerified: true,
		quote:
			'Onboarding new developers onto the project has been significantly easier thanks to the consistent coding patterns and excellent documentation.',
		sourceName: 'Twitter',
		sourceIcon: Twitter as IconType,
		date: 'Mar 21, 2024',
		sourceUrl: '#'
	}
];
