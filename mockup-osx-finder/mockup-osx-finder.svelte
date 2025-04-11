<script lang="ts">
	import FinderMockup from './mockup.svelte';
	// Impor ikon jika Anda ingin meneruskannya sebagai prop
	// import FolderIcon from 'lucide-svelte/icons/folder';
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-100 p-10 dark:bg-neutral-900">
	<div class="w-full max-w-4xl">
		<FinderMockup
			height="h-[70vh]"
			showSidebar={true}
			showToolbar={true}
			theme="light"
			title="My Project Files"
		>
			<!-- Konten Finder Anda di sini -->
			<div class="p-6">
				<h3 class="mb-4 text-lg font-semibold">Files and Folders</h3>
				<ul>
					<li class="py-1 text-sm">📄 report-final.docx</li>
					<li class="py-1 text-sm">📁 images</li>
					<li class="py-1 text-sm">📄 notes.txt</li>
					<li class="py-1 text-sm">📁 src</li>
				</ul>
			</div>
		</FinderMockup>
	</div>

	<div class="mt-10 w-full max-w-lg">
		<FinderMockup height="h-[50vh]" showToolbar={false} theme="dark" title="Downloads">
			<div class="p-6 text-sm text-neutral-300">
				Your downloaded files would appear here. Sidebar is shown by default. Toolbar is hidden.
			</div>
		</FinderMockup>
	</div>
</main>
