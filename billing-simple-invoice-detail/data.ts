// src/lib/components/invoice-detail/data.ts
import type { DetailedInvoiceData } from './types';

// Helper untuk menghitung total item
function calculateItemTotal(qty: number, price: number, discount: number): number {
	return qty * price * (1 - discount / 100);
}

const items: DetailedInvoiceData['items'] = [
	{
		id: 'item_1',
		productName: 'Pixel UI Developer Edition',
		description: 'Svelte, Tailwind, TypeScript Components',
		quantity: 2,
		unitPrice: 269,
		discountPercentage: 50,
		totalPrice: calculateItemTotal(2, 269, 50) // 269
	},
	{
		id: 'item_2',
		productName: 'Pixel UI Designer Edition',
		description: 'Figma Design System',
		quantity: 3,
		unitPrice: 149,
		discountPercentage: 0,
		totalPrice: calculateItemTotal(3, 149, 0) // 447
	},
	{
		id: 'item_3',
		productName: 'Pixel UI Open Source',
		description: 'Free Community Components',
		quantity: 1,
		unitPrice: 0,
		discountPercentage: 0,
		totalPrice: calculateItemTotal(1, 0, 0) // 0
	},
	{
		id: 'item_4',
		productName: '1 Year Premium Support',
		description: 'Priority Email & Chat Support',
		quantity: 1,
		unitPrice: 199,
		discountPercentage: 0,
		totalPrice: calculateItemTotal(1, 199, 0) // 199
	}
	// Contoh HTML asli punya item ke-5, kita skip agar total beda
];

// Hitung subtotal
const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
const tax = subtotal * 0.1; // Contoh pajak 10%
const shipping = 15; // Contoh biaya kirim
const total = subtotal + tax + shipping;

export const sampleDetailedInvoice: DetailedInvoiceData = {
	id: 'inv_detail_1',
	invoiceNumber: '#1846325',
	issueDate: new Date('2025-07-05'),
	dueDate: new Date('2025-08-04'), // Jatuh tempo 30 hari
	status: 'Paid', // Contoh status sudah dibayar
	currency: 'USD',
	payTo: {
		name: 'Pixel UI Dev Team',
		line1: '123 Tailwind Ave',
		city: 'Svelte City',
		state: 'UI',
		postalCode: '12345',
		country: 'United States of America',
		vatCode: 'PX-987654321'
	},
	billTo: {
		name: 'Bonnie Green',
		line1: '3864 Johnson Street',
		city: 'Carolina',
		state: 'Selby', // Ini aneh, mungkin city/state terbalik
		postalCode: '54321',
		country: 'United States of America',
		email: 'bonnie@example.com'
	},
	items: items,
	subtotal: subtotal,
	taxAmount: tax,
	shippingAmount: shipping,
	totalAmount: total,
	paymentMethod: 'Bank Transfer',
	creatorName: 'Jese Leos',
	timeline: [
		{
			id: 'tl_1',
			description: 'Invoice created',
			dateTime: new Date('2025-07-05T10:00:00Z'),
			isCompleted: true
		},
		{
			id: 'tl_2',
			description: 'Invoice sent to client',
			dateTime: new Date('2025-07-06T11:30:00Z'),
			isCompleted: true
		},
		{
			id: 'tl_3',
			description: 'Payment received',
			dateTime: new Date('2025-07-08T14:00:00Z'),
			isCompleted: true
		}
		// { id: 'tl_4', description: 'Awaiting confirmation', dateTime: new Date(), isCompleted: false }, // Contoh event belum selesai
	]
};
