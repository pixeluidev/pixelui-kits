// src/lib/data.ts
import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

// --- Stepper ---
import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
import ClipboardList from 'lucide-svelte/icons/clipboard-list';
import CreditCard from 'lucide-svelte/icons/credit-card';
import CheckCircle2 from 'lucide-svelte/icons/check-circle-2';
import Truck from 'lucide-svelte/icons/truck';

export interface CheckoutStep {
	id: string;
	label: string;
	icon: ComponentType<Icon>;
}

export const checkoutStepsData: CheckoutStep[] = [
	{ id: 'cart', label: 'Cart', icon: ShoppingCart },
	{ id: 'details', label: 'Details', icon: ClipboardList },
	{ id: 'payment', label: 'Payment', icon: CreditCard },
	{ id: 'confirm', label: 'Confirmation', icon: CheckCircle2 }
];

// --- Saved Payment Methods ---
export type PaymentMethodType = 'visa' | 'mastercard' | 'paypal' | 'new';

export interface SavedPaymentMethod {
	id: string; // Unique ID for this saved method
	type: PaymentMethodType;
	label: string; // e.g., "Visa ending in 7658"
	details?: string; // e.g., "Expiry 10/2024"
	iconUrlLight?: string; // URL for light mode icon
	iconUrlDark?: string; // URL for dark mode icon
}

export const savedPaymentMethodsData: SavedPaymentMethod[] = [
	{
		id: 'pm_visa_7658',
		type: 'visa',
		label: 'Visa ending in 7658',
		details: 'Expiry 10/2024',
		iconUrlLight: '/components-icons/visa.svg',
		iconUrlDark: '/components-icons/visa-dark.svg'
	},
	{
		id: 'pm_mc_8429',
		type: 'mastercard',
		label: 'Mastercard ending in 8429',
		details: 'Expiry 04/2026',
		iconUrlLight: '/components-icons/mastercard.svg',
		iconUrlDark: '/components-icons/mastercard-dark.svg'
	},
	{
		id: 'pm_paypal_user',
		type: 'paypal',
		label: 'Paypal account',
		iconUrlLight: '/components-icons/paypal.svg',
		iconUrlDark: '/components-icons/paypal-dark.svg'
	}
];

// --- Order Summary ---
export interface OrderSummaryItem {
	label: string;
	amount: number;
	isSavings?: boolean;
}

export const orderSummaryData: OrderSummaryItem[] = [
	{ label: 'Original price', amount: 6592.0 },
	{ label: 'Savings', amount: -299.0, isSavings: true },
	{ label: 'Store Pickup', amount: 99.0 },
	{ label: 'Tax', amount: 799.0 }
];
export const orderCurrency = 'USD';

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
