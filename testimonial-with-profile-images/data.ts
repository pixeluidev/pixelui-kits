// src/lib/data.ts
import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

// (Pastikan tipe dan data lain dari contoh sebelumnya ada di sini jika diperlukan)

export interface SimpleTestimonialData {
	id: string;
	title: string; // Judul bagian, mis. "Work with Us" atau "Client Success"
	quote: string;
	authorName: string;
	authorTitleAndCompany: string; // e.g., "Marketing @ APPLE INC."
	mainImageUrl: string; // URL gambar profil besar
	mainImageAlt: string;
	groupAvatarUrls: string[]; // Array URL untuk avatar kecil
}

// Contoh Data (Ganti dengan data Anda, gunakan avatar Lego)
export const simpleTestimonialData: SimpleTestimonialData = {
	id: 'main-testimonial',
	title: 'Success Stories', // Judul baru
	quote:
		"Choosing this platform was a pivotal decision. The impact on our team's efficiency and the quality of our output has been remarkable. It's more than a tool; it's a growth partner.",
	authorName: 'Isabelle Chen', // Nama baru
	authorTitleAndCompany: 'Head of Product @ Quantum Dynamics', // Jabatan/Perusahaan baru
	mainImageUrl:
		'https://images.unsplash.com/photo-1526598934312-ebc735c872ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBsYXRmb3JtfGVufDB8fDB8fHww', // Ganti dengan path relevan
	mainImageAlt: 'Isabelle Chen',
	groupAvatarUrls: [
		'https://randomuser.me/api/portraits/lego/1.jpg',
		'https://randomuser.me/api/portraits/lego/2.jpg',
		'https://randomuser.me/api/portraits/lego/3.jpg',
		'https://randomuser.me/api/portraits/lego/4.jpg' // Bisa lebih banyak
	]
};
