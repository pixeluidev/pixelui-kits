<script lang="ts">
	import WindowsMockup from './mockup.svelte';
	// Contoh ikon jika Anda mau
	// import TerminalSquare from 'lucide-svelte/icons/terminal-square';
</script>

<main class="flex min-h-screen flex-col items-center gap-10 bg-gray-200 p-10 dark:bg-neutral-900">
	<!-- Contoh 1: Tema Terang -->
	<div class="w-full max-w-2xl">
		<WindowsMockup contentHeight="h-96" theme="light" title="My Application - Document.docx">
			<div class="p-6">
				<h2 class="mb-4 text-xl font-semibold text-gray-800">Document Editor</h2>
				<div class="space-y-2 text-sm text-gray-700">
					<p>Start typing your document content here.</p>
					<p>This area scrolls if the content is taller than the specified height.</p>
					<div class="h-64 rounded border bg-gray-100"></div>
					<p>More content below...</p>
				</div>
			</div>
		</WindowsMockup>
	</div>

	<!-- Contoh 2: Tema Gelap, Tanpa Kontrol -->
	<div class="w-full max-w-lg">
		<WindowsMockup contentHeight="h-72" showControls={false} theme="dark" title="Settings">
			<div class="p-6 text-sm text-neutral-300">
				Dark theme settings panel content goes here. Controls are hidden.
			</div>
		</WindowsMockup>
	</div>
</main>
