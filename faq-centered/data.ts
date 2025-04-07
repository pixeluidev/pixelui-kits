// src/lib/data.ts

export interface FaqItemData {
	id: number | string; // Unique identifier for the key
	question: string;
	answer: string;
}

export const FaqListData: FaqItemData[] = [
	{
		id: 1,
		question: 'How can I pay for my appointment?',
		answer:
			'We accept various payment methods including major credit cards (Visa, Mastercard, American Express), debit cards, and direct bank transfers. You can also pay using popular digital wallets. Payment details can be found on your invoice or discussed during scheduling.'
	},
	{
		id: 2,
		question: 'Is the cost of the appointment covered by private health insurance?',
		answer:
			'Coverage depends on your specific private health insurance plan and the type of service. We recommend contacting your insurance provider directly with the service details to confirm your coverage and any potential out-of-pocket expenses.'
	},
	{
		id: 3,
		question: 'How can I apply to the Open Source Discount?',
		answer:
			'The Open Source Discount is available for everyone who is building an open source project. You can apply to the discount by sending an email to support@acme.com'
	},
	{
		id: 4,
		question: 'Can I use Acme for my freelance projects?',
		answer:
			'Yes, you can use Acme for your freelance projects. You can purchase the Freelancer License from our website.'
	},
	{
		id: 5,
		question: 'What is your refund policy?',
		answer: 'We do not provide refunds. However, we can help you with any issues you may have.'
	},
	{
		id: 6,
		question: 'Can I cancel my subscription?',
		answer: 'Yes, you can cancel and renew your subscription at any time.'
	},
	{
		id: 7,
		question: 'How do I switch from quarterly to yearly subscription?',
		answer:
			'You can switch from quarterly to yearly subscription by canceling your quarterly subscription and purchasing a yearly subscription.'
	},
	{
		id: 8,
		question: 'Do you have monthly payment plans?',
		answer:
			'No, we do not provide monthly payment plans. You can purchase a quarterly or yearly subscription.'
	},
	{
		id: 9,
		question: 'Do you have discounts for students?',
		answer:
			'Yes, we provide a 50% discount for students. You can apply to the discount by sending an email to support@acme.com'
	},
	{
		id: 10,
		question: 'Do you have discounts for startups?',
		answer:
			'Yes, we provide a 50% discount for startups. You can apply to the discount by sending an email to support@acme.com'
	}
];
