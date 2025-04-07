import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
import Info from 'lucide-svelte/icons/info'; // Contoh ikon lain jika perlu

export const plans = [
	{
		id: 'basic',
		name: 'Basic',
		icon: Info, // Atau ikon lain yang sesuai
		price: 'Free',
		priceSuffix: '',
		discountBadge: null,
		isRecommended: false,
		features: [
			{ text: 'Limited Links', included: true },
			{ text: 'Basic Analytics', included: true },
			{ text: 'Community Support', included: true },
			{ text: 'Optimize Hashtags', included: false },
			{ text: 'Mobile App Access', included: false },
			{ text: 'Unlimited Users', included: false }
		],
		ctaText: 'Get Started'
	},
	{
		id: 'standard',
		name: 'Standard',
		icon: CheckCircle2,
		price: '$99',
		priceSuffix: 'Year',
		discountBadge: 'Save 30%',
		isRecommended: true, // Tandai sebagai rekomendasi
		features: [
			{ text: 'Unlimited Links', included: true },
			{ text: 'Own Analytics Platform', included: true },
			{ text: 'Priority Support', included: true },
			{ text: 'Optimize Hashtags', included: true },
			{ text: 'Mobile App Access', included: true },
			{ text: 'Unlimited Users', included: false }
		],
		ctaText: 'Choose Standard'
	},
	{
		id: 'pro',
		name: 'Pro',
		icon: CheckCircle2, // Atau ikon lain
		price: '$149',
		priceSuffix: 'Year', // Sesuaikan jika perlu (misal: /Month)
		discountBadge: 'Save 20%',
		isRecommended: false,
		features: [
			{ text: 'Unlimited Links', included: true },
			{ text: 'Own Analytics Platform', included: true },
			{ text: 'Full Support with Discussion', included: true },
			{ text: 'Optimize Hashtags', included: true },
			{ text: 'Mobile App Access', included: true },
			{ text: 'Unlimited Users', included: true }
		],
		ctaText: 'Go Pro'
	}
];
