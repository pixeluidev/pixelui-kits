// src/lib/data.ts

// Define the structure for a single FAQ item in the grid
export interface FaqGridItemData {
	id: number | string; // Unique identifier for the key
	question: string;
	answer: string;
	// We can add an icon property if it might vary, otherwise, we can hardcode it in the component
	// icon?: ComponentType; // Example if using SvelteComponent type
}

// Array of FAQ items
export const faqGridListData: FaqGridItemData[] = [
	{
		id: 1,
		question: 'What can I expect at my first consultation?',
		answer:
			'Your first consultation typically involves a detailed discussion about your concerns, relevant history, and goals. We aim to understand your needs fully and outline potential next steps or treatment plans in a comfortable setting.'
	},
	{
		id: 2,
		question: 'What are your opening hours?',
		answer:
			'Our standard business hours are Monday to Friday, from 9:00 AM to 5:00 PM local time. We are closed on weekends and major public holidays. Specific appointment availability may vary.'
	},
	{
		id: 3,
		question: 'Do I need a referral?',
		answer:
			'Generally, a referral is not necessary to book an appointment with us. However, some specific services or insurance plans might require one. We recommend checking with your insurance provider if applicable.'
	},
	{
		id: 4,
		question: 'Is the cost covered by private health insurance?',
		answer:
			'Coverage varies greatly depending on your insurance provider and specific plan details. Please contact your insurance company directly to verify coverage for our services before your appointment.'
	},
	{
		id: 5,
		question: 'What is your cancellation policy?',
		answer:
			'We require at least 24 hours notice for cancellations or rescheduling. Cancellations made with less than 24 hours notice may be subject to a cancellation fee. Please refer to our full policy details.'
	},
	{
		id: 6,
		question: 'What are the parking and public transport options?',
		answer:
			'We offer limited on-site parking, available on a first-come, first-served basis. Additionally, several public transport routes have stops conveniently located near our facility. Check local transit schedules for details.'
	}
	// Add more FAQs as needed
];
