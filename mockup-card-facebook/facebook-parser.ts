// src/lib/utils/facebookParser.ts

// Parser sederhana untuk hashtag dan URL dasar
export function parseFacebookText(text: string): string {
	if (!text) return '';

	let escapedText = text
		.replace(/&/g, '&')
		.replace(/</g, '<')
		.replace(/>/g, '>')
		.replace(/"/g, '"')
		.replace(/'/g, "'");

	// Regex untuk Hashtags
	const hashtagRegex = /(#\w+)/g;
	// Regex basic URL
	const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

	// Ganti Hashtags (link ke search Facebook atau biarkan sebagai teks)
	escapedText = escapedText.replace(
		hashtagRegex,
		// '<a href="https://www.facebook.com/hashtag/$1" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>'
		// Atau cukup beri gaya:
		'<span class="text-blue-600 dark:text-blue-400 font-medium">$1</span>'
	);

	// Ganti URLs
	escapedText = escapedText.replace(urlRegex, (url) => {
		let displayUrl = url.replace(/^https?:\/\//, ''); // Tampilkan tanpa http
		return `<a href="${url}" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 dark:text-blue-400 hover:underline">${displayUrl}</a>`;
	});

	// Pertahankan baris baru
	escapedText = escapedText.replace(/\n/g, '<br>');

	return escapedText;
}

// Helper format angka
export function formatFacebookCount(num: number): string {
	if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
	if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K';
	return num.toString();
}
