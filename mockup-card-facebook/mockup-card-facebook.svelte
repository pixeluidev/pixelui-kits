<script lang="ts">
	// Data & Tipe
	import type { FacebookPostData } from './data'; // Adjust path
	import { exampleFacebookPost as defaultPost, privacyIcons } from './data'; // Default data & ikon privasi
	// Ikon Lucide

	import { Ellipsis, Forward, MessageCircle, ThumbsUp } from '@lucide/svelte';
	// Utility
	import { parseFacebookText, formatFacebookCount } from './facebook-parser'; // Adjust path

	// --- Props ---
	export let post: FacebookPostData = defaultPost;
	export let theme: 'light' | 'dark' = 'light';
	export let cardClass: string = '';

	// --- State ---
	let isLikedState: boolean = post.isLiked ?? false;
	let likeCountState: number = post.reactionCount; // Gunakan reactionCount untuk likes
	let showFullText = false;
	const truncateLength = 250; // Batas karakter caption
	// --- Styling Dinamis ---
	let bgColor: string;
	let textColor: string;
	let mutedTextColor: string; // Untuk timestamp, counts
	let darkerMutedTextColor: string; // Untuk ikon privasi
	let borderColor: string;
	let hoverBgColor: string; // Untuk tombol aksi
	let cardShadow: string = 'shadow-md'; // Bayangan default
	let actionTextColor: string;
	let actionHoverTextColor: string;
	let likeActiveTextColor: string; // Warna teks tombol like saat aktif
	let likeActiveIconColor: string; // Warna ikon like saat aktif

	$: {
		if (theme === 'dark') {
			bgColor = 'bg-[#242526] border border-[#3a3b3c]'; // Facebook dark bg
			textColor = 'text-[#e4e6eb]'; // Teks utama cerah
			mutedTextColor = 'text-[#b0b3b8]'; // Teks abu-abu cerah
			darkerMutedTextColor = 'text-[#8a8d91]';
			borderColor = 'border-[#3a3b3c]';
			hoverBgColor = 'hover:bg-[#3a3b3c]';
			actionTextColor = 'text-[#b0b3b8]';
			actionHoverTextColor = 'hover:text-[#c8cad0]';
			likeActiveTextColor = 'text-blue-400'; // Biru Facebook di dark mode
			likeActiveIconColor = 'text-blue-400 fill-blue-400';
			cardShadow = 'shadow-none'; // Kurangi shadow di dark mode
		} else {
			// light theme
			bgColor = 'bg-white border border-gray-200';
			textColor = 'text-[#050505]'; // Hitam pekat FB
			mutedTextColor = 'text-[#65676b]'; // Abu-abu FB
			darkerMutedTextColor = 'text-[#8a8d91]';
			borderColor = 'border-gray-300'; // Border lebih terlihat
			hoverBgColor = 'hover:bg-gray-100';
			actionTextColor = 'text-[#65676b]';
			actionHoverTextColor = 'hover:text-[#3a3b3c]';
			likeActiveTextColor = 'text-blue-600'; // Biru Facebook
			likeActiveIconColor = 'text-blue-600 fill-blue-600';
			cardShadow = 'shadow-md';
		}
	}

	$: finalCardClasses = `
        w-full max-w-lg mx-auto rounded-lg overflow-hidden
        ${bgColor}
        ${cardShadow}
        ${cardClass}
    `.trim();

	// --- Parsing & Truncation ---
	$: parsedContent = parseFacebookText(post.contentText);
	$: needsTruncation = post.contentText.length > truncateLength;
	$: displayContent = showFullText
		? parsedContent
		: needsTruncation
			? parseFacebookText(post.contentText.substring(0, truncateLength) + '...')
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

<!-- Mockup Kartu Postingan Facebook -->
<div aria-labelledby={`post-author-${post.id}`} class={finalCardClasses}>
	<!-- Header Postingan -->
	<header class="flex items-center justify-between gap-3 p-3 sm:p-4">
		<div class="flex items-center space-x-3">
			<button class="block flex-shrink-0" onclick={() => handleAction('Profile')}>
				<img
					alt={`${post.authorName}'s avatar`}
					class="h-10 w-10 rounded-full object-cover"
					loading="lazy"
					src={post.authorAvatarUrl}
				/>
			</button>
			<div class="min-w-0 text-xs">
				<button
					class={`text-sm font-semibold ${textColor} block truncate hover:underline`}
					onclick={() => handleAction('Profile')}>{post.authorName}</button
				>
				<div class={`flex items-center gap-1 ${mutedTextColor}`}>
					<button class="hover:underline" onclick={() => handleAction('Timestamp')}>
						<span>{post.timestamp}</span>
					</button>
					{#if post?.isEdited && !post.timestamp.includes('Edited')}<span>· Edited</span>{/if}
					<span>·</span>
					<svelte:component
						this={privacyIcons[post.privacy]}
						class={`h-3 w-3 ${darkerMutedTextColor}`}
					/>
				</div>
			</div>
		</div>
		<button
			class={`-m-2 rounded-full p-2 ${mutedTextColor} ${hoverBgColor} transition-colors`}
			onclick={() => handleAction('More')}
		>
			<span class="sr-only">More options</span>
			<Ellipsis class="h-5 w-5" strokeWidth={2} />
		</button>
	</header>

	<!-- Konten Postingan -->
	<div class="space-y-3 px-3 pb-2 sm:px-4">
		<!-- Teks Postingan -->
		<div
			class={`text-sm sm:text-[15px] ${textColor} leading-normal break-words whitespace-pre-wrap`}
		>
			{@html displayContent}
			{#if needsTruncation}
				<button
					onclick={toggleSeeMore}
					class={`text-sm font-semibold ${mutedTextColor} ml-1 hover:underline`}
				>
					{showFullText ? 'See less' : 'See more'}
				</button>
			{/if}
		</div>

		<!-- Link Preview (jika ada) -->
		{#if post.linkPreview}
			<a
				href={post.linkPreview.url}
				target="_blank"
				rel="noopener noreferrer"
				class={`block border ${borderColor} overflow-hidden rounded-lg ${hoverBgColor} group transition-colors`}
			>
				{#if post.linkPreview.imageUrl}
					<div class="aspect-video bg-gray-100 dark:bg-neutral-700">
						<img
							src={post.linkPreview.imageUrl}
							alt={`Preview for ${post.linkPreview.title}`}
							class="h-full w-full object-cover"
						/>
					</div>
				{/if}
				<div class="px-3 py-2">
					<p class={`text-[10px] uppercase ${mutedTextColor}`}>{post.linkPreview.domain}</p>
					<p class={`text-sm font-medium ${textColor} truncate group-hover:underline`}>
						{post.linkPreview.title}
					</p>
					{#if post.linkPreview.description}
						<p class={`text-xs ${mutedTextColor} mt-0.5 line-clamp-2`}>
							{post.linkPreview.description}
						</p>
					{/if}
				</div>
			</a>
		{/if}
	</div>

	<!-- Media Utama (jika ada & bukan link preview) -->
	{#if post.mediaUrl && !post.linkPreview}
		<div class={`max-h-[60vh] w-full overflow-hidden ${bgColor}`}>
			<!-- Batasi tinggi media -->
			{#if post.mediaType === 'image'}
				<img
					src={post.mediaUrl}
					alt="Post media"
					class="h-auto w-full object-contain"
					loading="lazy"
				/>
			{:else if post.mediaType === 'video'}
				<div class="flex aspect-video w-full items-center justify-center bg-black">
					<span class="text-sm text-white/50">(Video Placeholder)</span>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Info Engagement (Likes, Comments, Shares) -->
	{#if post.reactionCount > 0 || post.commentCount > 0 || post.shareCount > 0}
		<div
			class={`flex items-center justify-between text-xs ${mutedTextColor} border-t border-b px-3 py-2 sm:px-4 ${borderColor}`}
		>
			<!-- Jumlah Reaksi (Likes) -->
			<button
				onclick={() => handleAction('View Reactions')}
				class={`hover:underline ${hoverBgColor} rounded px-1`}
			>
				<!-- Placeholder ikon reaksi kecil jika diperlukan -->
				{formatFacebookCount(likeCountState)}
				{likeCountState === 1 ? 'like' : 'likes'}
			</button>
			<!-- Jumlah Komentar & Share -->
			<div class="flex space-x-3">
				{#if post.commentCount > 0}
					<button
						onclick={() => handleAction('View Comments')}
						class={`hover:underline ${hoverBgColor} rounded px-1`}
					>
						{formatFacebookCount(post.commentCount)} comments
					</button>
				{/if}
				{#if post.shareCount > 0}
					<button
						onclick={() => handleAction('View Shares')}
						class={`hover:underline ${hoverBgColor} rounded px-1`}
					>
						{formatFacebookCount(post.shareCount)} shares
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Tombol Aksi Footer -->
	<footer class={`flex items-center justify-around border-t px-2 py-1 ${borderColor}`}>
		<!-- Tombol Like -->
		<button
			aria-pressed={isLikedState}
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-blue-100/50 focus:outline-none dark:focus:bg-blue-900/30 ${hoverBgColor}
                  ${isLikedState ? likeActiveTextColor : actionTextColor}`}
			class:font-semibold={isLikedState}
			onclick={toggleLike}
		>
			<ThumbsUp
				class={`h-5 w-5 transition-transform group-hover:scale-110 sm:h-[20px] sm:w-[20px] ${isLikedState ? likeActiveIconColor : ''}`}
				fill={isLikedState ? 'currentColor' : 'none'}
				strokeWidth={isLikedState ? 0 : 2}
			/>
			<span>Like</span>
		</button>
		<!-- Tombol Komen -->
		<button
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
			onclick={() => handleAction('Comment')}
		>
			<MessageCircle class="h-5 w-5 sm:h-[20px] sm:w-[20px]" strokeWidth={2} />
			<span class="font-medium">Comment</span>
		</button>
		<!-- Tombol Share -->
		<button
			class={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm transition-colors duration-150 focus:bg-gray-100 focus:outline-none dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
			onclick={() => handleAction('Share')}
		>
			<Forward class="h-5 w-5 sm:h-[20px] sm:w-[20px]" strokeWidth={2} />
			<span class="font-medium">Share</span>
		</button>
	</footer>
</div>
