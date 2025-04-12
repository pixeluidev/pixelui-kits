// src/lib/components/billing/data.ts

// Definisikan interface untuk struktur data item billing

import type { BillingFormSchema } from '$uikits/billing-information-list/schema';

export interface BillingItemData {
	id: number; // Tambahkan ID untuk key unik di loop
	name: string;
	type: string;
	contactName: string;
	email: string;
	vatNumber: string;
}

// Contoh data array
export const billingItems: BillingItemData[] = [
	{
		id: 1,
		name: 'Burrito Vikings',
		type: 'Company Account', // Sedikit modifikasi teks
		contactName: 'Emma Roberts',
		email: 'emma@mail.com',
		vatNumber: 'FRB1235476'
	},
	{
		id: 2,
		name: 'Stone Tech Zone',
		type: 'Company Account',
		contactName: 'Marcel Glock',
		email: 'marcel@mail.com',
		vatNumber: 'FRB1235476'
	},
	{
		id: 3,
		name: 'Fiber Notion',
		type: 'Personal Account', // Contoh variasi type
		contactName: 'Misha Stam',
		email: 'misha@mail.com',
		vatNumber: 'FRB1235476'
	}
];
