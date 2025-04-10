// src/lib/data.ts

// Define the structure for each feature item
export interface FeatureImageData {
	id: string; // Unique ID for {#each} key
	imageKey: string; // Key to look up image source in the IMAGES map
	title: string;
	description: string;
}

// Define the structure for the image source map
export type ImageSourceMap = Record<string, string>;

// Map of image keys to their actual URLs (Replace with your image paths)
// It's crucial that the keys here match the 'imageKey' in featuresImageData
export const FEATURE_IMAGES: ImageSourceMap = {
	pharmacists: '/assets/icons/pharmacist-icon.svg', // Example path
	lawyers: '/assets/icons/lawyer-icon.svg', // Example path
	bankers: '/assets/icons/banker-icon.svg', // Example path (changed from accountants)
	others: '/assets/icons/business-man-icon.svg' // Example path
};

// Array of feature data using the defined interface
export const featuresImageData: FeatureImageData[] = [
	{
		id: 'pharmacists',
		imageKey: 'pharmacists', // Use the key from FEATURE_IMAGES
		title: 'Pharmacists & Healthcare',
		description:
			'Streamline prescription management, patient consultations, and inventory control with dedicated tools.'
	},
	{
		id: 'lawyers',
		imageKey: 'lawyers',
		title: 'Legal Professionals',
		description:
			'Manage case files, client communication, and document workflows efficiently and securely.'
	},
	{
		id: 'bankers',
		imageKey: 'bankers',
		title: 'Finance & Banking', // Changed from Bank owners
		description:
			'Enhance client portfolio management, compliance tracking, and secure financial operations.'
	},
	{
		id: 'others',
		imageKey: 'others',
		title: 'And Many More', // Changed title
		description:
			'Highly adaptable for various professional sectors needing organized workflows and secure data handling.'
	}
];
