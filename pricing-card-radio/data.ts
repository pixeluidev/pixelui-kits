// src/lib/data.js (Contoh dengan ikon Lucide Svelte)
import Briefcase from 'lucide-svelte/icons/briefcase';
import Users from 'lucide-svelte/icons/users';
import Building from 'lucide-svelte/icons/building';

export const radioOptions = [
	{
		title: 'Personal',
		helperText: '(up to 1 user)',
		description: 'Ideal for freelancers and solo creators.',
		icon: Briefcase, // --- Pastikan ini komponen Svelte ---
		iconColor: 'secondary', // Properti ini mungkin tidak terlalu relevan lagi di Svelte
		value: 'personal' // Tambahkan value unik jika belum ada
	},
	{
		title: 'Team',
		helperText: '(2-10 users)',
		description: 'Collaborate effectively with your team.',
		icon: Users, // --- Pastikan ini komponen Svelte ---
		iconColor: 'secondary',
		value: 'team' // Tambahkan value unik
	},
	{
		title: 'Enterprise',
		helperText: '(10+ users)',
		description: 'Scalable solutions for large organizations.',
		icon: Building, // --- Pastikan ini komponen Svelte ---
		iconColor: 'secondary',
		value: 'enterprise' // Tambahkan value unik
	}
	// ... opsi lain
];
