export interface CardData {
	number: string;
	holder: string;
	expiry: string; // Format MM/YY
	brand: 'mastercard' | 'visa' | 'amex' | 'other';
	cvv?: string;
}
