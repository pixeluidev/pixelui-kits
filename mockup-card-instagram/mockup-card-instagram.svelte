<script lang="ts">
	// Data & Tipe
	import type { InstagramPostData } from './data'; // Adjust path
	import { exampleInstaPost as defaultPost } from './data'; // Default data
	// Ikon Lucide
	import { Heart, MessageCircle, Send, Bookmark, Smile, CheckCircle2 } from '@lucide/svelte';
	// Utility
	import { parseTweetText } from '../assets/helper/tweetParser'; // Adjust path
	import { MoreHorizontal } from '@lucide/svelte';

	// --- Props ---
	export let post: InstagramPostData = defaultPost;
	export let theme: 'light' | 'dark' = 'light';
	export let cardClass: string = '';

	// --- State ---
	// Buat state like lokal agar bisa interaktif di mockup
	let isLikedState: boolean = post.isLiked ?? false;
	let likeCountState: number = post.likeCount;
	let showFullCaption = false;

	// --- Styling Dinamis ---
	let bgColor: string;
	let textColor: string;
	let mutedTextColor: string;
	let borderColor: string;
	let hoverBgColor: string; // Untuk tombol
	// let likeColor: string = 'text-red-500 dark:text-red-500';
	// let likeFill: string = 'fill-red-500 dark:fill-red-500';

	$: {
		if (theme === 'dark') {
			bgColor = 'bg-black border border-neutral-800';
			textColor = 'text-neutral-100'; // Instagram dark text is mostly white
			mutedTextColor = 'text-neutral-400';
			hoverBgColor = 'hover:bg-neutral-800/80';
		} else {
			// light theme
			bgColor = 'bg-white border border-gray-200';
			textColor = 'text-black'; // Instagram light text is mostly black
			mutedTextColor = 'text-gray-500';
			hoverBgColor = 'hover:bg-gray-100/70';
		}
	}

	$: finalCardClasses = `
        w-full max-w-md mx-auto rounded-lg overflow-hidden {# Tidak ada shadow default di IG #}
        ${bgColor}
        ${cardClass}
    `.trim();

	// --- Format Angka ---
	function formatCount(num: number): string {
		return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
			num
		);
	}

	// --- Toggle Like ---
	function toggleLike() {
		isLikedState = !isLikedState;
		likeCountState += isLikedState ? 1 : -1;
		console.log('Like toggled'); // Placeholder
	}

	// --- Toggle Caption ---
	function toggleCaption() {
		showFullCaption = !showFullCaption;
	}

	// --- Parsed Caption ---
	$: parsedCaption = parseTweetText(post.caption);
	// Logika untuk menampilkan caption singkat/penuh
	$: displayCaption = showFullCaption
		? parsedCaption
		: parsedCaption.length > 100
			? parsedCaption.substring(0, 100) + '...'
			: parsedCaption;
	$: needsMoreButton = !showFullCaption && post.caption.length > 100;

	// Placeholder Aksi
	function handleAction(action: string) {
		console.log(`${action} clicked`);
	}
</script>

<!-- Mockup Kartu Postingan Instagram -->
<div class={finalCardClasses}>
	<!-- Header Postingan -->
	<header class="flex items-center justify-between p-3">
		<div class="flex items-center space-x-3">
			<a class="block flex-shrink-0" href="#" onclick={() => handleAction('Profile')}>
				<img
					alt={`${post.authorUsername}'s avatar`}
					class="h-8 w-8 rounded-full object-cover"
					loading="lazy"
					src={post.authorAvatarUrl}
				/>
			</a>
			<div class="min-w-0 text-sm">
				<div class="flex items-center gap-1">
					<a
						class="font-semibold {textColor} truncate hover:opacity-80"
						href="#"
						onclick={() => handleAction('Profile')}>{post.authorUsername}</a
					>
					{#if post.isVerified}
						<CheckCircle2 class="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
					{/if}
				</div>
				{#if post.location}
					<a
						href="#location"
						onclick={() => handleAction('Location')}
						class="text-xs {mutedTextColor} block truncate hover:opacity-80">{post.location}</a
					>
				{/if}
			</div>
		</div>
		<button
			class={`rounded-full p-1.5 ${mutedTextColor} hover:opacity-80 ${hoverBgColor} transition-colors`}
			onclick={() => handleAction('More')}
		>
			<span class="sr-only">More options</span>
			<MoreHorizontal class="h-5 w-5" strokeWidth={2} />
		</button>
	</header>

	<!-- Konten Media -->
	<div class="aspect-square w-full bg-gray-100 dark:bg-neutral-800">
		{#if post.mediaType === 'image'}
			<img src={post.mediaUrl} alt="Post media" class="h-full w-full object-cover" loading="lazy" />
		{:else if post.mediaType === 'video'}
			<!-- Placeholder Video -->
			<div class="flex h-full w-full items-center justify-center bg-black">
				<span class="text-sm text-white/50">(Video Placeholder)</span>
				<!-- Jika ingin embed video asli, gunakan tag <video> di sini -->
				<!-- <video class="w-full h-full object-cover" controls src={post.mediaUrl}></video> -->
			</div>
		{/if}
	</div>

	<!-- Footer Postingan -->
	<footer class="space-y-2 p-3">
		<!-- Tombol Aksi Utama -->
		<div class="flex items-center justify-between">
			<div class="flex space-x-3">
				<!-- Tombol Like -->
				<button
					aria-pressed={isLikedState}
					class={`group -ml-1 flex items-center rounded-full p-1 focus:ring-1 focus:ring-pink-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-black ${hoverBgColor}`}
					onclick={toggleLike}
				>
					<Heart
						class={`h-6 w-6 transition-all duration-150 ease-in-out group-hover:scale-110 ${isLikedState ? 'fill-current text-red-500 dark:text-red-500' : 'text-gray-700 group-hover:text-gray-900 dark:text-neutral-300 dark:group-hover:text-neutral-100'}`}
						strokeWidth={isLikedState ? 0 : 2}
					/>
					<span class="sr-only">Like</span>
				</button>
				<!-- Tombol Komen -->
				<button
					class={`group flex items-center rounded-full p-1 focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-black ${hoverBgColor}`}
					onclick={() => handleAction('Comment')}
				>
					<MessageCircle
						class="h-6 w-6 text-gray-700 transition-colors group-hover:text-gray-900 dark:text-neutral-300 dark:group-hover:text-neutral-100"
						strokeWidth={2}
					/>
					<span class="sr-only">Comment</span>
				</button>
				<!-- Tombol Share -->
				<button
					class={`group flex items-center rounded-full p-1 focus:ring-1 focus:ring-green-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-black ${hoverBgColor}`}
					onclick={() => handleAction('Share')}
				>
					<Send
						class="h-6 w-6 text-gray-700 transition-colors group-hover:text-gray-900 dark:text-neutral-300 dark:group-hover:text-neutral-100"
						strokeWidth={2}
					/>
					<span class="sr-only">Share</span>
				</button>
			</div>
			<!-- Tombol Save -->
			<button
				class={`group flex items-center rounded-full p-1 focus:ring-1 focus:ring-yellow-500 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-black ${hoverBgColor}`}
				onclick={() => handleAction('Save')}
			>
				<Bookmark
					class="h-6 w-6 text-gray-700 transition-colors group-hover:text-gray-900 dark:text-neutral-300 dark:group-hover:text-neutral-100"
					strokeWidth={2}
				/>
				<span class="sr-only">Save</span>
			</button>
		</div>

		<!-- Jumlah Likes -->
		{#if likeCountState > 0}
			<button
				onclick={() => handleAction('View Likes')}
				class={`text-sm font-semibold ${textColor} hover:opacity-80 focus:outline-none`}
			>
				{formatCount(likeCountState)} likes
			</button>
		{/if}

		<!-- Caption & Komentar -->
		<div class="space-y-1 text-sm">
			<div class={`${textColor} leading-normal`}>
				<a
					class="mr-1 font-semibold hover:opacity-80"
					href="#"
					onclick={() => handleAction('Profile')}>{post.authorUsername}</a
				>
				<!-- Render caption yang sudah diparsing -->
				<span class="font-normal">{@html displayCaption}</span>
				{#if needsMoreButton}
					<button
						onclick={toggleCaption}
						class="ml-1 text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-400"
						>more
					</button>
				{/if}
			</div>

			{#if post.commentCount > 0}
				<button
					onclick={() => handleAction('View Comments')}
					class={`text-sm ${mutedTextColor} hover:opacity-80 focus:outline-none`}
				>
					View all {formatCount(post.commentCount)} comments
				</button>
			{/if}

			<!-- Pratinjau Komentar (opsional) -->
			{#if post.commentsPreview && post.commentsPreview.length > 0}
				<ul class="space-y-0.5 pt-1">
					{#each post.commentsPreview.slice(0, 2) as comment}
						<li>
							<a
								href="#"
								onclick={() => handleAction('Comment Profile')}
								class={`text-sm font-semibold ${textColor} mr-1 hover:opacity-80`}
								>{comment.username}</a
							>
							<span class={`text-sm ${textColor} font-normal`}>{comment.text}</span>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Input Komentar -->
			<div class="flex items-center gap-2 pt-2">
				<a class="block flex-shrink-0" href="#" onclick={() => handleAction('Own Profile')}>
					<img
						alt="My avatar"
						class="h-6 w-6 rounded-full object-cover"
						loading="lazy"
						src="/avatars/my-avatar.jpg"
					/>
					<!-- Ganti dengan avatar pengguna saat ini -->
				</a>
				<input
					class="flex-grow border-none bg-transparent p-0 text-sm focus:ring-0 {textColor} placeholder:text-gray-400 dark:placeholder:text-neutral-500"
					placeholder="Add a comment..."
					type="text"
				/>
				<button
					class="text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300"
				>
					<Smile class="h-4 w-4" />
					<span class="sr-only">Add emoji</span>
				</button>
			</div>

			<!-- Waktu Posting -->
			<p class="text-[10px] uppercase {mutedTextColor} pt-2">{post.timestamp}</p>
		</div>
	</footer>
</div>
