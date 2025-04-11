<script lang="ts">
	import { fade } from 'svelte/transition';
	// Data & Tipe
	import type { LinkedinPostData } from './data'; // Adjust path
	import { exampleLinkedinPost as defaultPost } from './data'; // Default data

	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Premium/Verified
	import Globe from 'lucide-svelte/icons/globe';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Send from 'lucide-svelte/icons/send';
	// Utility
	import { parseLinkedinText, formatLinkedinCount } from './linkedinParser'; // Adjust path

	// --- Props ---
	export let post: LinkedinPostData = defaultPost;
	export let theme: 'light' | 'dark' = 'light';
	export let cardClass: string = '';

	// --- State ---
	let isLikedState: boolean = post.isLiked ?? false;
	let likeCountState: number = post.likeCount;
	let showFullText = false; // State for "see more"
	const truncateLength = 200; // Character limit before truncating

	// --- Styling Dinamis ---
	let bgColor: string;
	let textColor: string;
	let mutedTextColor: string;
	let lighterMutedTextColor: string;
	let borderColor: string;
	let hoverBgColor: string;
	let actionTextColor: string;
	let actionHoverTextColor: string;
	let actionActiveTextColor: string; // For liked button
	let actionActiveBgColor: string; // For liked button

	$: {
		if (theme === 'dark') {
			bgColor = 'bg-[#1b1f23] border border-neutral-700/80'; // Darker LinkedIn background
			textColor = 'text-neutral-100';
			mutedTextColor = 'text-neutral-400';
			lighterMutedTextColor = 'text-neutral-500';
			borderColor = 'border-neutral-700/80';
			hoverBgColor = 'hover:bg-neutral-700/50';
			actionTextColor = 'text-neutral-400';
			actionHoverTextColor = 'hover:text-blue-400';
			actionActiveTextColor = 'text-blue-400';
			actionActiveBgColor = 'bg-blue-900/30';
		} else {
			// light theme (LinkedIn Standard)
			bgColor = 'bg-white border border-gray-200';
			textColor = 'text-black/90'; // Slightly off-black
			mutedTextColor = 'text-black/60'; // LinkedIn's gray
			lighterMutedTextColor = 'text-black/40';
			borderColor = 'border-gray-200';
			hoverBgColor = 'hover:bg-gray-100';
			actionTextColor = 'text-black/60';
			actionHoverTextColor = 'hover:text-blue-700';
			actionActiveTextColor = 'text-blue-700';
			actionActiveBgColor = 'bg-blue-100/60';
		}
	}

	$: finalCardClasses = `
        w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-sm {# Subtle shadow #}
        ${bgColor}
        ${cardClass}
    `.trim();

	// --- Text Parsing & Truncation ---
	$: parsedContent = parseLinkedinText(post.contentText);
	$: needsTruncation = post.contentText.length > truncateLength;
	$: displayContent = showFullText
		? parsedContent
		: needsTruncation
			? parseLinkedinText(post.contentText.substring(0, truncateLength) + '...')
			: parsedContent;

	// --- Handlers ---
	function toggleLike() {
		isLikedState = !isLikedState;
		likeCountState += isLikedState ? 1 : -1;
	}

	function toggleSeeMore() {
		showFullText = !showFullText;
	}

	function handleAction(action: string) {
		console.log(`${action} clicked`);
	}
</script>

<!-- Mockup Kartu Postingan LinkedIn -->
<article aria-labelledby={`post-author-${post.id}`} class={finalCardClasses}>
	<!-- Konten Padding -->
	<div class="px-4 pt-4 pb-2 sm:px-5 sm:pt-5 sm:pb-3">
		<!-- Header Postingan -->
		<header class="flex items-start justify-between gap-4">
			<!-- Info Penulis Kiri -->
			<div class="flex items-center gap-2">
				<a
					class="block flex-shrink-0"
					href="#"
					on:click|preventDefault={() => handleAction('Profile')}
				>
					<img
						alt={`${post.authorName}'s avatar`}
						class={`object-cover shadow-sm ${post.authorType === 'user' ? 'h-10 w-10 rounded-full sm:h-12 sm:w-12' : 'h-10 w-10 rounded border border-gray-200 sm:h-12 sm:w-12 dark:border-neutral-700'}`}
						loading="lazy"
						src={post.avatarUrl}
					/>
				</a>
				<div class="min-w-0 text-xs sm:text-sm">
					<div class="flex items-center gap-1">
						<a
							class={`font-semibold ${textColor} truncate hover:underline`}
							href="#"
							on:click|preventDefault={() => handleAction('Profile')}>{post.authorName}</a
						>
						{#if post.isPremium}
							<CheckCircle2 class="h-3 w-3 flex-shrink-0 text-yellow-600 dark:text-yellow-500" />
						{/if}
					</div>
					<p class={`text-xs ${mutedTextColor} truncate`} title={post.authorHeadline}>
						{post.authorHeadline}
					</p>
					<div class={`flex items-center gap-1 text-xs ${lighterMutedTextColor}`}>
						<span>{post.timestamp}</span>
						{#if post.isEdited && !post.timestamp.includes('Edited')}<span>• Edited</span>{/if}
						{#if post.privacy === 'public'}
							<Globe class="h-3 w-3" />
						{/if}
					</div>
				</div>
			</div>
			<!-- Tombol More Kanan -->
			<button
				class={`ml-2 rounded-full p-1.5 ${mutedTextColor} ${hoverBgColor} transition-colors`}
				on:click|stopPropagation={() => handleAction('More')}
			>
				<span class="sr-only">More options</span>
				<Ellipsis class="h-5 w-5" strokeWidth={2} />
			</button>
		</header>

		<!-- Teks Postingan -->
		<div
			class="mt-3 text-sm sm:text-[14px] ${textColor} leading-normal break-words whitespace-pre-wrap"
		>
			{@html displayContent}
			{#if needsTruncation}
				<button
					on:click={toggleSeeMore}
					class={`text-sm font-semibold ${mutedTextColor} ml-1 hover:underline`}
				>{showFullText ? 'see less' : '.see more'}</button
				>
			{/if}
		</div>
	</div>
	<!-- End Content Padding -->

	<!-- Link Preview (jika ada) -->
	{#if post.linkPreview}
		<a
			href={post.linkPreview.url}
			target="_blank"
			rel="noopener noreferrer"
			class={`block border-t ${borderColor} ${hoverBgColor} group transition-colors`}
		>
			{#if post.linkPreview.imageUrl}
				<img
					src={post.linkPreview.imageUrl}
					alt={`Preview for ${post.linkPreview.title}`}
					class="max-h-48 w-full object-cover"
				/>
			{/if}
			<div class="px-4 py-2 sm:px-5">
				<p class={`text-sm font-medium ${textColor} truncate group-hover:underline`}>
					{post.linkPreview.title}
				</p>
				<p class={`text-xs ${mutedTextColor} uppercase`}>{post.linkPreview.domain}</p>
			</div>
		</a>
	{/if}

	<!-- Media Utama (jika ada & bukan link preview) -->
	{#if post.mediaUrl && !post.linkPreview}
		<div class={`w-full border-y bg-gray-100 dark:bg-neutral-800 ${borderColor}`}>
			{#if post.mediaType === 'image'}
				<img
					src={post.mediaUrl}
					alt="Post media"
					class="h-auto max-h-[500px] w-full object-contain"
					loading="lazy"
				/>
			{:else if post.mediaType === 'video'}
				<div class="flex aspect-video w-full items-center justify-center bg-black">
					<span class="text-sm text-white/50">(Video Placeholder)</span>
				</div>
			{:else if post.mediaType === 'document'}
				<div
					class="flex min-h-[100px] w-full items-center justify-center bg-gray-100 p-4 dark:bg-neutral-700"
				>
					<span class="text-sm text-gray-500 dark:text-neutral-400"
					>(Document Preview Placeholder)</span
					>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Statistik Engagement -->
	{#if post.likeCount > 0 || post.commentCount > 0 || post.repostCount > 0}
		<div
			class={`flex items-center justify-between text-xs ${mutedTextColor} px-4 pt-2 pb-1 sm:px-5`}
		>
			<button
				on:click={() => handleAction('View Likes')}
				class={`hover:underline ${hoverBgColor} rounded px-1`}
			>
				{formatLinkedinCount(likeCountState)} likes
			</button>
			<div class="flex space-x-3">
				{#if post.commentCount > 0}
					<button
						on:click={() => handleAction('View Comments')}
						class="rounded px-1 hover:text-blue-700 hover:underline"
					>
						{formatLinkedinCount(post.commentCount)} comments
					</button>
				{/if}
				{#if post.repostCount > 0}
					<button
						on:click={() => handleAction('View Reposts')}
						class="rounded px-1 hover:text-blue-700 hover:underline"
					>
						{formatLinkedinCount(post.repostCount)} reposts
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Tombol Aksi Footer -->
	<footer class={`flex items-center justify-around border-t ${borderColor} px-2 py-1 sm:px-3`}>
		<!-- Tombol Like -->
		<button
			aria-pressed={isLikedState}
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-blue-100/50 focus:outline-none dark:focus:bg-blue-900/30 ${hoverBgColor}
                  ${isLikedState ? actionActiveTextColor : actionTextColor} ${isLikedState ? actionActiveBgColor : ''}`}
			on:click|preventDefault={toggleLike}
		>
			<ThumbsUp
				class={`h-4 w-4 transition-transform group-hover:scale-110 sm:h-5 sm:w-5 ${isLikedState ? 'fill-current' : ''}`}
				strokeWidth={2}
			/>
			<span class="font-medium">Like</span>
		</button>
		<!-- Tombol Komen -->
		<button
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
			on:click|preventDefault={() => handleAction('Comment')}
		>
			<MessageSquare class="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
			<span class="font-medium">Comment</span>
		</button>
		<!-- Tombol Repost -->
		<button
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
			on:click|preventDefault={() => handleAction('Repost')}
		>
			<Repeat class="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
			<span class="font-medium">Repost</span>
		</button>
		<!-- Tombol Send -->
		<button
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
			on:click|preventDefault={() => handleAction('Send')}
		>
			<Send class="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
			<span class="font-medium">Send</span>
		</button>
	</footer>
</article>

<!-- Placeholder untuk Ikon GitLab SVG (jika masih ada) -->
<!-- <GitlabIcon ... /> -->

<style lang="postcss">
    @reference "tailwindcss";
    @layer utilities {
        .scrollbar-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }

        /* Optional: Prose styles if needed */
    }
</style>
