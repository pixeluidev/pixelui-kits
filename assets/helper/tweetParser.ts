// src/lib/utils/tweetParser.ts

export function parseTweetText(text: string): string {
	if (!text) return '';

	// Escape HTML entities first to prevent injection
	let escapedText = text
		.replace(/&/g, '&')
		.replace(/</g, '<')
		.replace(/>/g, '>')
		.replace(/"/g, '"')
		.replace(/'/g, "'");

	// Regex to find URLs (http, https, www)
	const urlRegex =
		/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])|(\bwww\.[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
	// Regex to find Hashtags
	const hashtagRegex = /(#\w+)/g;
	// Regex to find Mentions
	const mentionRegex = /(@\w+)/g;

	// Replace URLs with anchor tags
	escapedText = escapedText.replace(urlRegex, (url) => {
		let fullUrl = url;
		if (!url.startsWith('http') && url.startsWith('www')) {
			fullUrl = 'http://' + url; // Add protocol for www links
		}
		// Shorten displayed URL (optional)
		let displayUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
		if (displayUrl.length > 30) {
			displayUrl = displayUrl.substring(0, 27) + '...';
		}
		return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer nofollow" class="text-orange-600 dark:text-orange-400 hover:underline">${displayUrl}</a>`;
	});

	// Replace Hashtags
	escapedText = escapedText.replace(
		hashtagRegex,
		'<a href="https://twitter.com/hashtag/$1?src=hashtag_click" target="_blank" rel="noopener noreferrer nofollow" class="text-orange-600 dark:text-orange-400 hover:underline">$1</a>'
	);

	// Replace Mentions
	escapedText = escapedText.replace(
		mentionRegex,
		'<a href="https://twitter.com/$1" target="_blank" rel="noopener noreferrer nofollow" class="text-orange-600 dark:text-orange-400 hover:underline">$1</a>'
	);

	return escapedText;
}
