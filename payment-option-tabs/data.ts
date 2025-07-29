// src/lib/data.ts
import type { ComponentType } from 'svelte';
import type { Icon } from '@lucide/svelte';
// --- New Data for Payment Tabs ---
import Landmark from 'lucide-svelte/icons/landmark'; // For Monthly Fees
import Send from 'lucide-svelte/icons/send';
import CheckCircle from 'lucide-svelte/icons/check-circle-2'; // For Paypal (example)
import { CreditCard, ShoppingCart, ClipboardList, Bitcoin } from '@lucide/svelte';
// --- Reused Types from previous examples ---
// Stepper

export interface CheckoutStep {
	id: string;
	label: string;
	icon: ComponentType<Icon>;
}

export const checkoutStepsData: CheckoutStep[] = [
	{ id: 'cart', label: 'Cart', icon: ShoppingCart },
	{ id: 'checkout', label: 'Details', icon: CreditCard }, // Changed label for clarity
	{ id: 'payment', label: 'Payment', icon: CreditCard },
	{ id: 'confirm', label: 'Confirmation', icon: CheckCircle } // Added a confirmation step
];
// Saved Payment Methods
export type PaymentMethodType = 'visa' | 'mastercard' | 'paypal' | 'new';

export interface SavedPaymentMethod {
	id: string;
	type: PaymentMethodType;
	label: string;
	details?: string;
	iconUrlLight?: string;
	iconUrlDark?: string;
}

export const savedPaymentMethodsData: SavedPaymentMethod[] = [
	{
		id: 'pm_visa_7658',
		type: 'visa',
		label: 'Visa ending in 7658',
		details: 'Expiry 10/2024',
		iconUrlLight: '/images/icons/visa.svg',
		iconUrlDark: '/images/icons/visa-dark.svg'
	},
	{
		id: 'pm_mc_8429',
		type: 'mastercard',
		label: 'Mastercard ending in 8429',
		details: 'Expiry 04/2026',
		iconUrlLight: '/images/icons/mastercard.svg',
		iconUrlDark: '/images/icons/mastercard-dark.svg'
	},
	{
		id: 'pm_paypal_user',
		type: 'paypal',
		label: 'Paypal account',
		iconUrlLight: '/images/icons/paypal.svg',
		iconUrlDark: '/images/icons/paypal-dark.svg'
	}
];

// Order Summary
export interface OrderSummaryItem {
	label: string;
	amount: number;
	isSavings?: boolean;
}

export const orderSummaryData: OrderSummaryItem[] = [
	/* ... as before ... */
];
export const orderCurrency = 'USD';

// Promo Data
export interface PromoInfo {
	icon: ComponentType<Icon>;
	title: string;
	description: string;
	linkText?: string;
	linkHref?: string;
}

import Truck from 'lucide-svelte/icons/truck';

export interface PaymentTab {
	id: 'credit-card' | 'monthly-fees' | 'crypto' | 'paypal';
	label: string;
	icon: ComponentType<Icon>;
	// We'll associate content components directly later
}

export const paymentTabsData: PaymentTab[] = [
	{ id: 'credit-card', label: 'Credit Card', icon: CreditCard },
	{ id: 'monthly-fees', label: 'Monthly Installments', icon: Landmark },
	{ id: 'crypto', label: 'Cryptocurrency', icon: Bitcoin },
	{ id: 'paypal', label: 'PayPal', icon: Send }
];

// --- Data for Specific Tabs (if needed dynamically) ---

// Example data for Monthly Fees tab table
export interface BankInstallmentOption {
	id: string;
	bankName: string;
	monthlyPayment: number; // Amount
	detailsUrl: string;
}

export const bankInstallmentOptions: BankInstallmentOption[] = [
	{ id: 'bank-fb', bankName: 'Flowbite Bank', monthlyPayment: 49, detailsUrl: '#' },
	{ id: 'bank-jpm', bankName: 'JPMorgan Bank', monthlyPayment: 39, detailsUrl: '#' },
	{ id: 'bank-wf', bankName: 'Wells Fargo Bank', monthlyPayment: 59, detailsUrl: '#' }
];

// Example data for Crypto options
export interface CryptoOption {
	id: string;
	name: string;
	iconSvg: string; // Direct SVG string from HTML for simplicity here
}

export const cryptoOptionsData: CryptoOption[] = [
	{
		id: 'bitcoin',
		name: 'Bitcoin',
		iconSvg: `<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.0368 12.63C17.8613 17.3448 13.0858 20.2139 8.37044 19.0384C3.65731 17.8629 0.787952 13.0874 1.96369 8.37288C3.13861 3.65754 7.9139 0.787912 12.6279 1.96338C17.3429 3.13884 20.2123 7.91496 19.0368 12.63Z" fill="#F7931A"></path><path d="M14.3806 9.24719C14.5555 8.07613 13.6639 7.44659 12.4447 7.02663L12.8402 5.44027L11.8743 5.19963L11.4892 6.74418C11.2357 6.68092 10.9749 6.62124 10.7159 6.56211L11.1037 5.00738L10.1386 4.76673L9.74283 6.35254C9.53271 6.30468 9.32644 6.25738 9.12622 6.2076L9.12732 6.20265L7.79564 5.87014L7.53876 6.90149C7.53876 6.90149 8.25521 7.06568 8.24008 7.07586C8.63117 7.17349 8.70212 7.43229 8.69002 7.63746L8.23953 9.44466C8.26648 9.45154 8.30141 9.46144 8.33991 9.47684L8.23815 9.45154L7.60642 11.9832C7.55856 12.102 7.43728 12.2802 7.1639 12.2125C7.17353 12.2266 6.46203 12.0373 6.46203 12.0373L5.98266 13.1429L7.23953 13.4562C7.4733 13.5148 7.7024 13.5761 7.92765 13.6339L7.52804 15.2387L8.49255 15.4793L8.88859 13.8918C9.15179 13.9634 9.40757 14.0294 9.65784 14.0915L9.26345 15.6715L10.2291 15.9122L10.6287 14.3107C12.2753 14.6223 13.5137 14.4966 14.0343 13.0076C14.4543 11.8085 14.0137 11.1168 13.1474 10.6655C13.7783 10.5195 14.2538 10.1045 14.3806 9.24719ZM12.1741 12.341C11.8754 13.5401 9.85669 12.8921 9.20185 12.7293L9.7321 10.6036C10.3867 10.767 12.4851 11.0904 12.1741 12.341ZM12.4725 9.22987C12.2002 10.3206 10.5198 9.76644 9.9744 9.63058L10.4551 7.70264C11.0005 7.83851 12.7563 8.09208 12.4725 9.22987Z" fill="white"></path></svg>`
	},
	{
		id: 'ethereum',
		name: 'Ethereum',
		iconSvg: `<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 10.5C20.5 16.0228 16.0228 20.5 10.5 20.5C4.97715 20.5 0.5 16.0228 0.5 10.5C0.5 4.97715 4.97715 0.5 10.5 0.5C16.0228 0.5 20.5 4.97715 20.5 10.5Z" fill="#F6F6F6"></path><path d="M10.4993 4.07143L10.4109 4.36443V12.8659L10.4993 12.9519L14.5451 10.6193L10.4993 4.07143Z" fill="#343434"></path><path d="M10.4983 4.07143L6.45238 10.6193L10.4983 12.9519V8.82556V4.07143Z" fill="#8C8C8C"></path><path d="M10.4993 13.699L10.4495 13.7583V16.7867L10.4993 16.9286L14.5476 11.3676L10.4993 13.699Z" fill="#3C3C3B"></path><path d="M10.4983 16.9286V13.699L6.45238 11.3676L10.4983 16.9286Z" fill="#8C8C8C"></path><path d="M10.4977 12.9518L14.5436 10.6192L10.4977 8.82542V12.9518Z" fill="#141414"></path><path d="M6.45238 10.6193L10.4983 12.9519V8.82556L6.45238 10.6193Z" fill="#393939"></path></svg>`
	}
	// ... add other cryptos from HTML if needed
];

// --- Promo Data --- (Example)
export interface PromoInfo {
	icon: ComponentType<Icon>;
	title: string;
	description: string;
	linkText?: string;
	linkHref?: string;
}

export const promoData: PromoInfo[] = [
	{
		icon: Truck,
		title: 'Free Shipping Eligible',
		description: 'This order qualifies for free standard shipping.'
		// linkText: 'Learn More',
		// linkHref: '#'
	}
	// {
	//     icon: BadgePercent,
	//     title: '-10% Extra Discount',
	//     description: 'Applied automatically at checkout!',
	// }
];
