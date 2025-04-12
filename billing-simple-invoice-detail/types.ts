// src/lib/components/invoice-detail/types.ts
export type InvoiceStatus = 'Due' | 'Overdue' | 'Paid'; // Status yang mungkin

interface Address {
	name?: string; // Nama perusahaan atau perorangan
	line1: string;
	line2?: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	vatCode?: string;
	email?: string;
}

interface InvoiceItem {
	id: string;
	productName: string;
	description?: string;
	quantity: number;
	unitPrice: number;
	discountPercentage: number; // Angka 0-100
	totalPrice: number; // quantity * unitPrice * (1 - discountPercentage / 100)
}

interface InvoiceTimelineEvent {
	id: string;
	description: string;
	dateTime: Date;
	isCompleted: boolean;
}

export interface DetailedInvoiceData {
	id: string;
	invoiceNumber: string; // e.g., "#1846325" (tanpa prefix INV lagi?)
	issueDate: Date;
	dueDate: Date;
	status: InvoiceStatus;
	currency: string;
	payTo: Address;
	billTo: Address;
	items: InvoiceItem[];
	subtotal: number; // Dihitung dari items
	taxAmount: number; // Bisa persentase atau nilai tetap
	shippingAmount: number;
	totalAmount: number; // subtotal + tax + shipping
	paymentMethod?: string; // e.g., "Bank Transfer"
	creatorName?: string;
	timeline?: InvoiceTimelineEvent[]; // Riwayat faktur
	// Optional: notes, terms, etc.
}
