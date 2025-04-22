export interface PriceListItemData {
	id: string;
	imageUrl: string;
	imageAlt: string;
	title: string;
	description: string;
	price: number;
	currency: string; // e.g., 'USD', 'IDR'
	href?: string; // Opsional link untuk item
}

// Ekstrak data dari HTML, sesuaikan path gambar jika perlu
export const samplePriceListItems: PriceListItemData[] = [
	{
		id: 'item_1',
		imageUrl: 'https://d1e5yheunyo3q0.cloudfront.net/wp-content/uploads/2023/01/Group-64343.svg',
		imageAlt: 'Southwest Cheddar',
		title: 'Southwest Cheddar Burger', // Nama sedikit diperjelas
		description: 'Smoky flavors from smoked cheddar cheese and chipotle sauce.',
		price: 25.0,
		currency: 'USD',
		href: '#'
	},
	{
		id: 'item_2',
		imageUrl: 'https://d1e5yheunyo3q0.cloudfront.net/wp-content/uploads/2023/01/Group-64344.svg',
		imageAlt: 'Double Cheeseburger',
		title: 'Classic Double Cheeseburger',
		description: 'Served with grilled onions, crisp lettuce, and fresh tomatoes.',
		price: 10.0,
		currency: 'USD',
		href: '#'
	},
	{
		id: 'item_3',
		imageUrl: 'https://d1e5yheunyo3q0.cloudfront.net/wp-content/uploads/2023/01/Group-64345.svg',
		imageAlt: 'Sourdough Jack',
		title: 'Sourdough Jack Supreme',
		description: '100% beef patty topped with bacon, tomato, Swiss cheese, mayo, and ketchup.',
		price: 30.0,
		currency: 'USD',
		href: '#'
	},
	{
		id: 'item_4',
		imageUrl: 'https://d1e5yheunyo3q0.cloudfront.net/wp-content/uploads/2023/01/Group-64346.svg',
		imageAlt: 'Dumpling Sling Bag', // Item ini tampaknya berbeda dari tema makanan?
		title: 'Gourmet Dumpling Bag', // Sesuaikan nama jika perlu
		description: 'A unique taste adventure, comes with special dipping sauce.', // Deskripsi disesuaikan
		price: 50.0,
		currency: 'USD',
		href: '#'
	}
];
