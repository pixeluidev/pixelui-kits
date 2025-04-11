<script lang="ts">
	// Data & Tipe
	import type { FacebookPostData } from './data'; // Adjust path
	import { exampleFacebookPost as defaultPost, privacyIcons } from './data'; // Default data & ikon privasi
	// Ikon Lucide

	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import MessageCircle from 'lucide-svelte/icons/message-circle';
	import Forward from 'lucide-svelte/icons/forward';
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
		} else { // light theme
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
	$: displayContent = showFullText ? parsedContent : (needsTruncation ? parseFacebookText(post.contentText.substring(0, truncateLength) + '...') : parsedContent);

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
			<a class="block flex-shrink-0" href="#" on:click|preventDefault={() => handleAction('Profile')}>
				<img
					alt={`${post.authorName}'s avatar`}
					class="h-10 w-10 rounded-full object-cover"
					loading="lazy"
					src={post.authorAvatarUrl}
				/>
			</a>
			<div class="text-xs min-w-0">
				<a class={`text-sm font-semibold ${textColor} hover:underline block truncate`} href="#"
					 on:click|preventDefault={() => handleAction('Profile')}>{post.authorName}</a>
				<div class={`flex items-center gap-1 ${mutedTextColor}`}>
					<a class="hover:underline" href="#" on:click|preventDefault={() => handleAction('Timestamp')}>
						<span>{post.timestamp}</span>
					</a>
					{#if post?.isEdited && !post.timestamp.includes('Edited')}<span>· Edited</span>{/if}
					<span>·</span>
					<svelte:component class={`w-3 h-3 ${darkerMutedTextColor}`} this={privacyIcons[post.privacy]}
														title={`Privacy: ${post.privacy}`} />
				</div>
			</div>
		</div>
		<button class={`p-2 -m-2 rounded-full ${mutedTextColor} ${hoverBgColor} transition-colors`}
						on:click|stopPropagation={() => handleAction('More')}>
			<span class="sr-only">More options</span>
			<Ellipsis class="w-5 h-5" strokeWidth={2} />
		</button>
	</header>

	<!-- Konten Postingan -->
	<div class="px-3 sm:px-4 pb-2 space-y-3">
		<!-- Teks Postingan -->
		<div class={`text-sm sm:text-[15px] ${textColor} leading-normal whitespace-pre-wrap break-words`}>
			{@html displayContent}
			{#if needsTruncation}
				<button on:click={toggleSeeMore} class={`text-sm font-semibold ${mutedTextColor} hover:underline ml-1`}>
					{showFullText ? "See less" : "See more"}
				</button>
			{/if}
		</div>

		<!-- Link Preview (jika ada) -->
		{#if post.linkPreview}
			<a href={post.linkPreview.url} target="_blank" rel="noopener noreferrer"
				 class={`block border ${borderColor} rounded-lg overflow-hidden ${hoverBgColor} transition-colors group`}>
				{#if post.linkPreview.imageUrl}
					<div class="aspect-video bg-gray-100 dark:bg-neutral-700">
						<img src={post.linkPreview.imageUrl} alt={`Preview for ${post.linkPreview.title}`}
								 class="w-full h-full object-cover" />
					</div>
				{/if}
				<div class="px-3 py-2">
					<p class={`text-[10px] uppercase ${mutedTextColor}`}>{post.linkPreview.domain}</p>
					<p class={`text-sm font-medium ${textColor} group-hover:underline truncate`}>{post.linkPreview.title}</p>
					{#if post.linkPreview.description}
						<p class={`text-xs ${mutedTextColor} mt-0.5 line-clamp-2`}>{post.linkPreview.description}</p>
					{/if}
				</div>
			</a>
		{/if}
	</div>

	<!-- Media Utama (jika ada & bukan link preview) -->
	{#if post.mediaUrl && !post.linkPreview}
		<div class={`w-full max-h-[60vh] overflow-hidden ${bgColor}`}> <!-- Batasi tinggi media -->
			{#if post.mediaType === 'image'}
				<img src={post.mediaUrl} alt="Post media" class="w-full h-auto object-contain" loading="lazy" />
			{:else if post.mediaType === 'video'}
				<div class="w-full aspect-video flex items-center justify-center bg-black">
					<span class="text-white/50 text-sm">(Video Placeholder)</span>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Info Engagement (Likes, Comments, Shares) -->
	{#if post.reactionCount > 0 || post.commentCount > 0 || post.shareCount > 0}
		<div
			class={`flex items-center justify-between text-xs ${mutedTextColor} px-3 sm:px-4 py-2 border-b border-t ${borderColor}`}>
			<!-- Jumlah Reaksi (Likes) -->
			<button on:click={() => handleAction('View Reactions')} class={`hover:underline ${hoverBgColor} px-1 rounded`}>
				<!-- Placeholder ikon reaksi kecil jika diperlukan -->
				{formatFacebookCount(likeCountState)} {likeCountState === 1 ? 'like' : 'likes'}
			</button>
			<!-- Jumlah Komentar & Share -->
			<div class="flex space-x-3">
				{#if post.commentCount > 0}
					<button on:click={() => handleAction('View Comments')} class={`hover:underline ${hoverBgColor} px-1 rounded`}>
						{formatFacebookCount(post.commentCount)} comments
					</button>
				{/if}
				{#if post.shareCount > 0}
					<button on:click={() => handleAction('View Shares')} class={`hover:underline ${hoverBgColor} px-1 rounded`}>
						{formatFacebookCount(post.shareCount)} shares
					</button>
				{/if}
			</div>
		</div>
	{/if}


	<!-- Tombol Aksi Footer -->
	<footer class={`flex justify-around items-center px-2 py-1 border-t ${borderColor}`}>
		<!-- Tombol Like -->
		<button
			aria-pressed={isLikedState}
			class={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:bg-blue-100/50 dark:focus:bg-blue-900/30 ${hoverBgColor}
                  ${isLikedState ? likeActiveTextColor : actionTextColor}`
            }
			class:font-semibold={isLikedState}
			on:click|preventDefault={toggleLike}
		>
			<ThumbsUp
				class={`w-5 h-5 sm:w-[20px] sm:h-[20px] transition-transform group-hover:scale-110 ${isLikedState ? likeActiveIconColor : ''}`}
				fill={isLikedState ? 'currentColor' : 'none'} strokeWidth={isLikedState ? 0 : 2} />
			<span>Like</span>
		</button>
		<!-- Tombol Komen -->
		<button class={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
						on:click|preventDefault={() => handleAction('Comment')}>
			<MessageCircle class="w-5 h-5 sm:w-[20px] sm:h-[20px]" strokeWidth={2} />
			<span class="font-medium">Comment</span>
		</button>
		<!-- Tombol Share -->
		<button class={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-700 ${actionTextColor} ${actionHoverTextColor} ${hoverBgColor}`}
						on:click|preventDefault={() => handleAction('Share')}>
			<Forward class="w-5 h-5 sm:w-[20px] sm:h-[20px]" strokeWidth={2} />
			<span class="font-medium">Share</span>
		</button>
	</footer>
</div>