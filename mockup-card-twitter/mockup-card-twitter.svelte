<script lang="ts">
	import type { TweetData } from './data'; // Default data
	import { exampleTweet as defaultTweet } from './data'; // Default data
	// Ikon Lucide
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Verified badge
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import MessageCircle from 'lucide-svelte/icons/message-circle'; // Reply
	import Repeat2 from 'lucide-svelte/icons/repeat-2'; // Retweet
	import Heart from 'lucide-svelte/icons/heart'; // Like
	import BarChart2 from 'lucide-svelte/icons/bar-chart-2'; // Views/Stats
	import Share from 'lucide-svelte/icons/share'; // Share
	// Utility
	import { parseTweetText } from '../assets/helper/tweetParser'; // Adjust path

	// --- Props ---
	export let tweet: TweetData = defaultTweet;
	export let theme: 'light' | 'dark' = 'light';
	export let cardClass: string = ''; // Additional classes for the outer card

	// --- Styling Dinamis ---
	let bgColor: string;
	let textColor: string;
	let mutedTextColor: string;
	let borderColor: string;
	let hoverBgColor: string;
	let actionIconColor: string;
	let actionHoverColor: string;
	let actionHoverBg: string;

	$: {
		if (theme === 'dark') {
			bgColor = 'bg-black border border-neutral-800'; // Twitter dark background
			textColor = 'text-neutral-50';
			mutedTextColor = 'text-neutral-500';
			borderColor = 'border-neutral-800'; // Border antar elemen
			hoverBgColor = 'hover:bg-neutral-800/60'; // Hover pada card/action
			actionIconColor = 'text-neutral-500';
			actionHoverColor = 'hover:text-orange-400';
			actionHoverBg = 'hover:bg-orange-400/10';
		} else {
			// light theme
			bgColor = 'bg-white border border-gray-200';
			textColor = 'text-gray-900';
			mutedTextColor = 'text-gray-500';
			borderColor = 'border-gray-100';
			hoverBgColor = 'hover:bg-gray-50/70';
			actionIconColor = 'text-gray-500';
			actionHoverColor = 'hover:text-primary';
			actionHoverBg = 'hover:bg-primary/10';
		}
	}

	$: finalCardClasses = `
        relative w-full max-w-xl mx-auto cursor-pointer transition-colors duration-150 ease-in-out
        ${bgColor}
        ${hoverBgColor}
        ${cardClass}
    `.trim();

	// Format angka count
	function formatCount(num: number): string {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
		if (num >= 1000) return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + 'K'; // Tampilkan desimal jika < 10K
		return num.toString();
	}

	// Parsed content
	$: parsedContent = parseTweetText(tweet.contentText);

	// Placeholder Actions
	function handleAction(action: string) {
		console.log(`${action} clicked`);
	}
</script>

<!-- Mockup Kartu Tweet -->
<article aria-labelledby={`tweet-author-${tweet.id}`} class={finalCardClasses}>
	<!-- Padding konten -->
	<div class="flex space-x-3 p-3 sm:p-4">
		<!-- Avatar -->
		<div class="flex-shrink-0">
			<a class="block" href="#">
				<img
					alt={`${tweet.authorName}'s avatar`}
					class="h-10 w-10 rounded-full object-cover"
					loading="lazy"
					src={tweet.avatarUrl}
				/>
			</a>
		</div>

		<!-- Konten Utama Tweet -->
		<div class="min-w-0 flex-1">
			<!-- Header Tweet: Nama, Handle, Verified, Waktu -->
			<div class="flex items-center justify-between">
				<div class="flex min-w-0 items-center space-x-1 whitespace-nowrap">
					<a class="group" href="#">
						<span class="text-sm font-bold {textColor} truncate group-hover:underline"
							>{tweet.authorName}</span
						>
					</a>
					{#if tweet.isVerified}
						<CheckCircle2 class="h-4 w-4 flex-shrink-0 text-blue-500" />
					{/if}
					<a class="group" href="#">
						<span class="text-sm {mutedTextColor} truncate group-hover:underline"
							>{tweet.authorHandle}</span
						>
					</a>
					<span class="text-sm {mutedTextColor}">·</span>
					<a class="group" href="#">
						<time class="text-sm {mutedTextColor} group-hover:underline" datetime={tweet.timestamp}
							>{tweet.timestamp}</time
						>
					</a>
				</div>
				<!-- Tombol More (kanan atas) -->
				<button
					class={`ml-2 rounded-full p-1.5 ${actionIconColor} ${actionHoverColor} ${actionHoverBg} transition-colors duration-150 focus:ring-1 focus:ring-orange-400 focus:outline-none`}
					onclick={() => handleAction('More')}
				>
					<span class="sr-only">More options</span>
					<MoreHorizontal class="h-4 w-4" strokeWidth={2} />
				</button>
			</div>

			<!-- Teks Tweet -->
			<div
				class="mt-1 text-sm sm:text-[15px] {textColor} leading-relaxed break-words whitespace-pre-wrap"
			>
				{@html parsedContent}
			</div>

			<!-- Media (Gambar/Video) Opsional -->
			{#if tweet.mediaUrl}
				<div class="mt-3 aspect-video overflow-hidden rounded-xl border {borderColor}">
					<img
						src={tweet.mediaUrl}
						alt="Tweet media"
						class="h-full w-full object-cover"
						loading="lazy"
					/>
				</div>
			{/if}

			<!-- Tombol Aksi Tweet -->
			<div class="mt-3 flex max-w-md items-center justify-between">
				<!-- Reply -->
				<button
					class="group flex items-center gap-1.5 focus:outline-none"
					onclick={() => handleAction('Reply')}
				>
					<div
						class={`rounded-full p-1.5 ${actionIconColor} transition-colors duration-150 group-hover:bg-blue-500/10 group-hover:text-blue-500 dark:group-hover:text-blue-400`}
					>
						<MessageCircle class="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
					</div>
					<span
						class={`text-xs ${actionIconColor} transition-colors duration-150 group-hover:text-blue-500 dark:group-hover:text-blue-400`}
						>{formatCount(tweet.replyCount)}</span
					>
				</button>

				<!-- Retweet -->
				<button
					class="group flex items-center gap-1.5 focus:outline-none"
					onclick={() => handleAction('Retweet')}
				>
					<div
						class={`rounded-full p-1.5 ${actionIconColor} transition-colors duration-150 group-hover:bg-green-500/10 group-hover:text-green-600 dark:group-hover:text-green-400`}
					>
						<Repeat2 class="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
					</div>
					<span
						class={`text-xs ${actionIconColor} transition-colors duration-150 group-hover:text-green-600 dark:group-hover:text-green-400`}
						>{formatCount(tweet.retweetCount)}</span
					>
				</button>

				<!-- Like -->
				<button
					class="group flex items-center gap-1.5 focus:outline-none"
					onclick={() => handleAction('Like')}
				>
					<div
						class={`rounded-full p-1.5 ${actionIconColor} transition-colors duration-150 group-hover:bg-pink-500/10 group-hover:text-pink-600 dark:group-hover:text-pink-500`}
					>
						<Heart class="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
					</div>
					<span
						class={`text-xs ${actionIconColor} transition-colors duration-150 group-hover:text-pink-600 dark:group-hover:text-pink-500`}
						>{formatCount(tweet.likeCount)}</span
					>
				</button>

				<!-- Views -->
				<button
					class="group flex items-center gap-1.5 focus:outline-none"
					onclick={() => handleAction('View Stats')}
				>
					<div
						class={`rounded-full p-1.5 ${actionIconColor} transition-colors duration-150 group-hover:bg-sky-500/10 group-hover:text-sky-600 dark:group-hover:text-sky-400`}
					>
						<BarChart2 class="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
					</div>
					<span
						class={`text-xs ${actionIconColor} transition-colors duration-150 group-hover:text-sky-600 dark:group-hover:text-sky-400`}
						>{tweet.viewCount}</span
					>
				</button>

				<!-- Share -->
				<button
					class="group flex items-center rounded-full p-1.5 focus:outline-none {actionIconColor} {actionHoverColor} {actionHoverBg} transition-colors duration-150"
					onclick={() => handleAction('Share')}
				>
					<Share class="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
				</button>
			</div>
		</div>
		<!-- End Konten Utama Tweet -->
	</div>
	<!-- End Padding Konten -->
</article>
