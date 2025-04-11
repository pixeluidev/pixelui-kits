<script lang="ts">
	import Copy from 'lucide-svelte/icons/copy';
	import { onDestroy } from 'svelte';

	// --- Props ---
	/** Teks judul di title bar (opsional) */
	export let title: string = 'bash';
	/** Warna background utama terminal: 'dark', 'light' */
	export let theme: 'dark' | 'light' = 'dark';
	/** Tinggi area konten (kelas Tailwind, misal 'h-64', 'h-96') */
	export let contentHeight: string = 'h-64';
	/** Tampilkan kontrol jendela? */
	export let showControls: boolean = true;
	/** Tampilkan header bar? */
	export let showHeader: boolean = true;
	/** Kelas CSS tambahan untuk frame terluar */
	export let frameClass: string = '';
	/** Tampilkan tombol copy? */
	export let showCopyButton: boolean = true;

	// --- Styling Dinamis ---
	let headerBg: string;
	let contentBg: string;
	let contentTextColor: string;
	let scrollbarThumbColor: string;
	let scrollbarTrackColor: string;

	$: {
		if (theme === 'light') {
			headerBg = 'bg-gray-100 border-gray-200';
			contentBg = 'bg-white text-neutral-800';
			contentTextColor = 'text-neutral-800'; // Warna teks default untuk konten terang
			// scrollbarThumbColor = 'bg-gray-400/70';
			// scrollbarTrackColor = 'bg-gray-200/50';
		} else {
			// dark theme
			headerBg = 'bg-neutral-800 border-neutral-700';
			contentBg = 'bg-[#1e1e1e]'; // Warna gelap terminal yang umum
			contentTextColor = 'text-neutral-200'; // Warna teks default untuk konten gelap
			// scrollbarThumbColor = 'bg-neutral-600/70';
			// scrollbarTrackColor = 'bg-neutral-700/50';
		}
	}

	$: finalFrameClasses = `
        relative w-full shadow-xl rounded-lg sm:rounded-xl border overflow-hidden
        ${headerBg.split(' ')[1]} {# Ambil warna border dari header #}
        ${frameClass}
    `.trim();

	// --- Copy Logic ---
	let codeContentElement: HTMLElement | null;
	let copyButtonText = 'Copy';
	let copyTimeoutId: ReturnType<typeof setTimeout> | null = null;

	async function copyToClipboard() {
		if (!codeContentElement || !navigator.clipboard) {
			alert('Copying failed. Browser may not support Clipboard API.');
			return;
		}
		try {
			const codeToCopy = codeContentElement.innerText || ''; // Ambil teks dari slot
			await navigator.clipboard.writeText(codeToCopy);
			copyButtonText = 'Copied!';
			if (copyTimeoutId) clearTimeout(copyTimeoutId); // Hapus timeout sebelumnya jika ada
			copyTimeoutId = setTimeout(() => {
				copyButtonText = 'Copy';
			}, 2000); // Reset setelah 2 detik
		} catch (err) {
			console.error('Failed to copy: ', err);
			copyButtonText = 'Failed!';
			if (copyTimeoutId) clearTimeout(copyTimeoutId);
			copyTimeoutId = setTimeout(() => {
				copyButtonText = 'Copy';
			}, 2000);
		}
	}

	onDestroy(() => {
		if (copyTimeoutId) clearTimeout(copyTimeoutId); // Bersihkan timeout saat komponen dihancurkan
	});
</script>

<!-- Frame Mockup Terminal -->
<div class={finalFrameClasses}>
	{#if showHeader}
		<!-- Header / Title Bar -->
		<div class={`flex items-center border-b px-4 py-2.5 ${headerBg}`}>
			{#if showControls}
				<!-- Kontrol Jendela (macOS style) -->
				<div class="mr-4 flex space-x-1.5">
					<span class="block h-3 w-3 rounded-full border border-red-600/50 bg-red-500/90"></span>
					<span class="block h-3 w-3 rounded-full border border-yellow-600/50 bg-yellow-500/90"
					></span>
					<span class="block h-3 w-3 rounded-full border border-green-600/50 bg-green-500/90"
					></span>
				</div>
			{/if}

			<!-- Judul Window (Opsional) -->
			<div class="flex-grow text-center">
				{#if title}
					<span class="text-xs font-medium text-gray-500 dark:text-neutral-400">{title}</span>
				{/if}
			</div>

			{#if showControls && showCopyButton}
				<!-- Placeholder di kanan agar judul tetap tengah -->
				<div class="w-14 flex-shrink-0"></div>
			{/if}
			{#if showCopyButton && !showControls}
				<div class="flex-grow"></div>
				<!-- Spacer jika hanya ada copy button -->
			{/if}

			<!-- Tombol Copy (Opsional) -->
			{#if showCopyButton}
				<div class="relative flex-shrink-0">
					<button
						on:click={copyToClipboard}
						type="button"
						class="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 focus:outline-none dark:focus:ring-offset-inherit"
						class:text-gray-500={theme === 'light'}
						class:hover:bg-gray-200={theme === 'light'}
						class:dark:text-neutral-400={theme === 'dark'}
						class:dark:hover:bg-neutral-700={theme === 'dark'}
						class:text-green-600={copyButtonText === 'Copied!'}
						class:dark:text-green-400={copyButtonText === 'Copied!'}
						class:hover:bg-green-100={copyButtonText === 'Copied!'}
						class:dark:hover:bg-green-800={copyButtonText === 'Copied!'}
						class:text-red-600={copyButtonText === 'Failed!'}
						class:dark:text-red-400={copyButtonText === 'Failed!'}
						aria-label={copyButtonText === 'Copy' ? 'Copy code to clipboard' : copyButtonText}
					>
						<Copy class="h-3 w-3" strokeWidth={2} />
						<span>{copyButtonText}</span>
					</button>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Area Konten Terminal -->
	<!-- Key ditambahkan untuk memastikan elemen baru dibuat saat tema berubah, memungkinkan style scrollbar diperbarui -->
	{#key theme}
		<div
			bind:this={codeContentElement}
			class={`scrollbar overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:p-6 sm:text-sm
            ${contentBg} ${contentTextColor} ${contentHeight}`}
		>
			<slot>
				<!-- Konten default -->
				<pre><code
				><span class="text-green-400">user@host</span>:<span class="text-blue-400">~</span
				>$ ls -l
total 8
drwxr-xr-x 2 user user 4096 Mar 25 10:10 Documents
drwxr-xr-x 2 user user 4096 Mar 25 10:11 Downloads
<span class="text-green-400">user@host</span>:<span class="text-blue-400">~</span>$ <span
						class="animate-pulse">▋</span
					></code
				></pre>
			</slot>
		</div>
	{/key}
</div>
