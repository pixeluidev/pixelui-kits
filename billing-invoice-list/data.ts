export type InvoiceStatus = 'Due' | 'Overdue' | 'Paid'; // Status yang mungkin

export interface InvoiceData {
	id: string;
	invoiceNumber: string; // e.g., "INV-24 #MS-415646"
	issueDate: Date;
	dueDate: Date;
	amount: number;
	currency: string; // e.g., 'USD', 'IDR'
	status: InvoiceStatus; // Status bisa dihitung atau disimpan
	// Optional: Informasi tambahan
	clientName?: string;
	downloadUrl?: string; // Link untuk mengunduh PDF
}

// Helper function untuk menghitung tanggal jatuh tempo
function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

const today = new Date();

export const sampleInvoices: InvoiceData[] = [
	{
		id: 'inv_1',
		invoiceNumber: 'INV-24 #MS-415646',
		issueDate: new Date('2024-10-15'),
		dueDate: addDays(today, 24), // Jatuh tempo 24 hari dari sekarang
		amount: 2500.0,
		currency: 'USD',
		status: 'Due', // Status sementara, akan dihitung ulang
		downloadUrl: '/category/billings'
	},
	{
		id: 'inv_2',
		invoiceNumber: 'INV-23 #MS-415740',
		issueDate: new Date('2024-10-10'),
		dueDate: addDays(today, 5), // Jatuh tempo 5 hari lagi
		amount: 1750.0,
		currency: 'USD',
		status: 'Due',
		downloadUrl: '/category/billings'
	},
	{
		id: 'inv_3',
		invoiceNumber: 'INV-22 #MS-946285',
		issueDate: new Date('2024-09-15'),
		dueDate: new Date('2024-10-03'), // Sudah lewat 3 hari (contoh)
		amount: 1500.0,
		currency: 'USD',
		status: 'Overdue', // Status sementara
		downloadUrl: '/category/billings'
	},
	{
		id: 'inv_4',
		invoiceNumber: 'INV-21 #MS-739734',
		issueDate: new Date('2024-09-10'),
		dueDate: new Date('2024-09-20'), // Sudah lewat > 10 hari
		amount: 2990.0,
		currency: 'USD',
		status: 'Overdue',
		downloadUrl: '/category/billings'
	},
	{
		id: 'inv_5',
		invoiceNumber: 'INV-20 #MS-848649',
		issueDate: new Date('2024-08-15'),
		dueDate: new Date('2024-09-15'), // Sudah lunas (contoh)
		amount: 3500.0,
		currency: 'USD',
		status: 'Paid', // Status dibayar
		downloadUrl: '/category/billings'
	}
];
