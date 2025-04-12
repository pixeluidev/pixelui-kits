// src/lib/components/payment-methods/types.ts
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'other'; // Bisa diperluas

export interface PaymentMethodData {
	id: string; // Gunakan string untuk ID, bisa jadi UUID nanti
	brand: CardBrand;
	last4: string;
	expiryMonth: string; // MM
	expiryYear: string; // YYYY
	isDefault?: boolean;
}

export const samplePaymentMethods: PaymentMethodData[] = [
	{
		id: 'pm_1',
		brand: 'mastercard',
		last4: '7852',
		expiryMonth: '11',
		expiryYear: '2025', // Contoh tahun
		isDefault: true
	},
	{
		id: 'pm_2',
		brand: 'visa',
		last4: '9831',
		expiryMonth: '08',
		expiryYear: '2024'
	},
	{
		id: 'pm_3',
		brand: 'visa',
		last4: '8362',
		expiryMonth: '01',
		expiryYear: '2026'
	}
	// Tambahkan contoh lain jika perlu
];
