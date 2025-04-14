<script lang="ts">
	import type { TestimonialListItemData } from './data'; // Sesuaikan path
	import CheckCircle2 from 'lucide-svelte/icons/check-circle-2'; // Verified badge

	export let testimonial: TestimonialListItemData;
</script>

<div
	class="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 ease-in-out dark:border-neutral-700/50 dark:bg-neutral-800"
>
	<!-- Header with Author Info -->
	<div
		class="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 p-4 dark:border-neutral-700/50 dark:bg-neutral-700/20"
	>
		<img
			alt={`Avatar of ${testimonial.authorName}`}
			class="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm dark:border-neutral-700"
			height="48"
			loading="lazy"
			src={testimonial.avatarUrl}
			width="48"
		/>
		<div class="min-w-0 flex-1">
			<!-- Tambahkan min-w-0 untuk mencegah overflow teks -->
			<div class="flex items-center gap-1.5">
				<h6 class="truncate text-sm font-semibold text-gray-800 dark:text-white">
					<!-- truncate jika nama terlalu panjang -->
					{testimonial.authorName}
				</h6>
				{#if testimonial.isVerified}
					<CheckCircle2
						class="h-4 w-4 flex-shrink-0 text-primary dark:text-orange-400"
						title="Verified Account"
					/>
				{/if}
			</div>
			{#if testimonial.authorHandle}
				<p class="truncate text-xs font-medium text-gray-500 dark:text-neutral-400">
					<!-- truncate jika handle terlalu panjang -->
					{testimonial.authorHandle}
				</p>
			{:else if testimonial.authorTitle}
				<!-- Tampilkan title jika handle tidak ada -->
				<p class="truncate text-xs font-medium text-gray-500 dark:text-neutral-400">
					{testimonial.authorTitle}
				</p>
			{/if}
		</div>
	</div>

	<!-- Quote Content -->
	<div class="flex-grow p-4 md:p-5">
		<p class="text-base leading-relaxed text-gray-700 dark:text-neutral-300">
			"{testimonial.quote}"
		</p>
	</div>

	<!-- Footer with Source & Date -->
	<div
		class="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/50 p-4 dark:border-neutral-700/50 dark:bg-neutral-700/20"
	>
		{#if testimonial.sourceName || testimonial.sourceIcon}
			<a
				href={testimonial.sourceUrl ?? '#'}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors duration-150 hover:text-primary focus:text-primary focus:outline-none dark:text-neutral-400 dark:hover:text-orange-400"
				title={`View on ${testimonial.sourceName ?? 'Source'}`}
			>
				{#if testimonial.sourceIcon}
					<svelte:component this={testimonial.sourceIcon} class="h-4 w-4" />
					<!-- Tidak perlu fallback sourceLogoUrl di sini jika kita standarkan pakai sourceIcon -->
				{:else if testimonial.sourceName}
					<!-- Placeholder jika hanya ada nama tapi tidak ada ikon -->
					<span class="h-4 w-4"></span>
					<!-- Invisible spacer -->
				{/if}
				{#if testimonial.sourceName}
					<span>{testimonial.sourceName}</span>
				{/if}
			</a>
		{:else}
			<!-- Placeholder agar tanggal tetap di kanan jika tidak ada sumber -->
			<span></span>
		{/if}
		<p class="flex-shrink-0 text-xs text-gray-400 dark:text-neutral-500">{testimonial.date}</p>
	</div>
</div>
