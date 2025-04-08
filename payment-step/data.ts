// src/lib/data.ts (or keep within the script block if preferred for a single component)

import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
import CreditCard from 'lucide-svelte/icons/credit-card';
import ClipboardList from 'lucide-svelte/icons/clipboard-list';
import CheckCircle from 'lucide-svelte/icons/check-circle-2'; // Use CheckCircle for completed steps

// Type for Stepper Steps
export interface CheckoutStep {
	id: string;
	label: string;
	icon: ComponentType<Icon>;
}

// Stepper Data
export const checkoutSteps: CheckoutStep[] = [
	{ id: 'cart', label: 'Cart', icon: ShoppingCart },
	{ id: 'checkout', label: 'Details', icon: ClipboardList }, // Changed label for clarity
	{ id: 'payment', label: 'Payment', icon: CreditCard },
	{ id: 'confirm', label: 'Confirmation', icon: CheckCircle } // Added a confirmation step
];

// Type for Order Summary Items
export interface OrderSummaryItem {
	label: string;
	amount: number;
	isSavings?: boolean; // Optional flag for special styling
}

// Order Summary Data (Example)
export const orderSummaryData: OrderSummaryItem[] = [
	{ label: 'Original price', amount: 6592.0 },
	{ label: 'Savings', amount: -299.0, isSavings: true },
	{ label: 'Store Pickup', amount: 99.0 },
	{ label: 'Tax', amount: 799.0 }
];

export const orderCurrency = 'USD'; // Example currency
