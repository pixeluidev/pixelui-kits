export const formatCurrency = (amount: number, currency: string) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency ?? 'USD' }).format(
		amount
	);
};
