// src/lib/components/transaction-history/types.ts
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TransactionType = 'income' | 'expense' | 'transfer' | 'payment' | 'refund'; // Bisa diperluas

export interface TransactionData {
	id: string;
	description: string; // Nama merchant atau deskripsi
	dateTime: Date; // Gunakan objek Date untuk sorting & formatting
	amount: number; // Gunakan angka, positif untuk income, negatif untuk expense
	currency: string; // e.g., 'USD', 'IDR'
	status: TransactionStatus;
	type: TransactionType;
	// Tambahkan properti lain jika perlu, e.g., category, iconName, sourceAccount, destinationAccount
}

// Interface untuk data yang sudah dikelompokkan
export interface GroupedTransactions {
	[groupKey: string]: TransactionData[]; // Misal groupKey: "March 2023"
}

export const sampleTransactions: TransactionData[] = [
	// March 2023
	{
		id: 'txn_1',
		description: 'Netflix Subscription',
		dateTime: new Date('2023-03-27T12:30:00'),
		amount: -25.0,
		currency: 'USD',
		status: 'completed',
		type: 'payment'
	},
	{
		id: 'txn_2',
		description: 'Apple Store Purchase',
		dateTime: new Date('2023-03-27T04:30:00'),
		amount: 2000.0,
		currency: 'USD',
		status: 'completed',
		type: 'income' // Atau bisa jadi 'refund'
	},
	// February 2023
	{
		id: 'txn_3',
		description: 'Stripe Payout',
		dateTime: new Date('2023-02-26T13:45:00'),
		amount: -75.5, // Contoh expense
		currency: 'USD',
		status: 'completed',
		type: 'payment'
	},
	{
		id: 'txn_4',
		description: 'HubSpot Services',
		dateTime: new Date('2023-02-26T12:30:00'),
		amount: 750.0,
		currency: 'USD',
		status: 'completed',
		type: 'income'
	},
	{
		id: 'txn_5',
		description: 'Figma License',
		dateTime: new Date('2023-02-26T08:30:00'),
		amount: 140.0,
		currency: 'USD',
		status: 'completed',
		type: 'income' // Ini aneh di HTML asli, harusnya expense, kita ubah
		// amount: -140.00, type: 'payment'
	},
	{
		id: 'txn_6',
		description: 'Webflow Hosting',
		dateTime: new Date('2023-02-26T05:00:00'),
		amount: 25.0, // Jumlah tidak ada di HTML, kita tambahkan
		currency: 'USD',
		status: 'pending', // Status pending
		type: 'payment'
	},
	// January 2023
	{
		id: 'txn_7',
		description: 'Client Payment',
		dateTime: new Date('2023-01-15T10:00:00'),
		amount: 5000.0,
		currency: 'USD',
		status: 'completed',
		type: 'income'
	}
];
