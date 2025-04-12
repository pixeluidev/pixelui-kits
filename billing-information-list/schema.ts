// Fungsi validasi tanggal kedaluwarsa
import { z } from 'zod';

function isExpiryDateValid(date: string): boolean {
	const [month, yearSuffix] = date.split('/');
	const year = parseInt(`20${yearSuffix}`, 10);
	const monthNum = parseInt(month, 10);
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed

	// Card expires at the *end* of the expiry month
	if (year < currentYear) return false;
	if (year === currentYear && monthNum < currentMonth) return false;

	return true;
}

function isValidLuhn(num: string): boolean {
	let sum = 0;
	let alternate = false;
	for (let i = num.length - 1; i >= 0; i--) {
		let n = parseInt(num.substring(i, i + 1), 10);
		if (alternate) {
			n *= 2;
			if (n > 9) {
				n = (n % 10) + 1;
			}
		}
		sum += n;
		alternate = !alternate;
	}
	return sum % 10 === 0;
}

export const cardSchema = z.object({
	id: z.number().optional(),
	cardholderName: z.string().min(1, 'Cardholder name is required'),
	cardNumber: z
		.string()
		.min(13, 'Card number must be between 13 and 19 digits')
		.max(19, 'Card number must be between 13 and 19 digits')
		.regex(/^\d+$/, 'Card number must contain only digits')
		.refine(isValidLuhn, 'Invalid card number'), // Contoh validasi Luhn (opsional)
	expiryDate: z
		.string()
		.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
		.refine(isExpiryDateValid, 'Card expiry date is in the past'), // Cek tanggal kedaluwarsa
	cvv: z
		.string()
		.min(3, 'CVV must be 3 or 4 digits')
		.max(4, 'CVV must be 3 or 4 digits')
		.regex(/^\d+$/, 'CVV must contain only digits')
});
export type BillingFormSchema = z.infer<typeof cardSchema>;
